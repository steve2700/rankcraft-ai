from datetime import datetime
from app.database import supabase

def save_keywords(query: str, suggestions: list[str]) -> dict:
    results = [
        {
            "query": query,
            "suggestion": suggestion,  # ✅ Corrected to match DB schema
            "created_at": datetime.utcnow().isoformat()
        }
        for suggestion in suggestions
    ]
    supabase.table("keyword_research").insert(results).execute()
    return {"saved": len(results)}

