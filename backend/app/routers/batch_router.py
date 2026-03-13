from fastapi import APIRouter,Depends,HTTPException
from app.schemas.batch import CreateBatch,UpdateBatch,BatchResponse
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.batch import Batch


router = APIRouter(prefix="/batch", tags=["batch"])

@router.post("/",response_model=BatchResponse)
def createBatch(batch :CreateBatch,db : Session = Depends(get_db)):
    create_batch = Batch(**batch.dict())
    db.add(create_batch)
    db.commit()
    db.refresh(create_batch)
    return create_batch

@router.get("/",response_model=list[BatchResponse])
def getAllBatch(db : Session = Depends(get_db)):
    return db.query(Batch).all()


@router.get("/{id}",response_model=BatchResponse)
def getBatch(id : int, db : Session = Depends(get_db)):
    get_batch = db.query(Batch).filter(Batch.id == id).first()
    if get_batch:
        return get_batch
    else:
        raise HTTPException(status_code=404, detail="Batch not found")
    
@router.put("/{id}",response_model=BatchResponse)
def updateBatch(id : int ,batch : UpdateBatch, db : Session = Depends(get_db)):
    update_batch = db.query(Batch).filter(Batch.id == id).first()
    if update_batch:
        for key,value in batch.dict().items():
            setattr(update_batch,key,value)
        db.commit()
        db.refresh(update_batch)
        return update_batch
    else:
        raise HTTPException(status_code=404, detail="Batch not found")

@router.delete("/{id}")
def delBatch(id : int , db : Session = Depends(get_db)):
    del_batch = db.query(Batch).filter(Batch.id == id).first()
    if del_batch:
        db.delete(del_batch)
        db.commit()
        return {"message" : "Success",
                "id" : id}
    else:
        raise HTTPException(status_code=404, detail="Batch not found")
    