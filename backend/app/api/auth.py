from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import UserModel
from app.schemas.schemas import UserLogin, UserCreate, UserResponse, TokenResponse

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    if data.email == "user@dostai.demo" and data.password == "demo123":
        user = db.query(UserModel).filter(UserModel.email == data.email).first()
        if not user:
            user = UserModel(id="u-demo-1", name="Rahul Sharma", email=data.email, password_hash="hashed", role="USER")
            db.add(user)
            db.commit()
            db.refresh(user)
        return TokenResponse(user=UserResponse.model_validate(user), token="demo-jwt-user-token")

    elif data.email == "business@dostai.demo" and data.password == "demo123":
        user = db.query(UserModel).filter(UserModel.email == data.email).first()
        if not user:
            user = UserModel(id="b-owner-1", name="City Mall Manager", email=data.email, password_hash="hashed", role="BUSINESS")
            db.add(user)
            db.commit()
            db.refresh(user)
        return TokenResponse(user=UserResponse.model_validate(user), token="demo-jwt-business-token")

    # Generic lookup
    user = db.query(UserModel).filter(UserModel.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return TokenResponse(user=UserResponse.model_validate(user), token="demo-jwt-user-token")

@router.post("/register", response_model=UserResponse)
def register(data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(UserModel).filter(UserModel.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = UserModel(
        id=f"u-{data.email.split('@')[0]}",
        name=data.name,
        email=data.email,
        password_hash=data.password,
        role=data.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserResponse.model_validate(new_user)
