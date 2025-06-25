import random
from datetime import datetime, timedelta
from app.config import settings

verification_codes = {}
rate_limit = {}

def generate_code() -> str:
    return str(random.randint(100000, 999999))

def store_code(email: str, code: str):
    expires = datetime.utcnow() + timedelta(minutes=settings.CODE_EXPIRATION_MINUTES)
    verification_codes[email] = {"code": code, "expires": expires}
    rate_limit[email] = datetime.utcnow()

def validate_code(email: str, code: str) -> bool:
    data = verification_codes.get(email)
    if not data:
        return False
    if datetime.utcnow() > data["expires"]:
        verification_codes.pop(email, None)
        return False
    if data["code"] != code:
        return False
    verification_codes.pop(email, None)
    return True

def rate_limit_check(email: str) -> bool:
    now = datetime.utcnow()
    last_sent = rate_limit.get(email)
    if last_sent and now - last_sent < timedelta(seconds=60):
        return False
    return True

