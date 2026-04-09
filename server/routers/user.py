from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from core.deps import get_current_user
from models.user import User
from schemas.user import AvatarResponse, AvatarSetRequest, BalanceResponse, UserResponse
from database import get_db
from models.balance import Balance

router = APIRouter(prefix="/api/user", tags=["User"])

@router.get("/me", response_model=UserResponse)
def me(user: User = Depends(get_current_user)):
    return user.to_dict()

@router.post("/avatar")
def set_avatar(
    payload: AvatarSetRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    image = payload.avatarImage
    if not image:
        raise HTTPException(400, "Image is required")
    
    user.avatarImage = image
    db.commit()
    db.refresh(user)
    return JSONResponse(status_code=200, content={
        "success": True
    })

@router.get("/avatar", response_class=AvatarResponse)
def get_avatar(user: User = Depends(get_current_user)):
    return AvatarResponse(avatarImage=user.avatarImage)

@router.get("/balance", response_model=BalanceResponse)
def get_balance(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    id: str = "smg"
):
    balance = (
        db.query(Balance)
        .filter(Balance.user_id == user.id, Balance.currency == id)
        .first()
    )

    amount = balance.value if balance else 0

    return {
        "amount": amount,
        "id": id.upper(),
    }