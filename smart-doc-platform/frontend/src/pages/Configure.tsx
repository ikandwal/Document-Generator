import { useNavigate } from 'react-router-dom';
import { useDocumentStore } from '../store/useDocumentStore';

export default function Configure() {
  const navigate = useNavigate();
  const { 
    architecture, setArchitecture, 
    editorialTone, setEditorialTone,
    useLocalModel, toggleLocalModel
  } = useDocumentStore();

  return (
    <div className="flex-1 overflow-y-auto p-12 bg-surface relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Document Architecture</h3>
              <p className="text-on-surface-variant mt-2">Select the structural blueprint for your generation.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group cursor-pointer" onClick={() => setArchitecture('college_report')}>
              <div className={`aspect-[3/4] rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] ring-1 ring-inset flex flex-col relative overflow-hidden ${architecture === 'college_report' ? 'bg-primary/5 ring-primary/50' : 'bg-surface-container-lowest ring-outline-variant/10 hover:ring-primary/20'}`}>
                <div className={`flex-1 transition-opacity ${architecture === 'college_report' ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}>
                  <div className={`w-full h-full border-2 border-dashed rounded flex flex-col p-4 gap-2 ${architecture === 'college_report' ? 'border-primary' : 'border-outline'}`}>
                    <div className="h-4 bg-outline-variant w-3/4 rounded-sm"></div>
                    <div className="h-2 bg-outline-variant w-1/2 rounded-sm"></div>
                    <div className="h-2 bg-outline-variant w-full rounded-sm mt-4"></div>
                    <div className="h-2 bg-outline-variant w-full rounded-sm"></div>
                    <div className="h-2 bg-outline-variant w-5/6 rounded-sm"></div>
                  </div>
                </div>
                <div className="mt-4 relative transition-transform duration-300">
                  <span className={`material-symbols-outlined mb-2 transition-colors duration-300 ${architecture === 'college_report' ? 'text-primary drop-shadow-[0_0_8px_rgba(36,56,156,0.3)]' : 'text-primary'}`}>school</span>
                  <h4 className="font-semibold text-on-surface">College Report</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Academic formatting with citations</p>
                </div>
                {architecture === 'college_report' && (
                  <div className="absolute top-4 right-4">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="group cursor-pointer" onClick={() => setArchitecture('readme')}>
              <div className={`aspect-[3/4] rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] ring-1 ring-inset flex flex-col relative overflow-hidden ${architecture === 'readme' ? 'bg-primary/5 ring-primary/50' : 'bg-surface-container-lowest ring-outline-variant/10 hover:ring-primary/20'}`}>
                <div className={`flex-1 transition-opacity ${architecture === 'readme' ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}>
                  <div className={`w-full h-full border-2 border-dashed rounded flex flex-col p-4 gap-2 ${architecture === 'readme' ? 'border-primary' : 'border-outline'}`}>
                    <div className="h-6 bg-outline-variant w-1/3 rounded-sm"></div>
                    <div className="h-2 bg-outline-variant w-full rounded-sm mt-4"></div>
                    <div className="h-32 bg-surface-container-high w-full rounded-sm mt-4"></div>
                  </div>
                </div>
                <div className="mt-4 relative transition-transform duration-300">
                  <span className={`material-symbols-outlined mb-2 transition-colors duration-300 ${architecture === 'readme' ? 'text-primary drop-shadow-[0_0_8px_rgba(36,56,156,0.3)]' : 'text-primary'}`}>description</span>
                  <h4 className="font-semibold text-on-surface">README</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Technical documentation for code</p>
                </div>
                {architecture === 'readme' && (
                  <div className="absolute top-4 right-4">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                )}
              </div>
            </div>

            <div className="group cursor-pointer" onClick={() => setArchitecture('research_paper')}>
              <div className={`aspect-[3/4] rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] ring-1 ring-inset flex flex-col relative overflow-hidden ${architecture === 'research_paper' ? 'bg-primary/5 ring-primary/50' : 'bg-surface-container-lowest ring-outline-variant/10 hover:ring-primary/20'}`}>
                <div className={`flex-1 transition-opacity ${architecture === 'research_paper' ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}>
                  <div className={`w-full h-full border-2 border-dashed rounded p-4 flex flex-col gap-3 ${architecture === 'research_paper' ? 'border-primary' : 'border-outline'}`}>
                    <div className="h-3 bg-outline-variant w-full rounded-sm"></div>
                    <div className="h-3 bg-outline-variant w-full rounded-sm"></div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                       <div className="h-12 bg-surface-container-high rounded-sm"></div>
                       <div className="h-12 bg-surface-container-high rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 relative transition-transform duration-300">
                  <span className={`material-symbols-outlined mb-2 transition-colors duration-300 ${architecture === 'research_paper' ? 'text-primary drop-shadow-[0_0_8px_rgba(36,56,156,0.3)]' : 'text-primary'}`}>search</span>
                  <h4 className="font-semibold text-on-surface">Research Paper</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Data-heavy scholarly structure</p>
                </div>
                {architecture === 'research_paper' && (
                  <div className="absolute top-4 right-4">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                )}
              </div>
            </div>

            <div className="group cursor-pointer" onClick={() => setArchitecture('grant_proposal')}>
               <div className={`aspect-[3/4] rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] ring-1 ring-inset flex flex-col relative overflow-hidden ${architecture === 'grant_proposal' ? 'bg-primary/5 ring-primary/50' : 'bg-surface-container-lowest ring-outline-variant/10 hover:ring-primary/20'}`}>
                 <div className={`flex-1 transition-opacity ${architecture === 'grant_proposal' ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}>
                   <div className={`w-full h-full border-2 border-dashed rounded p-4 flex flex-col gap-4 ${architecture === 'grant_proposal' ? 'border-primary' : 'border-outline'}`}>
                     <div className="h-10 bg-primary/20 w-10 rounded-full"></div>
                     <div className="space-y-2">
                         <div className="h-2 bg-outline-variant w-full rounded-sm"></div>
                         <div className="h-2 bg-outline-variant w-3/4 rounded-sm"></div>
                     </div>
                   </div>
                 </div>
                 <div className="mt-4 relative transition-transform duration-300">
                    <span className={`material-symbols-outlined mb-2 transition-colors duration-300 ${architecture === 'grant_proposal' ? 'text-primary drop-shadow-[0_0_8px_rgba(36,56,156,0.3)]' : 'text-primary'}`}>request_quote</span>
                    <h4 className="font-semibold text-on-surface">Grant Proposal</h4>
                    <p className="text-xs text-on-surface-variant mt-1">Persuasive business alignment</p>
                 </div>
                 {architecture === 'grant_proposal' && (
                  <div className="absolute top-4 right-4">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                 )}
               </div>
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
             <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface mb-6">Editorial Tone</h3>
             <div className="flex flex-col gap-4">
               <label className="group cursor-pointer flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest ring-1 ring-inset ring-outline-variant/10 hover:bg-primary/5 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${editorialTone === 'formal' ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary group-hover:bg-primary/10'}`}>
                     <span className="material-symbols-outlined">gavel</span>
                   </div>
                   <div>
                     <p className="font-semibold text-sm">Formal</p>
                     <p className="text-xs text-on-surface-variant">Sophisticated, precise, and objective</p>
                   </div>
                 </div>
                 <input className="w-5 h-5 text-primary focus:ring-primary border-outline-variant bg-surface" name="tone" type="radio" value="formal" checked={editorialTone === 'formal'} onChange={() => setEditorialTone('formal')} />
               </label>
               <label className="group cursor-pointer flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest ring-1 ring-inset ring-outline-variant/10 hover:bg-primary/5 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${editorialTone === 'neutral' ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary group-hover:bg-primary/10'}`}>
                     <span className="material-symbols-outlined">chat_bubble</span>
                   </div>
                   <div>
                     <p className="font-semibold text-sm">Neutral</p>
                     <p className="text-xs text-on-surface-variant">Balanced and widely accessible</p>
                   </div>
                 </div>
                 <input className="w-5 h-5 text-primary focus:ring-primary border-outline-variant bg-surface" name="tone" type="radio" value="neutral" checked={editorialTone === 'neutral'} onChange={() => setEditorialTone('neutral')} />
               </label>
               <label className="group cursor-pointer flex items-center justify-between p-4 rounded-xl bg-surface-container-lowest ring-1 ring-inset ring-outline-variant/10 hover:bg-primary/5 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${editorialTone === 'technical' ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary group-hover:bg-primary/10'}`}>
                     <span className="material-symbols-outlined">terminal</span>
                   </div>
                   <div>
                     <p className="font-semibold text-sm">Technical</p>
                     <p className="text-xs text-on-surface-variant">Jargon-dense and methodology focused</p>
                   </div>
                 </div>
                 <input className="w-5 h-5 text-primary focus:ring-primary border-outline-variant bg-surface" name="tone" type="radio" value="technical" checked={editorialTone === 'technical'} onChange={() => setEditorialTone('technical')} />
               </label>
             </div>
          </section>
          
          <section>
             <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface mb-6">Processing Layer</h3>
             <div className="p-8 rounded-xl bg-surface-container-lowest ring-1 ring-inset ring-outline-variant/10">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-tertiary">memory</span>
                   <div>
                     <p className="font-semibold text-sm">Use local FLAN model</p>
                     <p className="text-xs text-tertiary font-medium">Privacy Priority Mode</p>
                   </div>
                 </div>
                 <button className={`w-12 h-6 rounded-full relative transition-colors ${useLocalModel ? 'bg-primary' : 'bg-surface-container-highest ring-1 ring-inset ring-outline-variant/30'}`} onClick={toggleLocalModel}>
                   <div className={`absolute top-[2px] w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${useLocalModel ? 'right-[2px] bg-on-primary' : 'left-[2px] bg-outline-variant'}`}></div>
                 </button>
               </div>
               <div className="mt-8 p-4 bg-surface-container-low rounded-lg">
                 <div className="flex items-start gap-3">
                   <span className="material-symbols-outlined text-on-surface-variant text-sm mt-0.5">info</span>
                   <p className="text-[11px] text-on-surface-variant leading-relaxed">Local processing ensures data never leaves your hardware. Note: Generation speed is dependent on your machine's GPU availability.</p>
                 </div>
               </div>
             </div>
          </section>
        </div>
        
        <div className="pt-8 flex justify-center pb-12">
           <button className="px-12 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3" onClick={() => navigate('/progress')}>
              <span className="material-symbols-outlined">bolt</span>
              Start Generation
           </button>
        </div>
      </div>
    </div>
  );
}
