import React from 'react';
import { useApp } from '../context/AppContext';
import { Tag, Sparkles, CheckCircle, Clock, Copy } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { offers, claimOffer } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Tag className="w-4 h-4" />
          <span>Exclusive Deals</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">City Offers & Discounts</h1>
        <p className="text-xs sm:text-sm text-slate-400">Claim exclusive combo discounts for cinemas, restaurants, and smart parking</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="glass-card p-6 border border-slate-800 flex flex-col justify-between relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all"></div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                  {offer.discountText}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{offer.category}</span>
              </div>

              <div className="py-4">
                <h3 className="font-display font-bold text-lg text-white">{offer.title}</h3>
                <span className="text-xs text-brand-300 font-semibold block mt-0.5">{offer.businessName}</span>
                <p className="text-xs text-slate-400 mt-2">Valid on orders above ₹{offer.minOrder}. Applies automatically during checkout.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-1 text-slate-400 text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{offer.validUntil}</span>
              </div>

              {offer.isClaimed ? (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Claimed!</span>
                </span>
              ) : (
                <button
                  onClick={() => claimOffer(offer.id)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-400 transition-colors flex items-center space-x-1"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Use Offer</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OffersPage;
