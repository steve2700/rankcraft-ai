import smtplib
import jwt
from datetime import datetime, timedelta
from email.mime.text import MIMEText

from app.config import settings
from app.database import supabase
from app.utils.validators import generate_code, store_code, validate_code, rate_limit_check

def send_verification_email(to_email: str, code: str):
    body = f"""
    Hi 👋,

    Your verification code for RankCraft is:

        {code}

    Expires in {settings.CODE_EXPIRATION_MINUTES} minutes.
    """
    msg = MIMEText(body)
    msg["Subject"] = "Verify Your RankCraft Account"
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email

    with smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
        server.starttls()
        server.login(settings.EMAIL_USER, settings.EMAIL_PASS)
        server.sendmail(settings.EMAIL_FROM, [to_email], msg.as_string())


def create_user_and_send_code(email: str, password: str):
    result = supabase.auth.sign_up({"email": email, "password": password})
    if not result.user:
        raise Exception("Signup failed. Email may be in use.")

    supabase.table("users").insert({"email": email}).execute()

    code = generate_code()
    store_code(email, code)
    send_verification_email(email, code)


def verify_email(email: str, code: str) -> str:
    if not validate_code(email, code):
        raise Exception("Invalid or expired code")

    supabase.table("users").update({"is_verified": True}).eq("email", email).execute()

    token = jwt.encode({"email": email}, settings.JWT_SECRET, algorithm="HS256")
    return token


def login_user(email: str, password: str) -> str:
    result = supabase.auth.sign_in_with_password({"email": email, "password": password})
    if not result.session:
        raise Exception("Login failed")

    user = supabase.table("users").select("is_verified").eq("email", email).single().execute()
    if not user.data or not user.data.get("is_verified"):
        raise Exception("Email not confirmed")

    return jwt.encode({"email": email}, settings.JWT_SECRET, algorithm="HS256")


def resend_verification_code(email: str):
    if not rate_limit_check(email):
        raise Exception("Please wait before requesting a new code")

    code = generate_code()
    store_code(email, code)
    send_verification_email(email, code)


def request_password_reset(email: str):
    code = generate_code()
    store_code(email, code)
    send_verification_email(email, code)


def reset_password(email: str, code: str, new_password: str):
    if not validate_code(email, code):
        raise Exception("Invalid or expired code")

    
    supabase.auth.admin.update_user_by_email(email, {"password": new_password})

