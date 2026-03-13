from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db

from app.models.user import User
from app.models.staff import Staff
from app.models.student import Student
from app.models.course import Course

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):

    total_users = db.query(User).count()
    total_staff = db.query(User).filter(User.role=="staff").count()
    total_students = db.query(User).filter(User.role=="student").count()
    total_courses = db.query(Course).count()

    return {
        "users": total_users,
        "staff": total_staff,
        "students": total_students,
        "courses": total_courses
    }