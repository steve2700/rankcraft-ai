from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from app.services.ai_service import (
    generate_article,
    generate_article_from_template,
    generate_batch
)
from app.core.security import get_current_user
from app.database import supabase
from typing import List, Optional

router = APIRouter(prefix="/generate", tags=["Content Generation"])

# ----------------------------
# 📦 Pydantic Models
# ----------------------------

class GenerateRequest(BaseModel):
    keyword: str = Field(..., min_length=2)
    length: str = Field(..., pattern="^(short|medium|long)$")
    tone: str = Field(..., pattern="^(casual|professional|technical)$")

class TemplateGenerationRequest(GenerateRequest):
    template_id: str = Field(...)

class BatchItem(BaseModel):
    keyword: str
    length: str = "medium"
    tone: str = "professional"

class BatchGenerationRequest(BaseModel):
    items: List[BatchItem]

class BatchGenerationResponse(BaseModel):
    results: List[dict]

# ----------------------------
# 🚀 Generate Standard Article
# ----------------------------
@router.post("/article")
def create_article(payload: GenerateRequest, user=Depends(get_current_user)):
    try:
        content = generate_article(payload.keyword, payload.tone, payload.length)
        supabase.table("articles").insert({
            "user_id": user["id"],
            "keyword": payload.keyword,
            "length": payload.length,
            "tone": payload.tone,
            "article": content
        }).execute()
        return {
            "keyword": payload.keyword,
            "length": payload.length,
            "tone": payload.tone,
            "article": content
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----------------------------
# 🧩 Generate From Template
# ----------------------------
@router.post("/from-template")
def from_template(req: TemplateGenerationRequest, user=Depends(get_current_user)):
    try:
        art = generate_article_from_template(
            req.keyword, req.tone, req.length, req.template_id
        )
        supabase.table("articles").insert({
            "user_id": user["id"],
            "keyword": req.keyword,
            "length": req.length,
            "tone": req.tone,
            "article": art
        }).execute()
        return {"article": art}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ----------------------------
# 📚 Batch Generation
# ----------------------------
@router.post("/batch", response_model=BatchGenerationResponse)
def batch_gen(req: BatchGenerationRequest, user=Depends(get_current_user)):
    try:
        results = generate_batch(req.items)
        for r in results:
            if "article" in r:
                supabase.table("articles").insert({
                    "user_id": user["id"],
                    "keyword": r["keyword"],
                    "length": "medium",
                    "tone": "neutral",
                    "article": r["article"]
                }).execute()
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

