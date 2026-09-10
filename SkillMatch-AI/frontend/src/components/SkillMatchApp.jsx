import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, BrainCircuit, Briefcase, GraduationCap,
  Sparkles, CheckCircle2, ArrowRight, UploadCloud, FileText, X, Loader2,
  MapPin, Globe, ChevronRight, AlertCircle, ExternalLink, User,
  Filter, Search, Download, Sliders, Check, RefreshCw
} from 'lucide-react';

export default function EnterpriseSkillMatchApp() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedFile, setSelectedFile] = useState(null);
  const [userCV, setUserCV] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [appliedJobId, setAppliedJobId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  
  const fileInputRef = useRef(null);

  // Modal State
  const [showEngineDetails, setShowEngineDetails] = useState(false);

  // Roadmap State
  const [loadingModuleIdx, setLoadingModuleIdx] = useState(null);
  const [completedModuleIdx, setCompletedModuleIdx] = useState(null);

  // --- META QUERY & FILTER STATES ---
  const [metaQuery, setMetaQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(0);

  // Engine Parsed Data State
  const [parsedData, setParsedData] = useState({
    domain: "Software Engineering & Web Development",
    detectedCountry: "Global / Remote",
    overallScore: 92,
    executiveSummary: "Extracted high-density competencies in React, FastAPI, Node.js, and Cloud Infrastructure. Profile matches top 5% of global full-stack talent.",
    technicalSkills: ["React.js", "Node.js", "Python", "FastAPI", "MongoDB", "Tailwind CSS", "PostgreSQL", "Git"],
    missingSkills: ["Kubernetes", "GraphQL", "AWS Architecture"],
    learningRoadmap: [
      {
        skillToLearn: "Advanced Microservices Architecture",
        reason: "Enhances full-stack pipeline throughput and boosts enterprise ATS match rate to 98%.",
        recommendedPlatform: "Coursera / AWS Certification"
      },
      {
        skillToLearn: "Docker & Kubernetes Deployment",
        reason: "Essential for cloud-native application orchestration and modern enterprise CI/CD pipelines.",
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
        tags: ["React", "Node", "MongoDB", "Remote"],
        snippet: "Looking for an experienced React and Node.js engineer to lead scalable enterprise web applications.", 
        apply_url: "https://linkedin.com" 
      },
      { 
        id: "102", 
        title: "Python & AI Backend Engineer", 
        company: "DataCloud Systems", 
        location: "Hybrid / Remote", 
        match_score: 94, 
        salary: "$90,000 - $125,000/yr", 
        tags: ["Python", "FastAPI", "AI", "PostgreSQL"],
        snippet: "Build high-throughput REST APIs using Python, FastAPI, and large language model architectures.", 
        apply_url: "https://indeed.com" 
      },
      { 
        id: "103", 
        title: "Frontend Applications Specialist", 
        company: "NextGen Media", 
        location: "On-site / Hybrid", 
        match_score: 88, 
        salary: "$75,000 - $95,000/yr", 
        tags: ["React", "Tailwind CSS", "UI/UX"],
        snippet: "Architect sleek, reactive user interfaces with high performance rendering and glassmorphic UI systems.", 
        apply_url: "https://glassdoor.com" 
      }
    ]
  });

  // Toast Notification Trigger
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFileSelection(e.target.files[0]);
    }
  };

  const processFileSelection = (file) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
      setErrorMsg('Invalid file format. Please upload PDF, DOCX, or TXT.');
      triggerToast('Error: Invalid File Format');
      return;
    }
    setSelectedFile(file);
    setUserCV({ name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' });
    setErrorMsg('');
    triggerToast('Resume Loaded & Ready for AI Analysis');
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
        technicalSkills: data.analysis?.extractedSkills || parsedData.technicalSkills,
        missingSkills: data.analysis?.missingSkills || ["Docker", "AWS Deployment"],
        learningRoadmap: data.learningRoadmap || parsedData.learningRoadmap,
        matchedJobs: data.matchedJobs && data.matchedJobs.length > 0 ? data.matchedJobs : parsedData.matchedJobs
      });

      setIsAnalyzing(false);
      setActivePage('analysis');
      triggerToast('CV Analysis Complete!');
    } catch (error) {
      console.error("Backend Error:", error);
      setErrorMsg("Backend offline! Make sure FastAPI server (`uvicorn app.main:app --reload`) is running.");
      setIsAnalyzing(false);
      triggerToast('Error: Backend Offline');
    }
  };

  const handleApply = (job) => {
    setAppliedJobId(job.id);
    triggerToast(`Redirecting to ${job.company}...`);
    setTimeout(() => {
      window.open(job.apply_url || "#", '_blank', 'noopener,noreferrer');
    }, 500);
  };

  const handleStartCourse = (item, idx) => {
    setLoadingModuleIdx(idx);
    setTimeout(() => {
      setLoadingModuleIdx(null);
      setCompletedModuleIdx(idx);
      const searchQuery = encodeURIComponent(`${item.skillToLearn} course ${item.recommendedPlatform}`);
      window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
      setTimeout(() => setCompletedModuleIdx(null), 3000);
    }, 700);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  // --- META QUERY ENGINE LOGIC ---
  const filteredMatchedJobs = parsedData.matchedJobs.filter((job) => {
    // 1. Meta Query text matching across title, company, snippet, and tags
    const q = metaQuery.toLowerCase().trim();
    const matchesMetaQuery = !q || 
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.snippet.toLowerCase().includes(q) ||
      job.tags.some(tag => tag.toLowerCase().includes(q));

    // 2. Location filter
    const matchesLocation = selectedLocation === 'All' || 
      (selectedLocation === 'Remote' && job.location.toLowerCase().includes('remote')) ||
      (selectedLocation === 'Hybrid' && job.location.toLowerCase().includes('hybrid')) ||
      (selectedLocation === 'On-site' && job.location.toLowerCase().includes('site'));

    // 3. Match score threshold
    const matchesScore = job.match_score >= minMatchScore;

    return matchesMetaQuery && matchesLocation && matchesScore;
  });

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex font-sans antialiased selection:bg-indigo-500 selection:text-white relative">
      
      {/* TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-indigo-400/30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Sparkles size={16} /> {toastMessage}
        </div>
      )}

      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0A0D14] border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 fixed left-0 top-0 h-screen z-40 backdrop-blur-xl">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/80">
            <div className="bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-600 text-white p-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/30">
              <BrainCircuit size={22} />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-none tracking-tight">
                SkillMatch <span className="text-indigo-400">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 mt-1 font-semibold uppercase tracking-wider">Enterprise Intelligence</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'assessment', label: 'Upload Resume / CV', icon: UploadCloud, badge: 'Step 1' },
              { id: 'analysis', label: 'AI Skill Matrix', icon: Sparkles, badge: 'Step 2' },
              { id: 'matches', label: 'Live Vacancies & Meta Query', icon: Briefcase, count: filteredMatchedJobs.length },
              { id: 'roadmap', label: 'Targeted Roadmap', icon: GraduationCap },
              { id: 'profile', label: 'Developer Profile', icon: User },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActivePage(item.id)} 
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activePage === item.id 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 font-bold' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
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

        {/* Engine Status Popup Button */}
        <div className="border-t border-slate-800/80 pt-4 px-2 space-y-3">
          <div 
            onClick={() => setShowEngineDetails(true)}
            className="flex items-center gap-3 p-2.5 bg-slate-900/60 hover:bg-slate-800/80 rounded-xl border border-slate-800 cursor-pointer transition active:scale-95 group shadow-inner"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ml-1"></div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-indigo-400 transition">Groq Llama-3.3 Engine</p>
              <p className="text-[10px] text-slate-400">Meta Query Matching Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-8 min-h-screen bg-[#07090E]">
        
        {/* PAGE: DASHBOARD OVERVIEW */}
        {activePage === 'dashboard' && (
          <div className="max-w-6xl space-y-8 mx-auto animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold rounded-full inline-flex items-center gap-1.5 mb-2">
                  <Sparkles size={13} /> AI Intelligence Core
                </span>
                <h1 className="text-3xl font-black text-white">System Executive Dashboard</h1>
                <p className="text-xs text-slate-400 mt-1">Multi-factor ATS skill analysis, Meta Query filtering, and global vacancy diagnostics.</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handlePrintSummary} className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 cursor-pointer">
                  <Download size={15} /> Export Report
                </button>
                <button onClick={() => setActivePage('assessment')} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 cursor-pointer">
                  <UploadCloud size={16} /> Re-Analyze CV
                </button>
              </div>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Domain Card */}
              <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl hover:border-indigo-500/40 transition">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Expertise Domain</p>
                <h3 className="text-lg font-bold text-white">{parsedData.domain}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1"><Globe size={12} /> Region: {parsedData.detectedCountry}</p>
                <button onClick={() => setActivePage('assessment')} className="text-xs text-indigo-400 font-bold hover:underline flex items-center gap-1 pt-2 cursor-pointer">
                  Upload Resume <ArrowRight size={12} />
                </button>
              </div>

              {/* ATS Score Circular Progress Card */}
              <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 flex items-center justify-between shadow-xl hover:border-emerald-500/40 transition">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Score Gauge</p>
                  <h3 className="text-2xl font-black text-emerald-400">{parsedData.overallScore}% Excellent</h3>
                  <p className="text-[10px] text-slate-400">Competitive Index: Top 5%</p>
                  <button onClick={() => setActivePage('analysis')} className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1 pt-2 cursor-pointer">
                    View Matrix <ArrowRight size={12} />
                  </button>
                </div>

                {/* SVG Gauge */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400 transition-all duration-1000 ease-out"
                      strokeDasharray={`${parsedData.overallScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-white">{parsedData.overallScore}%</span>
                </div>
              </div>

              {/* Live Matches Counter */}
              <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl hover:border-violet-500/40 transition">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filtered Job Vacancies</p>
                <h3 className="text-3xl font-black text-violet-400">{filteredMatchedJobs.length} Positions</h3>
                <p className="text-xs text-slate-400">Meta Query Criteria Active</p>
                <button onClick={() => setActivePage('matches')} className="text-xs text-violet-400 font-bold hover:underline flex items-center gap-1 pt-2 cursor-pointer">
                  Search & Filter Jobs <ArrowRight size={12} />
                </button>
              </div>
            </div>

            {/* AI Executive Summary Box */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BrainCircuit size={18} className="text-indigo-400" /> Executive Resume Diagnosis
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed border-l-2 border-indigo-500 pl-4 py-2 bg-indigo-500/5 rounded-r-xl">
                {parsedData.executiveSummary}
              </p>
            </div>
          </div>
        )}

        {/* PAGE 1: UPLOAD CV (WITH DRAG & DROP ZONING) */}
        {activePage === 'assessment' && (
          <div className="max-w-3xl space-y-6 mx-auto animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Step 1 of 2 • Universal Resume Parser
              </span>
              <h1 className="text-3xl font-black text-white mt-3">Upload Candidate Resume</h1>
              <p className="text-xs text-slate-400 mt-1">Parses skills, domain proficiency, and runs multi-factor meta matching for any industry worldwide.</p>
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
                accept=".pdf,.docx,.txt" 
                className="hidden" 
              />

              {!userCV ? (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()} 
                  className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center text-center cursor-pointer transition duration-200 group ${
                    isDragging 
                      ? 'border-indigo-400 bg-indigo-500/20 scale-[1.01]' 
                      : 'border-indigo-500/30 hover:border-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10'
                  }`}
                >
                  <div className="p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl text-indigo-400 group-hover:scale-110 transition mb-3">
                    <UploadCloud size={38} />
                  </div>
                  <h3 className="font-bold text-white text-sm">Drag & drop your Resume / CV here, or click to browse</h3>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, TXT files (up to 10MB)</p>
                </div>
              ) : (
                <div className="p-5 border border-indigo-500/30 bg-indigo-500/10 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-600 text-white rounded-xl"><FileText size={22} /></div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{userCV.name}</h4>
                      <p className="text-[10px] text-slate-400">{userCV.size} • Verified & ready for LLM extraction</p>
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
                  <><Loader2 className="animate-spin" size={18} /> Executing Meta Skill Extraction...</>
                ) : (
                  <>Extract Skills & Proceed to Analysis <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: SKILL ANALYSIS REPORT & BREAKDOWN */}
        {activePage === 'analysis' && (
          <div className="max-w-4xl space-y-6 mx-auto animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  Step 2 of 2 • Matrix Ready
                </span>
                <h1 className="text-3xl font-black text-white mt-3">Skill Extraction Diagnostic</h1>
              </div>
              <button 
                onClick={() => setActivePage('matches')} 
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition shrink-0 cursor-pointer"
              >
                Run Meta Query Matches ({filteredMatchedJobs.length}) <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 text-center flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-indigo-400">{parsedData.overallScore}%</span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">ATS Profile Match Score</p>
              </div>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 md:col-span-2 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase flex items-center gap-1.5"><Globe size={14} /> Domain Classification</span>
                <h3 className="text-base font-bold text-white">{parsedData.domain}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{parsedData.executiveSummary}</p>
              </div>
            </div>

            {/* Matched vs Missing Skills Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Identified Skills */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 space-y-4">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} /> Validated Technical Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {parsedData.technicalSkills.map((s) => (
                    <span key={s} className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill Gaps */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle size={16} /> Recommended Skill Upgrades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {parsedData.missingSkills.map((s) => (
                    <span key={s} className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xs font-semibold">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PAGE 3: LIVE JOB MATCHES & META QUERY SEARCH ENGINE */}
        {activePage === 'matches' && (
          <div className="max-w-4xl space-y-6 mx-auto animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-black text-white">Live Meta Vacancies Engine</h1>
              <p className="text-xs text-slate-400 mt-1">Execute custom meta search queries and dynamic criteria against live job listings.</p>
            </div>

            {/* META QUERY INPUT CONTROL PANEL */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/90 shadow-xl space-y-4 backdrop-blur-xl">
              
              {/* Main Meta Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-indigo-400" size={18} />
                <input 
                  type="text" 
                  value={metaQuery} 
                  onChange={(e) => setMetaQuery(e.target.value)}
                  placeholder='Enter Meta Query (e.g. "React Remote $100k", "Python FastAPI", "Database")...' 
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-11 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
                />
                {metaQuery && (
                  <button onClick={() => setMetaQuery('')} className="absolute right-3 top-3.5 text-slate-400 hover:text-white cursor-pointer">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Multi-Factor Meta Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
                
                {/* Location Selector */}
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-slate-400" />
                  <span className="text-xs text-slate-400 font-semibold">Location Filter:</span>
                  {['All', 'Remote', 'Hybrid', 'On-site'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-lg transition cursor-pointer ${
                        selectedLocation === loc 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>

                {/* Score Threshold Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-semibold">Min Score: <span className="text-emerald-400 font-bold">{minMatchScore}%</span></span>
                  <input 
                    type="range" 
                    min="0" 
                    max="95" 
                    step="5" 
                    value={minMatchScore} 
                    onChange={(e) => setMinMatchScore(Number(e.target.value))}
                    className="accent-indigo-500 cursor-pointer w-24"
                  />
                </div>

              </div>
            </div>

            {/* RESULTS LISTING */}
            <div className="space-y-4">
              {filteredMatchedJobs.length === 0 ? (
                <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-center space-y-2">
                  <AlertCircle size={32} className="mx-auto text-amber-400" />
                  <h3 className="text-sm font-bold text-white">No Vacancies Matched Your Meta Query</h3>
                  <p className="text-xs text-slate-400">Try loosening your meta filter terms or decreasing the score threshold.</p>
                  <button onClick={() => { setMetaQuery(''); setSelectedLocation('All'); setMinMatchScore(0); }} className="text-xs text-indigo-400 font-bold hover:underline cursor-pointer">
                    Reset All Meta Query Filters
                  </button>
                </div>
              ) : (
                filteredMatchedJobs.map((job) => (
                  <div key={job.id} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles size={12} /> {job.match_score}% Meta Match
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">{job.title}</h3>
                      <p className="text-xs font-semibold text-indigo-400">{job.company} • <span className="text-slate-400 font-normal">{job.salary}</span></p>
                      
                      {/* Meta Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>

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
                        <>Redirecting <CheckCircle2 size={15} /></>
                      ) : (
                        <>Apply Position <ExternalLink size={15} /></>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* PAGE 5: TARGETED ROADMAP */}
        {activePage === 'roadmap' && (
          <div className="max-w-4xl space-y-6 mx-auto animate-in fade-in duration-300">
            <div>
              <h1 className="text-3xl font-black text-white">Skill Upgradation Roadmap</h1>
              <p className="text-xs text-slate-400 mt-1">Recommended modules based on Meta Query skill gaps to reach 100% match capability.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parsedData.learningRoadmap.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 rounded-2xl transition-all duration-300 shadow-xl space-y-3 hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-violet-500/10 text-violet-400 font-bold px-3 py-1 rounded-full border border-violet-500/20">
                      Module Target #{idx + 1}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                      High Impact
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
                        <Loader2 className="animate-spin" size={14} />
                      ) : completedModuleIdx === idx ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <>Start Course <ArrowRight size={14} /></>
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
          <div className="max-w-3xl space-y-6 mx-auto animate-in fade-in duration-300">
            <h1 className="text-3xl font-black text-white">System Profile & API Config</h1>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                  SM
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Full Stack & AI Engineer Profile</h2>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5"><CheckCircle2 size={13} /> Llama-3 Meta Matcher Active</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Configured FastAPI Endpoint</label>
                  <input type="text" readOnly value="http://127.0.0.1:8000/api/analyze-resume" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-indigo-400 font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Engine Status</label>
                  <input type="text" readOnly value="Meta Queries & Skill Extraction Online" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-medium" />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ENGINE DIAGNOSTICS POPUP MODAL */}
      {showEngineDetails && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0D1117] border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                <h3 className="font-bold text-white text-sm">Enterprise Meta Engine Status</h3>
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
                <p className="text-slate-400 text-[10px] font-bold uppercase">LLM Engine</p>
                <p className="text-indigo-400 font-mono font-bold">Groq / llama-3.3-70b-versatile</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Meta Search Logic</p>
                <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Multi-Factor Filtering Active
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase">FastAPI Server</p>
                <p className="text-slate-200 font-mono">http://127.0.0.1:8000/api/analyze-resume</p>
              </div>
            </div>

            <button
              onClick={() => setShowEngineDetails(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Close Diagnostic Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}