from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class UserNFT(Base):
    __tablename__ = "user_nfts"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    nft_id = Column(Integer, ForeignKey("nfts.id"), primary_key=True)

    user = relationship("User", back_populates="user_nfts")
    nft = relationship("NFT", back_populates="user_nfts")