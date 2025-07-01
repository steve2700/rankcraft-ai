from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import (
    auth,
    keywords,
    generate,
    articles,
    seo,
    analytics,
)

app = FastAPI(
    title="RankCraft AI - SEO Content Generator",
    version="1.0.0",
    description="Generate SEO content using Groq AI with keyword research, batch generation, and analytics."
)

# CORS Middleware (Update allow_origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Route registration
app.include_router(auth.router)
app.include_router(keywords.router)
app.include_router(generate.router)
app.include_router(articles.router)
app.include_router(seo.router)
app.include_router(analytics.router)  

@app.get("/")
def root():
    return {"message": "✅ RankCraft API is up and running!"}

