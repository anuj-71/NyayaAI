import { useState, useEffect } from 'react';
import { ShieldCheck, Search, Globe, ChevronDown, CheckCircle2, XCircle, FileText, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { getDecisionExplanation, type DecisionExplanation } from '../lib/api';

export function CitizenPortal() {
  const [decisionId, setDecisionId] = useState('DEC-2026-05-18-7G4SK');
  const [data, setData] = useState<DecisionExplanation | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleExplain = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setShowResults(false);
    try {
      const explanation = await getDecisionExplanation(decisionId);
      setData(explanation);
      // Give a tiny delay before showing results to trigger the CSS animation
      setTimeout(() => setShowResults(true), 100);
    } finally {
      setLoading(false);
    }
  };

  // Pre-load data to match mockup immediately for demo
  useEffect(() => {
    handleExplain();
  }, []);

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className={cn("text-center mb-10 transition-all duration-700 ease-out", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Check Your AI Decision Status</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">Enter your Reference ID to see why a decision was made, understand your rights, and file an appeal if necessary.</p>
      </div>

      {/* Search Box */}
      <div className={cn("bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 mb-10 transition-all duration-700 delay-100", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        <form onSubmit={handleExplain} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter Reference ID (e.g., DEC-2026-05-18-7G4SK)" 
              value={decisionId}
              onChange={(e) => setDecisionId(e.target.value)}
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-[#3b28cc]/10 focus:border-[#3b28cc] transition-all bg-gray-50/50" 
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-[#3b28cc] text-white rounded-2xl font-bold text-lg hover:bg-[#3b28cc]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 flex items-center gap-2"
          >
            {loading ? <span className="animate-pulse">Analyzing...</span> : 'Explain Decision'}
          </button>
        </form>
        
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Available in 12 regional languages via Bhashini</span>
          </div>
          <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-[#3b28cc] transition-colors">
            English <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {data && (
        <div className={cn("space-y-6 transition-all duration-700", showResults ? "opacity-100" : "opacity-0")}>
          {/* Status Banner */}
          <div className={cn("bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm relative overflow-hidden transition-all duration-500", showResults ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <XCircle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-1">Application {data.decision}</h2>
              <p className="text-red-700 text-lg">Your application ({data.referenceId}) for {data.useCase} was {data.decision.toLowerCase()} by the AI system on {data.date}.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Explanation Card */}
            <div className={cn("bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 transition-all duration-700 delay-200", showResults ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <FileText className="w-6 h-6 text-[#3b28cc]" />
                Why was this decision made?
              </h3>
              
              <ul className="space-y-4 mb-6">
                {data.reasons.slice(0, 3).map((reason, idx) => (
                  <li 
                    key={idx} 
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-700",
                      showResults ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    )}
                    style={{ transitionDelay: `${400 + (idx * 300)}ms` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#3b28cc] shrink-0 mt-0.5" />
                    <span className="text-base text-gray-700 font-medium leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
              <p 
                className={cn(
                  "text-sm text-gray-500 font-medium text-center bg-gray-50/50 py-3 rounded-lg border border-gray-100 transition-all duration-700",
                  showResults ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: `${400 + (3 * 300)}ms` }}
              >
                {data.reasons[3] || "These factors had the most impact on the decision."}
              </p>
            </div>

            {/* SHAP Factors Card */}
            <div className={cn("bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 transition-all duration-700 delay-300", showResults ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Activity className="w-6 h-6 text-[#3b28cc]" />
                Real-Time SHAP Analysis
              </h3>

              <div className="space-y-5">
                {data.factors.map((factor, idx) => (
                  <div 
                    key={factor.name} 
                    className={cn(
                      "transition-all duration-700 ease-out",
                      showResults ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                    )}
                    style={{ transitionDelay: `${1200 + (idx * 300)}ms` }}
                  >
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="font-bold text-gray-900 text-lg">{factor.name}</span>
                      </div>
                      <span className={cn(
                        "text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md",
                        factor.impact === 'High' ? "bg-red-50 text-red-600" :
                        factor.impact === 'Medium' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
                      )}>
                        {factor.impact} Impact
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-[1500ms] ease-out relative",
                          factor.impact === 'High' ? "bg-gradient-to-r from-red-400 to-red-600" :
                          factor.impact === 'Medium' ? "bg-gradient-to-r from-orange-400 to-orange-500" : "bg-gradient-to-r from-green-400 to-green-500"
                        )}
                        style={{ 
                          width: showResults ? `${factor.bar_value}%` : '0%',
                          transitionDelay: `${1500 + (idx * 300)}ms` 
                        }}
                      >
                         <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dispute Card */}
          <div className={cn("bg-gradient-to-br from-[#0f1235] to-[#1a1b4b] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden transition-all duration-700", showResults ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")} style={{ transitionDelay: '2500ms' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Think this decision is wrong or biased?</h3>
                <p className="text-gray-300 text-lg max-w-2xl">
                  Under the DPDP Act Section 11, you have the right to request a human review of this automated decision.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <button className="px-6 py-3 bg-white text-[#0f1235] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  File a Dispute
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { background-position: 1rem 0; }
          100% { background-position: 0 0; }
        }
      `}} />
    </div>
  );
}
