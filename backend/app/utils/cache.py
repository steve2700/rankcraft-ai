# utils/cache.py
import time
from typing import Any

cache_store = {}

def set_cache(key: str, value: Any, ttl: int = 60):
    expiry = time.time() + ttl
    cache_store[key] = (value, expiry)

def get_cache(key: str):
    value, expiry = cache_store.get(key, (None, 0))
    if time.time() < expiry:
        return value
    if key in cache_store:
        del cache_store[key]
    return None

