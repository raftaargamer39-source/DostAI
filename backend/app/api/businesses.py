from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.db import get_db
from app.models.models import BusinessModel
from app.schemas.schemas import BusinessCreate, BusinessUpdate, BusinessResponse

router = APIRouter(prefix="/businesses", tags=["Businesses"])

@router.get("", response_model=List[BusinessResponse])
def list_businesses(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(BusinessModel)
    if category and category != "All":
        query = query.filter(BusinessModel.category == category)
    return query.all()

@router.get("/{b_id}", response_model=BusinessResponse)
def get_business(b_id: str, db: Session = Depends(get_db)):
    business = db.query(BusinessModel).filter(BusinessModel.id == b_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return business

@router.post("", response_model=BusinessResponse)
def create_business(data: BusinessCreate, db: Session = Depends(get_db)):
    new_id = f"b-{data.name.lower().replace(' ', '-')}"
    business = BusinessModel(
        id=new_id,
        name=data.name,
        category=data.category,
        address=data.address,
        rating=data.rating,
        review_count=data.review_count,
        distance_km=data.distance_km,
        image_url=data.image_url or "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
        opening_hours=data.opening_hours,
        current_crowd=data.current_crowd,
        predicted_wait_minutes=data.predicted_wait_minutes,
        avg_price=data.avg_price,
        has_offer=data.has_offer,
        offer_text=data.offer_text
    )
    db.add(business)
    db.commit()
    db.refresh(business)
    return business

@router.put("/{b_id}", response_model=BusinessResponse)
def update_business(b_id: str, data: BusinessUpdate, db: Session = Depends(get_db)):
    business = db.query(BusinessModel).filter(BusinessModel.id == b_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    for field, val in data.model_dump(exclude_unset=True).items():
        setattr(business, field, val)

    db.commit()
    db.refresh(business)
    return business

@router.delete("/{b_id}")
def delete_business(b_id: str, db: Session = Depends(get_db)):
    business = db.query(BusinessModel).filter(BusinessModel.id == b_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    db.delete(business)
    db.commit()
    return {"message": f"Business {b_id} deleted successfully"}
