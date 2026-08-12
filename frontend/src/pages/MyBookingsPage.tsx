import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking, BookingStatus } from '../types';
import QrTicketModal from '../components/booking/QrTicketModal';
import QueueTokenCard from '../components/booking/QueueTokenCard';
import { Ticket, QrCode, XCircle, Calendar, Clock, MapPin, Tag } from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking, queueToken, leaveQueue } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Confirmed' | 'Completed' | 'Cancelled'>('All');
  const [selectedBookingForQr, setSelectedBookingForQr] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'All') return true;
    return b.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">My Bookings & Queue Passes</h1>
        <p className="text-xs sm:text-sm text-slate-400">Manage your active reservations, digital QR tickets, and virtual queue positions</p>
      </div>

      {/* Active Queue Token Card if present */}
      {queueToken && (
        <QueueTokenCard token={queueToken} onLeaveQueue={leaveQueue} />
      )}

      {/* Status Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        {['All', 'Confirmed', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'gradient-bg text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="py-16 text-center glass-card border border-slate-800">
          <Ticket className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">No {activeTab.toLowerCase()} bookings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b) => (
            <div key={b.id} className="glass-card p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                      {b.id}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{b.category}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    b.status === 'Confirmed' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : b.status === 'Cancelled'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {b.status}
                  </span>
                </div>

                {/* Details */}
                <div className="py-4 space-y-2">
                  <h3 className="font-display font-bold text-lg text-white">{b.businessName}</h3>
                  <p className="text-xs text-slate-300">{b.serviceDetails}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-400" />
                      <span>{b.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{b.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Amount</span>
                  <span className="font-display font-bold text-base text-emerald-400">₹{b.totalPrice}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {b.status === 'Confirmed' && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/25 transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedBookingForQr(b)}
                    className="px-4 py-1.5 rounded-xl gradient-bg text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center space-x-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR Ticket</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Ticket Modal */}
      {selectedBookingForQr && (
        <QrTicketModal booking={selectedBookingForQr} onClose={() => setSelectedBookingForQr(null)} />
      )}

    </div>
  );
};

export default MyBookingsPage;
