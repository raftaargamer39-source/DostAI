import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Ticket, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-slate-800/80 px-2 py-2">
      <div className="flex items-center justify-around">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            isActive('/dashboard') ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/discover"
          className={`flex flex-col items-center px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            isActive('/discover') ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span>Discover</span>
        </Link>

        <Link
          to="/ai-chat"
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-brand-500/40 border-2 border-slate-950">
            <Sparkles className="w-6 h-6 text-white animate-bounce-subtle" />
          </div>
          <span className="text-[10px] font-semibold text-brand-300 mt-1">Dost</span>
        </Link>

        <Link
          to="/bookings"
          className={`flex flex-col items-center px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            isActive('/bookings') ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Ticket className="w-5 h-5 mb-0.5" />
          <span>Bookings</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            isActive('/profile') ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};
