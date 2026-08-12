import React from 'react';
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

export const AnalyticsChart: React.FC = () => {
  const visitorData = [
    { hour: '10 AM', visitors: 65, revenue: 4200 },
    { hour: '12 PM', visitors: 140, revenue: 9800 },
    { hour: '02 PM', visitors: 85, revenue: 5400 },
    { hour: '04 PM', visitors: 110, revenue: 7600 },
    { hour: '06 PM', visitors: 220, revenue: 15400 },
    { hour: '08 PM', visitors: 190, revenue: 13200 },
    { hour: '10 PM', visitors: 90, revenue: 6100 },
  ];

  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-base text-white">Business Traffic & Revenue Analytics</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Real-time visitor volume and hourly revenue breakdown</p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center space-x-1 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Visitors</span>
          </span>
          <span className="flex items-center space-x-1 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Revenue</span>
          </span>
        </div>
      </div>

      <div className="h-48 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-800">
        {visitorData.map((item, i) => {
          const maxVisitors = 250;
          const heightPercent = (item.visitors / maxVisitors) * 100;

          return (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[10px] font-semibold text-white whitespace-nowrap z-20 pointer-events-none shadow-xl text-center">
                <div>{item.visitors} Visitors</div>
                <div className="text-emerald-400">₹{item.revenue}</div>
              </div>

              <div 
                className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all duration-500 hover:from-amber-500 hover:to-amber-300"
                style={{ height: `${heightPercent}%` }}
              ></div>

              <span className="text-[10px] text-slate-400 font-mono mt-2">{item.hour}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Peak Hour</span>
          </span>
          <span className="font-bold text-white text-sm mt-1 block">06:00 PM</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Top Category</span>
          </span>
          <span className="font-bold text-white text-sm mt-1 block">Cinema + Dining</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
            <span>Conversion Rate</span>
          </span>
          <span className="font-bold text-white text-sm mt-1 block">78.4%</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-violet-400" />
            <span>Avg Spend / User</span>
          </span>
          <span className="font-bold text-white text-sm mt-1 block">₹1,780</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
