from fastapi import APIRouter, Query
from app.services.keyword_service import save_keywords
from app.services.scraping_service import get_suggestions
from app.database import supabase

router = APIRouter(prefix="/keywords", tags=["Keywords"])

@router.get("/suggest")
def suggest_keywords(q: str = Query(..., min_length=2)):
    suggestions = get_suggestions(q)
    save_keywords(q, suggestions)

    stored = supabase.table("keyword_research") \
        .select("suggestion, search_volume, keyword_difficulty") \
        .eq("query", q).execute()

    return {
        "query": q,
        "suggestions": stored.data
    }

