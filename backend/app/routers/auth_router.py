# routers/auth_router.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/admin-exists")
def admin_exists(db:Session = Depends(get_db)):

    admin = db.query(User).filter(User.role == "admin").first()

    return {"exists": bool(admin)}


@router.post("/login")
def login(email:str, password:str, db:Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return {"message":"User not found"}

    if user.password != password:
        return {"message":"Incorrect password"}

    return {
        "id": user.id,
        "name": user.name,
        "role": user.role
    }