from pydantic import BaseModel
from .enums import Currency


class BalanceSchema(BaseModel):
    currency: Currency
    value: float
    name: str

    class Config:
        from_attributes = True
