import React from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Sparkles, 
  Briefcase, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight, 
  Cpu, 
  ChevronRight,
  BookOpen,
  Layers,
  Globe
} from 'lucide-react';

const Dashboard = ({ apiData }) => {
  const analysis = apiData?.analysis || {
    domain: "Software Engineering & Web Development",
    detectedCountry: "Global / Remote",
    overallScore: 95,
    executiveSummary: "Candidate exhibits exceptional mastery in high-throughput web engineering, RESTful microservices, and modern frontend frameworks.",
    extractedSkills: ["React.js", "Node.js", "Python", "FastAPI", "MongoDB", "Tailwind CSS"]
  };

  const learningRoadmap = apiData?.learningRoadmap || [
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
  ];

  const matchedJobs = apiData?.matchedJobs || [
    { 
      id: "j1",
      title: 'Full Stack Developer (React & Node)', 
      company: 'TechScale Global', 
      match_score: 98, 
      salary: '$80,000 - $110,000 / yr', 
      location: 'Remote',
      snippet: 'Looking for an experienced React and Node.js engineer to lead full-stack web applications.',
      apply_url: '#' 
    },
    { 
      id: "j2",
      title: 'Python & AI Backend Engineer', 
      company: 'DataCloud Systems', 
      match_score: 94, 
      salary: '$90,000 - $125,000 / yr', 
      location: 'Hybrid / Remote',
      snippet: 'Build high-throughput REST APIs using Python, FastAPI, and AI integration pipelines.',
      apply_url: '#' 
    },
  ];

  return (
    <div className="flex bg-[#0B0F17] min-h-screen font-sans text-slate-200">
      <Sidebar activePage="dashboard" />

      <main className="ml-64 flex-1 p-8 max-w-[1600px]">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold rounded-full flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Groq AI Dynamic Engine Active
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">System Overview</h1>
            <p className="text-slate-400 text-sm mt-1">AI-driven skill diagnostics, ATS scoring, and live global opportunity matching.</p>
          </div>

          <button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all duration-300 flex items-center gap-2 active:scale-95">
            <Sparkles size={16} /> Re-Analyze CV
          </button>
        </header>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-indigo-500/50 p-5 rounded-2xl transition-all shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-400">Current Domain</span>
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20"><Layers size={20} /></div>
            </div>
            <h3 className="text-base font-bold text-white truncate">{analysis.domain}</h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Globe size={12} /> {analysis.detectedCountry}</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/50 p-5 rounded-2xl transition-all shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-400">ATS Profile Score</span>
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20"><Award size={20} /></div>
            </div>
            <h3 className="text-3xl font-black text-white">{analysis.overallScore}%</h3>
            <p className="text-xs text-slate-500 mt-1">Optimization Rank: Top Tier</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-violet-500/50 p-5 rounded-2xl transition-all shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-400">Live Vacancies</span>
              <div className="p-2.5 bg-violet-500/10 text-violet-400 rounded-xl border border-violet-500/20"><Briefcase size={20} /></div>
            </div>
            <h3 className="text-3xl font-black text-white">{matchedJobs.length}</h3>
            <p className="text-xs text-slate-500 mt-1">Matched Real-time</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/50 p-5 rounded-2xl transition-all shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase text-slate-400">Skill Growth Targets</span>
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20"><TrendingUp size={20} /></div>
            </div>
            <h3 className="text-3xl font-black text-white">{learningRoadmap.length}</h3>
            <p className="text-xs text-slate-500 mt-1">Recommended Certifications</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2.5 mb-3">
                <Cpu size={18} className="text-indigo-400" />
                <h2 className="text-lg font-bold text-white">AI Executive Summary</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-indigo-500 pl-4 py-1 bg-indigo-500/5 rounded-r-lg">
                {analysis.executiveSummary}
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Extracted Skill Matrix</h2>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 font-semibold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Verified
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {analysis.extractedSkills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-800/60 hover:bg-indigo-600/20 border border-slate-700/80 hover:border-indigo-500/50 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 transition-all flex items-center gap-2 cursor-pointer">
                    <Zap size={14} className="text-indigo-400" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-6">Live Job Matches</h2>
              <div className="space-y-4">
                {matchedJobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-xl border border-slate-800 bg-slate-800/20 hover:bg-slate-800/50 transition-all">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-white text-sm">{job.title}</h3>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-2.5 py-0.5 rounded-full">{job.match_score}% Match</span>
                    </div>
                    <p className="text-xs text-indigo-400 font-medium">{job.company}</p>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{job.snippet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;