from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from core.deps import get_current_user
from models.user import User
from schemas.game import SaveScoreRequest
from services import game as game_service

router = APIRouter(prefix="/api/game", tags=["Game"])


@router.post("/save-score")
def save_score(
    payload: SaveScoreRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return game_service.save_score(payload, user, db)


@router.get("/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):
    return game_service.get_leaderboard(db)
