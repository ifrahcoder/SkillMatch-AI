// SkillMatch-AI/frontend/src/pages/Register.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6 text-slate-200">
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-extrabold text-white mb-2">Create Account</h2>
        <p className="text-xs text-slate-400 mb-6">Start matching your resume to global job vacancies.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase">Full Name</label>
            <input type="text" required placeholder="John Doe" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase">Email Address</label>
            <input type="email" required placeholder="developer@skillmatch.ai" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase">Password</label>
            <input type="password" required placeholder="••••••••" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg transition">Create Account</button>
        </form>

        <p className="text-xs text-slate-500 mt-6 text-center">
          Already registered? <Link to="/login" className="text-indigo-400 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;