from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class NFT(Base):
    __tablename__ = "nfts"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    image = Column(String)

    price = Column(Float)
    rarity = Column(String)
    type = Column(String)

    user_nfts = relationship(
        "UserNFT",
        back_populates="nft",
    )