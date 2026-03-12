from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Course(Base):

    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String)
    duration = Column(String)
    description = Column(String)

