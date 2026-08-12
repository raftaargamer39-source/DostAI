import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, UserPreferences } from '../types';
import { User as UserIcon, Sliders, ShieldCheck, CheckCircle2, Save, Bell } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { user, updatePreferences } = useAuth();

  const [budget, setBudget] = useState(user?.preferences.budgetLimit || 2000);
  const [distance, setDistance] = useState(user?.preferences.maxDistanceKm || 5);
  const [crowdPref, setCrowdPref] = useState<'Low' | 'Medium' | 'High' | 'Any'>(
    user?.preferences.preferredCrowd || 'Low'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      budgetLimit: budget,
      maxDistanceKm: distance,
      preferredCrowd: crowdPref,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Profile Header */}
      <div className="glass-card p-6 border border-slate-800 flex items-center space-x-4">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
          alt={user?.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-brand-500 shadow-lg"
        />
        <div>
          <h1 className="font-display font-extrabold text-xl text-white">{user?.name}</h1>
          <p className="text-xs text-slate-400">{user?.email} • <span className="text-brand-400 font-semibold">{user?.role} Role</span></p>
        </div>
      </div>

      {/* Preferences Form */}
      <div className="glass-card p-6 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-brand-400" />
            <h2 className="font-display font-bold text-base text-white">AI Recommendation Preferences</h2>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Budget Limit */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Default Budget Preference</span>
              <span className="text-emerald-400 font-bold">₹{budget}</span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={budget}
              onChange={e => setBudget(parseInt(e.target.value, 10))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>

          {/* Max Distance */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Maximum Travel Distance</span>
              <span className="text-brand-300 font-bold">{distance} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={distance}
              onChange={e => setDistance(parseInt(e.target.value, 10))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>

          {/* Crowd Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Preferred Crowd Environment</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Low', 'Medium', 'High', 'Any'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setCrowdPref(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    crowdPref === lvl
                      ? 'gradient-bg text-white border-brand-400 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Preferences saved successfully!</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl gradient-bg text-white font-extrabold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center space-x-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </form>
      </div>

    </div>
  );
};

export default UserProfilePage;
