from fastapi import APIRouter, Depends, HTTPException, Query
from app.models.seo import SEOAnalyzeRequest, SEOResponse
from app.services.seo_service import SEOService
from app.core.security import get_current_user

# ✅ FIXED: removed trailing slash
router = APIRouter(tags=["SEO"])
seo_service = SEOService()

@router.post("/seo/analyze", response_model=SEOResponse)
async def analyze_seo(payload: SEOAnalyzeRequest, user=Depends(get_current_user)):
    result = seo_service.full_seo_analysis(
        title=payload.title,
        meta=payload.meta_description,
        content=payload.content,
        keyword=payload.keyword,
        user_id=user["id"]
    )
    return result

@router.get("/seo/reports/me")
async def get_my_reports(user=Depends(get_current_user)):
    return seo_service.get_user_reports(user_id=user["id"])

@router.get("/seo/reports/average")
async def get_average_score(user=Depends(get_current_user)):
    return seo_service.get_average_seo_score(user_id=user["id"])

@router.get("/seo/reports/export/{report_id}")
async def export_report(report_id: str, format: str = Query("pdf", enum=["pdf", "html"])):
    return seo_service.export_report(report_id=report_id, format=format)

