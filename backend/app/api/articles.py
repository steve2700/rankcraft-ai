from fastapi import APIRouter, Depends, HTTPException
from app.models.article import ArticleCreate, ArticleUpdate, ArticleResponse
from app.services import article_service
from app.core.security import get_current_user

router = APIRouter(prefix="/articles", tags=["Articles"])

@router.post("/", response_model=ArticleResponse)
def create_article(data: ArticleCreate, user=Depends(get_current_user)):
    return article_service.save_article(user["id"], data)

@router.get("/", response_model=list[ArticleResponse])
def list_articles(user=Depends(get_current_user)):
    return article_service.get_user_articles(user["id"])

@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: str, user=Depends(get_current_user)):
    article = article_service.get_article_by_id(user["id"], article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.put("/{article_id}", response_model=ArticleResponse)
def update_article(article_id: str, data: ArticleUpdate, user=Depends(get_current_user)):
    return article_service.update_article(user["id"], article_id, data)

@router.delete("/{article_id}")
def delete_article(article_id: str, user=Depends(get_current_user)):
    success = article_service.delete_article(user["id"], article_id)
    if not success:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted successfully ✅"}

