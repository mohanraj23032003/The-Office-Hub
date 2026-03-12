from sqlalchemy import Column, Integer, String, Date
from app.database.db import Base

class Staff(Base):

    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    phone = Column(String)
    designation = Column(String)
    join_date = Column(Date)

