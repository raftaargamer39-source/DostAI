from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import random
from datetime import datetime
from app.database.db import get_db
from app.models.models import QueueTokenModel
from app.schemas.schemas import QueueJoinRequest, QueueTokenResponse

router = APIRouter(prefix="/queues", tags=["Virtual Queue"])

@router.post("/join", response_model=QueueTokenResponse)
def join_queue(req: QueueJoinRequest, db: Session = Depends(get_db)):
    token_num = f"DA-{random.randint(115, 160)}"
    current_serving = "DA-109"
    q_id = f"qt-{random.randint(100, 999)}"

    token = QueueTokenModel(
        id=q_id,
        token_number=token_num,
        current_serving=current_serving,
        business_id=req.business_id,
        business_name=req.business_name,
        user_id=req.user_id,
        people_ahead=14,
        estimated_wait_minutes=18,
        status="waiting",
        joined_at=datetime.now().strftime("%H:%M PM")
    )
    db.add(token)
    db.commit()
    db.refresh(token)
    return token

@router.post("/next")
def advance_queue(b_id: str = "b-cinemax", db: Session = Depends(get_db)):
    token = db.query(QueueTokenModel).filter(QueueTokenModel.business_id == b_id).first()
    if not token:
        raise HTTPException(status_code=404, detail="No active queue for this business")

    curr_val = int(token.current_serving.replace("DA-", "")) + 1
    token.current_serving = f"DA-{curr_val}"
    token.people_ahead = max(0, token.people_ahead - 1)
    token.estimated_wait_minutes = max(2, token.estimated_wait_minutes - 2)
    if token.people_ahead == 0:
        token.status = "called"

    db.commit()
    db.refresh(token)
    return token

@router.post("/leave")
def leave_queue(q_id: str, db: Session = Depends(get_db)):
    token = db.query(QueueTokenModel).filter(QueueTokenModel.id == q_id).first()
    if token:
        db.delete(token)
        db.commit()
    return {"message": "Left queue successfully"}
