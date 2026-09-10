import React from 'react';

const ProgressBar = ({ label, percentage, color = "bg-indigo-600" }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-medium mb-1.5">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-500">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;