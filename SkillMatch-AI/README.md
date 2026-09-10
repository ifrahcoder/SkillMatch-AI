# SkillMatch AI - Career & Skill Matching Platform

An AI-powered SaaS application designed to analyze technical skill profiles against market job demands, calculate precise competency match scores, identify skill gaps, and provide structured learning roadmaps.

## Features
- **Skill Assessment & Resume Parsing**: Extracts skills from CV files or user inputs.
- **AI Skill Analysis**: Cosine similarity algorithm for evaluating competency coverage.
- **Job Recommendation Engine**: Match percentage scoring per career role.
- **Personalized Roadmaps**: Course and project recommendations for identified skill gaps.

## Running Locally
1. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
cd "D:\SkilMatch AI\SkillMatch-AI\frontend"
npm run dev
cd "D:\SkilMatch AI\SkillMatch-AI\backend"
# 1. Virtual environment activate karein
.\venv\Scripts\activate

# 2. FastAPI server start karein
uvicorn app.main:app --reload