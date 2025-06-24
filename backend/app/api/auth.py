from fastapi import APIRouter, HTTPException
from app.models.user import *
from app.services.auth_service import (
    create_user_and_send_code,
    verify_email,
    login_user,
    resend_verification_code,
    request_password_reset,
    reset_password
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(data: RegisterModel):
    try:
        create_user_and_send_code(data.email, data.password)
        return {"message": "Verification code sent to email."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/verify")
def verify(data: VerifyEmailModel):
    try:
        token = verify_email(data.email, data.code)
        return {"message": "Email verified ✅", "token": token}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
def login(data: LoginModel):
    try:
        token = login_user(data.email, data.password)
        return {"message": "Login successful ✅", "token": token}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.post("/resend-code")
def resend_code(data: ResendCodeModel):
    try:
        resend_verification_code(data.email)
        return {"message": "Verification code resent ✅"}
    except Exception as e:
        raise HTTPException(status_code=429, detail=str(e))


@router.post("/password-reset-request")
def password_reset_request(data: PasswordResetRequestModel):
    try:
        request_password_reset(data.email)
        return {"message": "Reset code sent to email."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/reset-password")
def password_reset(data: PasswordResetModel):
    try:
        reset_password(data.email, data.code, data.new_password)
        return {"message": "Password reset successful ✅"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

