import React from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, Shield, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex bg-[#0B0F17] min-h-screen text-slate-200">
      <Sidebar activePage="profile" />
      <main className="ml-64 flex-1 p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-8">Developer Settings</h1>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-800">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              SD
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Software Engineer Profile</h2>
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1"><CheckCircle2 size={13} /> Active Groq AI Parsing Key</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">Target Career Role</label>
              <input type="text" readOnly value="Full Stack & AI Web Engineer" className="w-full mt-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">System Key</label>
              <input type="text" readOnly value="groq-llama3-universal-parser-active" className="w-full mt-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 font-mono" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;