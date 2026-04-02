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
    time.sleep(3)
    return shop.list_nfts_with_purchase_flag(db, user)


@router.post("/purchase")
def buy_nft(nft_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Buy an NFT for the current user. All business logic is in the service layer."""
    return shop.purchase_nft(db, user, nft_id)
