from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, keywords

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(keywords.router)

@app.get("/")
def root():
    return {"message": "RankCraft API - Authentication Live ✅"}

