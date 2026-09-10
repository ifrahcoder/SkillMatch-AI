from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any

class SkillMatchEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()

    def calculate_match_score(self, user_skills: List[str], required_skills: List[str]) -> float:
        """
        TF-IDF Aur Cosine Similarity ke zariye exact match percentage compute karta hai.
        """
        if not user_skills or not required_skills:
            return 0.0

        user_str = " ".join(user_skills).lower()
        req_str = " ".join(required_skills).lower()

        tfidf_matrix = self.vectorizer.fit_transform([user_str, req_str])
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return round(float(similarity) * 100, 2)

    def analyze_skill_gap(self, user_skills: List[str], target_job_skills: List[str]) -> Dict[str, Any]:
        """
        Missing skills identify karta hai aur learning path recommendations generate karta hai.
        """
        user_skills_set = set(s.lower().strip() for s in user_skills)
        target_skills_set = set(s.lower().strip() for s in target_job_skills)

        matching_skills = list(user_skills_set.intersection(target_skills_set))
        missing_skills = list(target_skills_set - user_skills_set)

        total = len(target_skills_set) if len(target_skills_set) > 0 else 1
        coverage_score = round((len(matching_skills) / total) * 100, 1)

        return {
            "overall_score": coverage_score,
            "matching_skills": [s.title() for s in matching_skills],
            "missing_skills": [s.title() for s in missing_skills],
            "gap_count": len(missing_skills)
        }

matcher_engine = SkillMatchEngine()