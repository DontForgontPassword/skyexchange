from typing import List
from sqlalchemy.orm import Session

from models.user_nft import UserNFT

def list_user_nft_ids(db: Session, user_id: int) -> List[int]:
    rows = db.query(UserNFT.nft_id).filter(UserNFT.user_id == user_id).all()
    return [r[0] for r in rows]


def user_owns_nft(db: Session, user_id: int, nft_id: int) -> bool:
    return (
        db.query(UserNFT)
        .filter(UserNFT.user_id == user_id, UserNFT.nft_id == nft_id)
        .first()
        is not None
    )

def create_user_nft(db: Session, user_id: int, nft_id: int) -> UserNFT:
    user_nft = UserNFT(user_id=user_id, nft_id=nft_id)
    db.add(user_nft)
    return user_nft
