from pydantic import BaseModel, EmailStr
from typing import List, Optional

# User Schemas
class UserLogin(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "USER" # USER or BUSINESS

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    budget_limit: float
    max_distance_km: float
    preferred_crowd: str

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    user: UserResponse
    token: str

# Business Schemas
class BusinessCreate(BaseModel):
    name: str
    category: str
    address: str
    rating: Optional[float] = 4.5
    review_count: Optional[int] = 100
    distance_km: Optional[float] = 1.5
    image_url: Optional[str] = None
    opening_hours: Optional[str] = "09:00 AM - 10:00 PM"
    current_crowd: Optional[str] = "Medium"
    predicted_wait_minutes: Optional[int] = 15
    avg_price: Optional[float] = 300.0
    has_offer: Optional[bool] = False
    offer_text: Optional[str] = None

class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    address: Optional[str] = None
    opening_hours: Optional[str] = None
    current_crowd: Optional[str] = None
    predicted_wait_minutes: Optional[int] = None
    avg_price: Optional[float] = None
    has_offer: Optional[bool] = None
    offer_text: Optional[str] = None

class BusinessResponse(BaseModel):
    id: str
    name: str
    category: str
    rating: float
    review_count: int
    distance_km: float
    address: str
    image_url: Optional[str] = None
    opening_hours: str
    current_crowd: str
    predicted_wait_minutes: int
    avg_price: float
    has_offer: bool
    offer_text: Optional[str] = None

    class Config:
        from_attributes = True

# Service Schemas
class ServiceCreate(BaseModel):
    business_id: str
    name: str
    category: str
    price: float
    duration_minutes: Optional[int] = 60
    description: Optional[str] = None

class ServiceResponse(BaseModel):
    id: str
    business_id: str
    name: str
    category: str
    price: float
    duration_minutes: int
    description: Optional[str] = None

    class Config:
        from_attributes = True

# Booking Schemas
class BookingCreate(BaseModel):
    user_id: str = "u-demo-1"
    business_id: str
    business_name: str
    category: str
    date: str
    time: str
    total_price: float
    service_details: str
    seats: Optional[List[str]] = None
    table_id: Optional[str] = None
    parking_slot: Optional[str] = None
    offer_discount: Optional[float] = 0.0

class BookingResponse(BaseModel):
    id: str
    user_id: str
    business_id: str
    business_name: str
    category: str
    date: str
    time: str
    status: str
    total_price: float
    service_details: str
    seats: Optional[str] = None
    table_id: Optional[str] = None
    parking_slot: Optional[str] = None
    offer_discount: Optional[float] = 0.0
    qr_code: str
    created_at: str

    class Config:
        from_attributes = True

# Queue Schemas
class QueueJoinRequest(BaseModel):
    business_id: str
    business_name: str
    user_id: str = "u-demo-1"

class QueueTokenResponse(BaseModel):
    id: str
    token_number: str
    current_serving: str
    business_id: str
    business_name: str
    user_id: str
    people_ahead: int
    estimated_wait_minutes: int
    status: str
    joined_at: str

    class Config:
        from_attributes = True

# Offer Schemas
class OfferCreate(BaseModel):
    business_id: str
    business_name: str
    title: str
    discount_text: str
    discount_value: float
    category: str
    valid_until: str
    min_order: Optional[float] = 500.0
    code: str

class OfferResponse(BaseModel):
    id: str
    business_id: str
    business_name: str
    title: str
    discount_text: str
    discount_value: float
    category: str
    valid_until: str
    min_order: float
    code: str
    is_claimed: bool

    class Config:
        from_attributes = True

# AI & Prediction Schemas
class RecommendationRequest(BaseModel):
    prompt: str
    budget: Optional[float] = 2000.0
    people_count: Optional[int] = 4

class WhatIfRequest(BaseModel):
    additional_counters: int = 2
    additional_staff: int = 1
    reduced_service_time: int = 3
