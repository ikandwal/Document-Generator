import { Link } from 'react-router-dom';

const mockArchived = [
  { id: 'a1', title: 'Old ML Pipeline Writeup', type: 'Research Paper', date: 'Feb 14, 2026', size: '42 KB' },
  { id: 'a2', title: 'Project Alpha Grant Draft', type: 'Grant Proposal', date: 'Feb 01, 2026', size: '28 KB' },
  { id: 'a3', title: 'Intro to Edge Inference', type: 'College Report', date: 'Jan 28, 2026', size: '18 KB' },
  { id: 'a4', title: 'v0.1 API README', type: 'README', date: 'Jan 15, 2026', size: '9 KB' },
];

export default function Archive() {
  return (
    <div className="flex-1 overflow-y-auto p-10 bg-surface no-scrollbar">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background">Archive</h1>
            <p className="text-on-surface-variant mt-2">Older documents moved out of your active library.</p>
          </div>
          <Link to="/library" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Library
          </Link>
        </div>

        {/* Info Banner */}
        <div className="flex items-center gap-4 p-5 bg-surface-container-low rounded-xl ring-1 ring-inset ring-outline-variant/10 mb-8">
          <span className="material-symbols-outlined text-outline shrink-0">info</span>
          <p className="text-sm text-on-surface-variant">Archived documents are retained for 90 days, after which they are permanently deleted. You can restore any document to your active library at any time.</p>
        </div>

        {/* Archived Documents Table */}
        {mockArchived.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-outline text-3xl">inventory_2</span>
            </div>
            <h3 className="font-semibold text-on-surface mb-2">Archive is empty</h3>
            <p className="text-sm text-on-surface-variant max-w-xs">Documents you archive from your Library will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockArchived.map(doc => (
              <div key={doc.id} className="group bg-surface-container-lowest rounded-xl px-6 py-4 ring-1 ring-inset ring-outline-variant/10 flex items-center gap-5 hover:ring-outline-variant/30 transition-all duration-200">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-outline text-[18px]">archive</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-on-surface truncate">{doc.title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{doc.type} · {doc.size}</p>
                </div>
                <span className="text-xs text-outline shrink-0 hidden md:block">{doc.date}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[14px]">restore_from_trash</span>
                    Restore
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-error bg-error/5 hover:bg-error/10 px-3 py-1.5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[14px]">delete_forever</span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
