from docx import Document

def parse_docx(file_path: str) -> str:
    """
    Extracts text from a given DOCX file path using python-docx.
    
    Args:
        file_path (str): The path to the DOCX file to read.
        
    Returns:
        str: The extracted text from the DOCX file.
    """
    text = ""
    try:
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        print(f"Error parsing DOCX {file_path}: {e}")
        raise e
    
    return text.strip()
