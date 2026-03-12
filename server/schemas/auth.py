from pydantic import BaseModel, EmailStr
from typing import Optional
from .user import UserResponse

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterResponse(BaseModel):
    status: bool
    message: Optional[str] = None
    user: Optional[UserResponse] = None
