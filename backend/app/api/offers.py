from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.db import get_db
from app.models.models import OfferModel
from app.schemas.schemas import OfferCreate, OfferResponse

router = APIRouter(prefix="/offers", tags=["Offers"])

@router.get("", response_model=List[OfferResponse])
def get_offers(db: Session = Depends(get_db)):
    return db.query(OfferModel).all()

@router.post("", response_model=OfferResponse)
def create_offer(data: OfferCreate, db: Session = Depends(get_db)):
    off_id = f"off-{data.code.lower()}"
    offer = OfferModel(
        id=off_id,
        business_id=data.business_id,
        business_name=data.business_name,
        title=data.title,
        discount_text=data.discount_text,
        discount_value=data.discount_value,
        category=data.category,
        valid_until=data.valid_until,
        min_order=data.min_order or 500.0,
        code=data.code,
        is_claimed=False
    )
    db.add(offer)
    db.commit()
    db.refresh(offer)
    return offer

@router.post("/{off_id}/claim")
def claim_offer(off_id: str, db: Session = Depends(get_db)):
    offer = db.query(OfferModel).filter(OfferModel.id == off_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    offer.is_claimed = True
    db.commit()
    db.refresh(offer)
    return offer

@router.delete("/{off_id}")
def delete_offer(off_id: str, db: Session = Depends(get_db)):
    offer = db.query(OfferModel).filter(OfferModel.id == off_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    db.delete(offer)
    db.commit()
    return {"message": f"Offer {off_id} deleted"}
