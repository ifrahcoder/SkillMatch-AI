from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_parser import ResumeParser

router = APIRouter(prefix="/api/resume", tags=["Resume Processing"])

@router.post("/parse")
async def parse_resume_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF and TXT formats allowed")
    
    content = await file.read()
    extracted_skills = ResumeParser.extract_skills_from_text(content.decode("utf-8", errors="ignore"))
    return {"filename": file.filename, "detected_skills": extracted_skills}