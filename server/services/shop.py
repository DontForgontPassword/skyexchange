from fastapi import APIRouter, HTTPException

from server.constants.nft import NFT_COLLECTION

router = APIRouter(prefix="/shop", tags=["Shop"])

@router.get("/nfts")
def get_nfts():
    return NFT_COLLECTION

@router.post("/buy")
def buy_nft(item_id: int):
    nft = next((n for n in NFT_COLLECTION if n["id"] == item_id), None)
    if not nft:
        raise HTTPException(404, "NFT not found")

    balance = next(
        (b for b in FAKE_USER["balances"] if b["currency"] == "btc"),
        None,
    )

    if not balance or balance["value"] < nft["price"]:
        raise HTTPException(400, "Not enough balance")

    balance["value"] -= nft["price"]

    FAKE_USER["nfts"].append({
        "id": nft["id"],
        "name": nft["name"],
        "image": nft["image"],
    })

    return {
        "user": FAKE_USER,
    }
