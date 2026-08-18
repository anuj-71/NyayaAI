from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import time
import shutil
import os

from ml_model import get_shap_explanation, run_fairness_audit

app = FastAPI(title="NyayaAI Backend")

# Allow requests from the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to http://localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/audit")
def audit_model(modelFile: UploadFile = File(...), useCase: str = Form(...)):
    """Runs the Fairlearn bias audit metrics on the dataset."""
    print(f"Starting audit for {useCase} with file {modelFile.filename}...")
    
    # Save the file temporarily
    file_path = f"temp_{modelFile.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(modelFile.file, buffer)
        
    # Simulate processing delay
    time.sleep(1.5)
    
    # Run the actual fairlearn metrics on the uploaded file
    metrics = run_fairness_audit(file_path)
    
    return {
        "status": "completed",
        "progress": 100,
        "metrics": metrics
    }

@app.get("/metrics")
def get_metrics():
    """Returns the latest fairness metrics for the dashboard."""
    # In a real app this would query a database. For the demo, we compute it.
    metrics = run_fairness_audit()
    return metrics

@app.get("/explain/{decision_id}")
def explain_decision(decision_id: str):
    """Runs SHAP explainability on a specific decision."""
    # Parse the index from the decision_id if it follows format like LA-2026-X
    index = 0
    try:
        parts = decision_id.split("-")
        if len(parts) > 1 and parts[-1].isdigit():
            index = int(parts[-1]) % 100 # keep within bounds
    except Exception:
        index = 0
    
    explanation = get_shap_explanation(index)
    
    return {
        "decision": explanation["decision"],
        "date": "18 May 2026",
        "useCase": "Loan Approval",
        "referenceId": decision_id,
        "reasons": [
            f"Your {f['name']} was recorded as {f['actual_value']}, which {'negatively' if f['shap_value'] < 0 else 'positively'} impacted the decision." 
            for f in explanation["factors"] if abs(f["shap_value"]) > 0.05
        ] + ["These factors had the most impact on the decision."],
        "factors": explanation["factors"]
    }
