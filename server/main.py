from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from database import SessionLocal, engine
from models import Base
from fastapi.middleware.cors import CORSMiddleware
from routers.user import router as user_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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