import { useState, useEffect } from 'react';
import { Activity, TrendingDown, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const timeData = [
  { month: 'Jan', parity: 80, accuracy: 82 },
  { month: 'Feb', parity: 82, accuracy: 84 },
  { month: 'Mar', parity: 81, accuracy: 83 },
  { month: 'Apr', parity: 85, accuracy: 86 },
  { month: 'May', parity: 84, accuracy: 85 },
  { month: 'Jun', parity: 88, accuracy: 88 },
  { month: 'Jul', parity: 87, accuracy: 87 },
  { month: 'Aug', parity: 89, accuracy: 89 },
];

export function Monitoring() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fetch real metrics from the FastAPI backend
    fetch('http://localhost:8000/metrics')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setTimeout(() => setLoaded(true), 50); // animate after data load
      })
      .catch(err => {
        console.error("Failed to fetch metrics", err);
        setTimeout(() => setLoaded(true), 50); // still animate even on error
      });
  }, []);

  if (!metrics) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#3b28cc] mb-4" />
        <p className="text-gray-500 font-medium">Fetching real-time metrics from ML models...</p>
      </div>
    );
  }
  
  // Inject the real live accuracy into the latest data point
  const currentData = [...timeData];
  currentData.push({ 
    month: 'Live', 
    parity: parseFloat((100 - (metrics.demographic_parity_difference * 100)).toFixed(1)), 
    accuracy: metrics.accuracy 
  });

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className={cn("flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 transition-all duration-700 ease-out", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Live Model Monitoring</h1>
          <p className="text-gray-500 text-sm mt-1">Real-time bias and drift tracking for deployed models.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-5 py-2.5 rounded-xl border border-green-100 shadow-sm">
          <Activity className="w-5 h-5 text-green-600 animate-pulse" />
          <span className="text-sm font-bold text-green-700">3 Models Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={cn("bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md hover:-translate-y-1 relative overflow-hidden", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: '100ms' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
          <p className="text-sm text-gray-500 mb-1 font-medium">Global Fairness Score</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-black text-gray-900">{metrics.accuracy}%</h2>
            <span className="flex items-center text-sm text-green-600 font-bold mb-1.5 bg-green-50 px-2 py-0.5 rounded-md">Accuracy</span>
          </div>
        </div>
        <div className={cn("bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md hover:-translate-y-1 relative overflow-hidden", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: '200ms' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
          <p className="text-sm text-gray-500 mb-1 font-medium">Demographic Parity Diff</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-black text-gray-900">{metrics.demographic_parity_difference}</h2>
            <span className="flex items-center text-sm text-red-600 font-bold mb-1.5 bg-red-50 px-2 py-0.5 rounded-md"><TrendingDown className="w-3.5 h-3.5 mr-1" /> High Bias</span>
          </div>
        </div>
        <div className={cn("bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md hover:-translate-y-1 relative overflow-hidden", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: '300ms' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
          <p className="text-sm text-gray-500 mb-1 font-medium">Equalized Odds Diff</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-black text-gray-900">{metrics.equalized_odds_difference}</h2>
            <span className="flex items-center text-sm text-orange-600 font-bold mb-1.5 bg-orange-50 px-2 py-0.5 rounded-md"><AlertCircle className="w-3.5 h-3.5 mr-1" /> Review needed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={cn("bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 transition-all duration-700 ease-out", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: '400ms' }}>
          <h3 className="text-lg font-bold mb-6 text-gray-900">Demographic Parity Over Time</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorParity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b28cc" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b28cc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="parity" stroke="#3b28cc" strokeWidth={4} fillOpacity={1} fill="url(#colorParity)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className={cn("bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 transition-all duration-700 ease-out", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{ transitionDelay: '500ms' }}>
          <h3 className="text-lg font-bold mb-6 text-gray-900">Model Accuracy Tracker</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[70, 100]} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                />
                <Bar dataKey="accuracy" fill="#16a34a" radius={[6, 6, 0, 0]} animationDuration={2000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
