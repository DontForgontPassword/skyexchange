from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.deps import get_current_user
from database import get_db
from models.user import User
from schemas.user import AvatarSetRequest, EditProfileRequest
import services.user as user_service

router = APIRouter(prefix="/api/user", tags=["User"])


@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return user_service.me(user)


@router.post("/avatar")
def set_avatar(
    payload: AvatarSetRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return user_service.set_avatar(payload, db, user)


@router.get("/balance")
def get_balance(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_service.get_balance(user, db)


@router.post("/edit")
def edit_profile(
    payload: EditProfileRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_service.edit_profile(payload, user, db)