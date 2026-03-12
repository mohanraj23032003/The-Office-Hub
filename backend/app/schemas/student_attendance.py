from pydantic import BaseModel
from datetime import date

class CreateAttendance(BaseModel):
    student_id : int
    date : date
    status : str
    marked_by : int

class UpdateAttendance(BaseModel):
    status : str
    marked_by : int

class AttendanceResponse(BaseModel):
    id : int
    student_id : int
    date : date
    status : str
    marked_by : int

    class Config:
        from_attributes = True