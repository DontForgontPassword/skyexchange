from pydantic import BaseModel


class GameSchema(BaseModel):
    score: int
    rank: int
