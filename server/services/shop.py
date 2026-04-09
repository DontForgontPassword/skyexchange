from typing import List, Dict
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models.balance import CurrencyEnum
from models.user import User
from services import user_nft, nft


def list_nfts_with_purchase_flag(db: Session, user: User) -> List[Dict]:
    nfts = nft.get_nft_list(db)
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