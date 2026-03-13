from fastapi import FastAPI
from app.database.db import engine, Base
# from app.models import user, staff, student, course, topic, batch, student_attendance, staff_attendance, payroll, leave
from app.routers import student,user_router,admin_router,auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user_router,staff_router,course_router,batch_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create database tables
Base.metadata.create_all(bind=engine)

# include routers
app.include_router(user_router.router)
app.include_router(student.router)
app.include_router(admin_router.router)
app.include_router(auth_router.router)
app.include_router(staff_router.router)
app.include_router(course_router.router)
app.include_router(batch_router.router)


@app.get("/")
def home():
    return {"message": "Welcome To FastAPI"}