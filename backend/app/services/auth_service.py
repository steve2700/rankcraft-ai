import smtplib
import jwt
import bcrypt
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from app.config import settings
from app.database import supabase
from app.utils.validators import generate_code, store_code, validate_code, rate_limit_check


# General email sender
def send_email(to_email: str, subject: str, body: str):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email

    with smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
        server.starttls()
        server.login(settings.EMAIL_USER, settings.EMAIL_PASS)
        server.sendmail(settings.EMAIL_FROM, [to_email], msg.as_string())


# Verification email
def send_verification_email(to_email: str, code: str):
    body = f"""
    Hi 👋,

    Your verification code for RankCraft signup is:

        {code}

    It expires in {settings.CODE_EXPIRATION_MINUTES} minutes.
    """
    send_email(to_email, "Verify Your RankCraft Account", body)


# Password reset email
def send_password_reset_email(to_email: str, code: str):
    body = f"""
    Hi 👋,

    You requested a password reset for your RankCraft account.

    Use this verification code to reset your password:

        {code}

    It expires in {settings.CODE_EXPIRATION_MINUTES} minutes.

    If you did not request this, please ignore this email.
    """
    send_email(to_email, "RankCraft Password Reset Request", body)


def create_user_and_send_code(email: str, password: str):
    existing = supabase.table("users").select("*").eq("email", email).execute()
    if existing.data:
        raise Exception("Email already registered.")

    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    supabase.table("users").insert({"email": email, "password": hashed_pw}).execute()

    code = generate_code()
    store_code(email, code)
    send_verification_email(email, code)


def verify_email(email: str, code: str) -> str:
    if not validate_code(email, code):
        raise Exception("Invalid or expired code")

    supabase.table("users").update({"is_verified": True}).eq("email", email).execute()
    return create_access_token(email)


def login_user(email: str, password: str) -> dict:
    user = supabase.table("users").select("*").eq("email", email).single().execute()

    if not user.data:
        raise Exception("Invalid credentials")

    stored_hash = user.data["password"]
    if not bcrypt.checkpw(password.encode(), stored_hash.encode()):
        raise Exception("Invalid credentials")

    if not user.data.get("is_verified"):
        raise Exception("Email not confirmed")

    return {
        "access_token": create_access_token(email),
        "refresh_token": create_refresh_token(email)
    }


def resend_verification_code(email: str):
    if not rate_limit_check(email):
        raise Exception("Please wait before requesting a new code")

    code = generate_code()
    store_code(email, code)
    send_verification_email(email, code)


def request_password_reset(email: str):
    user = supabase.table("users").select("*").eq("email", email).single().execute()
    if not user.data:
        raise Exception("User not found")

    code = generate_code()
    store_code(email, code)
    send_password_reset_email(email, code)


def reset_password(email: str, code: str, new_password: str):
    if not validate_code(email, code):
        raise Exception("Invalid or expired code")

    hashed_pw = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    supabase.table("users").update({"password": hashed_pw}).eq("email", email).execute()


# Token helpers
def create_access_token(email: str) -> str:
    return jwt.encode(
        {"email": email, "exp": datetime.utcnow() + timedelta(minutes=15)},
        settings.JWT_SECRET,
        algorithm="HS256"
    )


def create_refresh_token(email: str) -> str:
    return jwt.encode(
        {"email": email, "exp": datetime.utcnow() + timedelta(days=7)},
        settings.JWT_SECRET,
        algorithm="HS256"
    )


def verify_refresh_token(refresh_token: str) -> str:
    try:
        payload = jwt.decode(refresh_token, settings.JWT_SECRET, algorithms=["HS256"])
        return create_access_token(payload["email"])
    except jwt.ExpiredSignatureError:
        raise Exception("Refresh token expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid refresh token")

