from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import BusinessModel, BookingModel, OfferModel, QueueTokenModel, UserModel
from app.schemas.schemas import LoginRequest, RecommendationRequest, WhatIfRequest
from app.services.prediction import predict_crowd_and_wait, simulate_what_if
from app.services.recommendation import generate_recommendation

router = APIRouter(prefix="/api")

# Auth Endpoints
@router.post("/auth/login")
def login(data: LoginRequest):
    if data.email == "user@dostai.demo" and data.password == "demo123":
        return {"user": {"id": "u-demo-1", "name": "Rahul Sharma", "email": data.email, "role": "USER"}, "token": "demo-token-user"}
    elif data.email == "business@dostai.demo" and data.password == "demo123":
        return {"user": {"id": "b-owner-1", "name": "City Mall Manager", "email": data.email, "role": "BUSINESS"}, "token": "demo-token-business"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Businesses Endpoints
@router.get("/businesses")
def get_businesses(db: Session = Depends(get_db)):
    return db.query(BusinessModel).all()

@router.get("/businesses/{b_id}")
def get_business_by_id(b_id: str, db: Session = Depends(get_db)):
    b = db.query(BusinessModel).filter(BusinessModel.id == b_id).first()
    if not b:
        raise HTTPException(status_code=404, detail="Business not found")
    return b

# Recommendations Endpoint
@router.post("/recommendations")
def get_recommendations(req: RecommendationRequest):
    return generate_recommendation(req.prompt, req.budget or 2000.0, req.people_count or 4)

# Prediction Endpoints
@router.get("/businesses/{b_id}/crowd")
def get_crowd(b_id: str):
    return predict_crowd_and_wait(b_id)

@router.get("/businesses/{b_id}/wait-time")
def get_wait_time(b_id: str):
    return predict_crowd_and_wait(b_id)

# What-If Simulator Endpoint
@router.post("/business/simulator")
def run_simulator(req: WhatIfRequest):
    return simulate_what_if(req.additional_counters, req.additional_staff, req.reduced_service_time)

# Bookings Endpoints
@router.get("/bookings")
def get_bookings(db: Session = Depends(get_db)):
    return db.query(BookingModel).all()

# Offers Endpoints
@router.get("/offers")
def get_offers(db: Session = Depends(get_db)):
    return db.query(OfferModel).all()

# Business Dashboard
@router.get("/business/dashboard")
def get_dashboard_kpis():
    return {
        "today_visitors": 1250,
        "active_bookings": 520,
        "average_wait_minutes": 22,
        "daily_revenue": 48500,
        "offers_claimed": 145
    }
