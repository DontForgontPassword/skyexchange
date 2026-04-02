from pydantic import BaseModel
from .enums import Currency


class BalanceItem(BaseModel):
    value: float
    name: str