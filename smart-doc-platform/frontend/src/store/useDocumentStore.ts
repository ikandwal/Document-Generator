import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Calculate roughly 1 token per 4 characters
const calculateTokens = (text: string, files: File[]) => {
  const textTokens = Math.ceil(text.length / 4);
  // Give files a flat mock token count for now until actual parsing is implemented
  const fileTokens = files.reduce((acc, _file) => acc + 500, 0);
  return textTokens + fileTokens;
};

interface DocumentState {
  // Input Data
  sourceText: string;
  uploadedFiles: File[];
  tokenCount: number;

  // Input Actions
  setSourceText: (text: string) => void;
  addUploadedFiles: (files: File[]) => void;
  clearInput: () => void;
  setSampleData: () => void;

  // Configuration State
  architecture: string;
  editorialTone: string;
  useLocalModel: boolean;

  // Configuration Actions
  setArchitecture: (arch: string) => void;
  setEditorialTone: (tone: string) => void;
  toggleLocalModel: () => void;

  // Generation State
  isGenerating: boolean;
  generationStage: number;  // 0-3 matching agent steps
  generationError: string | null;
  documentData: any | null;

  // Generation Actions
  startGeneration: () => void;
  setGenerationStage: (stage: number) => void;
  setGenerationError: (err: string | null) => void;
  setDocumentData: (data: any) => void;
  updateDocumentData: (title: string, sections: any[]) => void;
  
  // Save/Load State
  savedDocuments: any[];
  loadDocument: (doc: any) => void;
}

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set) => ({
  sourceText: '',
  uploadedFiles: [],
  tokenCount: 0,

  setSourceText: (text) => set((state) => ({
    sourceText: text,
    tokenCount: calculateTokens(text, state.uploadedFiles)
  })),

  addUploadedFiles: (newFiles) => set((state) => {
    const updatedFiles = [...state.uploadedFiles, ...newFiles];
    return {
      uploadedFiles: updatedFiles,
      tokenCount: calculateTokens(state.sourceText, updatedFiles)
    };
  }),

  clearInput: () => set({ sourceText: '', uploadedFiles: [], tokenCount: 0 }),

  setSampleData: () => {
    const sample = `A detailed review of quantum computing architectures and the implications of edge-LLM interactions.
Data sets from 2026 suggest a 40% reduction in latency when executing 4-bit quantized models locally.
Key considerations include thermal constraints and battery depletion on consumer hardware.`;
    set({ sourceText: sample, tokenCount: calculateTokens(sample, []) });
  },

  // Defaults
  architecture: 'college_report',
  editorialTone: 'formal',
  useLocalModel: true,

  setArchitecture: (arch) => set({ architecture: arch }),
  setEditorialTone: (tone) => set({ editorialTone: tone }),
  toggleLocalModel: () => set((state) => ({ useLocalModel: !state.useLocalModel })),

  // Generation state defaults
  isGenerating: false,
  generationStage: -1,
  generationError: null,
  documentData: null,
  savedDocuments: [],

  startGeneration: () => set({ isGenerating: true, generationStage: 0, generationError: null, documentData: null }),
  setGenerationStage: (stage) => set({ generationStage: stage }),
  setGenerationError: (err) => set({ isGenerating: false, generationError: err }),
  setDocumentData: (data) => set((state) => {
    // Save to the library automatically when setting a new completed document
    const newDoc = {
      id: Date.now().toString(),
      title: data.title || 'Untitled',
      type: state.architecture.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tokens: state.tokenCount || calculateTokens(state.sourceText, state.uploadedFiles),
      tone: state.editorialTone.charAt(0).toUpperCase() + state.editorialTone.slice(1),
      documentData: data,
      architecture: state.architecture
    };
    return {
      isGenerating: false, 
      generationStage: 3, 
      documentData: data,
      savedDocuments: [newDoc, ...state.savedDocuments]
    };
  }),
  updateDocumentData: (title, sections) => set((state) => ({
    documentData: state.documentData ? { ...state.documentData, title, sections } : null
  })),
  resetGeneration: () => set({ isGenerating: false, generationStage: -1, generationError: null, documentData: null }),
  loadDocument: (doc) => set({
    documentData: doc.documentData,
    architecture: doc.architecture,
    editorialTone: doc.tone.toLowerCase(),
  }),
}),
    {
      name: 'smart-doc-storage',
      // We only persist the saved documents list, active document, and config to localStorage. 
      // isGenerating etc should still reset on hard refresh.
      partialize: (state) => ({ 
        savedDocuments: state.savedDocuments,
        documentData: state.documentData,
        sourceText: state.sourceText,
        architecture: state.architecture
      }),
    }
  )
);
