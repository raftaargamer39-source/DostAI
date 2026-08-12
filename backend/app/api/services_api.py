from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.db import get_db
from app.models.models import ServiceModel
from app.schemas.schemas import ServiceCreate, ServiceResponse

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("/business/{b_id}", response_model=List[ServiceResponse])
def list_services_for_business(b_id: str, db: Session = Depends(get_db)):
    return db.query(ServiceModel).filter(ServiceModel.business_id == b_id).all()

@router.post("", response_model=ServiceResponse)
def create_service(data: ServiceCreate, db: Session = Depends(get_db)):
    srv_id = f"s-{data.name.lower().replace(' ', '-')}"
    srv = ServiceModel(
        id=srv_id,
        business_id=data.business_id,
        name=data.name,
        category=data.category,
        price=data.price,
        duration_minutes=data.duration_minutes or 60,
        description=data.description
    )
    db.add(srv)
    db.commit()
    db.refresh(srv)
    return srv

@router.delete("/{s_id}")
def delete_service(s_id: str, db: Session = Depends(get_db)):
    srv = db.query(ServiceModel).filter(ServiceModel.id == s_id).first()
    if not srv:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(srv)
    db.commit()
    return {"message": f"Service {s_id} deleted"}
