from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, JSON, Enum as SAEnum, Table
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
from .balance import CurrencyEnum
from models.user_nft import UserNFT

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
        default=lambda: {"score": 0, "rank": 0},
    )

    balances = relationship(
        "Balance",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    user_nfts = relationship(
        "UserNFT",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    createdAt = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "avatarImage": self.avatarImage,
            "defaultCurrency": self.defaultCurrency.value,
            "game": self.game,
            "balances": self._balances_dict(),
            "nfts": self._nfts_list(),
            "createdAt": self.createdAt.isoformat() if self.createdAt else None,
        }

    def _balances_dict(self):
        result = {
            currency.value: {
                "value": 0.0,
                "name": ""
            }
            for currency in CurrencyEnum
        }

        for balance in self.balances:
            result[balance.currency.value] = {
                "value": balance.value,
                "name": balance.name
            }

        return result

    def _nfts_list(self):
        return [
            {
                "id": rel.nft.id,
                "name": rel.nft.name,
                "image": rel.nft.image,
            }
            for rel in self.user_nfts
            if rel.nft is not None
        ]