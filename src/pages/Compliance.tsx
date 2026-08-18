import { useState, useEffect } from 'react';
import { Shield, BookOpen, CheckCircle2, FileCheck, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function Compliance() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Compliance Mapping</h1>
          <p className="text-gray-500 text-sm mt-1">Track alignment with Indian regulatory frameworks.</p>
        </div>
        <button 
          onClick={() => {
            const content = `NyayaAI DPDP Act & MeitY Compliance Proof\nDate: ${new Date().toLocaleDateString()}\n\nThis is a securely generated proof of compliance mapping for the NyayaAI platform.`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Compliance_Audit_Proof.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#3b28cc] text-white rounded-xl text-sm font-medium hover:bg-[#3b28cc]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <FileCheck className="w-4 h-4" /> Download Audit Proof
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DPDP Act */}
        <div 
          className={cn(
            "bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 transition-all duration-700 ease-out relative overflow-hidden group hover:shadow-lg",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
          <div className="flex items-center gap-4 mb-6 border-b border-gray-100/80 pb-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">DPDP Act (2023)</h2>
              <p className="text-sm text-gray-500 font-medium">Digital Personal Data Protection</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-semibold text-gray-900">Section 4: Purpose Limitation</p>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">All 3 active models verify explicit consent tokens before processing inference.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-semibold text-gray-900">Section 11: Right to Grievance Redressal</p>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">Citizen portal active. 4 disputes recorded and tracked via Case Files.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
             <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn">
               View Full Mapping <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* MeitY Guidelines */}
        <div 
          className={cn(
            "bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 transition-all duration-700 ease-out delay-150 relative overflow-hidden group hover:shadow-lg",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500 opacity-70 group-hover:opacity-100"></div>
          <div className="flex items-center gap-4 mb-6 border-b border-gray-100/80 pb-5">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">MeitY AI Guidelines</h2>
              <p className="text-sm text-gray-500 font-medium">7 AI Sutras for Responsible AI</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-semibold text-gray-900">Sutra 1: Transparency</p>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">SHAP explainability integrated into Citizen Portal for all rejected decisions.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-base font-semibold text-gray-900">Sutra 3: Fairness & Non-discrimination</p>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">IBM AIF360 demographic parity checks running on all active loan and hiring models.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
             <button className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1 group/btn">
               View Full Mapping <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
