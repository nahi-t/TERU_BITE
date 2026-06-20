import { Search, MapPin, Clock, Flame, Sparkles, Shield } from 'lucide-react';
import logoImage from '../asset/logo.png';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  onViewFavorites: () => void;
  showFavoritesOnly: boolean;
  onAdminClick: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  favoritesCount,
  onViewFavorites,
  showFavoritesOnly,
  onAdminClick,
}: HeaderProps) {
  // Check if the restaurant is currently open (open 10:00 AM to 11:00 PM)
  const isCurrentlyOpen = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 10 && hours < 23;
  };

  return (
    <header className="relative w-full bg-stone-900 text-stone-100 overflow-hidden" id="main-header">
      
      {/* ========================================== */}
      {/* BEAST MODE: FULL LOGO AS BACKGROUND TEXTURE */}
      {/* ========================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-15">
        <img 
          src={logoImage} 
          alt="" 
          className="w-full h-full object-cover object-center filter saturate-50 brightness-75 scale-105"
          style={{ mixBlendMode: 'multiply' }} 
        />
      </div>

      {/* Editorial Decorative Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.2),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Header upper utilities */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2 border-b border-stone-800/60 flex flex-wrap gap-y-2 justify-between items-center text-xs font-mono text-stone-400 relative z-10">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-red-500" />
            <span>ሀረር ካናል ብሄራዊ ሎተሪ ፊት ለ ፊት 3ኛ ፎቅ</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-amber-500 font-bold">☎</span>
            <span>+251 974 44 74 11 / +251 911 412 345</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <Clock size={12} className="text-amber-500" />
            <span>10:00 AM - 11:00 PM (LT)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Real-time indicator */}
          <span className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${isCurrentlyOpen() ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="font-semibold text-stone-300">
              {isCurrentlyOpen() ? 'WE ARE OPEN' : 'WE REOPEN AT 10:00 AM'}
            </span>
          </span>
        </div>
      </div>

      {/* Main navigation rows */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* SHARP MINI FOREGROUND LOGO MARK WITH MIX-BLEND-MULTIPLY */}
        <div className="flex items-center justify-center h-16 sm:h-20 shrink-0 select-none cursor-pointer group bg-stone-950/40 p-1.5 px-3 rounded-xl border border-stone-800/40 backdrop-blur-xs">
          <img 
            src={logoImage} 
            alt="TIRU BITE Logo" 
            className="h-full w-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:scale-103 transition-transform duration-300 ease-out"
            style={{ mixBlendMode: 'multiply' }} 
          />
        </div>

        {/* Search controls & favorite filter aligned right */}
        <div className="w-full sm:w-auto flex flex-row items-center gap-2 flex-1 max-w-lg justify-end">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-stone-500" size={14} />
            <input
              type="text"
              placeholder="Search dishes or ingredients..."
              className="w-full pl-9 pr-8 py-1.5 bg-stone-950/60 border border-stone-800 focus:border-red-500 rounded-lg text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 backdrop-blur-xs transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="menu-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2.5 text-[10px] font-mono text-stone-400 hover:text-stone-200"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onViewFavorites}
            className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-1 text-xs font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
              showFavoritesOnly
                ? 'bg-red-600 border-red-600 text-white shadow-md'
                : 'bg-stone-800/80 border-stone-800 text-stone-300 hover:bg-stone-800'
            }`}
            id="favorite-toggle-btn"
          >
            <Sparkles size={12} className={showFavoritesOnly ? 'fill-white' : 'text-amber-500'} />
            <span>Favs ({favoritesCount})</span>
          </button>

          <button
            onClick={onAdminClick}
            className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center shrink-0"
            title="Admin Dashboard"
            id="admin-console-btn"
          >
            <Shield size={14} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Bottom thin accent bar */}
      <div className="h-0.5 bg-linear-to-r from-red-600 via-amber-500 to-red-600" />
    </header>
  );
}