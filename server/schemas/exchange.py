from pydantic import BaseModel


class TradeRequest(BaseModel):
    coin_id: str
    amount: float
    action: str
