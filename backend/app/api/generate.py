from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.services.ai_service import generate_article

router = APIRouter(prefix="/generate", tags=["Content Generation"])

class GenerateRequest(BaseModel):
    keyword: str = Field(..., min_length=2)
    length: str = Field(..., pattern="^(short|medium|long)$")
    tone: str = Field(..., pattern="^(casual|professional|technical)$")

@router.post("/article")
def create_article(payload: GenerateRequest):
    try:
        content = generate_article(payload.keyword, payload.tone, payload.length)
        return {
            "keyword": payload.keyword,
            "length": payload.length,
            "tone": payload.tone,
            "article": content
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

