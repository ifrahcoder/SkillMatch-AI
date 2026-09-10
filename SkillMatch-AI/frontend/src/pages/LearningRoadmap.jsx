import React from 'react';
import Sidebar from '../components/Sidebar';
import { BookOpen, ArrowRight, Target } from 'lucide-react';

const LearningRoadmap = ({ apiData }) => {
  const roadmap = apiData?.learningRoadmap || [
    { skillToLearn: "Advanced Microservices Architecture", reason: "Increases target ATS match rate from 92% to 98%.", recommendedPlatform: "Coursera / AWS" },
    { skillToLearn: "Docker & CI/CD Pipelines", reason: "Critical for enterprise application deployment and DevOps roles.", recommendedPlatform: "Udemy / Official Docs" }
  ];

  return (
    <div className="flex bg-[#0B0F17] min-h-screen text-slate-200">
      <Sidebar activePage="roadmap" />
      <main className="ml-64 flex-1 p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white">Career & Skill Roadmap</h1>
          <p className="text-slate-400 text-sm mt-1">AI dynamically suggests missing skill modules to maximize your global market value.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmap.map((item, idx) => (
            <div key={idx} className="p-6 bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 rounded-2xl transition shadow-xl">
              <span className="text-xs bg-violet-500/10 text-violet-400 font-bold px-3 py-1 rounded-full border border-violet-500/20">Target Step #{idx + 1}</span>
              <h3 className="text-xl font-bold text-white mt-3 mb-2">{item.skillToLearn}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.reason}</p>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Platform: <span className="text-indigo-400">{item.recommendedPlatform}</span></span>
                <button className="text-violet-400 hover:text-violet-300 font-bold flex items-center gap-1">Start <ArrowRight size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LearningRoadmap;