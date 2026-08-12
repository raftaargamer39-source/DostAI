import React, { useState } from 'react';
import { ParkingSlot } from '../../types';
import { INITIAL_PARKING_SLOTS } from '../../data/seedData';
import { Car, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  onConfirm: (slotId: string, slotNumber: string) => void;
  defaultSlotId?: string;
}

export const ParkingSlotGrid: React.FC<Props> = ({ onConfirm, defaultSlotId = 'p-24' }) => {
  const [slots] = useState<ParkingSlot[]>(INITIAL_PARKING_SLOTS);
  const [selectedSlotId, setSelectedSlotId] = useState<string>(defaultSlotId);

  const selectedSlot = slots.find(s => s.id === selectedSlotId);

  const handleConfirm = () => {
    if (selectedSlot) {
      onConfirm(selectedSlot.id, selectedSlot.slotNumber);
    }
  };

  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Car className="w-5 h-5 text-emerald-400" />
          <h3 className="font-display font-bold text-base text-white">Smart Parking Slot Grid</h3>
        </div>
        <span className="text-xs text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
          QuickPark Basement P1
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {slots.map((slot) => {
          const isSelected = slot.id === selectedSlotId;
          const isOccupied = slot.status === 'occupied';

          return (
            <button
              key={slot.id}
              disabled={isOccupied}
              onClick={() => setSelectedSlotId(slot.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isOccupied
                  ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                  : isSelected
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10 scale-[1.02]'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-slate-100">{slot.slotNumber}</span>
                <Car className={`w-4 h-4 ${isOccupied ? 'text-slate-600' : isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{slot.zone}</div>
              <div className="mt-2 text-[10px] font-bold uppercase">
                {isOccupied ? (
                  <span className="text-slate-600">Occupied</span>
                ) : isSelected ? (
                  <span className="text-emerald-400">Selected</span>
                ) : (
                  <span className="text-slate-400">Available</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Reserved Slot</span>
          <span className="font-mono font-bold text-sm text-emerald-400">
            {selectedSlot ? `${selectedSlot.slotNumber} (${selectedSlot.zone})` : 'Select Slot'}
          </span>
        </div>

        <button
          disabled={!selectedSlotId}
          onClick={handleConfirm}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-emerald-400 transition-all flex items-center space-x-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Reserve Slot</span>
        </button>
      </div>
    </div>
  );
};

export default ParkingSlotGrid;
