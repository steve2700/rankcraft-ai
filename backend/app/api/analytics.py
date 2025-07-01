from fastapi import APIRouter, Depends
from app.services.analytics_service import AnalyticsService
from app.core.security import get_current_user
from app.utils.cache import get_cache, set_cache


router = APIRouter(prefix="/dashboard", tags=["Analytics"])
svc = AnalyticsService()

@router.get("/analytics")
def dashboard(user=Depends(get_current_user)):
    user_id = user["id"]
    cache_key = f"analytics_{user_id}"

    # ✅ Try to return cached data
    cached = get_cache(cache_key)
    if cached:
        return cached

    # ✅ Otherwise compute and cache
    result = svc.get_dashboard(user_id)
    set_cache(cache_key, result, ttl=60)  # Cache for 60 seconds
    return result

