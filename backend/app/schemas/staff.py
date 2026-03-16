from pydantic import BaseModel, EmailStr

class StaffCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    experience: str
    achievements: str
    course: str


class StaffResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str
    experience: str
    achievements: str
    course: str

    class Config:
        from_attributes = True