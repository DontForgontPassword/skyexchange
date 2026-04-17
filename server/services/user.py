from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from models.user import User
from models.balance import Balance


def me(user: User):
    return user.to_dict()


def set_avatar(payload, db: Session, user: User):
    image = payload.avatarImage

    if not image:
        raise HTTPException(400, "Image is required")

    user.avatarImage = image
    db.commit()
    db.refresh(user)

    return {"success": True}


def get_balance(user: User, db: Session, currency: str = "smg"):
    balance = (
        db.query(Balance)
        .filter(Balance.user_id == user.id, Balance.currency == currency)
        .first()
    )

    amount = balance.value if balance else 0

    return {
        "amount": amount,
        "id": currency.upper(),
    }


def edit_profile(payload, user: User, db: Session):
    user.username = payload.username
    user.email = payload.email

    db.commit()
    db.refresh(user)

    return {
        "status": True,
        "username": user.username,
        "email": user.email,
    }