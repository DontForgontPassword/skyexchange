import random
import time
import asyncio
from datetime import datetime

from database import SessionLocal
from models import PriceCandle

class MarketSimulator:
    def __init__(self):
        self.prices = {
            "BTC": 42000.0,
            "ETH": 2200.0
        }

    def tick_price(self, price: float):
        change = random.uniform(-0.5, 0.5)  # волатильность
        return max(1, price + change)

    async def run(self, symbol="BTC", interval=1):
        db = SessionLocal()

        open_price = self.prices[symbol]
        high = open_price
        low = open_price

        while True:
            await asyncio.sleep(interval)

            new_price = self.tick_price(self.prices[symbol])
            self.prices[symbol] = new_price

            high = max(high, new_price)
            low = min(low, new_price)

            candle = PriceCandle(
                symbol=symbol,
                timestamp=int(time.time()),
                open=open_price,
                high=high,
                low=low,
                close=new_price,
                volume=random.uniform(0.1, 5.0)
            )

            db.add(candle)
            db.commit()

            # новая свеча каждые 10 секунд (пример)
            if random.random() < 0.1:
                open_price = new_price
                high = new_price
                low = new_price