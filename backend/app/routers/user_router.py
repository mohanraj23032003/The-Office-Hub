from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.user import User
from app.schemas.user import CreateUser, UserResponse

router = APIRouter(prefix="/users", tags=["Users"])



# ----------------------------------------
# User Details
#-----------------------------------------

@router.post("/", response_model=UserResponse)
def create_user(user: CreateUser, db: Session = Depends(get_db)):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.delete("/{id}")
def delete_user(id: int, db: Session = Depends(get_db)):
    db_query = db.query(User).filter(User.id == id).first()

    if db_query:
        db.delete(db_query)
        db.commit()
        return {"message": "User deleted successfully"}
    else:
        return {"message": "User not found"}