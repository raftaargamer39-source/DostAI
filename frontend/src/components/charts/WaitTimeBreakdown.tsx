import React from 'react';
import { WaitTimeBreakdown as WaitTimeData } from '../../types';
import { Clock, ShieldCheck, Info } from 'lucide-react';

interface Props {
  data: WaitTimeData;
}

export const WaitTimeBreakdown: React.FC<Props> = ({ data }) => {
  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-accent-violet" />
          <h3 className="font-display font-bold text-base text-white">Expected Wait Breakdown</h3>
        </div>
        
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
          <span>{data.confidenceScorePercent}% Confidence</span>
        </div>
      </div>

      <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Total Time Badge */}
        <div className="text-center md:text-left shrink-0">
          <span className="text-xs font-medium text-slate-400 block">Total Estimated Wait</span>
          <span className="font-display font-extrabold text-4xl text-white tracking-tight mt-1 block">
            {data.totalWaitMinutes} <span className="text-xl text-slate-400 font-normal">mins</span>
          </span>
          <span className="text-[10px] text-slate-500 block mt-1">Live queue + historic model</span>
        </div>

        {/* Horizontal Stacked Bar */}
        <div className="w-full space-y-3">
          <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
            <div 
              className="h-full bg-brand-500 rounded-l-full transition-all duration-500" 
              style={{ width: `${(data.entryMinutes / data.totalWaitMinutes) * 100}%` }}
              title={`Entry: ${data.entryMinutes} min`}
            ></div>
            <div 
              className="h-full bg-amber-500 transition-all duration-500" 
              style={{ width: `${(data.serviceMinutes / data.totalWaitMinutes) * 100}%` }}
              title={`Service: ${data.serviceMinutes} min`}
            ></div>
            <div 
              className="h-full bg-emerald-500 rounded-r-full transition-all duration-500" 
              style={{ width: `${(data.paymentMinutes / data.totalWaitMinutes) * 100}%` }}
              title={`Payment: ${data.paymentMinutes} min`}
            ></div>
          </div>

          {/* Breakdown Legend */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="flex items-center space-x-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                <span>Entry</span>
              </span>
              <span className="font-bold text-white mt-1 block">{data.entryMinutes} min</span>
            </div>

            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="flex items-center space-x-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Service</span>
              </span>
              <span className="font-bold text-white mt-1 block">{data.serviceMinutes} min</span>
            </div>

            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="flex items-center space-x-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Payment</span>
              </span>
              <span className="font-bold text-white mt-1 block">{data.paymentMinutes} min</span>
            </div>
          </div>
        </div>

      </div>

      {/* Honest Data Disclaimer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Demo prediction — based on simulated historical data.</span>
        </span>
      </div>
    </div>
  );
};

export default WaitTimeBreakdown;
