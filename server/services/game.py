import os
from sqlalchemy.orm import Session
from models.user import User
import hashlib

GAME_SECRET = os.getenv("GAME_SECRET")

def save_score(payload, user: User, db: Session):
    data_to_hash = f"{payload.score}{GAME_SECRET}"
    expected_hash = hashlib.sha256(data_to_hash.encode()).hexdigest()
    
    if payload.validation_hash != expected_hash:
        return {"success": False, "error": "Invalid score verification"}

    current_game_data = user.game or {"score": 0, "rank": 0}
    
    if not isinstance(current_game_data, dict):
        current_game_data = {"score": 0, "rank": 0}

    is_new_high_score = payload.score > current_game_data.get("score", 0)

    if is_new_high_score:
        user.game = {
            "score": payload.score,
            "rank": current_game_data.get("rank", 0)
        }
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "success": True,
        "new_high_score": is_new_high_score,
    }


def get_leaderboard(db: Session):
    users = db.query(User).all()

    leaderboard = []
    for user in users:
        score = 0
        if user.game and isinstance(user.game, dict):
            score = user.game.get("score", 0)

        if score == 0:
            continue

        leaderboard.append(
            {"username": user.username, "score": score, "avatarImage": user.avatarImage}
        )

    leaderboard.sort(key=lambda x: x["score"], reverse=True)

    return leaderboard[:10]
