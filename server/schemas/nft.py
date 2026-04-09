from pydantic import BaseModel

class NFTSchema(BaseModel):
    id: int
    name: str
    image: str

class PurchaseNFTSchema(BaseModel):
    nft_id: int