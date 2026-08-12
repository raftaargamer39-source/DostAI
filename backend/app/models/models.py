from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.db import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="USER") # USER or BUSINESS
    budget_limit = Column(Float, default=2000.0)
    max_distance_km = Column(Float, default=5.0)
    preferred_crowd = Column(String, default="Low")
    created_at = Column(DateTime, default=datetime.utcnow)

class BusinessModel(Base):
    __tablename__ = "businesses"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False, index=True) # Restaurants, Cinemas, Malls, Hospitals, Salons, Events, Parking, Service Centers
    rating = Column(Float, default=4.5)
    review_count = Column(Integer, default=100)
    distance_km = Column(Float, default=1.5)
    address = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    opening_hours = Column(String, default="09:00 AM - 10:00 PM")
    current_crowd = Column(String, default="Medium") # Low, Medium, High
    predicted_wait_minutes = Column(Integer, default=15)
    tags = Column(Text, default="[]") # JSON string array
    is_demo = Column(Boolean, default=True)
    lat = Column(Float, default=28.5355)
    lng = Column(Float, default=77.3910)
    avg_price = Column(Float, default=300.0)
    has_offer = Column(Boolean, default=False)
    offer_text = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    services = relationship("ServiceModel", back_populates="business", cascade="all, delete-orphan")

class ServiceModel(Base):
    __tablename__ = "business_services"

    id = Column(String, primary_key=True, index=True)
    business_id = Column(String, ForeignKey("businesses.id"), nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    duration_minutes = Column(Integer, default=60)
    description = Column(Text, nullable=True)

    business = relationship("BusinessModel", back_populates="services")

class SeatModel(Base):
    __tablename__ = "seats"

    id = Column(String, primary_key=True, index=True)
    business_id = Column(String, ForeignKey("businesses.id"), nullable=False)
    row = Column(String, nullable=False) # A, B, C
    number = Column(Integer, nullable=False) # 1, 2, 3...
    seat_code = Column(String, nullable=False) # B5
    status = Column(String, default="available") # available, selected, occupied
    price = Column(Float, default=280.0)

class TableModel(Base):
    __tablename__ = "tables"

    id = Column(String, primary_key=True, index=True)
    business_id = Column(String, ForeignKey("businesses.id"), nullable=False)
    table_number = Column(String, nullable=False) # T-01
    capacity = Column(Integer, default=4) # 2, 4, 6
    status = Column(String, default="available") # available, occupied, reserved

class ParkingSlotModel(Base):
    __tablename__ = "parking_slots"

    id = Column(String, primary_key=True, index=True)
    business_id = Column(String, ForeignKey("businesses.id"), nullable=False)
    slot_number = Column(String, nullable=False) # P24
    zone = Column(String, default="Zone A")
    status = Column(String, default="available") # available, occupied, reserved
    hourly_rate = Column(Float, default=40.0)

class BookingModel(Base):
    __tablename__ = "bookings"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    business_id = Column(String, nullable=False)
    business_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    status = Column(String, default="Confirmed") # Pending, Confirmed, Cancelled, Completed
    total_price = Column(Float, nullable=False)
    service_details = Column(Text, nullable=False)
    seats = Column(Text, nullable=True) # JSON list
    table_id = Column(String, nullable=True)
    parking_slot = Column(String, nullable=True)
    offer_discount = Column(Float, default=0.0)
    qr_code = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class QueueTokenModel(Base):
    __tablename__ = "queue_tokens"

    id = Column(String, primary_key=True, index=True)
    token_number = Column(String, nullable=False) # DA-125
    current_serving = Column(String, nullable=False) # DA-109
    business_id = Column(String, nullable=False)
    business_name = Column(String, nullable=False)
    user_id = Column(String, nullable=False)
    people_ahead = Column(Integer, default=10)
    estimated_wait_minutes = Column(Integer, default=15)
    status = Column(String, default="waiting") # waiting, called, completed, cancelled
    joined_at = Column(String, nullable=False)

class OfferModel(Base):
    __tablename__ = "offers"

    id = Column(String, primary_key=True, index=True)
    business_id = Column(String, nullable=False)
    business_name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    discount_text = Column(String, nullable=False) # ₹350 OFF
    discount_value = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    valid_until = Column(String, nullable=False)
    min_order = Column(Float, default=500.0)
    code = Column(String, nullable=False)
    is_claimed = Column(Boolean, default=False)

class NotificationModel(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    time = Column(String, default="Just now")
    type = Column(String, default="system") # booking, queue, offer, system
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class PredictionRecordModel(Base):
    __tablename__ = "prediction_records"

    id = Column(String, primary_key=True, index=True)
    business_id = Column(String, nullable=False, index=True)
    hour = Column(String, nullable=False)
    crowd_level = Column(String, nullable=False)
    crowd_percent = Column(Integer, default=50)
    wait_minutes = Column(Integer, default=15)
    date = Column(String, nullable=False)
