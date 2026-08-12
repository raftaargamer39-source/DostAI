import React, { useState } from 'react';
import { runWhatIfSimulation, WhatIfOutput } from '../../services/predictionService';
import { Sparkles, Sliders, TrendingDown, Clock, ArrowRight, Zap } from 'lucide-react';

export const WhatIfSimulator: React.FC = () => {
  const [counters, setCounters] = useState(2);
  const [staff, setStaff] = useState(1);
  const [serviceTimeReduction, setServiceTimeReduction] = useState(3);

  const simulation: WhatIfOutput = runWhatIfSimulation({
    additionalCounters: counters,
    additionalStaff: staff,
    reducedServiceTimeMinutes: serviceTimeReduction,
  });

  return (
    <div className="glass-card p-6 border border-brand-500/40 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-accent-amber animate-pulse" />
          <div>
            <h3 className="font-display font-bold text-base text-white">AI What-If Simulator</h3>
            <p className="text-xs text-slate-400">Simulate staff, counter, and service adjustments on wait times</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold uppercase tracking-wider border border-brand-500/30">
          Predictive AI Model
        </span>
      </div>

      {/* Preset Quick Scenarios */}
      <div className="my-4 flex flex-wrap gap-2">
        <button
          onClick={() => { setCounters(2); setStaff(1); setServiceTimeReduction(3); }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-brand-500/20 border border-slate-700 text-xs text-slate-200 font-medium transition-colors"
        >
          "Add 2 Service Counters"
        </button>
        <button
          onClick={() => { setCounters(0); setStaff(3); setServiceTimeReduction(4); }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-brand-500/20 border border-slate-700 text-xs text-slate-200 font-medium transition-colors"
        >
          "Increase Staff by 3"
        </button>
        <button
          onClick={() => { setCounters(1); setStaff(2); setServiceTimeReduction(5); }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-brand-500/20 border border-slate-700 text-xs text-slate-200 font-medium transition-colors"
        >
          "Express Checkout Counter"
        </button>
      </div>

      {/* Simulation Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Additional Counters */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between text-xs text-slate-300 mb-2 font-medium">
            <span>Additional Counters</span>
            <span className="font-bold text-brand-400">+{counters}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            value={counters}
            onChange={e => setCounters(parseInt(e.target.value, 10))}
            className="w-full accent-brand-500 cursor-pointer"
          />
        </div>

        {/* Additional Staff */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between text-xs text-slate-300 mb-2 font-medium">
            <span>Staff Members</span>
            <span className="font-bold text-amber-400">+{staff}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            value={staff}
            onChange={e => setStaff(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Speed Optimization */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between text-xs text-slate-300 mb-2 font-medium">
            <span>Process Speed Gain</span>
            <span className="font-bold text-emerald-400">-{serviceTimeReduction}m</span>
          </div>
          <input
            type="range"
            min={0}
            max={8}
            value={serviceTimeReduction}
            onChange={e => setServiceTimeReduction(parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

      </div>

      {/* Simulation Results Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/80 border border-brand-500/30 text-center">
        
        {/* Current Wait */}
        <div className="p-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Wait Time</span>
          <span className="font-mono font-black text-2xl text-slate-300 mt-1 block">{simulation.currentWaitMinutes} min</span>
        </div>

        {/* Predicted Wait */}
        <div className="p-3 border-y sm:border-y-0 sm:border-x border-slate-800">
          <span className="text-[10px] uppercase font-bold text-brand-300 block">Predicted Wait Time</span>
          <span className="font-mono font-black text-3xl text-emerald-400 mt-1 block">{simulation.predictedWaitMinutes} min</span>
        </div>

        {/* Improvement Percentage */}
        <div className="p-3">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Expected Efficiency Gain</span>
          <span className="font-display font-extrabold text-2xl text-amber-400 mt-1 block">
            +{simulation.improvementPercent}%
          </span>
        </div>

      </div>

      <p className="text-[11px] text-slate-400 mt-4 leading-relaxed bg-brand-500/10 p-3 rounded-xl border border-brand-500/20">
        💡 <strong className="text-white">AI Rationale:</strong> {simulation.recommendationNote}
      </p>
    </div>
  );
};

export default WhatIfSimulator;
