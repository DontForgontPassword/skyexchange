from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from core.deps import get_current_user
from models.user import User
from services.auth import register_user, login_user
from schemas.user import UserResponse

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(
    username: str,
    email: str,
    password: str,
    db: Session = Depends(get_db),
):
    result = register_user(db, username, email, password)
    if not result:
        raise HTTPException(400, "User exists")

    user, token = result
    return {
        "accessToken": token,
        "user": UserResponse.from_orm(user),
    }


@router.post("/login")
def login(
    email: str,
    password: str,
    db: Session = Depends(get_db),
):
    result = login_user(db, email, password)
    if not result:
        raise HTTPException(401, "Invalid credentials")

    user, token = result
    return {
        "accessToken": token,
        "user": UserResponse.from_orm(user),
    }

@router.get("/me", response_model=UserResponse)
def me(user: User = Depends(get_current_user)):
    return user

@router.post("/avatar", response_model=UserResponse)
def set_avatar(
    payload: dict,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    image = payload.get("image")
    if not image:
        raise HTTPException(400, "Image is required")
    
    user.avatarImage = image
    db.commit()
    db.refresh(user)
    return user