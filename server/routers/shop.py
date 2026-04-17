from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.deps import get_current_user
from database import get_db
from models.user import User
from schemas.nft import PurchaseNFTSchema
from services import shop

router = APIRouter(prefix="/api/shop", tags=["Shop"])


@router.get("/nfts")
def get_nfts(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Return list of NFTs with `purchased` flag for the current user."""
    return shop.list_nfts_with_purchase_flag(db, user)
@router.post("/purchase")
def purchase_nft(payload: PurchaseNFTSchema, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return shop.purchase_nft(payload, db, user)