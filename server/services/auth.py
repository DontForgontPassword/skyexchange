from sqlalchemy.orm import Session
from models.user import User
from models.balance import Balance, CurrencyEnum
from core.security import create_access_token
import hashlib
import bcrypt

def hash_password(password: str) -> str:
    sha = hashlib.sha256(password.encode()).digest()
    return bcrypt.hashpw(sha, bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    sha = hashlib.sha256(password.encode()).digest()
    return bcrypt.checkpw(sha, hashed.encode())


def register_user(
    db: Session,
    username: str,
    email: str,
    password: str,
):
    exists = db.query(User).filter(
        (User.username == username) | (User.email == email)
    ).first()

    if exists:
        return None

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
    return user, token


def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    token = create_access_token(user.id)
    return user, token
