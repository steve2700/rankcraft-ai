from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class ArticleCreate(BaseModel):
    keyword: str
    length: str
    tone: str
    article: str

class ArticleUpdate(BaseModel):
    keyword: Optional[str]
    length: Optional[str]
    tone: Optional[str]
    article: Optional[str]

class ArticleResponse(ArticleCreate):
    id: UUID
    user_id: UUID
    created_at: datetime

