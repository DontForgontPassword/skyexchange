from pydantic import BaseModel, EmailStr
from typing import Dict, List, Optional
from datetime import datetime

from .nft import NFTSchema
from .game import GameSchema
from .enums import Currency
from .balance import BalanceItem

class AvatarSetRequest(BaseModel):
    imageId: str

class AvatarResponse(BaseModel):
    avatarImage: Optional[str]

class BalanceResponse(BaseModel):
    amount: float
    id: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    avatarImage: Optional[str]

    balances: Dict[str, BalanceItem]

    defaultCurrency: Currency
    nfts: List[NFTSchema]
    game: GameSchema
    createdAt: datetime

    class Config:
        from_attributes = True

