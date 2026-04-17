from fastapi import Request, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from core.crypto import hash_password, verify_password
from core.security import create_access_token
from models.balance import Balance, CurrencyEnum
from models.user import User
from schemas.auth import LoginRequest, RegisterRequest


def auth_response(result, error_message: str, status_code: int):
    if not result:
        return {
            "success": False,
            "error": error_message,
        }

    user, token = result

    return {
        "accessToken": token,
        "user": user.to_dict(),
        "success": True,
    }


def register(payload: RegisterRequest,
             db: Session):
    username = payload.username
    email = payload.email
    password = payload.password

    exists = db.query(User).filter(
        (User.username == username) | (User.email == email)
    ).first()

    if exists:
        return JSONResponse(
            status_code=400,
            content={
                "message": "User already exists",
                "success": False
            },
        )

    user = User(
        username=username,
        email=email,
        password_hash=hash_password(password),
        defaultCurrency=CurrencyEnum.smg,
        balances=[
            Balance(currency=c, value=10000.0, name=c.value)
            for c in CurrencyEnum
        ],
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    return auth_response((user, token), "Registration failed", 400)


def login(payload: LoginRequest,
          response: Response,
          db: Session):
    email = payload.email
    password = payload.password

    user = db.query(User).filter(User.email == email).first()
    if not user:
        return JSONResponse(
            status_code=400,
            content={
                "message": "Incorrect password or email",
                "success": False
            },
        )

    if not verify_password(password, user.password_hash):
        return JSONResponse(
            status_code=400,
            content={
                "message": "Incorrect password or email",
                "success": False
            },
        )

    token = create_access_token(user.id)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
    )
    return auth_response((user, token), "Login failed", 401)


def logout(request: Request, response: Response):
    token = request.cookies.get("access_token")

    if not token:
        return JSONResponse(
            status_code=400,
            content={"success": False, "message": "No token found"}
        )

    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
    )

    return JSONResponse(
        status_code=200,
        content={"success": True, "message": "Logged out"}
    )
