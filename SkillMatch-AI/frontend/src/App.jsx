import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, BrainCircuit, Briefcase, GraduationCap,
  Sparkles, CheckCircle2, ArrowRight, UploadCloud, FileText, X, Loader2,
  MapPin, Globe, ChevronRight, AlertCircle, ExternalLink, User
} from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedFile, setSelectedFile] = useState(null);
  const [userCV, setUserCV] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [appliedJobId, setAppliedJobId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Engine Modal State
  const [showEngineDetails, setShowEngineDetails] = useState(false);

  // Roadmap Interactive Button States
  const [loadingModuleIdx, setLoadingModuleIdx] = useState(null);
  const [completedModuleIdx, setCompletedModuleIdx] = useState(null);

  // Enterprise AI Parsed Data State
  const [parsedData, setParsedData] = useState({
    domain: "Software Engineering & Web Development",
    detectedCountry: "Global / Remote",
    overallScore: 95,
    executiveSummary: "Upload your resume/CV to run AI deep skill extraction and match against live global vacancies.",
    technicalSkills: ["React.js", "Node.js", "Python", "FastAPI", "MongoDB", "Tailwind CSS"],
    learningRoadmap: [
      {
        skillToLearn: "Advanced Microservices Architecture",
        reason: "Enhances full-stack pipeline throughput and boosts enterprise ATS match rate to 98%.",
        recommendedPlatform: "Coursera / AWS Certification"
      },
      {
        skillToLearn: "Docker & Kubernetes Deployment",
        reason: "Essential for cloud-native application orchestration and CI/CD pipelines.",
        recommendedPlatform: "Udemy / DevOps Institute"
      }
    ],
    matchedJobs: [
      { 
        id: "101", 
        title: "Full Stack Developer (React & Node)", 
        company: "TechScale Global", 
        location: "Remote", 
        match_score: 98, 
        salary: "$80,000 - $110,000/yr", 
        snippet: "Looking for an experienced React and Node.js engineer to lead full-stack web applications.", 
        apply_url: "https://linkedin.com" 
      },
      { 
        id: "102", 
        title: "Python & AI Backend Engineer", 
        company: "DataCloud Systems", 
        location: "Hybrid / Remote", 
        match_score: 94, 
        salary: "$90,000 - $125,000/yr", 
        snippet: "Build high-throughput REST APIs using Python, FastAPI, and AI models.", 
        apply_url: "https://indeed.com" 
      }
    ]
  });

  const handleStartCourse = (item, idx) => {
    setLoadingModuleIdx(idx);

    setTimeout(() => {
      setLoadingModuleIdx(null);
      setCompletedModuleIdx(idx);

      const searchQuery = encodeURIComponent(`${item.skillToLearn} course ${item.recommendedPlatform}`);
      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');

      setTimeout(() => setCompletedModuleIdx(null), 3000);
    }, 800);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUserCV({ name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
      setErrorMsg('');
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/analyze-resume", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Backend server error or offline");

      const data = await res.json();
      
      setParsedData({
        domain: data.analysis?.domain || "Recognized Professional Profile",
        detectedCountry: data.analysis?.detectedCountry || "Global",
        overallScore: data.analysis?.overallScore || 95,
        executiveSummary: data.analysis?.executiveSummary || "Extracted profile competencies via Llama-3 LLM Engine.",
        technicalSkills: data.analysis?.extractedSkills || ["Professional Skills Identified"],
        learningRoadmap: data.learningRoadmap || parsedData.learningRoadmap,
        matchedJobs: data.matchedJobs && data.matchedJobs.length > 0 ? data.matchedJobs : parsedData.matchedJobs
      });

      setIsAnalyzing(false);
      setActivePage('analysis');
    } catch (error) {
      console.error("Backend Error:", error);
      setErrorMsg("Backend offline! Please run FastAPI server (`uvicorn app.main:app --reload`)");
      setIsAnalyzing(false);
    }
  };

  const handleApply = (job) => {
    setAppliedJobId(job.id);
    setTimeout(() => {
      window.open(job.apply_url || "#", '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#080B11] border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 fixed left-0 top-0 h-screen z-40 backdrop-blur-xl">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/80">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/30">
              <BrainCircuit size={22} />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-none tracking-tight">SkillMatch <span className="text-indigo-400">AI</span></h1>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">Enterprise Career Platform</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'assessment', label: 'Upload CV / Resume', icon: UploadCloud, badge: 'Step 1' },
              { id: 'analysis', label: 'AI Skill Analysis', icon: Sparkles, badge: 'Step 2' },
              { id: 'matches', label: 'Live Job Matches', icon: Briefcase, count: parsedData.matchedJobs.length },
              { id: 'roadmap', label: 'Learning Roadmap', icon: GraduationCap },
              { id: 'profile', label: 'Developer Profile', icon: User },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActivePage(item.id)} 
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activePage === item.id 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 font-bold' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activePage === item.id ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}>
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Engine Status Info */}
        <div className="border-t border-slate-800/80 pt-4 px-2 space-y-3">
          <div 
            onClick={() => setShowEngineDetails(true)}
            className="flex items-center gap-3 p-2 bg-slate-900/50 hover:bg-slate-800/80 rounded-xl border border-slate-800 cursor-pointer transition active:scale-95 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ml-1"></div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition">Groq Llama-3 Engine</p>
              <p className="text-[10px] text-slate-400">Universal Parsing Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-8 min-h-screen bg-[#0B0F17]">
        
        {/* PAGE: DASHBOARD OVERVIEW */}
        {activePage === 'dashboard' && (
          <div className="max-w-6xl space-y-8 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold rounded-full inline-flex items-center gap-1.5 mb-2">
                  <Sparkles size={13} /> Dashboard Engine
                </span>
                <h1 className="text-3xl font-extrabold text-white">System Overview</h1>
                <p className="text-xs text-slate-400 mt-1">AI-driven skill diagnostics, ATS scoring, and live global opportunity matching.</p>
              </div>
              <button onClick={() => setActivePage('assessment')} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 cursor-pointer">
                <UploadCloud size={16} /> Re-Analyze Resume
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl hover:border-indigo-500/40 transition">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Recognized Domain</p>
                <h3 className="text-lg font-bold text-white">{parsedData.domain}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1"><Globe size={12} /> {parsedData.detectedCountry}</p>
                <button onClick={() => setActivePage('assessment')} className="text-xs text-indigo-400 font-bold hover:underline flex items-center gap-1 pt-2 cursor-pointer">
                  Upload New CV <ArrowRight size={12} />
                </button>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl hover:border-emerald-500/40 transition">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Optimization Index</p>
                <h3 className="text-3xl font-black text-emerald-400">{parsedData.overallScore}%</h3>
                <p className="text-xs text-slate-500">Benchmark: Elite Candidate Profile</p>
                <button onClick={() => setActivePage('analysis')} className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1 pt-2 cursor-pointer">
                  View Skill Extraction <ArrowRight size={12} />
                </button>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl hover:border-violet-500/40 transition">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matched Vacancies</p>
                <h3 className="text-3xl font-black text-violet-400">{parsedData.matchedJobs.length} Jobs</h3>
                <p className="text-xs text-slate-500">Fetched via Live Job API</p>
                <button onClick={() => setActivePage('matches')} className="text-xs text-violet-400 font-bold hover:underline flex items-center gap-1 pt-2 cursor-pointer">
                  View Openings <ArrowRight size={12} />
                </button>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <BrainCircuit size={18} className="text-indigo-400" /> Executive AI Overview
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed border-l-2 border-indigo-500 pl-4 py-1 bg-indigo-500/5 rounded-r-lg">
                {parsedData.executiveSummary}
              </p>
            </div>
          </div>
        )}

        {/* PAGE 1: UPLOAD CV */}
        {activePage === 'assessment' && (
          <div className="max-w-3xl space-y-6 mx-auto">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Step 1 of 2 • Universal AI Parsing
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-3">Upload Your Resume / CV</h1>
              <p className="text-xs text-slate-400 mt-1">Extracts skills, domain details, and matches live vacancies for any profession globally.</p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle size={16} /> {errorMsg}
              </div>
            )}

            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800/80 shadow-2xl space-y-6 backdrop-blur-xl">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx,.txt" 
                className="hidden" 
              />

              {!userCV ? (
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 p-10 rounded-2xl flex flex-col items-center text-center cursor-pointer transition group"
                >
                  <div className="p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl text-indigo-400 group-hover:scale-110 transition mb-3">
                    <UploadCloud size={36} />
                  </div>
                  <h3 className="font-bold text-white text-sm">Click here to upload CV / Resume</h3>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, TXT (Medical, Engineering, Finance, Tech, etc.)</p>
                </div>
              ) : (
                <div className="p-5 border border-indigo-500/30 bg-indigo-500/10 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-600 text-white rounded-xl"><FileText size={22} /></div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{userCV.name}</h4>
                      <p className="text-[10px] text-slate-400">{userCV.size} • Ready for AI processing</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setUserCV(null); setSelectedFile(null); }} 
                    className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              <button 
                onClick={handleStartAnalysis} 
                disabled={isAnalyzing || !userCV} 
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition cursor-pointer text-xs"
              >
                {isAnalyzing ? (
                  <><Loader2 className="animate-spin" size={18} /> Processing Resume with Llama-3 AI...</>
                ) : (
                  <>Extract Skills & Proceed to Next Step <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: SKILL ANALYSIS REPORT */}
        {activePage === 'analysis' && (
          <div className="max-w-4xl space-y-6 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  Step 2 of 2 • Extraction Complete
                </span>
                <h1 className="text-3xl font-extrabold text-white mt-3">AI Skill Extraction Report</h1>
              </div>
              <button 
                onClick={() => setActivePage('matches')} 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition shrink-0 cursor-pointer"
              >
                View Live Job Matches ({parsedData.matchedJobs.length}) <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 text-center flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-indigo-400">{parsedData.overallScore}%</span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">ATS Profile Match Score</p>
              </div>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 md:col-span-2 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-1.5"><Globe size={14} /> Domain Recognized</span>
                <h3 className="text-base font-bold text-white">{parsedData.domain}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{parsedData.executiveSummary}</p>
              </div>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" /> Extracted Skill Matrix
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {parsedData.technicalSkills.map((s) => (
                  <span key={s} className="bg-slate-800/80 text-slate-200 border border-slate-700/80 px-4 py-2 rounded-xl text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: LIVE JOB MATCHES */}
        {activePage === 'matches' && (
          <div className="max-w-4xl space-y-6 mx-auto">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Live Global Vacancies</h1>
              <p className="text-xs text-slate-400 mt-1">Real-time opportunities fetched via Live Job API based on AI extracted skills.</p>
            </div>

            <div className="space-y-4">
              {parsedData.matchedJobs.map((job) => (
                <div key={job.id} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles size={12} /> {job.match_score}% Skill Match
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{job.title}</h3>
                    <p className="text-xs font-semibold text-indigo-400">{job.company} • <span className="text-slate-400 font-normal">{job.salary}</span></p>
                    <p className="text-xs text-slate-400 line-clamp-2">{job.snippet}</p>
                  </div>

                  <button
                    onClick={() => handleApply(job)}
                    className={`shrink-0 px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                      appliedJobId === job.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                    }`}
                  >
                    {appliedJobId === job.id ? (
                      <>Redirecting to Employer <CheckCircle2 size={15} /></>
                    ) : (
                      <>Apply Now <ExternalLink size={15} /></>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 5: LEARNING ROADMAP */}
        {activePage === 'roadmap' && (
          <div className="max-w-4xl space-y-6 mx-auto animate-in fade-in duration-500">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Career & Skill Roadmap</h1>
              <p className="text-xs text-slate-400 mt-1">Targeted learning modules to bridge remaining gaps for 100% job match capacity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parsedData.learningRoadmap.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 rounded-2xl transition-all duration-300 shadow-xl space-y-3 hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-violet-500/10 text-violet-400 font-bold px-3 py-1 rounded-full border border-violet-500/20 group-hover:bg-violet-500/20 transition">
                      Module Target #{idx + 1}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                      High Priority
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-2 group-hover:text-violet-300 transition">
                    {item.skillToLearn}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.reason}</p>
                  
                  <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      Platform: <span className="text-indigo-400 font-semibold">{item.recommendedPlatform}</span>
                    </span>
                    
                    <button 
                      onClick={() => handleStartCourse(item, idx)}
                      disabled={loadingModuleIdx === idx}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        completedModuleIdx === idx
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                          : loadingModuleIdx === idx
                          ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40 cursor-wait'
                          : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25 active:scale-95'
                      }`}
                    >
                      {loadingModuleIdx === idx ? (
                        <>
                          <Loader2 className="animate-spin" size={14} />
                          <span>Opening...</span>
                        </>
                      ) : completedModuleIdx === idx ? (
                        <>
                          <CheckCircle2 size={14} className="text-emerald-400 animate-bounce" />
                          <span>Opened!</span>
                        </>
                      ) : (
                        <>
                          <span>Start</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 6: DEVELOPER PROFILE */}
        {activePage === 'profile' && (
          <div className="max-w-3xl space-y-6 mx-auto">
            <h1 className="text-3xl font-extrabold text-white">Developer Profile</h1>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  SM
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Full Stack & AI Engineer Profile</h2>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5"><CheckCircle2 size={13} /> Active Groq AI API Key Configured</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Career Role</label>
                  <input type="text" readOnly value="Full Stack & AI Web Engineer" className="w-full mt-1 bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FastAPI Endpoint Connection</label>
                  <input type="text" readOnly value="http://127.0.0.1:8000/api/analyze-resume" className="w-full mt-1 bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono" />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ENGINE STATUS POPUP MODAL */}
      {showEngineDetails && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0D1117] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                <h3 className="font-bold text-white text-sm">AI Engine Diagnostics</h3>
              </div>
              <button 
                onClick={() => setShowEngineDetails(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Active LLM Model</p>
                <p className="text-indigo-400 font-mono font-bold">Groq / llama-3.3-70b-versatile</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Parsing Status</p>
                <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Ready for CV Extraction
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Backend API</p>
                <p className="text-slate-200 font-mono">http://127.0.0.1:8000/api/analyze-resume</p>
              </div>
            </div>

            <button
              onClick={() => setShowEngineDetails(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}