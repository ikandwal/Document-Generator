# Project Overview: Synthetix Studio — AI Document Generator

Synthetix Studio is a local-first AI document synthesis platform designed for generating structured documents (like Research Papers and College Reports) from raw text or uploaded files.

## 🛠️ Current State of Development

### What Works ✅

1.  **Backend Infrastructure (FastAPI)**:
    -   The server is fully operational.
    -   `/health` endpoint for monitoring.
    -   `/generate` endpoint handles multi-agent orchestration.
    -   **Multi-Agent Pipeline**:
        -   **Understanding Agent**: ✅ **CONFIRMED WORKING**. Uses the FLAN-T5 model for privacy-first topic extraction. I've verified this with a live test.
        -   **Structure Agent**: Uses Google Gemini 2.0 Flash to organize topics into logical sections.
        -   **Rewrite Agent**: Uses Gemini 2.0 Flash to polish content for professional tone.
    -   **Document Generation**: Automatically builds `.docx` files with academic formatting (Times New Roman, 1.5 spacing, specific margins).

2.  **Frontend (React + Vite)**:
    -   **Premium UI**: Custom Material Design 3 theme with "isolated lab" aesthetics.
    -   **Navigation**: Functional routing between Input, Configuration, and Progress tracking.
    -   **State Management**: Zustand store (`useDocumentStore`) tracks the entire lifecycle of document generation.
    -   **Progress Visualization**: Live timeline showing which agent is currently active.

3.  **Parsing Capabilities**:
    -   **PDF Parser**: Uses `PyMuPDF` (`fitz`) to extract text.
    -   **DOCX Parser**: Uses `python-docx` for text extraction.

### What Needs Attention / Might Not Work ⚠️

1.  **Gemini API Key**: Requires a valid `GEMINI_API_KEY` in the [.env](file:///c:/Users/dev/Documents/GitHub/major2/smart-doc-platform/.env) file for the Structure and Rewrite agents.
2.  **Local Model Loading**: The first run of the Understanding Agent will attempt to download `google/flan-t5-small` if not already present in `flan-t5-doc-model`.
3.  **Extended Templates**: Currently, [college_report.py](file:///c:/Users/dev/Documents/GitHub/major2/smart-doc-platform/templates/college_report.py) is the primary template. README, Research Paper, and Grant Proposal options in the UI likely fallback to the same format or need dedicated template files.

---

## 🎤 Presentation Guide (Terminal Demo)

If you need to show the project working via the terminal, you can run these commands:

### 1. Start the Backend
Open a terminal in `smart-doc-platform/`:
```powershell
uvicorn main:app --reload
```
*Expected: Server starts on `http://127.0.0.1:8000`.*

### 2. Verify Health
Open a new terminal and run:
```powershell
curl http://127.0.0.1:8000/health
```
*Expected: `{"status": "ok"}`.*

### 3. Generate a Document via CLI
You can demonstrate the AI pipeline by sending a direct POST request:
```powershell
curl -X POST "http://127.0.0.1:8000/generate" `
     -F "doc_type=college_report" `
     -F "raw_text=The impact of Quantum Computing on encryption. Future trends in 2026 include edge-based LLM execution." `
     --output demo_output.docx
```
*Expected: The terminal will show a download progress bar, and `demo_output.docx` will appear in your folder.*

## 🧠 Technical Deep Dive: The AI Model

### Is it pre-trained or custom-trained?
The **Understanding Agent** uses **FLAN-T5-small**, a state-of-the-art pre-trained model developed by **Google Research**. 

-   **Architecture**: T5 (Text-to-Text Transfer Transformer).
-   **Pre-training**: Trained on the massive **C4 (Colossal Clean Crawled Corpus)** dataset.
-   **Fine-tuning (FLAN)**: Google fine-tuned this specific version on the **FLAN collection** (1,800+ tasks framed as instructions). This makes it exceptionally good at "instruction following" (e.g., "Extract key topics") without needing task-specific training.
-   **Local Inference**: We use the 60M parameter version, which is small enough to perform inference on a standard laptop CPU while maintaining high accuracy for topic extraction.

### Current Implementation logic:
-   **Fallback System**: The code first looks for a locally stored "fine-tuned" model in `./flan-t5-doc-model`.
-   **Dynamic Download**: If the local folder is missing, it dynamically downloads the pre-trained weights from Hugging Face's Hub (`google/flan-t5-small`).
-   **Privacy**: Once the model is cached locally (after the first run), it performs inference entirely offline, ensuring no data leaves the machine during the "Understanding" phase.
