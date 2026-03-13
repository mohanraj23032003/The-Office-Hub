from pydantic import BaseModel,EmailStr

class CreateStudent(BaseModel):
    name : str
    email : EmailStr
    phone : str
    course_id : int
    batch_id : int
    staff_id : int

class UpdateStudent(BaseModel):
    name : str
    email : EmailStr
    phone : str
    course_id : int
    batch_id : int
    staff_id : int

class StudentResponse(BaseModel):
    id : int
    name : str
    email : EmailStr
    phone : str
    course_id : int
    batch_id : int
    staff_id : int

    class Config:
        from_attributes = True
