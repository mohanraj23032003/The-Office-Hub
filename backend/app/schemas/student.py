from pydantic import BaseModel,EmailStr

class CreateStudent(BaseModel):
    student_name : str
    student_email : EmailStr
    student_phone : str
    course_id : int
    batch_id : int
    staff_id : int

class UpdateStudent(BaseModel):
    student_name : str
    student_email : EmailStr
    student_phone : str
    course_id : int
    batch_id : int
    staff_id : int

class StudentResponse(BaseModel):
    id : int
    student_name : str
    student_email : EmailStr
    student_phone : str
    course_id : int
    batch_id : int
    staff_id : int

    class Config:
        from_attributes = True
