# app/api/seo.py

from fastapi import APIRouter, Depends
from app.models.seo import SEOAnalyzeRequest, SEOResponse
from app.services.seo_service import SEOService
from app.core.security import get_current_user

router = APIRouter()

@router.post("/seo/analyze", response_model=SEOResponse)
async def analyze_seo(payload: SEOAnalyzeRequest, user=Depends(get_current_user)):
    seo_service = SEOService()
    result = seo_service.full_seo_analysis(
        title=payload.title,
        meta=payload.meta_description,
        content=payload.content,
        keyword=payload.keyword
    )
    # Return results in the shape of SEOResponse model
    return SEOResponse(
        title_analysis=result["title_analysis"],
        meta_analysis=result["meta_analysis"],
        content_analysis=result["content_analysis"]
    )

