from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.course_topic import CourseTopic

router = APIRouter(prefix="/topics",tags=["Topics"])

@router.post("/")
def create_topic(topic:dict,db:Session=Depends(get_db)):

    new_topic = CourseTopic(**topic)

    db.add(new_topic)
    db.commit()
    db.refresh(new_topic)

    return new_topic


@router.get("/{course_id}")
def get_topics(course_id:int,db:Session=Depends(get_db)):

    return db.query(CourseTopic).filter(
        CourseTopic.course_id == course_id
    ).all()