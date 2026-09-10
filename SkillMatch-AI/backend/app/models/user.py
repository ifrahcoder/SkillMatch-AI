from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=100)

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserProfile(UserBase):
    id: int
    bio: Optional[str] = None
    target_role: Optional[str] = "Full Stack Developer"
    location: Optional[str] = "Remote"
    skills: List[str] = []