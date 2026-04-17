from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from fastapi.responses import FileResponse
import os
import time
import shutil
from typing import Optional, List
from pydantic import BaseModel

from parsers.pdf_parser import parse_pdf
from parsers.docx_parser import parse_docx
from agents.understanding_agent import run_understanding_agent
from agents.structure_agent import run_structure_agent
from agents.rewrite_agent import run_rewrite_agent
from templates.college_report import generate_college_report
from templates.technical_readme import generate_technical_readme
from templates.code_walkthrough import generate_code_walkthrough
from templates.proof_of_concept import generate_proof_of_concept
from templates.order_in_council import generate_order_in_council

router = APIRouter()

class Section(BaseModel):
    heading: str
    content: str

class DocumentData(BaseModel):
    title: str
    sections: List[Section]

class ExportRequest(BaseModel):
    document_data: DocumentData
    doc_type: str

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
        
        return {
            "status": "success",
            "document_data": polished_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/export/docx")
async def export_docx(req: ExportRequest):
    try:
        timestamp = int(time.time())
        output_filename = f"{req.doc_type.replace(' ', '_').lower()}_{timestamp}.docx"
        
        # Ensure outputs directory exists
        os.makedirs("outputs", exist_ok=True)
        output_path = os.path.join("outputs", output_filename)
        
        # Pydantic dict() converts it to match the expected structured format
        # Select the appropriate template function
        if req.doc_type == 'college_report':
            final_path = generate_college_report(req.document_data.model_dump(), output_path)
        elif req.doc_type == 'readme':
            final_path = generate_technical_readme(req.document_data.model_dump(), output_path)
        elif req.doc_type == 'walkthrough':
            final_path = generate_code_walkthrough(req.document_data.model_dump(), output_path)
        elif req.doc_type == 'poc':
            final_path = generate_proof_of_concept(req.document_data.model_dump(), output_path)
        elif req.doc_type == 'order_in_council':
            final_path = generate_order_in_council(req.document_data.model_dump(), output_path)
        else:
            # Fallback
            final_path = generate_college_report(req.document_data.model_dump(), output_path)
        
        return FileResponse(
            path=final_path,
            filename=output_filename,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    except Exception as e:
        print(f"Export Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

