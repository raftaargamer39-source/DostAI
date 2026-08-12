from fastapi import APIRouter
from app.schemas.schemas import RecommendationRequest
from app.services.recommendation import generate_recommendation

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

@router.post("")
def get_recommendation(req: RecommendationRequest):
    return generate_recommendation(req.prompt, req.budget or 2000.0, req.people_count or 4)
