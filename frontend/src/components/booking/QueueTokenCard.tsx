import React from 'react';
import { QueueToken } from '../../types';
import { Users, Clock, LogOut, Sparkles, CheckCircle } from 'lucide-react';

interface Props {
  token: QueueToken;
  onLeaveQueue: () => void;
}

export const QueueTokenCard: React.FC<Props> = ({ token, onLeaveQueue }) => {
  const isTurn = token.peopleAhead === 0;

  return (
    <div className={`glass-card p-6 border transition-all ${
      isTurn ? 'border-emerald-500/80 shadow-2xl shadow-emerald-500/20 bg-emerald-950/20' : 'border-brand-500/40 shadow-xl'
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
          <h3 className="font-display font-bold text-base text-white">Live Virtual Queue</h3>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          isTurn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
        }`}>
          {token.businessName}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-center">
        
        {/* Your Token */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Your Token</span>
          <span className="font-mono font-black text-2xl text-brand-400 mt-1 block">{token.tokenNumber}</span>
        </div>

        {/* Current Serving */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Now Serving</span>
          <span className="font-mono font-black text-2xl text-emerald-400 mt-1 block">{token.currentServing}</span>
        </div>

        {/* People Ahead */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">People Ahead</span>
          <span className="font-mono font-black text-2xl text-amber-400 mt-1 block">{token.peopleAhead}</span>
        </div>

        {/* Est. Wait */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Expected Wait</span>
          <span className="font-mono font-black text-2xl text-accent-violet mt-1 block">{token.estimatedWaitMinutes}m</span>
        </div>

      </div>

      {isTurn ? (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-center text-xs font-semibold flex items-center justify-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>It's your turn! Please proceed to counter #2 with your token ID: {token.tokenNumber}</span>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400">Joined at {token.joinedAt} • Queue updates live</span>
          <button
            onClick={onLeaveQueue}
            className="px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-medium hover:bg-rose-500/25 transition-colors flex items-center space-x-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Leave Queue</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QueueTokenCard;
