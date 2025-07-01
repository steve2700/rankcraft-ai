# app/models/generate.py
from pydantic import BaseModel
from typing import List, Optional

class TemplateGenerationRequest(BaseModel):
    keyword: str
    tone: str
    length: str
    template_id: str

class BatchRequestItem(BaseModel):
    keyword: str
    tone: str
    length: str

class BatchGenerationRequest(BaseModel):
    items: List[BatchRequestItem]

class BatchGenerationResponseItem(BaseModel):
    keyword: str
    article: str

class BatchGenerationResponse(BaseModel):
    results: List[BatchGenerationResponseItem]

class AnalyticsResponse(BaseModel):
    total_articles: int
    top_keywords: List[str]
    avg_title_score: float
    avg_meta_score: float
    avg_content_score: float

