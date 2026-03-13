from pydantic import BaseModel
from datetime import time

class CreateBatch(BaseModel):
    batch_name : str
    start_time : time
    end_time : time
    staff_id : int

class UpdateBatch(BaseModel):
    batch_name : str
    start_time : time
    end_time : time
    staff_id : int

class BatchResponse(BaseModel):
    id : int
    batch_name : str
    start_time : time
    end_time : time
    staff_id : int

    class Config:
        from_attributes=True