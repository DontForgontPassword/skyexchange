from typing import List, Dict
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from repositories import nft, user_nft
from models.balance import CurrencyEnum
from models.user import User


def list_nfts_with_purchase_flag(db: Session, user: User) -> List[Dict]:
    nfts = nft.list_nfts(db)
    owned_ids = set(user_nft.list_user_nft_ids(db, user.id))

    result = []
    for item in nfts:
        result.append(
            {
                "id": item.id,
                "name": item.name,
                "image": item.image,
                "price": item.price,
                "rarity": item.rarity,
                "type": item.type,
                "purchased": item.id in owned_ids,
            }
        )

    return result


def purchase_nft(db: Session, user: User, nft_id: int) -> Dict:
    nft = nft.get_nft(db, nft_id)
    if not nft:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="NFT not found")

    if user_nft.user_owns_nft(db, user.id, nft_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="NFT already owned")

    balance = user.balance
    if not balance:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Balance not found")

    if balance.value < nft.price:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough balance")

    try:
        balance.value -= nft.price
        user_nft.create_user_nft(db, user.id, nft.id)
        db.commit()
        db.refresh(balance)

    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Purchase failed")

    return {
        "message": "NFT purchased successfully",
        "nft": {"id": nft.id, "name": nft.name, "purchased": True},
        "balance": {"currency": CurrencyEnum.smg.value, "value": balance.value},
    }
