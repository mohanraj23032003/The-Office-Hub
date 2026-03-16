from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from app.routers import staff_router,course_router,batch_router,student_router,admins_router,admin_router,auth_router,staffAttendance_router

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
app.include_router(auth_router.router)
app.include_router(course_router.router)
app.include_router(batch_router.router)
app.include_router(student_router.router)
app.include_router(staff_router.router)

# create database tables
Base.metadata.create_all(bind=engine)
app.include_router(staffAttendance_router.router)


@app.get("/")
def home():
    return {"message": "Welcome To FastAPI"}