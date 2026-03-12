from pydantic import BaseModel
from datetime import date,time

class AttendanceCreate(BaseModel):
    staff_id : int
    date : date
    login_time : time
    logout_time : time
    status : str

class AttendanceUpdate(BaseModel):

    login_time : time
    logout_time : time
    status : str

class AttendanceResponse(BaseModel):
    id : int
    staff_id : int
    date : date
    login_time : time
    logout_time : time
    status : str

    class Config:
        from_attributes = True
        