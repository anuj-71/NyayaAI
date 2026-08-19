// API Service for NyayaAI connecting to FastAPI Backend

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';

export interface AuditResult {
  status: 'pending' | 'completed';
  progress: number;
  metrics?: {
    accuracy: number;
    demographic_parity_difference: number;
    demographic_parity_ratio: number;
    equalized_odds_difference: number;
  };
}

export const runAudit = async (modelFile: File | null, useCase: string): Promise<AuditResult> => {
  console.log(`Starting audit for ${modelFile?.name || 'dataset'} (Use Case: ${useCase})`);
  
  const formData = new FormData();
  if (modelFile) {
    formData.append('modelFile', modelFile);
  } else {
    // If no file uploaded, backend falls back to demo_loan_dataset.csv
    // But we still need to send a dummy file or adjust backend.
    // Let's create a dummy file just to pass the validation if needed,
    // or the frontend should force uploading a file.
    // Actually, backend requires modelFile: UploadFile = File(...)
    // So we'll append a dummy empty blob if null.
    formData.append('modelFile', new Blob(['']), 'demo_loan_dataset.csv');
  }
  formData.append('useCase', useCase);

  const response = await fetch(`${API_BASE_URL}/audit`, {
    method: 'POST',
    body: formData // No Content-Type header so browser sets multipart/form-data with boundary
  });
  
  return response.json();
};

export interface DecisionFactor {
  name: string;
  actual_value: number;
  shap_value: number;
  impact: 'High' | 'Medium' | 'Low';
  bar_value: number; 
}

export interface DecisionExplanation {
  decision: 'REJECTED' | 'APPROVED';
  date: string;
  useCase: string;
  referenceId: string;
  reasons: string[];
  factors: DecisionFactor[];
}

export const getDecisionExplanation = async (decisionId: string, language: string = 'en'): Promise<DecisionExplanation> => {
  console.log(`Fetching explanation for ${decisionId} in ${language}`);
  const response = await fetch(`${API_BASE_URL}/explain/${decisionId}`);
  return response.json();
};

export const requestHumanReview = async (decisionId: string): Promise<boolean> => {
  console.log(`Requesting human review for ${decisionId}`);
  // Still mocked as we didn't implement a database backend for case files
  return true;
};

