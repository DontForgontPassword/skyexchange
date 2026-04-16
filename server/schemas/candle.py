from pydantic import BaseModel

class CandleSchema(BaseModel):
    timestamp: int
    open: float
    high: float
    low: float
    close: float
    volume: float

    class Config:
        from_attributes = True