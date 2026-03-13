from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.course import Course
from app.schemas.course import CreateCourse,CourseResponse,CourseUpdate



router = APIRouter(prefix="/course", tags=["course"])

@router.post("/",response_model=CourseResponse)
def createCourse(course : CreateCourse,db:Session = Depends(get_db)):
    create_course = Course(**course.dict())
    db.add(create_course)
    db.commit()
    db.refresh(create_course)
    return create_course


@router.get("/",response_model=list[CourseResponse])
def getallCourse(db : Session = Depends(get_db)):
    return db.query(Course).all()


@router.get("/{id}",response_model=CourseResponse)
def getCourse(id : int , db : Session =  Depends(get_db)):
    get_Course = db.query(Course).filter(Course.id == id).first()
    if get_Course:
        return get_Course
    else:
        raise HTTPException(status_code=404, detail="Course not found")

@router.put("/{id}",response_model=CourseResponse)
def updateCourse(id : int ,course : CourseUpdate,db : Session = Depends(get_db)):
    update_course = db.query(Course).filter(Course.id == id).first()
    if update_course:
        for key,value in course.dict().items():
            setattr(update_course,key,value)
        db.commit()
        db.refresh(update_course)
        return update_course
    else:
        raise HTTPException(status_code=404, detail="Course not found")
    
@router.delete("/{id}")
def deleteCourse(id : int, db : Session = Depends(get_db)):
    del_course = db.query(Course).filter(Course.id == id).first()
    if del_course:
        db.delete(del_course)
        db.commit()
        return "Course Deleted Successfully"
    else:
        raise HTTPException(status_code=404, detail="Course not found") 
    






