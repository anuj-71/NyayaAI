import { useState, useEffect } from 'react';
import { FileText, Download, CheckCircle2, AlertTriangle, XCircle, Search, Filter, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const mockReports = [
  { id: 'AUD-8821', model: 'Loan_Approval_Model_v2', date: '2026-05-18', score: 92, status: 'pass' },
  { id: 'AUD-8820', model: 'Resume_Screening_v1', date: '2026-05-15', score: 74, status: 'warning' },
  { id: 'AUD-8819', model: 'Scholarship_Allocator_v3', date: '2026-05-10', score: 98, status: 'pass' },
  { id: 'AUD-8818', model: 'Subsidy_Eligibility_v1', date: '2026-05-02', score: 45, status: 'fail' },
  { id: 'AUD-8817', model: 'Insurance_Underwriting_v2', date: '2026-04-28', score: 88, status: 'pass' },
];

export function AuditReports() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Slight delay to trigger animation after mount
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Audit Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Review historical bias audits and download compliance reports.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b28cc] focus:border-[#3b28cc] sm:text-sm transition-all shadow-sm" 
              placeholder="Search reports..." 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm hover:shadow">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden relative transition-all">
        {/* Top Gradient Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3b28cc] via-purple-500 to-pink-500"></div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50/50 uppercase border-b border-gray-100/80">
              <tr>
                <th className="px-6 py-5 font-semibold tracking-wider">Audit ID</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Model Name</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Fairness Score</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {mockReports.map((report, index) => (
                <tr 
                  key={report.id} 
                  className={cn(
                    "hover:bg-[#3b28cc]/[0.02] transition-all duration-500 group cursor-default",
                    loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <td className="px-6 py-5 font-medium text-gray-900 group-hover:text-[#3b28cc] transition-colors">{report.id}</td>
                  <td className="px-6 py-5 font-medium text-gray-700">{report.model}</td>
                  <td className="px-6 py-5 text-gray-500">{report.date}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000 ease-out",
                            report.score >= 85 ? "bg-gradient-to-r from-emerald-400 to-green-500" : 
                            report.score >= 60 ? "bg-gradient-to-r from-amber-400 to-orange-500" : 
                            "bg-gradient-to-r from-rose-400 to-red-500"
                          )}
                          style={{ width: loaded ? `${report.score}%` : '0%' }}
                        />
                      </div>
                      <span className="font-bold text-gray-700">{report.score}<span className="text-gray-400 text-xs font-normal">/100</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {report.status === 'pass' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold shadow-sm transition-transform hover:scale-105">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pass
                      </span>
                    )}
                    {report.status === 'warning' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold shadow-sm transition-transform hover:scale-105">
                        <AlertTriangle className="w-3.5 h-3.5" /> Warning
                      </span>
                    )}
                    {report.status === 'fail' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold shadow-sm transition-transform hover:scale-105">
                        <XCircle className="w-3.5 h-3.5" /> Fail
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => {
                        const content = `NyayaAI Audit Report - ${report.id}\nModel: ${report.model}\nDate: ${report.date}\nFairness Score: ${report.score}/100\nStatus: ${report.status.toUpperCase()}\n\nThis is a securely generated compliance report from the NyayaAI platform.`;
                        const blob = new Blob([content], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${report.id}_Compliance_Report.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#3b28cc] hover:bg-[#3b28cc]/10 font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" /> 
                      <span className="text-xs">PDF</span>
                    </button>
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors ml-2">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
