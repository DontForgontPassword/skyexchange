from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from services import exchange

router = APIRouter(prefix="/api/exchange", tags=["Exchange"])

@router.get("/order-activity")
def get_order_activity(db: Session = Depends(get_db)):
    return exchange.get_order_activity()

@router.get("/trade-activity")
def get_trade_activity(db: Session = Depends(get_db)):
    return exchange.get_trade_activity()