from app.database import supabase
from app.models.article import ArticleCreate, ArticleUpdate, ArticleResponse
from typing import List
from uuid import UUID

def save_article(user_id: str, data: ArticleCreate) -> ArticleResponse:
    response = supabase.table("articles").insert({
        "user_id": user_id,
        "keyword": data.keyword,
        "length": data.length,
        "tone": data.tone,
        "article": data.article
    }).execute()

    record = response.data[0]
    return ArticleResponse(**record)

def get_user_articles(user_id: str) -> List[ArticleResponse]:
    response = supabase.table("articles").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return [ArticleResponse(**row) for row in response.data]

def get_article_by_id(user_id: str, article_id: str) -> ArticleResponse | None:
    response = supabase.table("articles").select("*").eq("user_id", user_id).eq("id", article_id).single().execute()
    if response.data:
        return ArticleResponse(**response.data)
    return None

def update_article(user_id: str, article_id: str, data: ArticleUpdate) -> ArticleResponse:
    response = supabase.table("articles").update(data.dict(exclude_unset=True)).eq("user_id", user_id).eq("id", article_id).execute()
    if not response.data:
        raise ValueError("Article not found")
    return ArticleResponse(**response.data[0])

def delete_article(user_id: str, article_id: str) -> bool:
    response = supabase.table("articles").delete().eq("user_id", user_id).eq("id", article_id).execute()
    return bool(response.data)

