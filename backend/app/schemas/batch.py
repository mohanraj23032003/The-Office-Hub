from pydantic import BaseModel
from datetime import time

class CreateBatch(BaseModel):
    batch_name : str
    start_time : time
    end_time : time

class UpdateBatch(BaseModel):
    batch_name : str
    start_time : time
    end_time : time

class BatchResponse(BaseModel):
    id : int
    batch_name : str
    start_time : time
    end_time : time

    class Config:
        from_attributes=True