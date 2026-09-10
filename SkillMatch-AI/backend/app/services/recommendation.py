from typing import List, Dict, Any

class RecommendationEngine:
    """Generates personalized learning roadmap steps based on skill gaps."""
    
    ROADMAP_CATALOG = {
        "Node.js": {
            "title": "Node.js & Runtime Essentials",
            "course": "Node.js Core Concepts",
            "project": "Build an Async REST API Middleware"
        },
        "Express.js": {
            "title": "Express.js Backend Framework",
            "course": "Express Route Controllers",
            "project": "Build an Invoice Generation API"
        },
        "MongoDB": {
            "title": "NoSQL Database Integration",
            "course": "MongoDB Data Modeling & Indexing",
            "project": "Build a Document Store Engine"
        }
    }

    @classmethod
    def get_learning_path(cls, skill_gaps: List[str]) -> List[Dict[str, Any]]:
        roadmap = []
        for idx, gap in enumerate(skill_gaps, 1):
            details = cls.ROADMAP_CATALOG.get(gap, {
                "title": f"Master {gap}",
                "course": f"Advanced {gap} Guide",
                "project": f"Build a {gap} Project"
            })
            roadmap.append({
                "step": idx,
                "skill": gap,
                "title": details["title"],
                "recommended_course": details["course"],
                "target_project": details["project"]
            })
        return roadmap