from sqlalchemy import Column, Integer, Date, Time, String, ForeignKey
from app.database.db import Base


class StudentAttendance(Base):

    __tablename__ = "student_attendance"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"))

    date = Column(Date)
    status = Column(String)

    marked_by = Column(Integer, ForeignKey("staff.id"))