from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class UserNFT(Base):
    __tablename__ = "user_nfts"

    id = Column(Integer, primary_key=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )
    server_nft_id = Column(
        Integer,
        ForeignKey("server_nfts.id"),
        nullable=False
    )
    user = relationship("User", back_populates="nfts")
    nft = relationship("ServerNFT")
