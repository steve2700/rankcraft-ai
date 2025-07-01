# app/services/analytics_service.py
from app.database import supabase
from collections import Counter

class AnalyticsService:
    def get_dashboard(self, user_id: str) -> dict:
        rows = supabase.table("articles").select(
            "id, keyword, article"
        ).eq("user_id", user_id).execute().data or []
        total = len(rows)
        keywords = Counter(r["keyword"] for r in rows)
        top_keywords = [kw for kw, _ in keywords.most_common(5)]
        # Placeholder: assume content scores stored as seo_score in seo_reports
        seo_rows = supabase.table("seo_reports").select(
            "seo_score, title_score, meta_score"
        ).eq("user_id", user_id).execute().data or []
        count = len(seo_rows) or 1
        avg_title = sum(r["title_score"] for r in seo_rows) / count
        avg_meta = sum(r["meta_score"] for r in seo_rows) / count
        avg_content = sum(r["seo_score"] for r in seo_rows) / count
        return {
            "total_articles": total,
            "top_keywords": top_keywords,
            "avg_title_score": avg_title,
            "avg_meta_score": avg_meta,
            "avg_content_score": avg_content
        }

