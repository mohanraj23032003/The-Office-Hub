from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Staff(Base):

    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    email = Column(String, unique=True)
    phone = Column(String)
    password = Column(String)
    experience = Column(String)
    achievements = Column(String)
    course = Column(String)