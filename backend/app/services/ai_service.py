import httpx
from app.config import settings

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def build_prompt(keyword: str, tone: str, length: str) -> str:
    word_counts = {
        "short": 500,
        "medium": 1000,
        "long": 1500
    }
    word_limit = word_counts.get(length.lower(), 1000)

    return (
        f"Write an SEO-optimized article about '{keyword}'.\n"
        f"Tone: {tone}.\n"
        f"Length: {word_limit} words.\n"
        f"Include a strong title, an engaging intro, and helpful subheadings.\n"
        f"Use the keyword naturally and make it valuable to readers.\n"
    )

def generate_article(keyword: str, tone: str, length: str) -> str:
    prompt = build_prompt(keyword, tone, length)

    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistral-saba-24b",  # Updated model
        "messages": [
            {"role": "system", "content": "You are an expert SEO content writer."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "top_p": 1.0,
        "max_tokens": 2048
    }

    try:
        response = httpx.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except httpx.HTTPStatusError as e:
        print(f"API Error: {e.response.text}")
        raise

