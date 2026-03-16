from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.admin import Admin
from app.models.student import Student
from app.models.course import Course
from app.models.batch import Batch
from app.models.staff import Staff

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):

    total_admins = db.query(Admin).count()
    total_staff = db.query(Staff).count()
    total_students = db.query(Student).count()
    total_courses = db.query(Course).count()
    total_batches = db.query(Batch).count()

    return {
        "admins": total_admins,
        "staff": total_staff,
        "students": total_students,
        "courses": total_courses,
        "batches": total_batches
    }