import random
import time
import asyncio
from datetime import datetime

from database import SessionLocal
from models import PriceCandle


class MarketSimulator:
    def __init__(self):
        self.prices = {"BTC": 67350.0, "ETH": 3450.0, "SOL": 182.0, "SMG": 0.0042}
        self.momentum = {"BTC": 0.0, "ETH": 0.0, "SOL": 0.0, "SMG": 0.0}

    def tick_price(self, symbol: str):
        price = self.prices[symbol]

        drift = random.uniform(-0.0001, 0.0001)

        self.momentum[symbol] += random.uniform(-0.0005, 0.0005)
        self.momentum[symbol] = max(-0.002, min(0.002, self.momentum[symbol]))

        noise = random.uniform(-0.0025, 0.0025)

        change = drift + self.momentum[symbol] + noise

        new_price = price * (1 + change)

        if symbol == "BTC":
            new_price = max(1000.0, new_price)

        self.prices[symbol] = new_price
        return new_price

    def seed_history(self, symbol: str, count: int = 50):
        db = SessionLocal()
        try:
            existing = (
                db.query(PriceCandle).filter(PriceCandle.symbol == symbol).count()
            )
            if existing >= count:
                return

            print(f"Seeding {count} points for {symbol}...")
            current_time = int(time.time())
            price = self.prices.get(symbol, 100.0)

            for i in range(count):
                timestamp = current_time - (count - i) * 10

                volatility = price * random.uniform(-0.02, 0.02)
                new_price = max(0.0001, price + volatility)

                candle = PriceCandle(
                    symbol=symbol,
                    timestamp=timestamp,
                    open=price,
                    high=max(price, new_price) * 1.002,
                    low=min(price, new_price) * 0.998,
                    close=new_price,
                    volume=random.uniform(1.0, 10.0),
                )
                db.add(candle)
                price = new_price

            self.prices[symbol] = price
            db.commit()
        finally:
            db.close()

    async def run(self, symbol="BTC", interval=1):
        self.seed_history(symbol)

        db = SessionLocal()
        try:
            open_price = self.prices[symbol]
            high = open_price
            low = open_price

            while True:
                await asyncio.sleep(interval)

                new_price = self.tick_price(symbol)

                high = max(high, new_price)
                low = min(low, new_price)

                candle = PriceCandle(
                    symbol=symbol,
                    timestamp=int(time.time()),
                    open=open_price,
                    high=high,
                    low=low,
                    close=new_price,
                    volume=random.uniform(0.1, 5.0),
                )

                db.add(candle)
                db.commit()

                if int(time.time()) % 10 == 0:
                    open_price = new_price
                    high = new_price
                    low = new_price
        finally:
            db.close()
