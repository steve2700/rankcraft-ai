from datetime import datetime
from app.database import supabase
import random

def save_keywords(query: str, suggestions: list[str]) -> dict:
    results = []
    for i, suggestion in enumerate(suggestions):
        # Simulated values for MVP
        volume = random.randint(1000, 5000) - i * 100
        difficulty = random.randint(10, 70) + i

        results.append({
            "query": query,
            "suggestion": suggestion,
            "search_volume": max(volume, 100),
            "keyword_difficulty": min(difficulty, 100),
            "created_at": datetime.utcnow().isoformat()
        })

    supabase.table("keyword_research").insert(results).execute()
    return {"saved": len(results)}

