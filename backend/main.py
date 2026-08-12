from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import Base, engine
from app.database.seed import seed_db

from app.api.auth import router as auth_router
from app.api.businesses import router as businesses_router
from app.api.services_api import router as services_router
from app.api.recommendations import router as recommendations_router
from app.api.predictions import router as predictions_router
from app.api.bookings import router as bookings_router
from app.api.queues import router as queues_router
from app.api.offers import router as offers_router
from app.api.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DostAI API Service",
    description="Full Backend API for DostAI — AI City Companion",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register All API Routers
app.include_router(auth_router, prefix="/api")
app.include_router(businesses_router, prefix="/api")
app.include_router(services_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")
app.include_router(predictions_router, prefix="/api")
app.include_router(bookings_router, prefix="/api")
app.include_router(queues_router, prefix="/api")
app.include_router(offers_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")

@app.on_event("startup")
def startup_event():
    seed_db()

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "DostAI Full Backend API",
        "tagline": "Your AI Dost for the City.",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
