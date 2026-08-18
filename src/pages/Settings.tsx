import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Key, User, Database, Link as LinkIcon, Shield, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage platform configuration and integrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className={cn("col-span-3 space-y-2 transition-all duration-500 ease-out", loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4")}>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-[#3b28cc] text-white shadow-md shadow-[#3b28cc]/20 transition-transform hover:scale-105">
            <Key className="w-4 h-4" /> Integrations & APIs
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
            <User className="w-4 h-4" /> Profile & Team
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
            <Shield className="w-4 h-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
            <Bell className="w-4 h-4" /> Notifications
          </button>
        </div>

        <div className="col-span-9 space-y-6">
          <div className={cn("bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 transition-all duration-700 ease-out delay-100", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Bhashini API Configuration</h2>
                <p className="text-sm text-gray-500">Required to translate AI explanations into regional languages.</p>
              </div>
            </div>
            
            <div className="space-y-5 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">API Key</label>
                <input type="password" value="sk_bhashini_demo_12345" readOnly className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#3b28cc]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Endpoint URL</label>
                <input type="text" value="https://api.bhashini.gov.in/v1" readOnly className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#3b28cc]" />
              </div>
              <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-md mt-2">
                Update Configuration
              </button>
            </div>
          </div>

          <div className={cn("bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 transition-all duration-700 ease-out delay-200", loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Database className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">MLflow Tracking Server</h2>
                <p className="text-sm text-gray-500">Connect to your existing MLflow server to import models.</p>
              </div>
            </div>
            
            <div className="space-y-5 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tracking URI</label>
                <input type="text" placeholder="http://localhost:5000" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3b28cc] transition-shadow" />
              </div>
              <button className="px-6 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm mt-2">
                Connect MLflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
