import React from 'react';
import Sidebar from '../components/Sidebar';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();

  return (
    <div className="flex bg-[#0B0F17] min-h-screen text-slate-200">
      <Sidebar activePage="job-matches" />
      <main className="ml-64 flex-1 p-8 max-w-4xl mx-auto">
        <Link to="/job-matches" className="text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-2 mb-6">
          <ArrowLeft size={14} /> Back to Live Matches
        </Link>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/20">98% Match Score</span>
          <h1 className="text-3xl font-extrabold text-white mt-3">Full Stack Developer (React & Node)</h1>
          <p className="text-indigo-400 font-semibold text-sm mt-1">TechScale Global • Remote • $80,000 - $110,000 / yr</p>

          <hr className="border-slate-800 my-6" />

          <h3 className="text-lg font-bold text-white mb-3">Job Overview</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            TechScale Global is seeking a Full Stack Engineer to build next-generation web platforms. You will collaborate directly with our engineering team to construct REST APIs, optimize database queries, and design sleek UIs.
          </p>

          <h3 className="text-lg font-bold text-white mb-3">Required Competencies</h3>
          <ul className="space-y-2 text-sm text-slate-300 mb-8">
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> React.js & Tailwind CSS for dynamic interfaces</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Node.js & Express.js for scalable backend services</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> PostgreSQL / MongoDB schema orchestration</li>
          </ul>

          <a href="#" target="_blank" rel="noreferrer" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition inline-flex items-center gap-2 text-sm">
            Apply Direct on Company Portal <ExternalLink size={16} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;