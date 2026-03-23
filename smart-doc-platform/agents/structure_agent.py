import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def run_structure_agent(topics: str, doc_type: str) -> dict:
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
    
    user_prompt = f"Document type: {doc_type}\n\nKey topics:\n{topics}\n\nOrganize this into a proper {doc_type} structure. Return only JSON."
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
        response = model.generate_content(user_prompt)
        
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
