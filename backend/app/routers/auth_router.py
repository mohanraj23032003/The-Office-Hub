from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.admin import Admin
from app.models.staff import Staff
from app.models.student import Student

from app.auth.hash import verify_password
from app.auth.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):

    email = data.get("email")
    password = data.get("password")

    # -------------------
    # check admin
    # -------------------

    admin = db.query(Admin).filter(Admin.email == email).first()

    if admin and verify_password(password, admin.password):

        token = create_access_token({
            "sub": admin.email,
            "role": "admin"
        })

        return {
            "access_token": token,
            "role": "admin"
        }

    # -------------------
    # check staff
    # -------------------

    staff = db.query(Staff).filter(Staff.email == email).first()

    if staff and verify_password(password, staff.password):

        token = create_access_token({
            "sub": staff.email,
            "role": "staff"
        })

        return {
            "access_token": token,
            "role": "staff"
        }

    # -------------------
    # check student
    # -------------------

    student = db.query(Student).filter(Student.email == email).first()

    if student and verify_password(password, student.password):

        token = create_access_token({
            "sub": student.email,
            "role": "student"
        })

        return {
            "access_token": token,
            "role": "student"
        }

    raise HTTPException(status_code=401, detail="Invalid credentials")