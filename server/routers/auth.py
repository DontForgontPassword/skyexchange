from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from core.security import create_access_token
from services.crypto import hash_password, verify_password
from models.user import User
from models.balance import Balance, CurrencyEnum

from schemas.user import UserResponse
from schemas.auth import RegisterRequest, LoginRequest

router = APIRouter(prefix="/api/auth", tags=["Auth"])


def auth_response(result, error_message: str, status_code: int):
    if not result:
        raise HTTPException(status_code=status_code, detail=error_message)

    user, token = result
    return {
        "accessToken": token,
        "user": user.to_dict(),
    }


@router.post("/register")
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db),
):
    username = payload.username
    email = payload.email
    password = payload.password

    exists = db.query(User).filter(
        (User.username == username) | (User.email == email)
    ).first()

    if exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password),
        defaultCurrency=CurrencyEnum.smg,
        balances=[
            Balance(currency=c, value=0.0, name=c.value)
            for c in CurrencyEnum
        ],
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return auth_response((user, token), "Registration failed", 400)


@router.post("/login")
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),
):
    email = payload.email
    password = payload.password

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    if not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(user.id)
    return auth_response((user, token), "Login failed", 401)