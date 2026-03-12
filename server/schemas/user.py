from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

from .balance import BalanceSchema
from .nft import NFTSchema
from .game import GameSchema
from .enums import Currency

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    avatarImage: Optional[str]

    balances: List[BalanceSchema]
    defaultCurrency: Currency
    nfts: List[NFTSchema]
    game: GameSchema
    createdAt: datetime

    class Config:
        from_attributes = True
