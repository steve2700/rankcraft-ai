import httpx
from app.config import settings
from app.services.template_service import get_template_by_id

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Word count mapping
word_counts = {
    "short": 500,
    "medium": 1000,
    "long": 1500
}

# ----------------------------------------
# ⚙️ Standard Prompt (No Template)
# ----------------------------------------
def build_prompt(keyword: str, tone: str, length: str) -> str:
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
        "model": "mistral-saba-24b",
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

# ----------------------------------------
# 🧩 Template-based Prompt
# ----------------------------------------
def build_prompt_with_template(keyword: str, tone: str, length: str, template_id: str) -> str:
    word_limit = word_counts.get(length.lower(), 1000)
    template = get_template_by_id(template_id)
    structure = "\n".join(f"- {section}" for section in template["structure"])

    return (
        f"Write an SEO‑optimized article about '{keyword}'.\n"
        f"Tone: {tone}. Length: {word_limit} words.\n"
        f"Use this structure:\n{structure}"
    )

def generate_article_from_template(keyword: str, tone: str, length: str, template_id: str) -> str:
    prompt = build_prompt_with_template(keyword, tone, length, template_id)

    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistral-saba-24b",
        "messages": [
            {"role": "system", "content": "Expert SEO writer."},
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

# ----------------------------------------
# 🚀 Batch Article Generator
# ----------------------------------------
def generate_batch(items):
    results = []
    for it in items:
        try:
            article = generate_article_from_template(
                it.keyword,
                it.tone,
                it.length,
                template_id="how-to-guide"  # default fallback template
            )
            results.append({
                "keyword": it.keyword,
                "article": article
            })
        except Exception as e:
            results.append({
                "keyword": it.keyword,
                "error": str(e)
            })
    return results

