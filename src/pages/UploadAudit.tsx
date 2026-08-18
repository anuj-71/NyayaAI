import { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Bell, Play, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import { runAudit } from '../lib/api';
import { useNavigate } from 'react-router-dom';

const useCases = [
  { id: 'loan', title: 'Loan Approval', desc: 'Credit scoring and loan eligibility', icon: '🏦' },
  { id: 'hiring', title: 'Hiring', desc: 'Resume screening and candidate selection', icon: '👤' },
  { id: 'scholarship', title: 'Scholarship', desc: 'Eligibility and award allocation', icon: '🎓' },
  { id: 'insurance', title: 'Insurance', desc: 'Claim underwriting and risk assessment', icon: '🛡️' },
  { id: 'gov', title: 'Government Service', desc: 'Ration, pension, subsidy and public services', icon: '🏛️' },
];

const auditSteps = [
  'Model & Data Validation',
  'Fairness & Bias Analysis',
  'Explainability (SHAP)',
  'Robustness Testing',
  'Governance Mapping',
  'Report Generation'
];

export function UploadAudit() {
  const [selectedUseCase, setSelectedUseCase] = useState('loan');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const navigate = useNavigate();

  const handleRunAudit = async () => {
    setIsAuditing(true);
    setProgress(0);
    setCurrentStep(0);
    
    // Simulate staggered professional AI audit steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < auditSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
      setProgress(prev => Math.min(prev + 18, 95));
    }, 600);
    
    try {
      await runAudit(modelFile, selectedUseCase);
      clearInterval(stepInterval);
      setProgress(100);
      setCurrentStep(auditSteps.length);
      
      // Wait a moment for UX, then navigate to monitoring
      setTimeout(() => {
        setIsAuditing(false);
        navigate('/monitoring');
      }, 1000);
    } catch (error) {
      console.error("Audit failed", error);
      setIsAuditing(false);
      setProgress(0);
      setCurrentStep(-1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload & Run AI Audit</h1>
          <p className="text-gray-500 text-sm mt-1">Upload your AI model or dataset, select the use case and run a comprehensive audit.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-500" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#eaddff] text-[#3b28cc] font-bold flex items-center justify-center">
            CO
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Upload */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#3b28cc] text-white flex items-center justify-center text-xs font-bold">1</span>
              <h2 className="text-lg font-semibold">Upload AI Dataset</h2>
            </div>
            <a href="/demo_loan_dataset.csv" download className="text-sm font-medium text-[#3b28cc] hover:underline flex items-center gap-1 bg-[#3b28cc]/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-[#3b28cc]/20">
              <Download className="w-4 h-4" /> Download Sample Dataset
            </a>
          </div>
          
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3 border-2 border-dashed border-[#3b28cc]/40 rounded-2xl bg-[#3b28cc]/5 p-10 flex flex-col items-center justify-center text-center relative hover:bg-[#3b28cc]/10 transition-colors cursor-pointer overflow-hidden group">
              <input 
                type="file" 
                accept=".csv"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setModelFile(e.target.files[0]);
                  }
                }}
              />
              <UploadCloud className="w-16 h-16 text-[#3b28cc] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-semibold text-gray-900 mb-1">Drag and drop your dataset here</p>
              <p className="text-sm text-gray-500 mb-6">Supported formats: .csv</p>
              <button className="bg-[#3b28cc] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#3b28cc]/90 transition-colors pointer-events-none shadow-md">
                Choose Files
              </button>
            </div>

            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <h3 className="font-semibold text-gray-900 mb-4">Upload Summary</h3>
              {modelFile ? (
                <div className="space-y-4 flex-1 animate-in fade-in zoom-in duration-300">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Dataset Name</label>
                    <input type="text" defaultValue="Custom Dataset" className="w-full text-sm px-3 py-2 border border-gray-200 rounded-md bg-gray-50/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">File Name</label>
                    <div className="flex items-center justify-between px-3 py-2 bg-green-50 border border-green-200 rounded-md shadow-sm">
                      <span className="text-sm text-gray-700 truncate max-w-[200px] font-medium">{modelFile.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">{(modelFile.size / 1024).toFixed(1)} KB</span>
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setModelFile(null)} className="text-xs text-red-500 hover:text-red-700 transition-colors font-medium mt-auto inline-block">
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="text-center py-10 flex flex-col items-center justify-center flex-1 text-gray-400">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No file uploaded yet</p>
                  <p className="text-xs mt-1">Please select a .csv file to proceed</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Use Case */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#3b28cc] text-white flex items-center justify-center text-xs font-bold">2</span>
            <h2 className="text-lg font-semibold">Select Use Case</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">Choose the primary use case of this AI system</p>
          
          <div className="grid grid-cols-5 gap-4">
            {useCases.map(uc => (
              <div 
                key={uc.id}
                onClick={() => setSelectedUseCase(uc.id)}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all duration-300 relative group",
                  selectedUseCase === uc.id 
                    ? "border-[#3b28cc] bg-[#3b28cc]/5 shadow-md -translate-y-1" 
                    : "border-gray-200 bg-white hover:border-[#3b28cc]/50 hover:shadow-sm"
                )}
              >
                {selectedUseCase === uc.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#3b28cc] rounded-full flex items-center justify-center animate-in zoom-in">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform origin-left">{uc.icon}</div>
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{uc.title}</h4>
                <p className="text-xs text-gray-500 leading-tight">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sections 3 & 4 */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#3b28cc] text-white flex items-center justify-center text-xs font-bold">3</span>
              <h2 className="text-lg font-semibold">Run AI Audit</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Start a comprehensive audit of your AI system</p>
            <button 
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="w-full bg-[#3b28cc] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#3b28cc]/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:shadow-none"
            >
              {isAuditing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Auditing AI Model...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  Run AI Audit
                </>
              )}
            </button>
          </div>

          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Animated background gradient when auditing */}
            <div className={cn("absolute inset-0 bg-gradient-to-r from-transparent via-[#3b28cc]/5 to-transparent -translate-x-full duration-1000", isAuditing && "animate-[shimmer_2s_infinite]")} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3b28cc] text-white flex items-center justify-center text-xs font-bold">4</span>
                  <h2 className="text-lg font-semibold">Audit Status / Progress</h2>
                </div>
                <span className={cn("font-bold transition-colors duration-300", isAuditing ? "text-[#3b28cc]" : "text-gray-900")}>
                  {progress}%
                </span>
              </div>
              
              <p className="text-sm text-gray-500 mb-8">Real-time progress of your audit with advanced validation</p>
              
              <div className="relative pt-4">
                {/* Progress Bar Background */}
                <div className="absolute top-7 left-6 right-6 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-[#3b28cc] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="relative flex justify-between">
                  {auditSteps.map((step, idx) => {
                    const isCompleted = idx < currentStep;
                    const isActive = idx === currentStep;
                    
                    return (
                      <div key={step} className="flex flex-col items-center w-24 relative">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center z-10 bg-white border-2 transition-all duration-500",
                          isCompleted ? "border-green-500 bg-green-500 text-white shadow-md shadow-green-500/20" :
                          isActive ? "border-[#3b28cc] text-[#3b28cc] shadow-lg shadow-[#3b28cc]/30 scale-125" : "border-gray-200 text-gray-300"
                        )}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 animate-in zoom-in duration-300" />
                          ) : (
                            <div className={cn("w-2.5 h-2.5 rounded-full transition-all duration-500", isActive ? "bg-[#3b28cc] animate-pulse" : "bg-transparent")} />
                          )}
                        </div>
                        {isActive && (
                          <div className="absolute top-10 flex items-center justify-center">
                            <span className="flex h-2 w-2 relative mt-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b28cc] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b28cc]"></span>
                            </span>
                          </div>
                        )}
                        <span className={cn(
                          "text-[10px] font-bold text-center mt-4 leading-tight transition-all duration-500",
                          isCompleted ? "text-green-600" :
                          isActive ? "text-[#3b28cc]" : "text-gray-400"
                        )}>
                          {step}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
