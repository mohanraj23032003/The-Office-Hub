from sqlalchemy import Column, Integer, String, ForeignKey
from database.db import Base

class Student(Base):

    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    email = Column(String)
    phone = Column(String)

    course_id = Column(Integer, ForeignKey("courses.id"))
    batch_id = Column(Integer, ForeignKey("batches.id"))
    staff_id = Column(Integer, ForeignKey("staff.id"))