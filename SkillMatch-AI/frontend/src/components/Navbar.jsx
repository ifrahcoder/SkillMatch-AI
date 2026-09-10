import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 w-96 bg-slate-100 px-3.5 py-2 rounded-xl text-slate-500">
        <Search className="w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search skills, job recommendations, topics..." 
          className="bg-transparent text-sm w-full outline-none text-slate-800 placeholder-slate-400"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
        </button>
        
        <div className="h-8 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
            {user?.name ? user.name[0] : 'U'}
          </div>
          <div className="hidden md:block">
            <h4 className="text-sm font-bold text-slate-800">{user?.name}</h4>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;