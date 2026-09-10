from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class JobBase(BaseModel):
    title: str
    company: str
    location: str
    salary_range: Optional[str] = "Confidential"
    description: str

class JobCreate(JobBase):
    required_skills: List[str]

class JobResponse(JobBase):
    id: int
    required_skills: List[str]
    created_at: datetime

    class Config:
        from_attributes = True