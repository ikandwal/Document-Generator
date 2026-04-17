# Synthetix Studio — AI Document Generator
> Local-first AI document synthesis platform for researchers and engineers.

Built as part of **Major Project 2** (B.Tech), this platform enables privacy-first document generation (Research Papers, READMEs, Grant Proposals, College Reports) using locally-hosted quantized language models — no cloud API calls required.

---

## ✨ Features
- 📝 **AI Document Generation** — Paste raw notes or upload files, choose a template, and let the local model synthesize your document
- 🔒 **Local-Only Processing** — All inference runs on-device via FLAN-T5 / Llama (no data leaves your machine)
- 🎨 **Multi-Stage Agent Pipeline** — Simulated multi-agent Understanding → Structure → Rewrite workflow
- 📁 **Library & Archive** — Manage, search, filter, restore and export your generated documents
- ⚙️ **Settings** — Configure model, tone defaults, privacy, and notification preferences
- 📤 **Export** — Download finished documents as PDF or DOCX

---

## 🗂️ Project Structure

```
major2/
├── smart-doc-platform/
│   ├── frontend/          # Vite + React + TypeScript + TailwindCSS
│   │   ├── src/
│   │   │   ├── pages/     # HomeInput, Configure, AgentProgress, PreviewExport, Library, Settings, Support, Archive
│   │   │   ├── components/  # Layout (Sidebar + TopBar)
│   │   │   └── store/     # Zustand global state (useDocumentStore)
│   │   └── ...
│   ├── routers/           # FastAPI backend routers (generate)
│   ├── parsers/           # PDF and DOCX text extraction
│   ├── templates/         # Document structure templates
│   └── main.py            # FastAPI entrypoint
└── .gitignore
```

---

## 🚀 Getting Started

### Frontend (Dev Server)
```bash
cd smart-doc-platform/frontend
npm install
npm run dev
```
Open `http://localhost:5173`

### Backend (FastAPI)
```bash
cd smart-doc-platform
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript |
| Styling | TailwindCSS v3 (Material Design 3 tokens) |
| State Management | Zustand |
| File Uploads | react-dropzone |
| Routing | React Router v6 |
| Backend | FastAPI (Python) |
| AI Model | Local FLAN-T5 XL (4-bit quantized via llama.cpp / Ollama) |

---

## 📸 Screens

| Home / Input | Configure | Agent Progress | Preview & Export |
|---|---|---|---|
| Text input + Drag & Drop uploader | Document type, tone, model toggle | Live multi-agent timeline | Inline document preview + PDF/DOCX export |

---

## 👨‍💻 Author
**Dev Shrivastava** — B.Tech Major Project 2, 2026
