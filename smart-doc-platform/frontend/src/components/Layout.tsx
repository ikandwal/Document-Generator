import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { path: '/', icon: 'edit_document', label: 'Drafts' },
  { path: '/configure', icon: 'style', label: 'Templates' },
  { path: '/library', icon: 'folder_open', label: 'Library' },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

const bottomLinks = [
  { path: '/support', icon: 'help', label: 'Support' },
  { path: '/archive', icon: 'archive', label: 'Archive' },
];

export function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const isActive = (p: string) => currentPath === p;

  return (
    <div className="flex h-screen overflow-hidden bg-background font-body">
      {/* SideNavBar */}
      <aside className="flex flex-col h-screen p-4 gap-4 w-64 bg-[#eceef0] transition-all duration-200 shrink-0">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-studio-gradient flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-sm">science</span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-[#191c1e] text-base leading-tight">Lab Workspace</h2>
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">Local Model Active</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-studio-gradient text-on-primary px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 hover:opacity-90 mt-2 mb-4"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Document
        </button>

        <nav className="flex-1 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(link.path) ? 'bg-[#ffffff] text-[#24389c] shadow-sm font-medium' : 'text-[#454652] hover:bg-[#e6e8ea]'}`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-1 mt-auto">
          {bottomLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${isActive(link.path) ? 'bg-[#ffffff] text-[#24389c] shadow-sm font-medium' : 'text-[#454652] hover:bg-[#e6e8ea]'}`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-surface relative">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-8 h-16 w-full max-w-none bg-[#f8f9fb] font-headline tracking-tight antialiased z-10 shrink-0">
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold tracking-[-0.02em] text-[#191c1e]">Synthetix Studio</span>
            <div className="h-4 w-px bg-outline-variant/30 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 bg-tertiary-container px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary-fixed">Model Status: Local FLAN</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/library" className={`font-semibold py-5 border-b-2 transition-colors ${isActive('/library') ? 'text-[#24389c] border-[#24389c]' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}>History</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eceef0] transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">sensors</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
                <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNDF9bsqUIduK3uTBZkH5LhKuQw3zVsScuMWSR9HPffncGBiODkzHEqaX8zh8LRX29wfoaXsKK4Q__2rFi70XhEs4n2vDCL-1Fbqfcf2Ng5Qp9dz2xTPMKLSlTr5pInNfM9drNdxp_xHvoAbSe8jq9fPq7ykEp6y77owtJyTYBSGR4dkR_ZHHe7h22RvTejxjfarinkyCm9znyqrYnOxJiY0LpWeNO60JOroDGsG-q3amfr6VhQ6htrpS2J3b8wumpt05rwXUkyDA"/>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <Outlet />
      </main>
    </div>
  );
}
