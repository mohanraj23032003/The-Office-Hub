from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.auth.hash import get_password_hash
from app.database.db import get_db
from app.models.staff import Staff
from app.schemas.staff import StaffCreate, StaffResponse

router = APIRouter(prefix="/staff", tags=["Staff"])


# -------------------------
# Create Staff
# -------------------------
@router.post("/", response_model=StaffResponse)
def create_staff(staff: StaffCreate, db: Session = Depends(get_db)):

    hashed_password = get_password_hash(staff.password)

    new_staff = Staff(
        name=staff.name,
        email=staff.email,
        phone=staff.phone,
        password=hashed_password,
        experience=staff.experience,
        achievements=staff.achievements,
        course=staff.course
    )

    db.add(new_staff)
    db.commit()
    db.refresh(new_staff)

    return new_staff


# -------------------------
# Get Staff (Search + Pagination)
# -------------------------
@router.get("/", response_model=list[StaffResponse])
def get_staff(
    search: str = "",
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):

    query = db.query(Staff)

    if search:
        query = query.filter(
            or_(
                Staff.name.ilike(f"%{search}%"),
                Staff.email.ilike(f"%{search}%"),
                Staff.course.ilike(f"%{search}%")
            )
        )

    staff = query.offset((page-1)*limit).limit(limit).all()

    return staff


# -------------------------
# Get Staff by ID
# -------------------------
@router.get("/{id}", response_model=StaffResponse)
def get_staff_by_id(id: int, db: Session = Depends(get_db)):

    staff = db.query(Staff).filter(Staff.id == id).first()

    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    return staff


# -------------------------
# Update Staff
# -------------------------
@router.put("/{id}", response_model=StaffResponse)
def update_staff(id: int, staff: StaffCreate, db: Session = Depends(get_db)):

    existing_staff = db.query(Staff).filter(Staff.id == id).first()

    if not existing_staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    existing_staff.name = staff.name
    existing_staff.email = staff.email
    existing_staff.phone = staff.phone
    existing_staff.experience = staff.experience
    existing_staff.achievements = staff.achievements
    existing_staff.course = staff.course

    db.commit()
    db.refresh(existing_staff)

    return existing_staff


# -------------------------
# Delete Staff
# -------------------------
@router.delete("/{id}")
def delete_staff(id: int, db: Session = Depends(get_db)):

    staff = db.query(Staff).filter(Staff.id == id).first()

    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")

    db.delete(staff)
    db.commit()

    return {"message": "Staff deleted successfully"}