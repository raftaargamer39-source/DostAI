import React from 'react';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface Props {
  onLoadDemoScenario: () => void;
}

export const DemoBanner: React.FC<Props> = ({ onLoadDemoScenario }) => {
  return (
    <div className="bg-gradient-to-r from-brand-900/80 via-slate-900 to-indigo-950 border border-brand-500/30 rounded-2xl p-4 mb-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-500/10 rounded-full blur-xl group-hover:bg-brand-500/20 transition-all"></div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-accent-amber animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-sm text-white">Hackathon Presentation Mode</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Demo Ready</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Click to load the complete movie + dinner + parking ₹2,000 budget scenario.
            </p>
          </div>
        </div>

        <button
          onClick={onLoadDemoScenario}
          className="w-full sm:w-auto px-4 py-2 rounded-xl gradient-bg text-white font-semibold text-xs shadow-lg shadow-brand-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-accent-amber" />
          <span>⚡ Load Demo Scenario</span>
        </button>
      </div>
    </div>
  );
};
