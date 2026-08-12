import React from 'react';

interface Props {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  trend?: string;
  color?: 'brand' | 'amber' | 'emerald' | 'violet' | 'rose';
}

export const StatCard: React.FC<Props> = ({ 
  title, 
  value, 
  subtext, 
  icon, 
  trend,
  color = 'brand' 
}) => {
  const colorMap = {
    brand: 'text-brand-400 bg-brand-500/10 border-brand-500/30',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  };

  return (
    <div className="glass-card p-5 border border-slate-800 flex items-start justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">{title}</span>
        <span className="font-display font-extrabold text-2xl text-white mt-1 block">{value}</span>
        <span className="text-[11px] text-slate-500 mt-1 block">{subtext}</span>
      </div>

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
