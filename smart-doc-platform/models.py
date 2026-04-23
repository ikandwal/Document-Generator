from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(Text, nullable=False)
    email = Column(Text, unique=True, index=True, nullable=False)
    password = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    documents = relationship("Document", back_populates="owner")

class Document(Base):
    __tablename__ = "documents"

    doc_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    title = Column(Text, nullable=False)
    input_prompt = Column(Text, nullable=False)
    generated_content = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    owner = relationship("User", back_populates="documents")
    processes = relationship("AIProcess", back_populates="document")
    outputs = relationship("Output", back_populates="document")

class AIProcess(Base):
    __tablename__ = "ai_processes"

    process_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    doc_id = Column(Integer, ForeignKey("documents.doc_id"))
    agent_type = Column(Text, nullable=False)
    status = Column(Text, nullable=False)
    processed_at = Column(DateTime, nullable=True)

    document = relationship("Document", back_populates="processes")

class Output(Base):
    __tablename__ = "outputs"

    output_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    doc_id = Column(Integer, ForeignKey("documents.doc_id"))
    file_type = Column(Text, nullable=False)
    file_path = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    document = relationship("Document", back_populates="outputs")
