from pydantic import BaseModel
from datetime import date

class CreateLeave(BaseModel):
    staff_id : int
    staff_date : date
    end_date : date
    reason : str
    status : str


class UpdateLeave(BaseModel):
    staff_id : int
    staff_date : date
    end_date : date
    reason : str
    status : str

class LeaveResponse(BaseModel):
    id : int
    staff_id : int
    staff_date : date
    end_date : date
    reason : str
    status : str


    class Config:
        from_attributes : True


