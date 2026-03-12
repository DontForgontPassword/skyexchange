from sqlalchemy import Column, Integer, String, DateTime, JSON, Enum as SAEnum
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
from .balance import CurrencyEnum


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)

    avatarImage = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)

    defaultCurrency = Column(
        SAEnum(CurrencyEnum),
        nullable=False,
        default=CurrencyEnum.smg,
    )

    game = Column(
        JSON,
        nullable=False,
        default={"score": 0, "rank": 0},
    )

    balances = relationship(
        "Balance",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    nfts = relationship(
        "UserNFT",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    createdAt = Column(DateTime, default=datetime.utcnow)
