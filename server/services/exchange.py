import random
from sqlalchemy.orm import Session
from models.candle import PriceCandle
from models.user import User
from models.balance import Balance, CurrencyEnum
from schemas.exchange import TradeRequest


def get_order_activity(db: Session):
    latest_btc = (
        db.query(PriceCandle)
        .filter(PriceCandle.symbol == "BTC")
        .order_by(PriceCandle.timestamp.desc())
        .first()
    )
    base_price = latest_btc.close if latest_btc else 67300.0

    return [
        {
            "id": 1,
            "coinId": "btc",
            "price": base_price + random.uniform(-50, 50),
            "amount": random.uniform(0.1, 2.0),
            "total": 2,
            "type": "buy",
        },
        {
            "id": 2,
            "coinId": "btc",
            "price": base_price + random.uniform(10, 60),
            "amount": random.uniform(0.1, 2.0),
            "total": 1.5,
            "type": "sell",
        },
        {
            "id": 3,
            "coinId": "btc",
            "price": base_price - random.uniform(10, 60),
            "amount": random.uniform(0.1, 2.0),
            "total": 3,
            "type": "buy",
        },
    ]


def get_trade_activity(db: Session):
    latest_eth = (
        db.query(PriceCandle)
        .filter(PriceCandle.symbol == "ETH")
        .order_by(PriceCandle.timestamp.desc())
        .first()
    )
    base_price = latest_eth.close if latest_eth else 3450.0

    return [
        {
            "id": 1,
            "coinId": "eth",
            "price": base_price + random.uniform(-5, 5),
            "amount": random.uniform(1, 10),
            "total": 2,
            "type": "buy",
        },
        {
            "id": 2,
            "coinId": "eth",
            "price": base_price + random.uniform(-5, 5),
            "amount": random.uniform(1, 10),
            "total": 1.5,
            "type": "sell",
        },
    ]


def get_market_data(db: Session):
    coin_configs = [
        {
            "id": "btc",
            "name": "Bitcoin",
            "symbol": "BTC",
            "icon": "/static/crypto/bitcoin.png",
        },
        {
            "id": "eth",
            "name": "Ethereum",
            "symbol": "ETH",
            "icon": "/static/crypto/ethereum.png",
        },
        {
            "id": "sol",
            "name": "Solana",
            "symbol": "SOL",
            "icon": "/static/crypto/solana.png",
        },
        {
            "id": "smg",
            "name": "Smoge",
            "symbol": "SMG",
            "icon": "/static/crypto/smg.png",
        },
    ]

    coins = []
    for config in coin_configs:
        latest_candle = (
            db.query(PriceCandle)
            .filter(PriceCandle.symbol == config["symbol"])
            .order_by(PriceCandle.timestamp.desc())
            .first()
        )

        price = 0.0
        change = 0.0

        if latest_candle:
            price = latest_candle.close

            first_candle = (
                db.query(PriceCandle)
                .filter(PriceCandle.symbol == config["symbol"])
                .order_by(PriceCandle.timestamp.asc())
                .first()
            )
            if first_candle and first_candle.open != 0:
                change = (
                    (latest_candle.close - first_candle.open) / first_candle.open
                ) * 100

        coins.append(
            {
                "id": config["id"],
                "name": config["name"],
                "symbol": config["symbol"],
                "price": price,
                "change": round(change, 2),
                "icon": config["icon"],
            }
        )

    return {"coins": coins}


def get_history(db: Session, symbol: str, limit: int = 100):
    candles = (
        db.query(PriceCandle)
        .filter(PriceCandle.symbol == symbol)
        .order_by(PriceCandle.timestamp.desc())
        .limit(limit)
        .all()
    )

    return list(
        reversed(
            [
                {
                    "timestamp": c.timestamp,
                    "open": c.open,
                    "high": c.high,
                    "low": c.low,
                    "close": c.close,
                    "volume": c.volume,
                }
                for c in candles
            ]
        )
    )


def create_trade(db: Session, user: User, trade: TradeRequest):
    market = get_market_data(db)
    coin = next((c for c in market["coins"] if c["id"] == trade.coin_id), None)
    if not coin:
        return {"error": "Coin not found"}

    price = coin["price"]
    total_cost = price * trade.amount

    return {"status": "success", "total": total_cost}
