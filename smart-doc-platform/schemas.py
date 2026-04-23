from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class DocumentBase(BaseModel):
    title: str
    input_prompt: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    doc_id: int
    user_id: int
    generated_content: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class AIProcessBase(BaseModel):
    agent_type: str
    status: str

class AIProcess(AIProcessBase):
    process_id: int
    doc_id: int
    processed_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class OutputBase(BaseModel):
    file_type: str
    file_path: str

class Output(OutputBase):
    output_id: int
    doc_id: int
    created_at: datetime

    class Config:
        from_attributes = True
