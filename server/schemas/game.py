from pydantic import BaseModel


class SaveScoreRequest(BaseModel):
    score: int
    validation_hash: str


class GameSchema(BaseModel):
    user_id: int
    score: int

    class Config:
        from_attributes = True
