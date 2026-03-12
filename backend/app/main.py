from fastapi import FastAPI
from app.database.db import engine, Base
from app.models import user, staff, student, course, topic, batch, student_attendance, staff_attendance, payroll, leave
from app.routers import user_router

app = FastAPI()

# create database tables
Base.metadata.create_all(bind=engine)

# include routers
app.include_router(user_router.router)

@app.get("/")
def home():
    return {"message": "Welcome To FastAPI"}