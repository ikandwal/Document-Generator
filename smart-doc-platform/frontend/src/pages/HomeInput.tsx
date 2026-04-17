import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useDocumentStore } from '../store/useDocumentStore';

export default function HomeInput() {
  const navigate = useNavigate();
  const { 
    sourceText, setSourceText, 
    uploadedFiles, addUploadedFiles, 
    tokenCount, clearInput, setSampleData 
  } = useDocumentStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      addUploadedFiles(acceptedFiles);
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const tokenProgress = Math.min((tokenCount / 8192) * 100, 100);

  return (
    <section className="flex-grow overflow-y-auto p-12 flex flex-col items-center no-scrollbar relative">
      <div className="w-full max-w-4xl space-y-12 z-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold font-headline tracking-[-0.03em] text-on-background">New Synthesis</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
            Input your source material below. The local model will process this data within your secure environment without external calls.
          </p>
        </div>
        
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Text Input */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-1 shadow-[0_4px_20px_rgba(25,28,30,0.03)] focus-within:ring-2 ring-primary-container/20 transition-all duration-300">
            <textarea 
              className="w-full h-96 p-8 bg-transparent border-none focus:ring-0 resize-none font-body text-on-background placeholder:text-outline-variant text-base leading-relaxed outline-none" 
              placeholder="Paste your research notes, raw data, or content structure here..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>
          
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* File Upload Dropzone */}
            <div 
              {...getRootProps()}
              className={`flex-grow rounded-xl flex flex-col items-center justify-center p-8 border-2 border-dashed transition-colors cursor-pointer group ${isDragActive ? 'bg-primary-container/10 border-primary' : 'bg-surface-container-low border-outline-variant/30 hover:border-primary-container/40'}`}
            >
              <input {...getInputProps()} />
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:bg-primary-container/10 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                   {isDragActive ? 'file_download' : 'upload_file'}
                </span>
              </div>
              <span className="font-medium text-on-surface text-center">
                {isDragActive ? 'Drop files here...' : 'Or upload a file'}
              </span>
              <span className="text-xs text-on-surface-variant mt-2 text-center">PDF, DOCX, TXT (Max 50MB)</span>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4 pt-4 border-t border-outline-variant/20 w-full" onClick={(e) => e.stopPropagation()}>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Attached Files</span>
                  <div className="space-y-2 max-h-24 overflow-y-auto no-scrollbar">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs bg-surface-container-highest p-2 rounded-md truncate text-on-surface">
                        <span className="material-symbols-outlined text-[14px] text-primary shrink-0">draft</span>
                        <span className="truncate w-full">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Lab Parameters */}
            <div className="bg-surface-container rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Lab Parameters</span>
                <span className="material-symbols-outlined text-xs text-outline">info</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Tokens:</span>
                  <span className="font-mono text-xs font-semibold">{tokenCount.toLocaleString()} / 8,192</span>
                </div>
                <div className="w-full h-1 bg-outline-variant/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${tokenCount > 8192 ? 'bg-error' : 'bg-studio-gradient'}`}
                    style={{ width: `${tokenProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-on-surface-variant">Context Type:</span>
                  <span className="text-primary font-medium">Text / Local Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-8 border-t border-outline-variant/10">
          <div className="flex gap-4">
            <button 
              onClick={setSampleData}
              className="px-6 py-3 rounded-lg font-semibold text-on-surface-variant hover:bg-surface-container transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">auto_fix_high</span>
              Sample Data
            </button>
            <button 
              onClick={clearInput}
              className="px-6 py-3 rounded-lg font-semibold text-on-surface-variant hover:bg-surface-container transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">clear_all</span>
              Clear
            </button>
          </div>
          <button 
            className="bg-studio-gradient text-on-primary px-10 py-4 rounded-xl font-bold text-lg shadow-[0_10px_25px_rgba(36,56,156,0.2)] hover:shadow-[0_15px_30px_rgba(36,56,156,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none" 
            onClick={() => navigate('/configure')}
            disabled={sourceText.length === 0 && uploadedFiles.length === 0}
          >
            Continue to Configure
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-12 pointer-events-none opacity-20">
        <div className="text-[120px] font-headline font-extrabold text-surface-tint tracking-tighter select-none">
            SYNTH
        </div>
      </div>
    </section>
  );
}
