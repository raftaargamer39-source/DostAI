from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import BookingModel, OfferModel, BusinessModel

router = APIRouter(prefix="/business/dashboard", tags=["Business Dashboard"])

@router.get("")
def get_business_kpis(b_id: str = "b-city-mall", db: Session = Depends(get_db)):
    booking_count = db.query(BookingModel).count()
    offer_count = db.query(OfferModel).filter(OfferModel.is_claimed == True).count()

    return {
        "today_visitors": 1250,
        "active_bookings": booking_count + 520,
        "average_wait_minutes": 22,
        "daily_revenue": 48500.0,
        "offers_claimed": offer_count + 145,
        "hourly_visitor_data": [
            {"hour": "10 AM", "visitors": 65, "revenue": 4200},
            {"hour": "12 PM", "visitors": 140, "revenue": 9800},
            {"hour": "02 PM", "visitors": 85, "revenue": 5400},
            {"hour": "04 PM", "visitors": 110, "revenue": 7600},
            {"hour": "06 PM", "visitors": 220, "revenue": 15400},
            {"hour": "08 PM", "visitors": 190, "revenue": 13200},
            {"hour": "10 PM", "visitors": 90, "revenue": 6100},
        ]
    }
