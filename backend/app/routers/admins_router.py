from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.admin import Admin
from app.schemas.admin import CreateAdmin, UpdateAdmin, AdminResponse
from app.auth.hash import get_password_hash

router = APIRouter(prefix="/admin", tags=["Admin"])


# Create Admin
@router.post("/", response_model=AdminResponse)
def create_admin(admin: CreateAdmin, db: Session = Depends(get_db)):

    existing = db.query(Admin).filter(Admin.email == admin.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_admin = Admin(
        name=admin.name,
        email=admin.email,
        password=get_password_hash(admin.password)
    )

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return new_admin


# Get All Admins
@router.get("/", response_model=list[AdminResponse])
def get_admins(db: Session = Depends(get_db)):

    return db.query(Admin).all()


# Get Single Admin
@router.get("/{id}", response_model=AdminResponse)
def get_admin(id: int, db: Session = Depends(get_db)):

    admin = db.query(Admin).filter(Admin.id == id).first()

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    return admin


# Update Admin
@router.put("/{id}", response_model=AdminResponse)
def update_admin(id: int, admin: UpdateAdmin, db: Session = Depends(get_db)):

    existing = db.query(Admin).filter(Admin.id == id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Admin not found")

    existing.name = admin.name
    existing.email = admin.email

    if admin.password:
        existing.password = get_password_hash(admin.password)

    db.commit()
    db.refresh(existing)

    return existing


# Delete Admin
@router.delete("/{id}")
def delete_admin(id: int, db: Session = Depends(get_db)):

    admin = db.query(Admin).filter(Admin.id == id).first()

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    db.delete(admin)
    db.commit()

    return {"message": "Admin deleted successfully"}