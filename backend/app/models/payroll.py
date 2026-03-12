from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base


class Payroll(Base):

    __tablename__ = "payroll"

    id = Column(Integer, primary_key=True, index=True)

    staff_id = Column(Integer, ForeignKey("staff.id"))

    month = Column(String)
    year = Column(Integer)

    gross_salary = Column(Integer)
    net_salary = Column(Integer)

    status = Column(String)

