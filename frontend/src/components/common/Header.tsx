import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'reactModel' ? require('react-router-dom') : require('react-router-dom');
import { 
  Sparkles, 
  MapPin, 
  Bell, 
  User as UserIcon, 
  Building2, 
  Compass, 
  Ticket, 
  Tag, 
  Search,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import NotificationCenter from './NotificationCenter';

export const Header: React.FC = () => {
  const { user, role, toggleRole } = useAuth();
  const { unreadNotificationCount } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="font-display font-black text-xl text-white tracking-wider flex items-center">
                  D<MapPin className="w-4 h-4 inline-block -ml-0.5 text-accent-amber animate-pulse" />
                </span>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight">
                  Dost<span className="gradient-text font-black">AI</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  City Companion
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/dashboard') ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Compass className="w-4 h-4 text-brand-400" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/ai-chat"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/ai-chat') ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Sparkles className="w-4 h-4 text-accent-violet animate-bounce-subtle" />
                <span>Ask Dost</span>
              </Link>

              <Link
                to="/discover"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/discover') ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Discover</span>
              </Link>

              <Link
                to="/bookings"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/bookings') ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>My Bookings</span>
              </Link>

              <Link
                to="/offers"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  isActive('/offers') ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Tag className="w-4 h-4 text-pink-400" />
                <span>Offers</span>
              </Link>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Search */}
            <button
              onClick={() => navigate('/discover')}
              className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs hover:border-slate-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search places, cinema, dining...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded">⌘K</kbd>
            </button>

            {/* Role Switcher Toggle (USER vs BUSINESS) */}
            <button
              onClick={toggleRole}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md ${
                role === 'BUSINESS'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-brand-500/20 text-brand-300 border border-brand-500/40 hover:bg-brand-500/30'
              }`}
            >
              {role === 'BUSINESS' ? (
                <>
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Role: Business</span>
                </>
              ) : (
                <>
                  <UserIcon className="w-3.5 h-3.5 text-brand-400" />
                  <span>Role: User</span>
                </>
              )}
            </button>

            {/* Business Dashboard Link (if in Business role) */}
            {role === 'BUSINESS' && (
              <Link
                to="/business-dashboard"
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-xs hover:bg-amber-400 transition-colors flex items-center space-x-1"
              >
                <span>Dashboard</span>
              </Link>
            )}

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-300" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-rose text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <NotificationCenter onClose={() => setShowNotifications(false)} />
              )}
            </div>

            {/* Profile Avatar & Menu */}
            <Link
              to="/profile"
              className="flex items-center space-x-2 p-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                alt={user?.name || 'User Profile'}
                className="w-7 h-7 rounded-full object-cover"
              />
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};
