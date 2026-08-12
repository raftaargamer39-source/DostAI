from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
import random
from app.database.db import get_db
from app.models.models import BookingModel
from app.schemas.schemas import BookingCreate, BookingResponse

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.get("", response_model=List[BookingResponse])
def get_all_bookings(user_id: str = "u-demo-1", db: Session = Depends(get_db)):
    return db.query(BookingModel).order_by(BookingModel.created_at.desc()).all()

@router.post("", response_model=BookingResponse)
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    b_id = f"DA-2026-{random.randint(10000, 99999)}"
    booking = BookingModel(
        id=b_id,
        user_id=data.user_id,
        business_id=data.business_id,
        business_name=data.business_name,
        category=data.category,
        date=data.date,
        time=data.time,
        status="Confirmed",
        total_price=data.total_price,
        service_details=data.service_details,
        seats=json.dumps(data.seats) if data.seats else None,
        table_id=data.table_id,
        parking_slot=data.parking_slot,
        offer_discount=data.offer_discount or 0.0,
        qr_code=b_id
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

@router.put("/{b_id}/cancel")
def cancel_booking(b_id: str, db: Session = Depends(get_db)):
    booking = db.query(BookingModel).filter(BookingModel.id == b_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = "Cancelled"
    db.commit()
    db.refresh(booking)
    return {"message": f"Booking {b_id} cancelled", "booking": booking}
