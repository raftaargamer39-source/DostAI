import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Search, 
  Utensils, 
  Film, 
  Car, 
  Stethoscope, 
  Users, 
  Tag, 
  Clock, 
  MapPin, 
  Star,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { DemoBanner } from '../components/common/DemoBanner';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { businesses } = useApp();
  const navigate = useNavigate();
  const [promptText, setPromptText] = useState('');

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptText.trim()) {
      navigate(`/ai-chat?q=${encodeURIComponent(promptText)}`);
    } else {
      navigate('/ai-chat');
    }
  };

  const loadDemoScenario = () => {
    const scenario = "Dost, I want to watch a movie and have dinner with 3 friends tonight under ₹2000.";
    navigate(`/ai-chat?q=${encodeURIComponent(scenario)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Hackathon Demo Banner */}
      <DemoBanner onLoadDemoScenario={loadDemoScenario} />

      {/* Greeting Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Good afternoon, {user?.name.split(' ')[0] || 'Dost'}! 👋
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            What are you planning today in the city?
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sector 18, Central City</span>
          </span>
        </div>
      </div>

      {/* Large AI Prompt Box */}
      <div className="glass-card p-6 border-2 border-brand-500/40 shadow-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60">
        <form onSubmit={handleAiSearch} className="relative">
          <label className="block text-xs font-bold text-brand-300 uppercase tracking-wider mb-2 flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-accent-amber animate-pulse" />
            <span>Ask Dost Anything</span>
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="e.g. Dost, I want to watch a movie and have dinner with 3 friends tonight under ₹2000..."
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl py-3.5 pl-4 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-4" />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl gradient-bg text-white font-extrabold text-sm shadow-xl shadow-brand-500/30 hover:scale-105 transition-all flex items-center justify-center space-x-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-accent-amber" />
              <span>Ask Dost</span>
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="text-slate-400 text-[11px] self-center">Try:</span>
          <button
            onClick={() => setPromptText("Find me a quiet dinner spot under ₹1500")}
            className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700 transition-colors"
          >
            "Quiet dinner under ₹1500"
          </button>
          <button
            onClick={() => setPromptText("Best rated cinema with low wait time")}
            className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700 transition-colors"
          >
            "Cinema with low wait"
          </button>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div>
        <h2 className="font-display font-bold text-base text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <button
            onClick={() => navigate('/discover?cat=Restaurants')}
            className="glass-card p-4 text-center hover:border-amber-500/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-2 text-amber-400 group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs text-white block">🍽️ Restaurant</span>
          </button>

          <button
            onClick={() => navigate('/discover?cat=Cinemas')}
            className="glass-card p-4 text-center hover:border-brand-500/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center mx-auto mb-2 text-brand-400 group-hover:scale-110 transition-transform">
              <Film className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs text-white block">🎬 Movie</span>
          </button>

          <button
            onClick={() => navigate('/discover?cat=Parking')}
            className="glass-card p-4 text-center hover:border-emerald-500/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 text-emerald-400 group-hover:scale-110 transition-transform">
              <Car className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs text-white block">🅿️ Parking</span>
          </button>

          <button
            onClick={() => navigate('/discover?cat=Hospitals')}
            className="glass-card p-4 text-center hover:border-rose-500/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mx-auto mb-2 text-rose-400 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs text-white block">🏥 Clinic</span>
          </button>

          <button
            onClick={() => navigate('/bookings')}
            className="glass-card p-4 text-center hover:border-violet-500/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mx-auto mb-2 text-violet-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs text-white block">🎫 Join Queue</span>
          </button>

          <button
            onClick={() => navigate('/offers')}
            className="glass-card p-4 text-center hover:border-pink-500/50 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center mx-auto mb-2 text-pink-400 group-hover:scale-110 transition-transform">
              <Tag className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs text-white block">🏷️ Offers</span>
          </button>

        </div>
      </div>

      {/* Recommended For You Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-bold text-lg text-white">Recommended For You</h2>
            <p className="text-xs text-slate-400">Places matching your distance & crowd preferences</p>
          </div>

          <button
            onClick={() => navigate('/discover')}
            className="text-xs text-brand-400 font-semibold hover:text-brand-300 flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businesses.slice(0, 3).map((place) => (
            <div
              key={place.id}
              onClick={() => navigate(`/business/${place.id}`)}
              className="glass-card glass-card-hover p-4 border border-slate-800 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Place Image */}
                <div className="h-36 rounded-xl overflow-hidden mb-3 relative">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {place.hasOffer && (
                    <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      {place.offerText}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {place.distanceKm} km away
                  </span>
                </div>

                {/* Details */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white">{place.name}</h3>
                    <span className="text-[11px] text-slate-400">{place.category} • {place.address}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{place.rating}</span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-2 gap-2 my-3 text-[11px]">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Crowd Status</span>
                    <span className={`font-semibold ${
                      place.currentCrowd === 'Low' ? 'text-emerald-400' : place.currentCrowd === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {place.currentCrowd} Crowd
                    </span>
                  </div>

                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Expected Wait</span>
                    <span className="font-bold text-brand-300">{place.predictedWaitMinutes} min</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-2 py-2 rounded-xl bg-slate-800 hover:bg-brand-500 text-slate-200 hover:text-white font-semibold text-xs transition-colors">
                View Details & Book
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
