import os
import json
import time
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(override=True)
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
def run_structure_agent(topics: str, doc_type: str, doc_subtype: str = None) -> dict:
    """
    Uses Google Gemini API to organize topics into a document structure.
    Returns a dict with 'title' and 'sections' [{heading, content}].
    """
    system_prompt = (
        "You are a document structure expert. Given a list of key topics and a "
        "document type, organize the content into a proper document structure. "
        "Return ONLY a valid JSON object with no extra text, no markdown, no backticks.\n"
        "The JSON must follow this exact format:\n"
        "{\n"
        "  \"title\": \"Document Title\",\n"
        "  \"sections\": [\n"
        "    {\n"
        "      \"heading\": \"Section Heading\",\n"
        "      \"content\": \"Detailed paragraph content for this section...\"\n"
        "    }\n"
        "  ]\n"
        "}"
    )
    
    format_requirements = ""
    if doc_type == "grant_proposal":
        format_requirements = (
            "Format Requirements for Grant Proposal:\n"
            "- Style: Formal, clear, persuasive, future-focused\n"
            "- Mandatory Sections:\n"
            "   1. Title Page (Project title, author, organization)\n"
            "   2. Abstract (Short summary of proposal)\n"
            "   3. Problem Statement (What problem you are solving)\n"
            "   4. Objectives (Goals of the project)\n"
            "   5. Methodology (How the work will be done)\n"
            "   6. Budget (Cost details)\n"
            "   7. Expected Outcomes (Results/impact)\n"
            "   8. Conclusion (Final justification)\n"
        )
    elif doc_type == "research_paper":
        format_requirements = (
            "Format Requirements for Research Paper:\n"
            "- Style: Formal, objective, evidence-based\n"
            "- Mandatory Sections:\n"
            "   1. Title (Clear topic)\n"
            "   2. Abstract (Summary of research)\n"
            "   3. Introduction (Background + problem)\n"
            "   4. Literature Review (Previous work)\n"
            "   5. Methodology (How research is done)\n"
            "   6. Results (Findings)\n"
            "   7. Discussion (Meaning of results)\n"
            "   8. Conclusion (Final summary)\n"
            "   9. References (Sources)\n"
        )
        
    subtype_str = f" ({doc_subtype})" if doc_subtype else ""
    user_prompt = f"Document type: {doc_type}{subtype_str}\n\nKey topics:\n{topics}\n\n{format_requirements}\nOrganize this into a proper {doc_type}{subtype_str} structure strictly following the format requirements if provided. Return only JSON."
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash', system_instruction=system_prompt)
        for attempt in range(4):
            try:
                response = model.generate_content(user_prompt)
                break
            except Exception as e:
                if '429' in str(e) and attempt < 3:
                    wait = 15 * (attempt + 1)
                    print(f"Rate limited (attempt {attempt+1}). Waiting {wait}s...")
                    time.sleep(wait)
                else:
                    raise e
        
        # Safely parse JSON
        raw_output = response.text.strip()
        
        # Strip markdown backticks if present
        if raw_output.startswith("```json"):
            raw_output = raw_output[7:]
        if raw_output.startswith("```"):
            raw_output = raw_output[3:]
        if raw_output.endswith("```"):
            raw_output = raw_output[:-3]
            
        return json.loads(raw_output.strip())
    except Exception as e:
        print(f"Error in structure_agent: {e}")
        raise e
