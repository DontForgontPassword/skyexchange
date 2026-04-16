import asyncio

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers.user import router as user_router
from routers.auth import router as auth_router
from routers.shop import router as shop_router
from routers.exchange import router as exchange_router
from seeds.nfts import seed_nfts
from functions.MarketSimulator import MarketSimulator

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(shop_router)
app.include_router(exchange_router)

sim = MarketSimulator()


@app.on_event("startup")
async def startup():
    seed_nfts()
    asyncio.create_task(sim.run("BTC"))
    asyncio.create_task(sim.run("ETH"))