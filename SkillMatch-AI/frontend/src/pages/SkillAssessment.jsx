import React from 'react';
import Sidebar from '../components/Sidebar';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillAssessment = ({ apiData }) => {
  const navigate = useNavigate();
  const analysis = apiData?.analysis || {
    domain: "Software Engineering & Web Development",
    overallScore: 92,
    extractedSkills: ["React.js", "Node.js", "Python", "FastAPI", "MongoDB", "Tailwind CSS"]
  };

  return (
    <div className="flex bg-[#0B0F17] min-h-screen text-slate-200">
      <Sidebar activePage="skill-assessment" />
      <main className="ml-64 flex-1 p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">STEP 2 OF 2 • AI EXTRACTION REPORT</span>
            <h1 className="text-3xl font-extrabold text-white mt-2">AI Skill Extraction Report</h1>
          </div>
          <button onClick={() => navigate('/job-matches')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 text-sm">
            View Live Job Matches <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl"><Award size={28} /></div>
            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold">ATS Profile Match</p>
              <h3 className="text-3xl font-black text-white">{analysis.overallScore}%</h3>
            </div>
          </div>
          <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs uppercase text-indigo-400 font-semibold">Domain Recognized</p>
            <h3 className="text-xl font-bold text-white mt-1">{analysis.domain}</h3>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" /> Extracted Skill Matrix
          </h2>
          <div className="flex flex-wrap gap-3">
            {analysis.extractedSkills.map((s, i) => (
              <span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl">{s}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillAssessment;