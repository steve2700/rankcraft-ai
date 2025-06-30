from app.utils.seo_analyzer import (
    analyze_title_tag,
    analyze_meta_description,
    seo_score,
    keyword_density,
    calculate_readability_score,
    get_suggestions,
)
from app.utils.report_exporter import generate_pdf, generate_html
from app.database import supabase
from uuid import uuid4
from fastapi.responses import FileResponse
import tempfile

class SEOService:
    def full_seo_analysis(self, title, meta, content, keyword, user_id):
        title_result = analyze_title_tag(title, keyword)
        meta_result = analyze_meta_description(meta, keyword)
        content_result = {
            "seo_score": seo_score(content, keyword),
            "readability": calculate_readability_score(content),
            "keyword_density": keyword_density(content, keyword),
            "recommendations": get_suggestions(content, keyword),
        }

        # Save report to Supabase
        report_id = str(uuid4())
        supabase.table("seo_reports").insert({
            "id": report_id,
            "user_id": user_id,
            "title": title,
            "meta": meta,
            "content": content,
            "keyword": keyword,
            "seo_score": content_result["seo_score"],
            "title_score": title_result["score"],
            "meta_score": meta_result["score"]
        }).execute()

        return {
            "title_analysis": title_result,
            "meta_analysis": meta_result,
            "content_analysis": content_result
        }

    def get_user_reports(self, user_id: str):
        response = supabase.table("seo_reports").select("*").eq("user_id", user_id).execute()
        return response.data

    def get_average_seo_score(self, user_id: str):
        response = supabase.table("seo_reports").select("seo_score").eq("user_id", user_id).execute()
        scores = [row["seo_score"] for row in response.data]
        if not scores:
            return {"average_score": 0}
        return {"average_score": sum(scores) / len(scores)}

    def export_report(self, report_id: str, format: str = "pdf"):
        response = supabase.table("seo_reports").select("*").eq("id", report_id).single().execute()
        report = response.data

        if not report:
            raise ValueError("Report not found")

        if format == "pdf":
            file_path = generate_pdf(report)
        else:
            file_path = generate_html(report)

        return FileResponse(path=file_path, filename=f"seo_report_{report_id}.{format}")

