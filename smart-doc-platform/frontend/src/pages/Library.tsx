import { Link, useNavigate } from 'react-router-dom';
import { useDocumentStore } from '../store/useDocumentStore';

const typeIcon: Record<string, string> = {
  'Research Paper': 'search',
  'README': 'description',
  'Grant Proposal': 'request_quote',
  'College Report': 'school',
};

export default function Library() {
  const navigate = useNavigate();
  const { savedDocuments, loadDocument } = useDocumentStore();

  const handleOpenDocument = (doc: any) => {
    loadDocument(doc);
    navigate('/preview');
  };

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-surface no-scrollbar">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background">Document Library</h1>
            <p className="text-on-surface-variant mt-2">All your synthesized documents in one place.</p>
          </div>
          <Link to="/" className="bg-studio-gradient text-on-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-sm hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            New Document
          </Link>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 flex items-center gap-3 bg-surface-container-lowest rounded-xl px-5 py-3 ring-1 ring-inset ring-outline-variant/20 focus-within:ring-primary/30 transition-all">
            <span className="material-symbols-outlined text-outline">search</span>
            <input type="text" placeholder="Search documents..." className="bg-transparent outline-none text-on-surface placeholder:text-outline-variant text-sm w-full" />
          </div>
          <select className="bg-surface-container-lowest text-sm text-on-surface rounded-xl px-4 py-3 ring-1 ring-inset ring-outline-variant/20 outline-none focus:ring-primary/30 transition-all">
            <option>All Types</option>
            <option>Research Paper</option>
            <option>README</option>
            <option>Grant Proposal</option>
            <option>College Report</option>
          </select>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedDocuments.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">folder_open</span>
              <h3 className="text-lg font-bold text-on-surface">Your library is empty</h3>
              <p className="text-on-surface-variant text-sm mt-1">Generate your first document to see it here.</p>
            </div>
          ) : (
            savedDocuments.map((doc: any) => (
              <div key={doc.id} onClick={() => handleOpenDocument(doc)} className="group bg-surface-container-lowest rounded-xl p-6 ring-1 ring-inset ring-outline-variant/10 hover:ring-primary/20 hover:shadow-[0_8px_30px_rgba(25,28,30,0.06)] transition-all duration-300 flex items-start gap-5 cursor-pointer">
                <div className="w-11 h-11 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary">{typeIcon[doc.type] ?? 'article'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-on-surface truncate text-sm leading-snug">{doc.title}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{doc.type}</span>
                    <span className="text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{doc.tone}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-outline">{doc.date}</span>
                    <span className="text-xs font-mono text-outline">{doc.tokens.toLocaleString()} tokens</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Download">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                    title="Open in editor"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
