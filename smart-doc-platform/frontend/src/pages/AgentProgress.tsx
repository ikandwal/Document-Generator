import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentStore } from '../store/useDocumentStore';

const agents = [
  { id: 'understanding', name: 'Understanding Agent', description: 'Extracting key topics from source material...' },
  { id: 'structure', name: 'Structure Agent (Gemini)', description: 'Organizing into document sections...' },
  { id: 'rewrite', name: 'Rewrite Agent (Gemini)', description: 'Polishing tone and clarity...' },
  { id: 'formatting', name: 'Document Formatting', description: 'Building your .docx file...' },
];

export default function AgentProgress() {
  const navigate = useNavigate();
  const {
    tokenCount,
    isGenerating,
    generationStage,
    generationError,
    documentData,
    resetGeneration,
  } = useDocumentStore();

  React.useEffect(() => {
    if (!isGenerating && !generationError && documentData) {
      const timer = setTimeout(() => {
        navigate('/preview');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, generationError, documentData, navigate]);

  const currentStep = isGenerating ? generationStage : generationError ? -2 : generationStage;

  const isDone = !isGenerating && !generationError && documentData !== null;

  return (
    <div className="flex-1 overflow-y-auto relative p-12">
      <div className="absolute inset-0 lab-grid pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background mb-2">
            {isDone ? 'Synthesis Complete' : generationError ? 'Generation Failed' : 'Synthesizing Intellect'}
          </h1>
          <p className="text-on-surface-variant body-md max-w-xl">
            {isDone
              ? 'Your document has been generated. Download or preview the result below.'
              : generationError
              ? 'An error occurred during generation. Please review and try again.'
              : 'Our specialized agents are working through your input in a secure local pipeline.'}
          </p>
        </div>

        {/* Error Banner */}
        {generationError && (
          <div className="mb-8 p-5 bg-error-container/30 border border-error/20 rounded-xl flex items-start gap-4">
            <span className="material-symbols-outlined text-error shrink-0 mt-0.5">error</span>
            <div>
              <p className="font-semibold text-error text-sm mb-1">Generation error</p>
              <p className="text-xs text-on-surface-variant">{generationError}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Agent Steps */}
          <div className="col-span-12 md:col-span-8 bg-surface-container-lowest p-10 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="relative space-y-12">
              <div className="absolute left-[19px] top-2 bottom-2 w-[2px] stepper-gradient-line"></div>

              {agents.map((agent, index) => {
                const isCompleted = currentStep > index || isDone;
                const isCurrent = currentStep === index && isGenerating;
                const isPending = currentStep < index && !isDone;

                return (
                  <div key={agent.id} className={`relative flex gap-8 group ${isPending ? 'opacity-40' : ''}`}>
                    {isCompleted && (
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-tertiary flex items-center justify-center ring-4 ring-surface-container-lowest">
                        <span className="material-symbols-outlined text-on-tertiary text-xl">check</span>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary-fixed shadow-[0_0_15px_rgba(36,56,156,0.3)]">
                        <span className="material-symbols-outlined text-on-primary text-xl animate-spin" style={{ animationDuration: '3s' }}>sync</span>
                      </div>
                    )}
                    {isPending && (
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center ring-4 ring-surface-container-lowest">
                        <div className="w-2 h-2 rounded-full bg-outline"></div>
                      </div>
                    )}

                    <div className="pt-1 w-full">
                      <h3 className="font-headline text-lg font-bold text-on-surface">{agent.name}</h3>
                      <p className={`${isCompleted ? 'text-tertiary' : isCurrent ? 'text-primary' : 'text-on-surface-variant'} font-medium text-sm mt-1`}>
                        {isCompleted ? 'Completed ✓' : isCurrent ? agent.description : 'Waiting...'}
                      </p>

                      {isCurrent && (
                        <div className="mt-4 p-4 rounded-lg bg-surface-container-low border-l-4 border-primary">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-on-surface-variant">Processing</span>
                            <span className="text-xs font-bold text-primary">Working...</span>
                          </div>
                          <div className="h-1 w-full bg-outline-variant/30 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[60%] animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Session Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                  <span className="text-xs text-on-surface-variant">Tokens Processed</span>
                  <span className="font-mono text-sm font-bold">{(Math.max(0, generationStage) * 450 + tokenCount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                  <span className="text-xs text-on-surface-variant">Active Agents</span>
                  <span className="font-mono text-sm font-bold">{isDone ? '0' : isGenerating ? '1' : '—'}</span>
                </div>
                <div className="flex justify-between items-end border-b border-outline-variant/20 pb-2">
                  <span className="text-xs text-on-surface-variant">Environment</span>
                  <span className="text-[10px] font-bold text-tertiary-fixed bg-tertiary-container px-2 py-0.5 rounded uppercase">Isolated</span>
                </div>
                <div className="flex justify-between items-end pb-2">
                  <span className="text-xs text-on-surface-variant">Status</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${isDone ? 'bg-tertiary/10 text-tertiary' : generationError ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                    {isDone ? 'Done' : generationError ? 'Failed' : 'Running'}
                  </span>
                </div>
              </div>
            </div>

            {isDone && (
              <div className="w-full bg-studio-gradient text-on-primary font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md">
                <span className="material-symbols-outlined animate-bounce">arrow_forward</span>
                Redirecting to Preview...
              </div>
            )}

            {generationError && (
              <button
                onClick={() => { resetGeneration(); navigate('/dashboard'); }}
                className="w-full border border-outline-variant/30 text-on-surface-variant font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition-all"
              >
                <span className="material-symbols-outlined">refresh</span>
                Start Over
              </button>
            )}

            {isGenerating && (
              <div className="pt-2">
                <button
                  onClick={() => { resetGeneration(); navigate('/configure'); }}
                  className="w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant/30 hover:border-error hover:bg-error-container/10 transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-outline group-hover:text-error transition-colors">close</span>
                  <span className="text-sm font-bold text-on-surface-variant group-hover:text-error transition-colors">Cancel Execution</span>
                </button>
                <p className="text-[10px] text-center mt-3 text-on-surface-variant px-4">Cancelling will discard the current generation.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-outline-variant/10 pt-8">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center text-[10px] text-on-primary-container font-bold">UA</div>
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-[10px] text-on-primary font-bold">SA</div>
              <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] text-on-surface-variant font-bold">RA</div>
            </div>
            <span className="text-sm font-medium text-on-surface-variant">Agent Handshake Pipeline</span>
          </div>
          <div className="flex items-center gap-4">
            {isDone && (
              <div className="text-sm font-bold text-tertiary animate-pulse">Navigating...</div>
            )}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-tertiary animate-pulse' : isDone ? 'bg-tertiary' : 'bg-outline'}`}></div>
              <span className="text-sm font-medium text-tertiary">{isGenerating ? 'Secured Local Tunnel Active' : isDone ? 'Pipeline Complete' : 'Idle'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
