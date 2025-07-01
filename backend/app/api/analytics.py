# app/api/analytics.py
from fastapi import APIRouter, Depends
from app.services.analytics_service import AnalyticsService
from app.core.security import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Analytics"])
svc = AnalyticsService()

@router.get("/analytics")
def dashboard(user=Depends(get_current_user)):
    return svc.get_dashboard(user["id"])

