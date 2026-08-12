import React from 'react';
import { Booking } from '../../types';
import { X, QrCode, CheckCircle, Calendar, Clock, MapPin, Download, Share2 } from 'lucide-react';

interface Props {
  booking: Booking;
  onClose: () => void;
}

export const QrTicketModal: React.FC<Props> = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card max-w-md w-full border border-slate-700 shadow-2xl p-6 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-brand-400" />
            <h3 className="font-display font-bold text-base text-white">Digital Boarding Pass</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ticket Body */}
        <div className="py-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Booking Confirmed</span>
          </div>

          <div>
            <h2 className="font-display font-extrabold text-xl text-white tracking-tight">{booking.businessName}</h2>
            <p className="text-xs text-slate-400 mt-1">{booking.serviceDetails}</p>
          </div>

          {/* SVG QR Code Simulation */}
          <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center relative border-4 border-brand-500/30">
            <div className="grid grid-cols-7 gap-1.5 w-full h-full p-1 bg-slate-900 rounded-lg">
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    i % 2 === 0 || i % 3 === 0 ? 'bg-white' : 'bg-slate-950'
                  }`}
                ></div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 bg-brand-600 rounded-xl border-2 border-white flex items-center justify-center font-black text-white text-xs shadow-md">
                DA
              </div>
            </div>
          </div>

          {/* Booking ID badge */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Booking Ticket ID</span>
            <span className="font-mono font-black text-sm text-brand-300 tracking-wider">{booking.id}</span>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 gap-2 text-left text-xs bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-brand-400" />
                <span>Date</span>
              </span>
              <span className="font-semibold text-slate-200 block mt-0.5">{booking.date}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Time Slot</span>
              </span>
              <span className="font-semibold text-slate-200 block mt-0.5">{booking.time}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => alert(`QR Ticket ${booking.id} downloaded!`)}
            className="flex-1 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          
          <button
            onClick={() => alert(`Share link for ticket ${booking.id} copied!`)}
            className="flex-1 py-2 rounded-xl gradient-bg text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Ticket</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default QrTicketModal;
