import React, { useState } from 'react';
import { ComboRecommendation } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles, Film, Utensils, Car, Clock, Tag, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import QrTicketModal from '../booking/QrTicketModal';

interface Props {
  recommendation: ComboRecommendation;
  onBookSuccess?: () => void;
}

export const RecommendationCard: React.FC<Props> = ({ recommendation, onBookSuccess }) => {
  const { addComboBooking, bookings } = useApp();
  const [isBooked, setIsBooked] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleBookEverything = () => {
    addComboBooking(recommendation);
    setIsBooked(true);
    const newBooking = bookings[0]; // Most recent booking
    if (newBooking) {
      setCreatedBookingId(newBooking.id);
    }
    if (onBookSuccess) onBookSuccess();
  };

  const currentBooking = bookings.find(b => b.id === createdBookingId) || bookings[0];

  return (
    <div className="glass-card p-6 border-2 border-brand-500/50 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 my-4 animate-slide-up relative overflow-hidden">
      
      {/* Top Banner Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-accent-amber" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">Dost's Pick #1</span>
            <h3 className="font-display font-extrabold text-lg text-white tracking-tight">
              {recommendation.destinationName}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            96% Match
          </span>
        </div>
      </div>

      {/* Rationale explanation */}
      <p className="text-xs text-slate-300 py-3 leading-relaxed border-b border-slate-800/60">
        {recommendation.explanation}
      </p>

      {/* Included Services List */}
      <div className="py-4 space-y-3">
        
        {/* Cinema Item */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
              <Film className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block">🎬 CineMax Movie • {recommendation.movieTime}</span>
              <span className="text-[11px] text-slate-400">Seats: {recommendation.movieSeats?.join(', ')}</span>
            </div>
          </div>
          <span className="font-mono font-bold text-xs text-slate-300">₹{recommendation.moviePrice}</span>
        </div>

        {/* Restaurant Item */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Utensils className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block">🍽️ Spice Route Dinner • {recommendation.restaurantTime}</span>
              <span className="text-[11px] text-slate-400">Table: {recommendation.restaurantTable}</span>
            </div>
          </div>
          <span className="font-mono font-bold text-xs text-slate-300">₹{recommendation.restaurantPrice}</span>
        </div>

        {/* Parking Item */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Car className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block">🅿️ QuickPark Smart Garage</span>
              <span className="text-[11px] text-slate-400">Reserved Slot {recommendation.parkingSlot}</span>
            </div>
          </div>
          <span className="font-mono font-bold text-xs text-slate-300">₹{recommendation.parkingPrice}</span>
        </div>

      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-xs mb-4">
        <div>
          <span className="text-[10px] text-slate-400 block">Expected Wait</span>
          <span className="font-bold text-brand-300 flex items-center space-x-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span>{recommendation.expectedWaitMinutes} min</span>
          </span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 block">Offer Applied</span>
          <span className="font-bold text-amber-400 flex items-center space-x-1 mt-0.5">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>₹{recommendation.discountAmount} OFF</span>
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 block">Estimated Total</span>
          <span className="font-display font-extrabold text-base text-emerald-400">
            ₹{recommendation.finalEstimatedTotal}{' '}
            <span className="line-through text-slate-500 text-xs font-normal">₹{recommendation.totalOriginalPrice}</span>
          </span>
        </div>
      </div>

      {/* Booking Action Button */}
      {isBooked ? (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Everything Reserved & Confirmed!</span>
          </div>
          <button
            onClick={() => setShowQrModal(true)}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            View QR Ticket
          </button>
        </div>
      ) : (
        <button
          onClick={handleBookEverything}
          className="w-full py-3.5 rounded-xl gradient-bg text-white font-extrabold text-sm shadow-xl shadow-brand-500/30 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center space-x-2"
        >
          <span>Book Everything</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* QR Ticket Modal when clicked */}
      {showQrModal && currentBooking && (
        <QrTicketModal booking={currentBooking} onClose={() => setShowQrModal(false)} />
      )}
    </div>
  );
};

export default RecommendationCard;
