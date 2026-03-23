import { create } from 'zustand';

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
}

export const useDocumentStore = create<DocumentState>((set) => ({
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
  toggleLocalModel: () => set((state) => ({ useLocalModel: !state.useLocalModel }))
}));
