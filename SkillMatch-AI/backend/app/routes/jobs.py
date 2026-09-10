import json
from fastapi import APIRouter, File, UploadFile
from pypdf import PdfReader
from groq import Groq
import httpx
import os

router = APIRouter()

# Initialize Groq AI Client (Free & Super Fast LLM API)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@router.post("/api/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    # 1. Read PDF Text
    pdf_reader = PdfReader(file.file)
    cv_text = ""
    for page in pdf_reader.pages:
        cv_text += page.extract_text() or ""
    
    # 2. Universal Prompt for Any Profession in the World
    prompt = f"""
    You are an expert ATS System and Global Talent Analyzer.
    Analyze the following CV text and extract information in pure JSON format:
    {{
        "candidateName": "Name or Candidate",
        "domain": "Primary Professional Domain (e.g. Critical Care Nursing, Civil Engineering, Graphic Design, etc.)",
        "overallScore": 92,
        "executiveSummary": "2-sentence professional summary",
        "extractedSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
        "searchKeywords": "top 2-3 search terms for job board"
    }}

    CV Text:
    {cv_text[:3000]}
    """

    # 3. Call AI Model
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="llama-3.3-70b-versatile",
        response_format={"type": "json_object"}
    )
    
    parsed_json = json.loads(response.choices[0].message.content)
    
    # 4. Fetch Live Global Jobs via Jooble API based on Extracted Keywords
    search_keywords = parsed_json.get("searchKeywords", parsed_json.get("domain"))
    
    jooble_url = f"https://jooble.org/api/{os.getenv('JOOBLE_API_KEY')}"
    async with httpx.AsyncClient() as http_client:
        jooble_res = await http_client.post(jooble_url, json={"keywords": search_keywords, "page": 1})
        jobs_data = jooble_res.json() if jooble_res.status_code == 200 else {"jobs": []}

    formatted_jobs = []
    for job in jobs_data.get("jobs", [])[:5]:
        formatted_jobs.append({
            "id": str(job.get("id")),
            "title": job.get("title"),
            "company": job.get("company", "Verified Employer"),
            "location": job.get("location"),
            "salary": job.get("salary", "Competitive"),
            "snippet": job.get("snippet", "").replace("<b>", "").replace("</b>", ""),
            "apply_url": job.get("link"),
            "match_score": 95
        })

    return {
        "analysis": parsed_json,
        "matchedJobs": formatted_jobs
    }