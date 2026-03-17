from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.topic_progress import TopicProgress

router = APIRouter(prefix="/progress",tags=["Topic Progress"])


@router.post("/")
def mark_completed(data:dict,db:Session=Depends(get_db)):

    progress = TopicProgress(**data)

    db.add(progress)
    db.commit()
    db.refresh(progress)

    return progress