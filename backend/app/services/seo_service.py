from app.utils.seo_analyzer import (
    analyze_title_tag,
    analyze_meta_description,
    seo_score,
    keyword_density,
    calculate_readability_score,
    get_suggestions
)

class SEOService:
    def evaluate_title_and_meta(self, title: str, meta: str, keyword: str) -> dict:
        return {
            "title_analysis": analyze_title_tag(title, keyword),
            "meta_analysis": analyze_meta_description(meta, keyword),
        }

    def analyze_content(self, content: str, keyword: str) -> dict:
        return {
            "seo_score": seo_score(content, keyword),
            "readability": calculate_readability_score(content),
            "keyword_density": keyword_density(content, keyword),
            "recommendations": get_suggestions(content, keyword),
        }

    def full_seo_analysis(self, title: str, meta: str, content: str, keyword: str) -> dict:
        return {
            **self.evaluate_title_and_meta(title, meta, keyword),
            "content_analysis": self.analyze_content(content, keyword),
        }

