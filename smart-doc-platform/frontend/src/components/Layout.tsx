import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';
import { useDocumentStore } from '../store/useDocumentStore';

interface NavLink {
  path: string;
  icon: string;
  label: string;
  badge?: number;
}

const navLinks: NavLink[] = [
  { path: '/dashboard', icon: 'menu_book', label: 'Home' },
  { path: '/drafts', icon: 'description', label: 'Drafts' },
  { path: '/configure', icon: 'style', label: 'Templates' },
  { path: '/library', icon: 'folder_open', label: 'Library' },
];

const toolLinks = [
  { path: '/ai-writer', icon: 'precision_manufacturing', label: 'AI Writer' },
  { path: '/research', icon: 'search', label: 'Research Helper' },
  { path: '/paraphraser', icon: 'text_snippet', label: 'Paraphraser' },
];

import ProfileModal from './ProfileModal';

export function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [userInitials, setUserInitials] = useState('JS');

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const profile = await getProfile();
        if (profile.name) {
          const parts = profile.name.trim().split(' ');
          const initials = parts.length >= 2 
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : profile.name.slice(0, 2).toUpperCase();
          setUserInitials(initials);
        }
      } catch (err) {
        console.error('Failed to fetch user initials', err);
      }
    };
    fetchInitials();
  }, [showProfile]); // Re-fetch when profile modal closes in case name changed

  const { clearDocuments } = useDocumentStore();

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearDocuments();
    navigate('/login');
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] font-body print:block print:h-auto print:bg-white print:overflow-visible">
      {/* SideNavBar */}
      <aside className="flex flex-col h-screen py-6 px-4 gap-6 w-[260px] bg-white transition-all duration-200 shrink-0 border-r border-slate-200/50 print:hidden shadow-[4px_0_24px_rgba(0,0,0,0.01)]">
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#cc66ff] to-[#a32cc4] flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <div>
            <h2 className="font-headline font-extrabold text-slate-800 text-[17px] leading-tight tracking-tight">Synthetix<br/>Studio</h2>
            <p className="text-[10px] text-slate-400 font-bold tracking-wide mt-0.5">Local AI Writing</p>
          </div>
        </div>

        {/* New Document Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-[#a32cc4] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(163,44,196,0.3)] transition-transform duration-200 hover:-translate-y-0.5 text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          New Document
        </button>

        {/* Primary Navigation */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {navLinks.map(link => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-[#fdf4ff] text-[#a32cc4] font-bold' : 'text-slate-500 hover:bg-slate-50 font-semibold'}`}
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className={`material-symbols-outlined text-[22px] ${active ? 'text-[#a32cc4]' : 'text-slate-400'}`} style={active ? {fontVariationSettings: "'FILL' 1"} : {}}>{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <div className="w-5 h-5 rounded-full bg-[#a32cc4] text-white flex items-center justify-center text-[10px] font-bold">
                    {link.badge}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Tools Navigation */}
        <div className="flex flex-col gap-1.5 mt-4">
          <div className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tools</div>
          {toolLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-slate-500 hover:bg-slate-50 font-semibold text-sm`}
            >
              <span className="material-symbols-outlined text-[22px] text-slate-400">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Settings and Logout */}
        <div className="mt-auto flex flex-col gap-1">
           <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-slate-500 hover:bg-slate-50 font-semibold text-sm">
             <span className="material-symbols-outlined text-[22px] text-slate-400">settings</span>
             <span>Settings</span>
           </Link>
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 font-semibold text-sm w-full text-left"
           >
             <span className="material-symbols-outlined text-[22px] text-red-400">logout</span>
             <span>Logout</span>
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative print:block print:overflow-visible bg-[#f8faff]">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-12 h-[88px] w-full max-w-none bg-transparent font-headline tracking-tight antialiased z-10 shrink-0 print:hidden">
          <div className="flex items-center gap-8 text-slate-500 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-slate-400">shield_locked</span>
              <span>Local & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-slate-400">bolt</span>
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-slate-400">psychology</span>
              <span>AI-Powered</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/library" className="text-slate-500 font-bold hover:text-slate-800 transition-colors">History</Link>
            <div 
              onClick={() => setShowProfile(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f97316] text-white font-bold tracking-wider shadow-sm text-sm cursor-pointer hover:bg-[#ea580c] transition-colors"
            >
              {userInitials}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative w-full flex flex-col items-center">
            <Outlet />
        </div>

        <ProfileModal 
          isOpen={showProfile} 
          onClose={() => setShowProfile(false)} 
        />
      </main>
    </div>
  );
}
