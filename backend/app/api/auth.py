from fastapi import APIRouter, HTTPException
from app.models.user import RegisterModel, VerifyEmailModel, LoginModel
from app.services.auth_service import create_user_and_send_code, login_user
from app.utils.validators import validate_code
import jwt
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(data: RegisterModel):
    try:
        create_user_and_send_code(data.email, data.password)
        return {"message": "User registered. Verification code sent to email."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/verify")
def verify(data: VerifyEmailModel):
    if not validate_code(data.email, data.code):
        raise HTTPException(status_code=400, detail="Invalid or expired verification code.")

    token = jwt.encode({"email": data.email}, settings.JWT_SECRET, algorithm="HS256")
    return {"message": "Email verified ✅", "token": token}


@router.post("/login")
def login(data: LoginModel):  # ✅ Now using a proper LoginModel
    try:
        token = login_user(data.email, data.password)
        return {"message": "Login successful ✅", "token": token}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

