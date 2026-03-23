from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from fastapi.responses import FileResponse
import os
import time
import shutil
from typing import Optional

from parsers.pdf_parser import parse_pdf
from parsers.docx_parser import parse_docx
from agents.understanding_agent import run_understanding_agent
from agents.structure_agent import run_structure_agent
from agents.rewrite_agent import run_rewrite_agent
from templates.college_report import generate_college_report

router = APIRouter()

@router.post("/generate")
async def generate_document(
    doc_type: str = Form(...),
    raw_text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    text_content = ""
    
    if file:
        temp_file_path = f"outputs/temp_{file.filename}"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        if file.filename.endswith(".pdf"):
            text_content = parse_pdf(temp_file_path)
        elif file.filename.endswith(".docx"):
            text_content = parse_docx(temp_file_path)
        else:
            os.remove(temp_file_path)
            raise HTTPException(status_code=400, detail="Unsupported file format")
            
        os.remove(temp_file_path)  # Cleanup temp file
        
    elif raw_text:
        text_content = raw_text
    else:
        raise HTTPException(status_code=400, detail="Must provide either raw_text or a file")

    if not text_content.strip():
        raise HTTPException(status_code=400, detail="Extracted content is empty")

    try:
        # Agent 1: Understanding (Local Model)
        topics = run_understanding_agent(text_content)
        
        # Agent 2: Structure (Gemini)
        structured_data = run_structure_agent(topics, doc_type)
        
        # Agent 3: Rewrite (Gemini)
        polished_data = run_rewrite_agent(structured_data)
        
        # Generate final file (python-docx template)
        timestamp = int(time.time())
        output_filename = f"{doc_type.replace(' ', '_').lower()}_{timestamp}.docx"
        output_path = os.path.join("outputs", output_filename)
        
        final_path = generate_college_report(polished_data, output_path)
        
        return FileResponse(
            path=final_path,
            filename=output_filename,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
