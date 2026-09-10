import React from 'react';
import { BookOpen, Code, ArrowRight } from 'lucide-react';

const RoadmapCard = ({ step, title, skill, course, project }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
      <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
        <span>Step {step}</span>
        <span>•</span>
        <span>{skill}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-xs">
          <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-slate-700">Course: <strong className="text-slate-900">{course}</strong></span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-xs">
          <Code className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-slate-700">Hands-on Project: <strong className="text-slate-900">{project}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;