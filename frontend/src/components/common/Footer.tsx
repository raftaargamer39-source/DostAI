import React from 'react';
import { MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8 px-4 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm">DostAI</span>
            <span className="text-slate-500 ml-2">“Your AI Dost for the City.”</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <span>AI City Recommendation Engine</span>
          <span>•</span>
          <span>Crowd & Wait-Time ML</span>
          <span>•</span>
          <span>Multi-Service Booking</span>
        </div>

        <div className="flex items-center space-x-1 text-slate-500">
          <span>Built for Hackathon 2026</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
        </div>
      </div>
    </footer>
  );
};
