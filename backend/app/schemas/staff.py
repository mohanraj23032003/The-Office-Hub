from pydantic import BaseModel,EmailStr
from datetime import date



class StaffCreate(BaseModel):
    staff_name : str
    staff_email : EmailStr
    staff_designation : str
    phone : str
    joining_date : date

class StaffUpdate(BaseModel):
    staff_name : str
    staff_designation : str
    phone : str

class StaffResponse(BaseModel):
    id : int
    staff_name : str
    staff_email : EmailStr
    staff_designation : str
    phone : str
    joining_date : date

    class Config:
        from_attributes = True
 