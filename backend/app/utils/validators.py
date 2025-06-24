import random
from datetime import datetime, timedelta
from app.config import settings

# TEMP storage; replace with Redis/DB later
verification_codes = {}

def generate_code() -> str:
    return str(random.randint(100000, 999999))

def store_code(email: str, code: str):
    expires = datetime.utcnow() + timedelta(minutes=settings.CODE_EXPIRATION_MINUTES)
    verification_codes[email] = {"code": code, "expires": expires}

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

