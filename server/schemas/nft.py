from pydantic import BaseModel

class NFTSchema(BaseModel):
    id: int
    name: str

class PurchaseNFTSchema(BaseModel):
    nft_id: int