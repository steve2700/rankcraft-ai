import httpx
from bs4 import BeautifulSoup

def get_suggestions(query: str) -> list[str]:
    url = f"https://suggestqueries.google.com/complete/search?client=firefox&q={query}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    try:
        response = httpx.get(url, headers=headers)
        response.raise_for_status()
        suggestions = response.json()[1]
        return suggestions
    except Exception as e:
        print(f"Error fetching suggestions: {e}")
        return []

