from sqlalchemy import Column, Integer, Date, Time, String, ForeignKey
from app.database.db import Base


class StaffAttendance(Base):

    __tablename__ = "staff_attendance"

    id = Column(Integer, primary_key=True, index=True)

    staff_id = Column(Integer, ForeignKey("staff.id"))

    date = Column(Date)
    login_time = Column(Time)
    logout_time = Column(Time)

    status = Column(String)

