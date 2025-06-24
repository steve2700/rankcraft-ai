from pydantic import BaseModel, EmailStr

class RegisterModel(BaseModel):
    email: EmailStr
    password: str

class VerifyEmailModel(BaseModel):
    email: EmailStr
    code: str

