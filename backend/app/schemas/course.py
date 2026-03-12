from pydantic import BaseModel



class CreateCourse(BaseModel):
    course_name : str
    duration : str
    description : str

class CourseUpdate(BaseModel):
    course_name : str
    duration : str
    description : str


class CourseResponse(BaseModel):
    id : int
    course_name : str
    duration : str
    description : str

    class Config:
        from_attributes = True