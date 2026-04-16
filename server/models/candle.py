from sqlalchemy import Column, Integer, Float, String, BigInteger
from database import Base

class PriceCandle(Base):
    __tablename__ = "price_candles"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(20), index=True)  # BTC, ETH etc

    timestamp = Column(BigInteger, index=True)

    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Float)