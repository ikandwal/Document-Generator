import fitz

def parse_pdf(file_path: str) -> str:
    """
    Extracts text from a given PDF file path using PyMuPDF.
    
    Args:
        file_path (str): The path to the PDF file to read.
        
    Returns:
        str: The extracted text from the PDF.
    """
    text = ""
    try:
        with fitz.open(file_path) as doc:
            for page in doc:
                text += page.get_text() + "\n"
    except Exception as e:
        print(f"Error parsing PDF {file_path}: {e}")
        raise e
    
    return text.strip()
