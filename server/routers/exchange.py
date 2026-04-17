from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from services import exchange
from core.deps import get_current_user
from models.user import User
from schemas.nft import PurchaseNFTSchema
router = APIRouter(prefix="/api/exchange", tags=["Exchange"])


@router.get("/order-activity")
def get_order_activity(db: Session = Depends(get_db)):
    return exchange.get_order_activity()


@router.get("/trade-activity")
def get_trade_activity(db: Session = Depends(get_db)):
    return exchange.get_trade_activity()


@router.get("/market")
def get_market_data(db: Session = Depends(get_db)):
    return exchange.get_market_data()


@router.get("/history")
def get_history(db: Session = Depends(get_db), symbol: str = "BTC", limit: int = 100):
    return exchange.get_history(db, symbol, limit)
