import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileText, 
  Activity, 
  FolderOpen, 
  Users, 
  ShieldCheck, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Upload AI System', path: '/upload', icon: UploadCloud },
  { name: 'Audit Reports', path: '/reports', icon: FileText },
  { name: 'Monitoring', path: '/monitoring', icon: Activity },
  { name: 'Case Files', path: '/cases', icon: FolderOpen },
  { name: 'Citizen Portal', path: '/citizen', icon: Users },
  { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-[280px] bg-[#0f1235] text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto shadow-2xl z-50">
      {/* Logo Area */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b28cc] to-purple-600 flex items-center justify-center shadow-lg shadow-[#3b28cc]/20">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-2xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">NyayaAI</h1>
          <p className="text-[11px] text-gray-400 mt-1 font-medium tracking-wide uppercase">Responsible AI</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/' && location.pathname === '') ||
                          (item.path === '/upload' && location.pathname === '/') ; // Default dashboard to upload for demo
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 group relative",
                isActive 
                  ? "bg-[#3b28cc] text-white shadow-lg shadow-[#3b28cc]/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              )}
              <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-white" : "text-gray-400 group-hover:text-white")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 space-y-3 mt-auto">
        <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:from-white/10 hover:to-white/15 transition-all border border-white/5 group shadow-lg">
          <div>
            <p className="text-sm font-bold text-white mb-0.5">Need Help?</p>
            <p className="text-xs text-gray-400 font-medium">Read documentation</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>

        <div className="flex items-center gap-3 p-4 hover:bg-white/5 rounded-2xl cursor-pointer transition-colors mt-2 group border border-transparent hover:border-white/5">
          <div className="w-11 h-11 rounded-full bg-[#3b28cc] flex items-center justify-center font-bold text-sm shadow-md shadow-[#3b28cc]/20 group-hover:scale-105 transition-transform">
            CO
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Compliance Officer</p>
            <p className="text-[11px] text-[#3b28cc] font-bold uppercase tracking-wider mt-0.5">Admin</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
}
