from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.deps import get_current_user
from database import get_db
from models.user import User
from services import shop
import time
router = APIRouter(prefix="/api/shop", tags=["Shop"])


@router.get("/nfts")
def get_nfts(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Return list of NFTs with `purchased` flag for the current user.

    Business logic lives in `services.shop_service`.
    """
    return shop.list_nfts_with_purchase_flag(db, user)