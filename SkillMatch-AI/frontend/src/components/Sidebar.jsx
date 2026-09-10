import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Briefcase, 
  GraduationCap, 
  Bookmark, 
  User, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ activePage = 'dashboard', setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assessment', label: 'Skill Assessment', icon: BrainCircuit },
    { id: 'analysis', label: 'AI Skill Analysis', icon: Sparkles },
    { id: 'matches', label: 'Job Matches', icon: Briefcase },
    { id: 'roadmap', label: 'Learning Roadmap', icon: GraduationCap },
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark },
    { id: 'profile', label: 'Profile / Settings', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#0d1322] text-slate-300 h-screen fixed left-0 top-0 flex flex-col justify-between p-4 z-30 shadow-2xl">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-slate-800">
          <div className="bg-indigo-600 text-white p-2 rounded-xl font-bold">
            <BrainCircuit size={22} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-wide leading-none">
              SkillMatch <span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-1">Your Skills + AI = Future</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage && setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="border-t border-slate-800/80 pt-3 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white text-xs font-medium">
          <Settings size={16} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:text-rose-300 text-xs font-medium">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;