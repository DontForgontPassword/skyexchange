from typing import Any, List, Dict
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models.balance import Balance, CurrencyEnum
from models.user import User
from repositories import nft
from schemas.nft import PurchaseNFTSchema
from repositories import user_nft, nft


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

def purchase_nft(payload: PurchaseNFTSchema, db: Session, user: User) -> Dict[str, Any]:
    stored_nft = nft.get_nft(db, payload.nft_id)
    if not stored_nft:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "NFT not found", "success": False},
        )

    if user_nft.user_owns_nft(db, user.id, payload.nft_id):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "NFT already owned", "success": False},
        )

    balance = (
        db.query(Balance)
        .filter(
            Balance.user_id == user.id,
            Balance.currency == CurrencyEnum.smg,
        )
        .first()
    )

    if not balance:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Balance not found", "success": False},
        )

    if balance.value < stored_nft.price:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Not enough balance", "success": False},
        )

    try:
        balance.value -= stored_nft.price
        user_nft.create_user_nft(db, user.id, stored_nft.id)

        db.commit()
        db.refresh(balance)

    except Exception:
        db.rollback()
        return JSONResponse(
            status_code=500,
            content={"message": "Purchase failed", "success": False},
        )

    return {
        "message": "NFT purchased successfully",
        "nft": {
            "id": stored_nft.id,
            "name": stored_nft.name,
            "purchased": True,
        },
        "balance": {
            "currency": CurrencyEnum.smg.value,
            "value": balance.value,
        },
    }