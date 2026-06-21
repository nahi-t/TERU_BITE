import React, { useState, useEffect, FormEvent } from 'react';
import { ArrowLeft, AlertTriangle, RefreshCw, Key } from 'lucide-react';
import { login, getToken, getUserId, removeToken } from '../services/api';
import AdminDashboard from './admin/AdminDashboard';
import logoImage from '../asset/logo.png';

interface AdminPanelProps {
  onBack: () => void;
  onRefreshData: () => void;
}

export default function AdminPanel({ onBack, onRefreshData }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('admin@g.com');
  const [password, setPassword] = useState<string>('admin123');
  const [userId, setUserId] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      setUserId(getUserId() || '');
    }
  }, []);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    try {
      const data = await login(email, password);
      
      if (data && ((data as any).access_token || (data as any).token)) {
        setIsLoggedIn(true);
        setUserId(data.userId || (data as any).user?.id || getUserId() || '');
        setPassword(''); 
        onRefreshData();
      } else {
        throw new Error('Invalid authentication response structure received from server.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAction = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserId('');
    onRefreshData();
  };

  if (!isLoggedIn) {
    return (
      <div 
        className="min-h-screen text-stone-100 flex flex-col justify-center items-center p-0 sm:p-4 relative overflow-y-auto overflow-x-hidden selection:bg-red-500 selection:text-white bg-cover bg-center bg-no-repeat transition-all duration-300" 
        id="admin-login-screen"
        style={{ backgroundImage: `url(${logoImage})` }}
      >
        {/* --- FULL SCREEN BACKGROUND OVERLAYS --- */}
        <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[3px] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.2),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_50%)] z-0" />

        {/* --- EXIT PORTAL BUTTON --- */}
        <div className="w-full max-w-md sm:absolute sm:top-6 sm:left-6 p-6 sm:p-0 z-10 flex justify-start">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 bg-stone-900/70 hover:bg-stone-800 text-stone-300 font-bold text-xs py-2.5 px-4 rounded-xl border border-stone-800/40 backdrop-blur-md transition-all cursor-pointer group"
          >
            <ArrowLeft size={14} className="text-red-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Exit Admin Portal</span>
          </button>
        </div>

        {/* --- DYNAMIC RESPONSIVE CONTAINER --- */}
        {/* Mobile: bg-transparent, 0 border, 0 shadow, 0 blur. Desktop/Tablet: Glass card backdrop-blur-2xl */}
        <div className="w-full max-w-md min-h-[calc(100vh-120px)] sm:min-h-0 bg-transparent sm:bg-stone-950/45 border-0 sm:border border-stone-800/40 sm:rounded-3xl p-6 sm:p-8 shadow-none sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col justify-center sm:block backdrop-blur-none sm:backdrop-blur-2xl relative z-10">
          
          {/* --- MINIMIZED LOGO FOR MOBILE ONLY --- */}
          <div className="flex sm:hidden justify-center mb-4 select-none">
            <img 
              src={logoImage} 
              alt="TIRU BITE Logo" 
              className="h-16 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" 
            />
          </div>

          {/* --- BRANDING HEADER --- */}
          <div className="text-center mb-8 relative">
            <h2 className="text-xl sm:text-2xl font-black tracking-[0.15em] sm:tracking-[0.18em] text-stone-100 uppercase font-mono">
              TIRU <span className="text-red-500">BITE</span>
            </h2>
            <p className="text-[9px] sm:text-[10px] font-mono text-stone-400 uppercase tracking-[0.12em] sm:tracking-[0.15em] mt-1.5 font-bold">
              Authorized Control Terminal
            </p>
          </div>

          {authError && (
            <div className="mb-4 bg-red-900/40 border border-red-500/40 text-red-100 p-3 rounded-xl text-xs flex gap-2 items-center backdrop-blur-md">
              <AlertTriangle size={16} className="text-red-400 shrink-0" />
              <span className="break-all">{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-stone-950/60 border border-stone-800 focus:border-red-500 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors placeholder-stone-500 appearance-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <input
                type="password"
                required
                className="w-full bg-stone-950/60 border border-stone-800 focus:border-red-500 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors appearance-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-stone-800 disabled:to-stone-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-red-950/40 active:scale-[0.99] sm:hover:scale-[1.01] cursor-pointer flex justify-center items-center gap-1.5 border border-red-500/20 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Key size={14} />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 sm:mt-6 border-t border-stone-800/40 pt-4 text-center">
            <span className="text-[9px] font-mono text-stone-400 block uppercase tracking-wide">
              Grass-fed Database Management Panel • 2026
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboard
      userId={userId}
      email={email}
      onBack={handleLogoutAction}
      onRefreshData={onRefreshData}
    />
  );
}