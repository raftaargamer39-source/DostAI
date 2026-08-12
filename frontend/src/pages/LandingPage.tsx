import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Ticket, 
  Building2, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Users,
  Car,
  Utensils,
  Film
} from 'lucide-react';
import { Footer } from '../components/common/Footer';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden border-b border-slate-800/60">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-violet/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent-amber animate-pulse" />
            <span>Your AI Dost for the City</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            Tell Dost what you want. Find the best place, best time, best deal —{' '}
            <span className="gradient-text">and book it.</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            DostAI compares crowd density, predicted wait times, offers, ratings, and seat/table availability in real-time — then reserves your cinema, dining, and parking in one click.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/ai-chat"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl gradient-bg text-white font-extrabold text-base shadow-2xl shadow-brand-500/30 hover:scale-105 transition-all flex items-center justify-center space-x-2 group"
            >
              <Sparkles className="w-5 h-5 text-accent-amber group-hover:rotate-12 transition-transform" />
              <span>Try DostAI</span>
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-base hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center space-x-2"
            >
              <Compass className="w-5 h-5 text-emerald-400" />
              <span>Explore Demo</span>
            </Link>
          </div>

          {/* Example Conversation Interactive Box */}
          <div className="max-w-2xl mx-auto glass-card p-6 border-2 border-brand-500/40 text-left shadow-2xl relative">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Example Prompt</span>
            </div>

            <div className="space-y-4">
              {/* User message */}
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-brand-300">
                  U
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-xs sm:text-sm text-slate-200">
                  “Dost, I want to watch a movie and have dinner with 3 friends tonight under ₹2000.”
                </div>
              </div>

              {/* AI Response Card Preview */}
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center font-bold text-xs text-white">
                  D
                </div>
                <div className="bg-brand-950/60 border border-brand-500/40 p-4 rounded-2xl text-xs text-slate-200 space-y-2 w-full">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>🎬 City Mall Combo</span>
                    <span className="text-emerald-400">₹1,780 Total</span>
                  </div>
                  <div className="text-slate-400 space-y-1 text-[11px]">
                    <div>🍿 CineMax Seats B5, B6, B7, B8 (7:30 PM)</div>
                    <div>🍽️ Spice Route Reserved 4-Person Table (9:15 PM)</div>
                    <div>🅿️ QuickPark Reserved Slot P24 • Offer: ₹350 OFF</div>
                  </div>
                  <button
                    onClick={() => navigate('/ai-chat')}
                    className="w-full mt-2 py-2 rounded-xl gradient-bg text-white font-bold text-xs shadow-md"
                  >
                    ⚡ Book Everything (1-Click)
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-900/40 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-400">Simple Workflow</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">How DostAI Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 border border-slate-800 text-center relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto mb-4 font-display font-black text-xl">
                1
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Tell Dost Your Intent</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Type in natural language with your budget, party count, preferred date/time, and activities.
              </p>
            </div>

            <div className="glass-card p-6 border border-slate-800 text-center relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 font-display font-black text-xl">
                2
              </div>
              <h3 className="font-bold text-lg text-white mb-2">AI Weighted Engine</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Evaluates wait time, crowd, price, distance, ratings, and live deals across city locations.
              </p>
            </div>

            <div className="glass-card p-6 border border-slate-800 text-center relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 font-display font-black text-xl">
                3
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Book Everything Instantly</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Reserve cinema seats, dining tables, parking slots, and virtual queue tokens with digital QR tickets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Grid */}
      <section className="py-20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-400">Core Features</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">Designed for the Modern City</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 border border-slate-800">
              <Film className="w-8 h-8 text-brand-400 mb-3" />
              <h4 className="font-bold text-base text-white mb-1">Cinema Seat Grid</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Interactive 2D seat map selection with live price calculation.</p>
            </div>

            <div className="glass-card p-6 border border-slate-800">
              <Utensils className="w-8 h-8 text-amber-400 mb-3" />
              <h4 className="font-bold text-base text-white mb-1">Dining Reservations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Book 2, 4, or 6-seater tables with custom dining time slots.</p>
            </div>

            <div className="glass-card p-6 border border-slate-800">
              <Car className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-base text-white mb-1">Smart Parking Slots</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Real-time basement slot selection and reservation.</p>
            </div>

            <div className="glass-card p-6 border border-slate-800">
              <Users className="w-8 h-8 text-accent-violet mb-3" />
              <h4 className="font-bold text-base text-white mb-1">Virtual Token Queue</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Line up virtually without standing in physical queues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits & What-If Simulator Showcase */}
      <section className="py-20 bg-slate-900/40 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">For Businesses</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Business Intelligence & AI What-If Simulator
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Business owners get full control over services, promotional offers, live queue counters, and an AI What-If simulator to model staff additions and wait-time reductions.
            </p>
            <div className="pt-2">
              <Link
                to="/business-dashboard"
                className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors inline-flex items-center space-x-1"
              >
                <Building2 className="w-4 h-4" />
                <span>Open Business Dashboard</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full glass-card p-6 border border-amber-500/30">
            <div className="font-bold text-sm text-white mb-2 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Simulation Result Preview</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl text-xs space-y-2 border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>Input: "Add 2 service counters"</span>
                <span className="text-emerald-400 font-bold">+44% Improvement</span>
              </div>
              <div className="flex justify-between font-mono text-sm text-white pt-2 border-t border-slate-800">
                <span>Current Wait: 45 min</span>
                <span className="text-emerald-400">Predicted: 25 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
