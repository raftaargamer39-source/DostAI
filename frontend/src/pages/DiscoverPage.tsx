import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CategoryType, CrowdLevel } from '../types';
import { MapPin, Search, Filter, Star, Clock, Tag, ArrowRight } from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const { businesses } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('cat') || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [crowdFilter, setCrowdFilter] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(5);

  const categories: string[] = [
    'All',
    'Restaurants',
    'Cinemas',
    'Malls',
    'Hospitals',
    'Salons',
    'Events',
    'Parking',
    'Service Centers'
  ];

  const filteredPlaces = businesses.filter(b => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCrowd = crowdFilter === 'All' || b.currentCrowd === crowdFilter;
    const matchesDist = b.distanceKm <= maxDistance;

    return matchesCat && matchesSearch && matchesCrowd && matchesDist;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">Discover Places</h1>
        <p className="text-xs sm:text-sm text-slate-400">Explore city venues with real-time crowd and wait-time predictions</p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'gradient-bg text-white shadow-lg shadow-brand-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search venue or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-3 pr-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
        </div>

        {/* Crowd Dropdown */}
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Crowd:</span>
            <select
              value={crowdFilter}
              onChange={(e) => setCrowdFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Crowd Levels</option>
              <option value="Low">Low Crowd</option>
              <option value="Medium">Medium Crowd</option>
              <option value="High">High Crowd</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Distance:</span>
            <span className="font-bold text-brand-300">{maxDistance} km</span>
            <input
              type="range"
              min={1}
              max={10}
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value, 10))}
              className="w-24 accent-brand-500 cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="py-16 text-center glass-card border border-slate-800">
          <p className="text-slate-400 text-sm">Dost couldn't find a good match for these filters. Try increasing your distance limit!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => navigate(`/business/${place.id}`)}
              className="glass-card glass-card-hover p-4 border border-slate-800 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-44 rounded-xl overflow-hidden mb-3 relative">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {place.hasOffer && (
                    <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg">
                      {place.offerText}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {place.distanceKm} km away
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">{place.name}</h3>
                    <span className="text-xs text-slate-400">{place.category} • {place.address}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{place.rating}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
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

                <div className="flex flex-wrap gap-1 mb-3">
                  {place.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl gradient-bg text-white font-bold text-xs shadow-md hover:scale-[1.01] transition-all flex items-center justify-center space-x-1">
                <span>View Details & Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default DiscoverPage;
