from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base

class Topic(Base):

    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))

    module_name = Column(String)
    topic_name = Column(String)
