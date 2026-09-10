import re
from typing import List

class ResumeParser:
    """Extracts target technology keywords from raw text resume inputs."""
    
    KEYWORD_BANK = [
        "React", "JavaScript", "HTML", "CSS", "Tailwind", 
        "Python", "FastAPI", "Flask", "Node.js", "Express.js", 
        "MongoDB", "PostgreSQL", "SQL", "Docker", "Git"
    ]

    @classmethod
    def extract_skills_from_text(cls, text: str) -> List[str]:
        found_skills = []
        for kw in cls.KEYWORD_BANK:
            pattern = r'\b' + re.escape(kw) + r'\b'
            if re.search(pattern, text, re.IGNORECASE):
                found_skills.append(kw)
        return list(set(found_skills))