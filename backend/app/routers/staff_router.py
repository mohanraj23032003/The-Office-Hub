from fastapi import APIRouter,Depends,HTTPException
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

@router.get("/",response_model=list[StaffResponse])
def get_staffs(db: Session = Depends(get_db)):
    return db.query(Staff).all()

@router.get("/{id}",response_model=StaffResponse)
def get_staff(id : int, db : Session = Depends(get_db)):
    getStaff = db.query(Staff).filter(Staff.id == id).first()
    if getStaff:
        return getStaff
    else:
        raise HTTPException(status_code=404, detail="Staff not found")
    
@router.put("/{id}",response_model=StaffResponse)
def update_staff(id : int ,staffUpdate : StaffUpdate, db : Session = Depends(get_db)):
    updateStaff = db.query(Staff).filter(Staff.id == id).first()
    if updateStaff:
        for key,value in staffUpdate.dict().items():
            setattr(updateStaff,key,value)
        db.commit()
        db.refresh(updateStaff)
        return updateStaff
    else:
        raise HTTPException(status_code=404, detail="Staff not found")

@router.delete("/{id}")
def del_staff(id : int , db : Session = Depends(get_db)):
    delStaff = db.query(Staff).filter(Staff.id == id).first()
    if delStaff:
        db.delete(delStaff)
        db.commit()
        return "Staff Deleted successfully"
    else:
        raise HTTPException(status_code=404, detail="Staff not found")

