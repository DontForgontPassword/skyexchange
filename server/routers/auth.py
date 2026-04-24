from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import get_db
from core.security import create_access_token
from core.crypto import hash_password
from models.user import User
from models.balance import Balance, CurrencyEnum

from schemas.auth import RegisterRequest, LoginRequest
from services import auth

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/register")
def register(
    payload: RegisterRequest,  db: Session = Depends(get_db)
):
    return auth.register(payload, db)


@router.post("/logout")
def logout():
    return auth.logout()


@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    return auth.login(payload, response, db)
