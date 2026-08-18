import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import shap
from fairlearn.metrics import demographic_parity_difference, demographic_parity_ratio, equalized_odds_difference
import os

rf_model = None
explainer = None
X_global = None

def run_fairness_audit(file_path: str = None):
    global rf_model, explainer, X_global
    
    if file_path and os.path.exists(file_path):
        df = pd.read_csv(file_path)
    else:
        # Fallback to the public demo dataset if no file uploaded yet
        demo_path = "../public/demo_loan_dataset.csv"
        if not os.path.exists(demo_path):
            demo_path = "public/demo_loan_dataset.csv"
            
        if os.path.exists(demo_path):
            df = pd.read_csv(demo_path)
        else:
            raise ValueError("Dataset not found!")
        
    if 'Approved' not in df.columns:
        raise ValueError("Dataset must contain 'Approved' column")
        
    y = df['Approved']
    
    if 'Gender' in df.columns:
        sensitive_feature = df['Gender']
        X = df.drop(columns=['Approved', 'Gender'])
    else:
        sensitive_feature = pd.Series(["Older" if age > 30 else "Younger" for age in df['Age']])
        X = df.drop(columns=['Approved'])
        
    X_global = X.copy()
        
    # Train Random Forest
    rf_model = RandomForestClassifier(n_estimators=50, random_state=42)
    rf_model.fit(X, y)
    
    y_pred = rf_model.predict(X)
    
    acc = accuracy_score(y, y_pred)
    dpd = demographic_parity_difference(y, y_pred, sensitive_features=sensitive_feature)
    dpr = demographic_parity_ratio(y, y_pred, sensitive_features=sensitive_feature)
    eod = equalized_odds_difference(y, y_pred, sensitive_features=sensitive_feature)
    
    # Initialize SHAP explainer
    explainer = shap.TreeExplainer(rf_model)
    
    return {
        "accuracy": round(acc * 100, 2),
        "demographic_parity_difference": round(dpd, 4),
        "demographic_parity_ratio": round(dpr, 4),
        "equalized_odds_difference": round(eod, 4)
    }

def get_shap_explanation(index: int = 0):
    global rf_model, explainer, X_global
    
    if rf_model is None or explainer is None or X_global is None:
        run_fairness_audit()
        
    if index >= len(X_global):
        index = 0
        
    applicant = X_global.iloc[[index]]
    prediction = rf_model.predict(applicant)[0]
    
    shap_values = explainer.shap_values(applicant)
    
    if isinstance(shap_values, list):
        vals = shap_values[1][0]
    else:
        if len(shap_values.shape) == 3:
            vals = shap_values[0, :, 1]
        else:
            vals = shap_values[0]

    feature_names = X_global.columns.tolist()
    
    factors = []
    for i, feature in enumerate(feature_names):
        impact_val = float(vals[i])
        actual_val = applicant.iloc[0, i]
        
        mag = abs(impact_val)
        if mag > 0.15:
            impact_level = "High"
        elif mag > 0.05:
            impact_level = "Medium"
        else:
            impact_level = "Low"
            
        factors.append({
            "name": feature,
            "actual_value": str(actual_val),
            "shap_value": round(impact_val, 4),
            "impact": impact_level,
            "bar_value": min(max(int(mag * 300), 10), 100) 
        })
        
    factors.sort(key=lambda x: abs(x["shap_value"]), reverse=True)
    
    return {
        "decision": "APPROVED" if prediction == 1 else "REJECTED",
        "factors": factors
    }

if __name__ == "__main__":
    print("Testing ML Model Locally...")
    print("\nFairness Audit Results:")
    print(run_fairness_audit())
    print("\nSHAP Results for Index 0:")
    print(get_shap_explanation(0))
