import os
import time
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(override=True)
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
def run_rewrite_agent(structured: dict) -> dict:
    """
    Improves clarity, tone, and professionalism of each section's content.
    Returns the updated structure dict.
    """
    system_prompt = (
        "You are a professional technical writer. Your job is to improve the clarity, "
        "tone, and professionalism of document content. Make it formal, clear, and "
        "well-written. Do not change the structure or headings. Only improve the "
        "content text of each section."
    )
    
    improved_structured = {"title": structured.get("title", ""), "sections": []}
    
    model = genai.GenerativeModel('gemini-2.5-flash', system_instruction=system_prompt)
    
    for section in structured.get("sections", []):
        heading = section.get("heading", "")
        content = section.get("content", "")
        
        user_prompt = f"Heading: {heading}\n\nContent:\n{content}\n\nRewrite this content to be highly professional and clear."
        
        try:
            for attempt in range(4):
                try:
                    response = model.generate_content(user_prompt)
                    break
                except Exception as e:
                    if '429' in str(e) and attempt < 3:
                        wait = 15 * (attempt + 1)
                        print(f"Rate limited rewrite (attempt {attempt+1}). Waiting {wait}s...")
                        time.sleep(wait)
                    else:
                        raise e
            improved_content = response.text.strip()
            improved_structured["sections"].append({
                "heading": heading,
                "content": improved_content
            })
        except Exception as e:
            print(f"Error in rewrite_agent for section {heading}: {e}")
            improved_structured["sections"].append(section) # Fallback to original
            
    return improved_structured
