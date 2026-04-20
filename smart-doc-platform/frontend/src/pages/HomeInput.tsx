import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useDocumentStore } from '../store/useDocumentStore';

export default function HomeInput() {
  const navigate = useNavigate();
  const { 
    sourceText, setSourceText, 
    uploadedFiles, addUploadedFiles, 
    savedDocuments
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

  return (
    <div className="w-full max-w-4xl px-8 flex flex-col items-center pb-24">
      {/* Hero Badge */}
      <div className="mt-8 mb-8 bg-[#fdf4ff] border border-[#fce7f3] text-[#cc66ff] px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold tracking-wide">
        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
        Powered by Local AI
      </div>

      {/* Hero Titles */}
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-5xl md:text-[54px] leading-[1.1] font-headline font-semibold tracking-tight text-[#1e2330]">
          How can I help with your<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf2cc4] to-[#a32cc4] font-bold">document creation?</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-body font-medium mt-6">
          Generate professional documents with AI-powered synthesis.<br/>
          All processing happens locally on your machine—private and secure.
        </p>
      </div>

      {/* Main Input Box */}
      <div className={`w-full bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border transition-all duration-300 p-2 mb-8 ${isDragActive ? 'border-[#a32cc4] shadow-[#a32cc4]/10' : 'border-slate-200'}`}>
        <textarea 
          className="w-full h-36 px-6 py-6 bg-transparent border-none focus:ring-0 resize-none font-body text-[#1e2330] placeholder:text-slate-400 text-xl font-medium outline-none" 
          placeholder="Describe what you want to create, or give me a topic to work on..."
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
        />
        
        {/* Uploaded Files Display (Inside Box) */}
        {uploadedFiles.length > 0 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {uploadedFiles.map((f, i) => (
               <div key={i} className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 font-semibold border border-slate-200">
                 <span className="material-symbols-outlined text-[14px] text-[#a32cc4]">draft</span>
                 <span className="max-w-[200px] truncate">{f.name}</span>
               </div>
            ))}
          </div>
        )}

        {/* Input Box Footer Toolbar */}
        <div className="flex items-center justify-between px-2 pb-1 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-3">
            <button 
              {...getRootProps()}
              className="px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 font-bold text-sm"
            >
              <input {...getInputProps()} />
              <span className="material-symbols-outlined text-[20px] text-slate-500">upload_file</span>
              Upload File
            </button>
            <span className="text-xs text-slate-400 hidden sm:block font-medium">PDF, DOCX, TXT (Max 50MB)</span>
          </div>

          <button 
            className="bg-[#c879ff] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-[0_4px_14px_rgba(200,121,255,0.3)] transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 text-sm"
            onClick={() => navigate('/configure')}
            disabled={sourceText.length === 0 && uploadedFiles.length === 0}
          >
            Generate
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Suggested Actions Row */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-20">
        <button className="px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 bg-[#fdf4ff] text-[#a32cc4] border border-[#fdf4ff] hover:bg-[#fae8ff] transition-colors" onClick={() => navigate('/library')}>
          <span className="material-symbols-outlined text-[18px]">search</span>
          Search Papers
        </button>
        <button className="px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 bg-white text-[#a32cc4] border border-[#ebd5ff] hover:bg-[#fdf4ff] transition-colors" onClick={() => navigate('/configure')}>
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          Literature Review
        </button>
        <button className="px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 bg-white text-[#22c55e] border border-[#bbf7d0] hover:bg-[#f0fdf4] transition-colors" onClick={() => navigate('/configure')}>
          <span className="material-symbols-outlined text-[18px]">edit_document</span>
          Draft Document
        </button>
        <button className="px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] hover:bg-[#ffedd5] transition-colors" onClick={() => navigate('/library')}>
          <span className="material-symbols-outlined text-[18px]">dataset</span>
          Extract Data
        </button>
        <button className="px-5 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 bg-[#fff1f2] text-[#e11d48] border border-[#ffe4e6] hover:bg-[#ffe4e6] transition-colors">
          <span className="material-symbols-outlined text-[18px]">analytics</span>
          AI Analysis
        </button>
      </div>

      {/* Recent Documents Section */}
      <div className="w-full max-w-4xl text-left">
        <div className="flex justify-between items-end mb-6 px-1">
          <h3 className="text-xl font-bold font-headline text-[#1e2330]">Recent Documents</h3>
          <button className="text-[#a32cc4] text-sm font-bold hover:underline flex items-center gap-1" onClick={() => navigate('/library')}>
            View all
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
        
        {savedDocuments.length > 0 ? (
          <div className="space-y-4">
            {savedDocuments.slice(0, 2).map((doc, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-5 group cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5" onClick={() => navigate('/library')}>
                <div className="w-12 h-12 rounded-xl bg-[#fdf4ff] flex items-center justify-center text-[#a32cc4]">
                  <span className="material-symbols-outlined">{doc.architecture === 'grant_proposal' ? 'request_quote' : doc.architecture === 'research_paper' ? 'science' : 'description'}</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1e2330] text-[15px] group-hover:text-[#a32cc4] transition-colors">{doc.title}</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-[13px] text-slate-500 font-medium">
                    <span className="text-[#a32cc4]">{doc.type}</span>
                    <span>{doc.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{doc.tokens} tokens</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3">
              <span className="material-symbols-outlined">inbox</span>
            </div>
            <h4 className="font-bold text-slate-700">No documents yet</h4>
            <p className="text-sm text-slate-500 mt-1">Start generating local, secure documents to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
