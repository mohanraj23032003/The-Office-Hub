from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.student import Student
from app.schemas.student import CreateStudent, UpdateStudent, StudentResponse


router = APIRouter(prefix="/students", tags=["Students"])


# -------------------------
# Create Student
# -------------------------
@router.post("/", response_model=StudentResponse)
def create_student(student: CreateStudent, db: Session = Depends(get_db)):

    new_student = Student(
        name=student.name,
        email=student.email,
        phone=student.phone,
        course_id=student.course_id,
        batch_id=student.batch_id,
        staff_id=student.staff_id
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


# -------------------------
# Get All Students
# -------------------------
@router.get("/", response_model=list[StudentResponse])
def get_students(db: Session = Depends(get_db)):

    students = db.query(Student).all()
    return students


# -------------------------
# Get Single Student
# -------------------------
@router.get("/{id}", response_model=StudentResponse)
def get_student(id: int, db: Session = Depends(get_db)):

    student = db.query(Student).filter(Student.id == id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


# -------------------------
# Update Student
# -------------------------
@router.put("/{id}", response_model=StudentResponse)
def update_student(id: int, student: UpdateStudent, db: Session = Depends(get_db)):

    existing_student = db.query(Student).filter(Student.id == id).first()

    if not existing_student:
        raise HTTPException(status_code=404, detail="Student not found")

    existing_student.name = student.name
    existing_student.email = student.email
    existing_student.phone = student.phone
    existing_student.course_id = student.course_id
    existing_student.batch_id = student.batch_id
    existing_student.staff_id = student.staff_id

    db.commit()
    db.refresh(existing_student)

    return existing_student


# -------------------------
# Delete Student
# -------------------------
@router.delete("/{id}")
def delete_student(id: int, db: Session = Depends(get_db)):

    student = db.query(Student).filter(Student.id == id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()

    return {"message": "Student deleted successfully"}