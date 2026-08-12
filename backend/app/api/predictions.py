from fastapi import APIRouter
from app.schemas.schemas import WhatIfRequest
from app.services.prediction import predict_crowd_and_wait, simulate_what_if

router = APIRouter(prefix="", tags=["Predictions & Simulator"])

@router.get("/businesses/{b_id}/crowd")
def get_business_crowd_prediction(b_id: str):
    return predict_crowd_and_wait(b_id)

@router.get("/businesses/{b_id}/wait-time")
def get_business_wait_time(b_id: str):
    return predict_crowd_and_wait(b_id)

@router.post("/business/simulator")
def run_what_if_simulator(req: WhatIfRequest):
    return simulate_what_if(req.additional_counters, req.additional_staff, req.reduced_service_time)
