from pydantic import BaseModel
from typing import List

class TitleMetaAnalysis(BaseModel):
    score: int
    issues: List[str]
    length: int

class SEOContentAnalysis(BaseModel):
    seo_score: int
    readability: float
    keyword_density: float
    recommendations: List[str]

class SEOResponse(BaseModel):
    title_analysis: TitleMetaAnalysis
    meta_analysis: TitleMetaAnalysis
    content_analysis: SEOContentAnalysis

class SEOAnalyzeRequest(BaseModel):
    title: str
    meta_description: str
    content: str
    keyword: str

