from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base

class CourseTopic(Base):

    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))

    title = Column(String)
    description = Column(String)
    order_no = Column(Integer)