from sqlalchemy import Column, Integer, String, Time, ForeignKey
from app.database.db import Base

class Batch(Base):

    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    batch_name = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)
    staff_id = Column(Integer, ForeignKey("staff.id"))