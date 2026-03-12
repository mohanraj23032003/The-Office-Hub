from pydantic import BaseModel


class CreatePayroll(BaseModel):
    staff_id : int
    month : str
    year : int
    gross_salary : int
    net_salary : int
    status : str


class UpdatePayroll(BaseModel):
    status : str


class PayrollResponse(BaseModel):
    id : int
    staff_id : int
    month : str
    year : int
    gross_salary : int
    net_salary : int
    status : str

    class Config:
        from_attributes = True
