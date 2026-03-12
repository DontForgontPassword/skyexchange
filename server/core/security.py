from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "SUPER_SECRET_KEY_CHANGE_ME"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(user_id: int) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        ),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
