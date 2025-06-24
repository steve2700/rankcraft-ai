import smtplib
from email.mime.text import MIMEText
from app.database import supabase
from app.config import settings
from app.utils.validators import generate_code, store_code

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
    result = supabase.auth.sign_up({
        "email": email,
        "password": password
    })

    # ✅ Correct way to handle errors:
    if result.error:
        raise Exception(result.error.message)

    code = generate_code()
    store_code(email, code)
    send_verification_email(email, code)

def login_user(email: str, password: str) -> str:
    result = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password
    })

    if result.error:
        raise Exception(result.error.message)

    # Generate and return JWT
    token = jwt.encode({"email": email}, settings.JWT_SECRET, algorithm="HS256")
    return token

