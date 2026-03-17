from sqlalchemy import Column,Integer,Boolean,ForeignKey
from app.database.db import Base

class TopicProgress(Base):

    __tablename__ = "topic_progress"

    id = Column(Integer,primary_key=True,index=True)
    topic_id = Column(Integer,ForeignKey("course_topics.id"))
    batch_id = Column(Integer)
    completed = Column(Boolean,default=False)