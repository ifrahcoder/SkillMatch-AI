from pydantic import BaseModel
from typing import Optional

class SkillBase(BaseModel):
    name: str
    category: str

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int

    class Config:
        from_attributes = True

class UserSkillUpdate(BaseModel):
    skill_id: int
    proficiency_level: str  # Beginner, Intermediate, Advanced