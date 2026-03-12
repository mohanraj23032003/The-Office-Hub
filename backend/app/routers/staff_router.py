from fastapi import APIRouter,Depends
from app.schemas.staff import StaffCreate,StaffResponse,StaffUpdate
from app.database.db import get_db
from sqlalchemy.orm import Session
from app.models.staff import Staff


router = APIRouter(prefix="/staffs", tags=["Staffs"])

@router.post("/", response_model=StaffResponse)
def create_staff(staff: StaffCreate, db: Session = Depends(get_db)):

    new_staff = Staff(**staff.dict())
    db.add(new_staff)
    db.commit()
    db.refresh(new_staff)
    return new_staff

@router.get("/")
def get_staffs(db: Session = Depends(get_db)):
    return db.query(Staff).all()

@router.get("/{id}")
def get_staff(id : int, db : Session = Depends(get_db)):
    getStaff = db.query(Staff).filter(Staff.id == id).first()
    if getStaff:
        return getStaff
    else:
        return "Staff Not Found"
    
@router.put("/{id}")
def update_staff(id : int ,staffUpdate : StaffUpdate, db : Session = Depends(get_db)):
    updateStaff = db.query(Staff).filter(Staff.id == id).first()
    if updateStaff:
        for key,value in staffUpdate.dict().items():
            setattr(updateStaff,key,value)
        db.commit()
        db.refresh(updateStaff)
        return "Staff Updated Succesfully"
    else:
        return "Staff Not Found"

@router.delete("/{id}")
def del_staff(id : int , db : Session = Depends(get_db)):
    delStaff = db.query(Staff).filter(Staff.id == id).first()
    if delStaff:
        db.delete(delStaff)
        db.commit()
        return "Staff Deleted successfully"
    else:
        return "Staff Not Found"

