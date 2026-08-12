import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import StatCard from '../components/business/StatCard';
import AnalyticsChart from '../components/charts/AnalyticsChart';
import ServiceManager from '../components/business/ServiceManager';
import OfferManager from '../components/business/OfferManager';
import QueueManager from '../components/business/QueueManager';
import WhatIfSimulator from '../components/business/WhatIfSimulator';
import { Users, Ticket, Clock, DollarSign, Tag, Building2, Sparkles, Layers } from 'lucide-react';

export const BusinessDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { bookings, offers } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'services' | 'offers' | 'queue'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">City Mall Business Hub</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Real-time crowd monitoring, bookings, queue controller & AI What-If simulator</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
          Logged in as Business Owner
        </span>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Today's Visitors"
          value="1,250"
          subtext="+14% vs yesterday"
          icon={<Users className="w-5 h-5" />}
          color="brand"
        />

        <StatCard
          title="Total Bookings"
          value="520"
          subtext="Movie, dining & parking"
          icon={<Ticket className="w-5 h-5" />}
          color="emerald"
        />

        <StatCard
          title="Average Wait"
          value="22 min"
          subtext="Target: <20 min"
          icon={<Clock className="w-5 h-5" />}
          color="violet"
        />

        <StatCard
          title="Daily Revenue"
          value="₹48,500"
          subtext="All services combined"
          icon={<DollarSign className="w-5 h-5" />}
          color="amber"
        />

        <StatCard
          title="Offers Claimed"
          value="145"
          subtext="₹350 Combo lead"
          icon={<Tag className="w-5 h-5" />}
          color="rose"
        />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Analytics Overview
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
            activeTab === 'simulator' ? 'gradient-bg text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI What-If Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'queue' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Queue Control Room
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'services' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Manage Services
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'offers' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Manage Offers
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <AnalyticsChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QueueManager />
            <WhatIfSimulator />
          </div>
        </div>
      )}

      {activeTab === 'simulator' && (
        <WhatIfSimulator />
      )}

      {activeTab === 'queue' && (
        <QueueManager />
      )}

      {activeTab === 'services' && (
        <ServiceManager />
      )}

      {activeTab === 'offers' && (
        <OfferManager />
      )}

    </div>
  );
};

export default BusinessDashboardPage;
