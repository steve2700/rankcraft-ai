# app/api/keywords.py

from fastapi import APIRouter, Query
from app.services.keyword_service import save_keywords
from app.services.scraping_service import get_suggestions  # already built

router = APIRouter(prefix="/keywords", tags=["Keywords"])

@router.get("/suggest")
def suggest_keywords(q: str = Query(..., min_length=2)):
    suggestions = get_suggestions(q)
    saved = save_keywords(q, suggestions)
    return {
        "query": q,
        "suggestions": saved
    }

