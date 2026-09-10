import React from 'react';
import { MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ id, title, company, location, salary, matchScore }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">{title}</h3>
            <p className="text-sm text-slate-500">{company}</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-xs rounded-full border border-emerald-200">
            {matchScore}% Match
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{location}</span>
          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{salary}</span>
        </div>
      </div>

      <Link 
        to={`/jobs/${id}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-colors"
      >
        <span>View Details & Skill Match</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};

export default JobCard;