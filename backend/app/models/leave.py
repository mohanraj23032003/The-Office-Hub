from sqlalchemy import Column, Integer, Date, String, ForeignKey
from app.database.db import Base


class LeaveRequest(Base):

    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)

    staff_id = Column(Integer, ForeignKey("staff.id"))

    start_date = Column(Date)
    end_date = Column(Date)

    reason = Column(String)
    status = Column(String)