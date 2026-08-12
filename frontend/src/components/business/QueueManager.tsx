import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Play, Pause, XCircle, ChevronRight, CheckCircle2 } from 'lucide-react';

export const QueueManager: React.FC = () => {
  const { queueToken, advanceQueueToken } = useApp();
  const [queueState, setQueueState] = useState<'active' | 'paused' | 'closed'>('active');

  const currentToken = queueToken ? queueToken.currentServing : 'DA-109';
  const peopleWaiting = queueToken ? queueToken.peopleAhead : 16;
  const estWait = queueToken ? queueToken.estimatedWaitMinutes : 22;

  const handleNext = () => {
    if (queueState === 'active') {
      advanceQueueToken();
    }
  };

  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-brand-400" />
          <h3 className="font-display font-bold text-base text-white">Live Virtual Queue Control Room</h3>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
          queueState === 'active' 
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
            : queueState === 'paused'
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
        }`}>
          {queueState}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 text-center">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Now Serving Token</span>
          <span className="font-mono font-black text-3xl text-emerald-400 mt-1 block">{currentToken}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Customers Waiting</span>
          <span className="font-mono font-black text-3xl text-amber-400 mt-1 block">{peopleWaiting}</span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Wait Time</span>
          <span className="font-mono font-black text-3xl text-brand-400 mt-1 block">{estWait} min</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        <button
          onClick={handleNext}
          disabled={queueState !== 'active'}
          className="px-5 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs shadow-lg hover:scale-105 disabled:opacity-40 transition-all flex items-center space-x-1.5"
        >
          <span>Next Customer</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2">
          {queueState === 'active' ? (
            <button
              onClick={() => setQueueState('paused')}
              className="px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-colors flex items-center space-x-1"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Queue</span>
            </button>
          ) : (
            <button
              onClick={() => setQueueState('active')}
              className="px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30 transition-colors flex items-center space-x-1"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume Queue</span>
            </button>
          )}

          <button
            onClick={() => setQueueState('closed')}
            className="px-3 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold hover:bg-rose-500/30 transition-colors flex items-center space-x-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Close Queue</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default QueueManager;
