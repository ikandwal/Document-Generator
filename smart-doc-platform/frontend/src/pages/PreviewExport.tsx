import { useNavigate } from 'react-router-dom';
import { useDocumentStore } from '../store/useDocumentStore';

export default function PreviewExport() {
  const navigate = useNavigate();
  const { architecture } = useDocumentStore();
  const archName = architecture.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <main className="flex-1 flex overflow-hidden p-8 gap-12 bg-surface">
      <div className="flex-[3] flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-background">Document Preview</h2>
          <div className="text-sm text-on-surface-variant uppercase tracking-widest font-semibold">Draft v2.4</div>
        </div>
        <div className="flex-1 bg-surface-container-low rounded-xl p-1 overflow-hidden relative">
          <div className="h-full w-full overflow-y-auto no-scrollbar bg-surface-container-low px-12 py-16 flex flex-col items-center">
            {/* The Printed Page Aesthetic */}
            <div className="w-full max-w-[800px] bg-surface-container-lowest shadow-[0_20px_40px_rgba(25,28,30,0.04)] min-h-[1100px] p-24 font-body leading-relaxed text-on-surface">
              <header className="mb-12 border-b border-outline-variant/10 pb-8">
                <h1 className="text-3xl font-headline font-bold text-on-background mb-4">Architectural Resilience in Distributed LLM Systems</h1>
                <div className="flex gap-4 text-sm text-on-surface-variant">
                  <span>Oct 24, 2026</span>
                  <span>•</span>
                  <span>Synthetix Research Lab</span>
                </div>
              </header>
              <section className="space-y-6">
                <h3 className="text-lg font-headline font-bold text-on-background">1. Abstract</h3>
                <p className="text-on-surface/90 text-[15px] leading-[1.8]">
                  This paper explores the convergence of edge computing and large language models (LLMs). We propose a framework for "Local-First" intelligence that minimizes dependency on cloud-based API architectures. By leveraging optimized quantization techniques, we demonstrate that inference latency can be reduced by 40% without significant loss in semantic accuracy.
                </p>
                <h3 className="text-lg font-headline font-bold text-on-background">2. Methodology</h3>
                <p className="text-on-surface/90 text-[15px] leading-[1.8]">
                  Our approach utilized the FLAN-T5 XL model, compressed via 4-bit NormalFloat (NF4) quantization. Testing was conducted across three distinct hardware environments: a local workstation (RTX 4090), a mobile edge device, and a centralized cloud cluster.
                </p>
                <div className="my-10 p-8 bg-surface-container-high rounded-lg italic text-on-surface-variant border-l-4 border-primary">
                  "The transition from centralized to decentralized intelligence represents the next major paradigm shift in human-computer interaction."
                </div>
                <h3 className="text-lg font-headline font-bold text-on-background">3. Initial Results</h3>
                <p className="text-on-surface/90 text-[15px] leading-[1.8]">
                  Preliminary data indicates a consistent performance gain in latency-sensitive applications, particularly in document synthesis and real-time code generation tasks.
                </p>
              </section>
              <footer className="mt-24 text-center text-xs text-outline font-label tracking-widest uppercase">
                  Page 1 of 3
              </footer>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none border border-white/40 rounded-xl"></div>
        </div>
      </div>
      
      {/* Right: Action Panel */}
      <aside className="flex-1 min-w-[320px] flex flex-col gap-8">
        <section>
          <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">Document Metadata</h3>
          <div className="bg-surface-container-lowest rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="text-sm text-on-surface-variant">Type</span>
              <span className="text-sm font-semibold text-on-surface">{archName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
              <span className="text-sm text-on-surface-variant">Generated</span>
              <span className="text-sm font-semibold text-on-surface">Oct 2026</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-on-surface-variant">Pages</span>
              <span className="text-sm font-semibold text-on-surface">3</span>
            </div>
          </div>
        </section>
        
        <section className="flex-1">
          <h3 className="text-xs font-bold text-outline uppercase tracking-widest mb-4">Export</h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="group relative flex items-center justify-between p-5 bg-surface-container-lowest hover:bg-surface-container-low rounded-xl transition-all duration-300 border border-outline-variant/10 hover:border-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-error-container/20 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>picture_as_pdf</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-on-surface">Download .pdf</div>
                  <div className="text-xs text-on-surface-variant">High-fidelity print format</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
            </button>
            <button className="group relative flex items-center justify-between p-5 bg-surface-container-lowest hover:bg-surface-container-low rounded-xl transition-all duration-300 border border-outline-variant/10 hover:border-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-on-surface">Download .docx</div>
                  <div className="text-xs text-on-surface-variant">Editable Word document</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
            </button>
          </div>
        </section>
        
        <div className="mt-auto space-y-3 pb-8">
          <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">send</span>
            Finalize & Publish
          </button>
          <button className="w-full py-4 bg-transparent border border-outline-variant/30 hover:bg-surface-container text-on-surface font-semibold rounded-md transition-all duration-200 flex items-center justify-center gap-2" onClick={() => navigate('/configure')}>
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Regenerate
          </button>
        </div>
      </aside>
    </main>
  );
}
