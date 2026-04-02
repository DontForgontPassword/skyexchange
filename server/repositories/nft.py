from typing import List, Optional
from sqlalchemy.orm import Session

from models.nft import NFT

def list_nfts(db: Session) -> List[NFT]:
    return db.query(NFT).all()


def get_nft(db: Session, nft_id: int) -> Optional[NFT]:
    return db.query(NFT).filter(NFT.id == nft_id).first()
