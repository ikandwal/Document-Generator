const API_BASE = 'http://127.0.0.1:8000';

export interface User {
  user_id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface GenerationResult {
  blob: Blob;
  filename: string;
}

export async function generateDocument(
  rawText: string,
  files: File[],
  docType: string,
  docSubtype: string,
  onStageChange: (stage: number) => void
): Promise<any> {
  const formData = new FormData();
  formData.append('doc_type', docType);
  if (docSubtype) {
    formData.append('doc_subtype', docSubtype);
  }

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

export async function exportDocx(documentData: any, docType: string, docSubtype?: string): Promise<{ blob: Blob, filename: string }> {
  const response = await fetch(`${API_BASE}/export/docx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ document_data: documentData, doc_type: docType, doc_subtype: docSubtype }),
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

export async function login(email: string, password: string): Promise<AuthResponse> {
  const formData = new URLSearchParams();
  formData.append('username', email); // OAuth2PasswordRequestForm expects username
  formData.append('password', password);

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
}

export async function signup(name: string, email: string, password: string): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Signup failed');
  }

  return await response.json();
}

export function logout() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}

export async function getProfile(): Promise<User> {
  const token = getToken();
  const response = await fetch(`${API_BASE}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
}

export async function updateProfile(name: string, email: string, password?: string): Promise<User> {
  const token = getToken();
  const response = await fetch(`${API_BASE}/auth/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update profile');
  }

  return await response.json();
}

export async function saveDocument(title: string, inputPrompt: string, content: string): Promise<any> {
  const token = getToken();
  const response = await fetch(`${API_BASE}/documents/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      input_prompt: inputPrompt,
      generated_content: content,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save document');
  }

  return await response.json();
}

export async function getDocuments(): Promise<any[]> {
  const token = getToken();
  const response = await fetch(`${API_BASE}/documents/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }

  return await response.json();
}
