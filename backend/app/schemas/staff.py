from pydantic import BaseModel,EmailStr
from datetime import date



class StaffCreate(BaseModel):
    name : str
    email : EmailStr
    designation : str
    phone : str
    join_date : date

class StaffUpdate(BaseModel):
    name : str
    designation : str
    phone : str

class StaffResponse(BaseModel):
    id : int
    name : str
    email : EmailStr
    designation : str
    phone : str
    join_date : date

    class Config:
        from_attributes = True
 