import React from 'react';
import { CrowdPredictionPoint } from '../../types';
import { Users, Sparkles, Clock, AlertCircle } from 'lucide-react';

interface Props {
  points: CrowdPredictionPoint[];
  bestTime?: string;
  bestTimeReason?: string;
}

export const CrowdChart: React.FC<Props> = ({ 
  points, 
  bestTime = '02:00 PM',
  bestTimeReason = 'Lower predicted crowd density and minimal queue at entry & payment counters.'
}) => {
  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-brand-400" />
            <h3 className="font-display font-bold text-base text-white">Crowd Density Prediction</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Hourly forecast based on simulated historical traffic data</p>
        </div>

        {/* Best time to visit badge */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-1.5 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-[10px] text-emerald-300 font-semibold uppercase block">Best Time to Visit</span>
            <span className="font-bold text-xs text-white">{bestTime}</span>
          </div>
        </div>
      </div>

      {/* Visual Chart Bars */}
      <div className="h-44 flex items-end justify-between gap-1.5 pt-6 pb-2 px-2 border-b border-slate-800">
        {points.map((pt, idx) => {
          const isBest = pt.hour.includes('02:00 PM');
          const isHigh = pt.crowdLevel === 'High';
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center group relative">
              
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[10px] font-semibold text-white whitespace-nowrap z-20 pointer-events-none shadow-xl">
                {pt.hour}: {pt.crowdPercent}% ({pt.crowdLevel})
              </div>

              {/* Bar */}
              <div 
                className={`w-full rounded-t-lg transition-all duration-500 ${
                  isBest 
                    ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/30 animate-pulse' 
                    : isHigh
                    ? 'bg-gradient-to-t from-rose-600 to-rose-400'
                    : pt.crowdLevel === 'Medium'
                    ? 'bg-gradient-to-t from-amber-600 to-amber-400'
                    : 'bg-gradient-to-t from-brand-600 to-brand-400'
                }`}
                style={{ height: `${pt.crowdPercent}%` }}
              ></div>

              <span className="text-[9px] text-slate-500 font-mono mt-2 truncate w-full text-center">
                {pt.hour.split(':')[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rationale Notice */}
      <div className="mt-4 flex items-start space-x-2 text-xs text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
        <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Why visit at {bestTime}?</span>
          <p className="text-slate-400 mt-0.5 leading-relaxed">{bestTimeReason}</p>
        </div>
      </div>
    </div>
  );
};

export default CrowdChart;
