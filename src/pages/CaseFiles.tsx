import { useState, useEffect } from 'react';
import { Search, Filter, FolderOpen, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

const mockCases = [
  { id: 'DEC-2026-05-18-7G4SK', citizen: 'Rahul V.', model: 'Loan_Approval_v2', status: 'Pending Review', flaggedOn: '2026-05-18' },
  { id: 'DEC-2026-05-17-9M2LQ', citizen: 'Priya S.', model: 'Scholarship_v3', status: 'Under Investigation', flaggedOn: '2026-05-17' },
  { id: 'DEC-2026-05-14-1A8XB', citizen: 'Mohammed A.', model: 'Hiring_Screening_v1', status: 'Resolved (Overturned)', flaggedOn: '2026-05-14' },
  { id: 'DEC-2026-05-10-5K9PY', citizen: 'Anita K.', model: 'Loan_Approval_v2', status: 'Resolved (Upheld)', flaggedOn: '2026-05-10' },
];

export function CaseFiles() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Case Files</h1>
          <p className="text-gray-500 text-sm mt-1">Manage citizen disputes and requests for human review.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b28cc] focus:border-[#3b28cc] sm:text-sm transition-all shadow-sm" 
              placeholder="Search by ID or Citizen..." 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm hover:shadow">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden relative transition-all">
        {/* Top Gradient Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3b28cc] via-blue-500 to-cyan-500"></div>

        <div className="overflow-x-auto mt-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50/50 uppercase border-b border-gray-100/80">
              <tr>
                <th className="px-6 py-5 font-semibold tracking-wider">Decision ID</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Citizen Name</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Model Invoked</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Flagged On</th>
                <th className="px-6 py-5 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-5 font-semibold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {mockCases.map((c, index) => (
                <tr 
                  key={c.id} 
                  className={cn(
                    "hover:bg-[#3b28cc]/[0.02] transition-all duration-500 group cursor-pointer",
                    loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <td className="px-6 py-5 font-medium text-gray-900 group-hover:text-[#3b28cc] transition-colors flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-gray-400 group-hover:text-[#3b28cc] transition-colors" /> {c.id}
                  </td>
                  <td className="px-6 py-5 font-medium">{c.citizen}</td>
                  <td className="px-6 py-5 text-gray-500">{c.model}</td>
                  <td className="px-6 py-5 text-gray-500">{c.flaggedOn}</td>
                  <td className="px-6 py-5">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform hover:scale-105",
                      c.status.includes('Pending') ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                      c.status.includes('Under') ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-gray-100 text-gray-700 border border-gray-200'
                    )}>
                      {c.status.includes('Pending') ? <Clock className="w-3.5 h-3.5" /> : 
                       c.status.includes('Under') ? <AlertCircle className="w-3.5 h-3.5" /> : null}
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-[#3b28cc] hover:bg-[#3b28cc]/10 font-medium transition-colors">
                      Review <ChevronRight className="w-4 h-4" />
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
