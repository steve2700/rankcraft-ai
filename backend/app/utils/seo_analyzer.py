import re

def analyze_title_tag(title: str, keyword: str) -> dict:
    issues = []
    score = 100

    if keyword.lower() not in title.lower():
        issues.append("Title is missing the target keyword.")
        score -= 30

    length = len(title)
    if length < 50 or length > 60:
        issues.append(f"Title length should be 50–60 characters (currently {length}).")
        score -= 20

    power_words = ["best", "guide", "tips", "easy", "free", "2025", "review", "how"]
    if not any(word in title.lower() for word in power_words):
        issues.append("Title could use more engaging words.")
        score -= 10

    return {
        "score": max(score, 0),
        "issues": issues,
        "length": length
    }


def analyze_meta_description(meta: str, keyword: str) -> dict:
    issues = []
    score = 100

    length = len(meta)
    if length < 120 or length > 160:
        issues.append(f"Meta description length should be 120–160 characters (currently {length}).")
        score -= 25

    if keyword.lower() not in meta.lower():
        issues.append("Meta description is missing the target keyword.")
        score -= 30

    cta_words = ["learn", "discover", "find", "click", "read", "get"]
    if not any(word in meta.lower() for word in cta_words):
        issues.append("Meta could include a clearer call-to-action.")
        score -= 15

    return {
        "score": max(score, 0),
        "issues": issues,
        "length": length
    }


def calculate_readability_score(text: str) -> float:
    words = text.split()
    sentences = re.split(r'[.!?]+', text)
    syllables = sum(count_syllables(word) for word in words)

    num_sentences = max(1, len([s for s in sentences if s.strip()]))
    num_words = max(1, len(words))

    return 206.835 - 1.015 * (num_words / num_sentences) - 84.6 * (syllables / num_words)

def count_syllables(word: str) -> int:
    return len(re.findall(r'[aeiouy]+', word.lower()))

def keyword_density(text: str, keyword: str) -> float:
    words = text.lower().split()
    count = words.count(keyword.lower())
    return (count / len(words)) * 100 if len(words) > 0 else 0.0

def seo_score(content: str, keyword: str) -> int:
    density = keyword_density(content, keyword)
    readability = calculate_readability_score(content)

    score = 0
    if 1 <= density <= 2.5:
        score += 40
    if readability >= 60:
        score += 30
    if len(content) >= 500:
        score += 30
    return min(score, 100)

def get_suggestions(content: str, keyword: str) -> list:
    suggestions = []
    if keyword_density(content, keyword) < 1:
        suggestions.append("Increase keyword usage.")
    if len(content) < 500:
        suggestions.append("Write at least 500 words.")
    if calculate_readability_score(content) < 60:
        suggestions.append("Simplify sentences for better readability.")
    return suggestions

