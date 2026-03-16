from pydantic import BaseModel, EmailStr


class CreateAdmin(BaseModel):
    name: str
    email: EmailStr
    password: str


class UpdateAdmin(BaseModel):
    name: str
    email: EmailStr
    password: str


class AdminResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True