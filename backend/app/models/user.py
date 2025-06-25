from pydantic import BaseModel, EmailStr

class RegisterModel(BaseModel):
    email: EmailStr
    password: str

class VerifyEmailModel(BaseModel):
    email: EmailStr
    code: str

class LoginModel(BaseModel):
    email: EmailStr
    password: str

class ResendCodeModel(BaseModel):
    email: EmailStr

class PasswordResetRequestModel(BaseModel):
    email: EmailStr

class PasswordResetModel(BaseModel):
    email: EmailStr
    code: str
    new_password: str

class RefreshTokenModel(BaseModel):
    refresh_token: str

