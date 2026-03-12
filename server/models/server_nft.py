from sqlalchemy import Column, Integer, String
from database import Base


class ServerNFT(Base):
    __tablename__ = "server_nfts"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
