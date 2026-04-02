from enum import Enum
from sqlalchemy import Column, Float, ForeignKey, Integer, String, Enum as SAEnum
from sqlalchemy.orm import relationship
from database import Base


class CurrencyEnum(Enum):
    btc = "btc"
    eth = "eth"
    sol = "sol"
    smg = "smg"

class Balance(Base):
    __tablename__ = "balances"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    currency = Column(SAEnum(CurrencyEnum), nullable=False)
    value = Column(Float, default=0.0)
    name = Column(String, nullable=False, default="")

    user = relationship("User", back_populates="balances")
