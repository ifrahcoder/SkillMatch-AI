import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { UploadCloud, FileText, CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillAnalysis = ({ setApiData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    // Mock Process Delay / Replace with direct API fetch
    setTimeout(() => {
      const mockResult = {
        analysis: {
          domain: "Software Engineering & Full Stack Development",
          detectedCountry: "Global Remote",
          overallScore: 92,
          executiveSummary: "Strong technical expertise in modern Web API development, frontend architectures, and data design.",
          extractedSkills: ["React.js", "Node.js", "Python", "FastAPI", "MongoDB", "PostgreSQL", "Tailwind CSS"]
        },
        matchedJobs: [
          { id: "1", title: "Full Stack Engineer", company: "TechCorp", match_score: 95, salary: "$90,000/yr", location: "Remote" }
        ]
      };
      setApiData(mockResult);
      setLoading(false);
      navigate('/skill-assessment');
    }, 1500);
  };

  return (
    <div className="flex bg-[#0B0F17] min-h-screen text-slate-200">
      <Sidebar activePage="skill-analysis" />
      <main className="ml-64 flex-1 p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">STEP 1 OF 2 • UNIVERSAL AI CV PARSING</span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Upload Your Resume / CV</h1>
          <p className="text-slate-400 text-sm">Extract skills, domain details, and live job vacancies across any profession worldwide.</p>
        </div>

        <div className="bg-slate-900/60 border-2 border-dashed border-slate-700/80 hover:border-indigo-500/50 rounded-2xl p-12 text-center transition shadow-2xl">
          <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
            <UploadCloud size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Drag & Drop Resume File</h3>
          <p className="text-xs text-slate-400 mb-6">Supports PDF, DOCX, TXT (Medical, Engineering, Finance, Tech, etc.)</p>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="hidden" 
            id="cv-upload" 
          />
          <label htmlFor="cv-upload" className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-5 py-2.5 rounded-xl border border-slate-700 cursor-pointer transition">
            Browse Document
          </label>
          {file && <p className="text-xs text-emerald-400 font-medium mt-4">Selected: {file.name}</p>}
        </div>

        <button 
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-xl transition flex items-center justify-center gap-2"
        >
          {loading ? <Sparkles className="animate-spin" size={18} /> : "Extract Skills & Proceed to Next Step"} <ArrowRight size={18} />
        </button>
      </main>
    </div>
  );
};

export default SkillAnalysis;