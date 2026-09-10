# 🚀 SkillMatch AI - Career & Skill Matching Platform

**SkillMatch AI** is an AI-powered SaaS application designed to analyze technical skill profiles against market job demands, calculate precise competency match scores, identify skill gaps, and provide structured, actionable learning roadmaps.

---

## ✨ Features

- 📄 **Skill Assessment & Resume Parsing:** Extracts skills from uploaded CVs (PDF/DOCX) or manual user inputs.
- 🧠 **AI Skill Analysis:** Evaluates candidate competency coverage and calculates ATS match scores using advanced LLM processing.
- 💼 **Job Recommendation Engine:** Computes real-time match percentage scores against live global career opportunities.
- 🗺️ **Personalized Roadmaps:** Recommends targeted courses and projects to bridge identified skill gaps.
- 💻 **Modern Dashboard UI:** Reactive dark-mode dashboard built with React, Tailwind CSS, and Lucide icons.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Lucide React, Vite
- **Backend:** Python, FastAPI, Uvicorn, Groq API (Llama-3)
- **Version Control:** Git & GitHub

---

## 🚀 Running Locally

### 1. Backend Setup (FastAPI)

Open a terminal and navigate to the backend directory:

```bash
cd backend

# Create and activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload
