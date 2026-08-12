import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getHourlyCrowdPrediction, getWaitTimeBreakdown } from '../services/predictionService';
import CrowdChart from '../components/charts/CrowdChart';
import WaitTimeBreakdown from '../components/charts/WaitTimeBreakdown';
import CinemaSeatMap from '../components/booking/CinemaSeatMap';
import RestaurantTablePicker from '../components/booking/RestaurantTablePicker';
import ParkingSlotGrid from '../components/booking/ParkingSlotGrid';
import { 
  Star, 
  MapPin, 
  Clock, 
  Tag, 
  Users, 
  ShieldCheck, 
  Ticket, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

export const BusinessDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { businesses, addBooking, joinQueue, queueToken } = useApp();
  const navigate = useNavigate();

  const business = businesses.find(b => b.id === id) || businesses[0];
  const crowdData = getHourlyCrowdPrediction(business.id);
  const waitData = getWaitTimeBreakdown(business.id);

  const [activeTab, setActiveTab] = useState<'booking' | 'prediction' | 'offers'>('booking');
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  const handleSeatConfirm = (seats: string[], price: number) => {
    const b = addBooking({
      userId: 'u-demo-1',
      businessId: business.id,
      businessName: business.name,
      category: business.category,
      date: 'Today, 2026-08-12',
      time: '7:30 PM',
      totalPrice: price,
      serviceDetails: `Cinema Seat Reservation (${seats.length} Seats: ${seats.join(', ')})`,
      seats,
    });
    setBookingSuccessId(b.id);
  };

  const handleTableConfirm = (tableId: string, time: string, partySize: number) => {
    const b = addBooking({
      userId: 'u-demo-1',
      businessId: business.id,
      businessName: business.name,
      category: business.category,
      date: 'Today, 2026-08-12',
      time,
      totalPrice: 950,
      serviceDetails: `Dining Table Reservation (${partySize} Guests, Table ${tableId})`,
      tableId,
    });
    setBookingSuccessId(b.id);
  };

  const handleParkingConfirm = (slotId: string, slotNum: string) => {
    const b = addBooking({
      userId: 'u-demo-1',
      businessId: business.id,
      businessName: business.name,
      category: business.category,
      date: 'Today, 2026-08-12',
      time: '7:00 PM - 11:00 PM',
      totalPrice: 60,
      serviceDetails: `Smart Parking Slot ${slotNum} (Level B)`,
      parkingSlot: slotNum,
    });
    setBookingSuccessId(b.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 font-medium"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Discover</span>
      </button>

      {/* Hero Banner Header */}
      <div className="glass-card p-6 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={business.imageUrl}
              alt={business.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-xl border-2 border-slate-700"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold">
                  {business.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{business.address} ({business.distanceKm} km)</span>
                </span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                {business.name}
              </h1>

              <div className="flex items-center space-x-4 mt-2 text-xs">
                <div className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{business.rating}</span>
                  <span className="text-slate-500 font-normal">({business.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{business.openingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Queue & Offer CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => joinQueue(business.id, business.name)}
              className="px-4 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center space-x-1.5"
            >
              <Users className="w-4 h-4" />
              <span>Join Virtual Queue</span>
            </button>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-4 border-b border-slate-800 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('booking')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'booking' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Instant Booking
        </button>

        <button
          onClick={() => setActiveTab('prediction')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'prediction' ? 'border-brand-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Crowd & Wait Predictions
        </button>
      </div>

      {/* Success Notification Alert */}
      {bookingSuccessId && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Reservation Confirmed! Booking ID: {bookingSuccessId}</span>
          </div>
          <button
            onClick={() => navigate('/bookings')}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
          >
            View My Bookings
          </button>
        </div>
      )}

      {/* Tab Contents */}
      {activeTab === 'booking' && (
        <div className="space-y-6">
          {business.category === 'Cinemas' ? (
            <CinemaSeatMap onConfirm={handleSeatConfirm} />
          ) : business.category === 'Restaurants' ? (
            <RestaurantTablePicker onConfirm={handleTableConfirm} />
          ) : business.category === 'Parking' ? (
            <ParkingSlotGrid onConfirm={handleParkingConfirm} />
          ) : (
            <div className="glass-card p-6 border border-slate-800 text-center">
              <h3 className="font-bold text-white mb-2">Book Appointment Slot</h3>
              <p className="text-xs text-slate-400 mb-4">Select your preferred doctor/salon time slot</p>
              <button
                onClick={() => handleSeatConfirm(['Slot #14'], 500)}
                className="px-6 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs"
              >
                Confirm Slot (11:30 AM)
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'prediction' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CrowdChart points={crowdData} bestTime={waitData.bestTimeToVisit} bestTimeReason={waitData.recommendationReason} />
          <WaitTimeBreakdown data={waitData} />
        </div>
      )}

    </div>
  );
};

export default BusinessDetailPage;
