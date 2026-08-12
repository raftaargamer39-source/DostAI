import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Trash2, Ticket, Users, Tag, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const NotificationCenter: React.FC<Props> = ({ onClose }) => {
  const { notifications, markNotificationAsRead, clearNotifications } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Ticket className="w-4 h-4 text-emerald-400" />;
      case 'queue': return <Users className="w-4 h-4 text-brand-400" />;
      case 'offer': return <Tag className="w-4 h-4 text-amber-400" />;
      default: return <AlertCircle className="w-4 h-4 text-accent-violet" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-card border border-slate-700/80 shadow-2xl p-4 z-50 animate-slide-up">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-brand-400" />
          <h3 className="font-semibold text-sm text-white">Notifications</h3>
        </div>
        <div className="flex items-center space-x-2">
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto py-2 space-y-2">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No new notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                item.read 
                  ? 'bg-slate-900/40 border-slate-800 text-slate-400' 
                  : 'bg-slate-800/60 border-brand-500/30 text-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getIcon(item.type)}
                  <span className="font-semibold text-white">{item.title}</span>
                </div>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
              <p className="mt-1 text-slate-300 pl-6 leading-relaxed">{item.message}</p>
            </div>
          ))
        )}
      </div>

      <div className="pt-2 border-t border-slate-800 text-center">
        <button
          onClick={onClose}
          className="text-xs text-brand-400 hover:text-brand-300 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;
