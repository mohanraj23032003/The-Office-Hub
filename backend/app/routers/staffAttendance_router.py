from fastapi import Depends,APIRouter,HTTPException
from app.schemas.staff_attendance import AttendanceResponse,AttendanceCreate,AttendanceUpdate
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.staff_attendance import StaffAttendance

router = APIRouter(prefix="/StaffAttendance", tags=["StaffAttendance"])


@router.post("/",response_model=AttendanceResponse)
def attendanceCreate(attendance : AttendanceCreate,db : Session = Depends(get_db)):
    createAttendance = StaffAttendance(**attendance.dict())
    db.add(createAttendance)
    db.commit()
    db.refresh(createAttendance)
    return createAttendance 

@router.get("/",response_model=list[AttendanceResponse])
def getAllAttendance(db : Session = Depends(get_db)):
    return db.query(StaffAttendance).all()

@router.get("/{id}",response_model=AttendanceResponse)
def getAttendance(id : int , db : Session = Depends(get_db)):
    get_Attendance = db.query(StaffAttendance).filter(StaffAttendance.id == id).first()
    if get_Attendance:
        return get_Attendance
    else:
        raise HTTPException(status_code=404,detail="Staff Attendance Data not found")

@router.put("/{id}",response_model= AttendanceResponse)
def updateAttendance(id : int,attendance : AttendanceUpdate , db : Session = Depends(get_db)):
    update_Attendance = db.query(StaffAttendance).filter(StaffAttendance.id == id).first()
    if update_Attendance:
        for key,value in attendance.dict().items():
            setattr(update_Attendance,key,value)
        db.commit()
        db.refresh(update_Attendance)
        return update_Attendance
    else:
        raise HTTPException(status_code=404,detail="Staff Attendance not found")


@router.delete("/{id}")
def delAttendance(id : int ,db : Session = Depends(get_db)):
    del_Attendance = db.query(StaffAttendance).filter(StaffAttendance.id == id).first()
    if del_Attendance:
        db.delete(del_Attendance)
        db.commit()
        return f"id : {id} : Attendance Deleted Successfully"
    else:
        raise HTTPException(status_code=404, detail="Attendance Not Found")