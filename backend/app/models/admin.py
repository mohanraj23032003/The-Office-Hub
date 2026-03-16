from sqlalchemy import Column, Integer, String
from app.database.db import Base


class Admin(Base):

    __tablename__ = "admin"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)