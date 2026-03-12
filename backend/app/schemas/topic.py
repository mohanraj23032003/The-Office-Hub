from pydantic import BaseModel


class CreateTopic(BaseModel):
    course_id : int
    module_name : str
    topic_name : str

class UpdateTopic(BaseModel):
    module_name : str
    topic_name : str

class TopicResponse(BaseModel):
    id : int
    course_id : int
    module_name : str
    topic_name : str

    class Config:
        from_attributes = True