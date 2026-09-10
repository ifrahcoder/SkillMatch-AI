from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.models.user import UserCreate, UserResponse

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate):
    # Dummy production-safe payload structure
    return {
        "id": 1,
        "email": user.email,
        "full_name": user.full_name,
        "created_at": "2026-09-08T10:30:00"
    }

@router.post("/login")
def login(credentials: LoginRequest):
    if credentials.email == "user@skillmatch.ai" and credentials.password == "password123":
        return {
            "access_token": "mock-jwt-token-production-secret-key",
            "token_type": "bearer",
            "user": {
                "id": 1,
                "email": credentials.email,
                "full_name": "Ifrah Bashir"
            }
        }
    raise HTTPException(status_code=401, detail="Invalid email or password")