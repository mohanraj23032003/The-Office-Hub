from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import engine, Base
# from app.models import user, staff, student, course, topic, batch, student_attendance, staff_attendance, payroll, leave
from app.routers import admins_router,course_router,batch_router,admin_router,auth_router,student_router,staff_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(admins_router.router)
app.include_router(admin_router.router)
app.include_router(auth_router.router)
app.include_router(course_router.router)
app.include_router(batch_router.router)
app.include_router(student_router.router)
app.include_router(staff_router.router)

# create database tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Welcome To FastAPI"}