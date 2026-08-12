import React, { useState } from 'react';
import { CinemaSeat } from '../../types';
import { INITIAL_CINEMA_SEATS } from '../../data/seedData';
import { Film, CheckCircle2 } from 'lucide-react';

interface Props {
  onConfirm: (seats: string[], totalPrice: number) => void;
  defaultSelected?: string[];
}

export const CinemaSeatMap: React.FC<Props> = ({ onConfirm, defaultSelected = [] }) => {
  const [seats, setSeats] = useState<CinemaSeat[]>(INITIAL_CINEMA_SEATS);
  const [selectedSeatCodes, setSelectedSeatCodes] = useState<string[]>(
    defaultSelected.length > 0 ? defaultSelected : ['B5', 'B6', 'B7', 'B8']
  );

  const toggleSeat = (code: string, status: string) => {
    if (status === 'occupied') return;
    setSelectedSeatCodes(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const totalPrice = selectedSeatCodes.reduce((sum, code) => {
    const s = seats.find(item => item.seatCode === code);
    return sum + (s ? s.price : 280);
  }, 0);

  const handleConfirm = () => {
    onConfirm(selectedSeatCodes, totalPrice);
  };

  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Film className="w-5 h-5 text-brand-400" />
          <h3 className="font-display font-bold text-base text-white">Select Cinema Seats</h3>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span>
            <span className="text-slate-400">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded bg-brand-500"></span>
            <span className="text-slate-200">Selected</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 rounded bg-rose-900/50 border border-rose-700/50"></span>
            <span className="text-slate-500">Occupied</span>
          </div>
        </div>
      </div>

      {/* Screen Graphic */}
      <div className="w-full mb-8 text-center">
        <div className="w-3/4 mx-auto h-2 bg-gradient-to-b from-brand-500 to-transparent rounded-t-full opacity-60"></div>
        <p className="text-[10px] uppercase font-semibold tracking-widest text-slate-500 mt-1">Screen This Way</p>
      </div>

      {/* Seat Matrix */}
      <div className="space-y-3 max-w-md mx-auto mb-6">
        {['A', 'B', 'C'].map((rowLetter) => {
          const rowSeats = seats.filter(s => s.row === rowLetter);
          return (
            <div key={rowLetter} className="flex items-center justify-center space-x-2">
              <span className="w-6 text-center font-bold text-xs text-slate-500">{rowLetter}</span>
              <div className="flex items-center space-x-2">
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeatCodes.includes(seat.seatCode);
                  const isOccupied = seat.status === 'occupied';

                  return (
                    <button
                      key={seat.id}
                      disabled={isOccupied}
                      onClick={() => toggleSeat(seat.seatCode, seat.status)}
                      className={`w-9 h-9 rounded-lg font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                        isOccupied 
                          ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                          : isSelected
                          ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40 border border-brand-400 scale-105'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Summary Footer */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block">Selected Seats ({selectedSeatCodes.length})</span>
          <span className="font-mono font-bold text-sm text-brand-300">
            {selectedSeatCodes.length > 0 ? selectedSeatCodes.join(', ') : 'None'}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <span className="text-xs text-slate-400 block">Total Amount</span>
            <span className="font-display font-bold text-lg text-emerald-400">₹{totalPrice}</span>
          </div>

          <button
            disabled={selectedSeatCodes.length === 0}
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-xs shadow-lg hover:scale-105 disabled:opacity-50 transition-all flex items-center space-x-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Seats</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinemaSeatMap;
