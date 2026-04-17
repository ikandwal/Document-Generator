const API_BASE = 'http://127.0.0.1:8000';

export interface GenerationResult {
  blob: Blob;
  filename: string;
}

export async function generateDocument(
  rawText: string,
  files: File[],
  docType: string,
  onStageChange: (stage: number) => void
): Promise<any> {
  const formData = new FormData();
  formData.append('doc_type', docType);

  if (files.length > 0) {
    formData.append('file', files[0]); // primary file
  }
  if (rawText.trim()) {
    formData.append('raw_text', rawText);
  }

  // Simulate agent progress stages while waiting for the response
  onStageChange(0); // Understanding Agent running
  const progressTimer = setTimeout(() => onStageChange(1), 4000);   // Structure Agent
  const progressTimer2 = setTimeout(() => onStageChange(2), 9000);  // Rewrite Agent

  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      body: formData,
    });

    clearTimeout(progressTimer);
    clearTimeout(progressTimer2);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Generation failed: ${response.status} — ${errorText}`);
    }

    onStageChange(3); // Done

    const data = await response.json();
    return data.document_data;
  } catch (err) {
    clearTimeout(progressTimer);
    clearTimeout(progressTimer2);
    throw err;
  }
}

export async function exportDocx(documentData: any, docType: string): Promise<{ blob: Blob, filename: string }> {
  const response = await fetch(`${API_BASE}/export/docx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ document_data: documentData, doc_type: docType }),
  });

  if (!response.ok) {
    throw new Error(`Export failed: ${response.status}`);
  }

  const blob = await response.blob();
  const disposition = response.headers.get('content-disposition');
  const filename = disposition
    ? disposition.split('filename=')[1]?.replace(/"/g, '') ?? 'document.docx'
    : 'document.docx';

  return { blob, filename };
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
