import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between">
      {/* Navbar */}
      <nav className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#0B0F17]/80 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30">
            S
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">SkillMatch <span className="text-indigo-500">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-300 hover:text-white font-medium text-sm transition">Sign In</Link>
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold inline-flex items-center gap-2 mb-6 backdrop-blur-md">
          <Sparkles size={14} /> Next-Gen Universal Career Intelligence Platform
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight mb-6">
          Bridge Your Resume to Global <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">AI Job Vacancies</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Instantly extract skills from any document, benchmark your ATS match score, and uncover automated international job matches powered by Llama-3 and Jooble API.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/skill-analysis" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-indigo-600/30 transition flex items-center gap-2 text-base">
            Upload Resume & Test <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        © 2026 SkillMatch-AI. Enterprise AI Career Portal.
      </footer>
    </div>
  );
};

export default Home;