from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from database import  engine
from database import Base
from fastapi.middleware.cors import CORSMiddleware
from routers.user import router as user_router
from routers.auth import router as auth_router
from routers.shop import router as shop_router
from routers.exchange import router as exchange_router
from seeds.nfts import seed_nfts

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router)
app.include_router(auth_router)
app.include_router(shop_router)
app.include_router(exchange_router)

@app.on_event("startup")
def on_startup():
    seed_nfts()