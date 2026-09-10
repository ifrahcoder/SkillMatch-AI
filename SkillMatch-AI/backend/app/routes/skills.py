from fastapi import APIRouter
from typing import List
from app.models.skill import UserSkillUpdate

router = APIRouter(prefix="/api/skills", tags=["Skills Management"])

@router.get("/all")
def get_all_skills():
    return [
        {"id": 1, "name": "React.js", "category": "Frontend"},
        {"id": 2, "name": "JavaScript", "category": "Frontend"},
        {"id": 3, "name": "Python", "category": "Backend"},
        {"id": 4, "name": "FastAPI", "category": "Backend"},
        {"id": 5, "name": "Node.js", "category": "Backend"},
        {"id": 6, "name": "MongoDB", "category": "Database"},
        {"id": 7, "name": "Docker", "category": "DevOps"}
    ]

@router.post("/user/update")
def update_user_skills(skills: List[UserSkillUpdate]):
    return {"status": "success", "message": f"{len(skills)} skills updated successfully"}