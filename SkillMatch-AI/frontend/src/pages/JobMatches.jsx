import React from 'react';
import Sidebar from '../components/Sidebar';
import { ExternalLink, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobMatches = ({ apiData }) => {
  const jobs = apiData?.matchedJobs || [
    { id: "j1", title: "Full Stack Developer (React & Node)", company: "TechScale Global", match_score: 98, salary: "$80,000 - $110,000/yr", location: "Remote", snippet: "Looking for an experienced React and Node.js engineer." },
    { id: "j2", title: "Python & AI Backend Engineer", company: "DataCloud Systems", match_score: 94, salary: "$90,000 - $125,000/yr", location: "Hybrid / Remote", snippet: "Build high-throughput REST APIs using Python & FastAPI." }
  ];

  return (
    <div className="flex bg-[#0B0F17] min-h-screen text-slate-200">
      <Sidebar activePage="job-matches" />
      <main className="ml-64 flex-1 p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white">Live Global Vacancies</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time opportunities fetched via Live Job API based on AI extracted skills.</p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-6 bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/20">{job.match_score}% Skill Match</span>
                  <span className="text-xs text-slate-400">{job.location}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                <p className="text-sm text-indigo-400 font-semibold mt-0.5">{job.company} • <span className="text-slate-400 font-normal">{job.salary}</span></p>
                <p className="text-xs text-slate-400 mt-2 max-w-2xl">{job.snippet}</p>
              </div>
              <Link to={`/jobs/${job.id}`} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg transition shrink-0 flex items-center justify-center gap-2">
                Apply Now <ExternalLink size={14} />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobMatches;