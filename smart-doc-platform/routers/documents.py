from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth_utils
from database import get_db
from routers.auth import get_current_user

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

@router.post("/", response_model=schemas.Document)
def create_user_document(
    doc: schemas.DocumentCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_doc = models.Document(
        **doc.model_dump(),
        user_id=current_user.user_id
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

@router.get("/", response_model=List[schemas.Document])
def read_user_documents(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Document).filter(models.Document.user_id == current_user.user_id).all()

@router.get("/{doc_id}", response_model=schemas.Document)
def read_document(
    doc_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_doc = db.query(models.Document).filter(
        models.Document.doc_id == doc_id,
        models.Document.user_id == current_user.user_id
    ).first()
    if db_doc is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_doc
