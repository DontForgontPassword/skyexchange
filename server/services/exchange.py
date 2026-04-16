from typing import Dict, Any
from fastapi import Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from models.balance import Balance, CurrencyEnum
from models.user import User
from schemas.nft import PurchaseNFTSchema
from database import get_db
from models.candle import PriceCandle
from services.nft import get_nft
from services.user_nft import user_owns_nft, create_user_nft


def get_order_activity():
    return [
        {"id": 1, "coinId": "btc", "price": 100,
            "amount": 100, "total": 2, "type": "buy"},
        {"id": 2, "coinId": "btc", "price": 101,
            "amount": 101, "total": 1.5, "type": "sell"},
        {"id": 3, "coinId": "btc", "price": 99,
            "amount": 99, "total": 3, "type": "buy"},
    ]


def get_trade_activity():
    return [
        {"id": 1, "coinId": "eth", "price": 100,
            "amount": 100, "total": 2, "type": "buy"},
        {"id": 2, "coinId": "eth", "price": 54,
            "amount": 3, "total": 1.5, "type": "sell"},
        {"id": 3, "coinId": "smg", "price": 23,
            "amount": 2, "total": 3, "type": "buy"},
        {"id": 4, "coinId": "sol", "price": 77,
            "amount": 4, "total": 3, "type": "buy"},
    ]


def get_market_data():
    return {
        "coins": [
            {
                "id": "btc",
                "name": "Bitcoin",
                "symbol": "BTC",
                "price": 67350.12,
                "change": 2.45,
                "icon": "/static/crypto/bitcoin.png"
            },
            {
                "id": "eth",
                "name": "Ethereum",
                "symbol": "ETH",
                "price": 3450.87,
                "change": -1.12,
                "icon": "/static/crypto/ethereum.png"
            },
            {
                "id": "sol",
                "name": "Solana",
                "symbol": "SOL",
                "price": 182.33,
                "change": 3.78,
                "icon": "/static/crypto/solana.png"
            },
            {
                "id": "smg",
                "name": "Smoge",
                "symbol": "SMG",
                "price": 0.0042,
                "change": 12.5,
                "icon": "/static/crypto/smg.png"
            },
        ]
    }


def purchase_nft(db: Session, user: User, payload: PurchaseNFTSchema) -> Dict[str, Any]:
    nft = get_nft(db, payload.nft_id)
    if not nft:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message": "NFT not found", "success": False},
        )

    if user_owns_nft(db, user.id, payload.nft_id):
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

    if balance.value < nft.price:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Not enough balance", "success": False},
        )

    try:
        balance.value -= nft.price
        create_user_nft(db, user.id, nft.id)

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
            "id": nft.id,
            "name": nft.name,
            "purchased": True,
        },
        "balance": {
            "currency": CurrencyEnum.smg.value,
            "value": balance.value,
        },
    }


def get_history(
    db: Session, symbol: str, limit: int = 100
):
    candles = (
        db.query(PriceCandle)
        .filter(PriceCandle.symbol == symbol)
        .order_by(PriceCandle.timestamp.desc())
        .limit(limit)
        .all()
    )

    return list(reversed([
        {
            "timestamp": c.timestamp,
            "open": c.open,
            "high": c.high,
            "low": c.low,
            "close": c.close,
            "volume": c.volume
        }
        for c in candles
    ]))
