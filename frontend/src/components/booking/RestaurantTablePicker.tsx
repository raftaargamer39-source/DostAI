import React, { useState } from 'react';
import { RestaurantTable } from '../../types';
import { INITIAL_RESTAURANT_TABLES } from '../../data/seedData';
import { Utensils, Users, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface Props {
  onConfirm: (tableId: string, time: string, partySize: number) => void;
  defaultTableId?: string;
  defaultPartySize?: number;
}

export const RestaurantTablePicker: React.FC<Props> = ({ 
  onConfirm, 
  defaultTableId = 't-104',
  defaultPartySize = 4 
}) => {
  const [tables] = useState<RestaurantTable[]>(INITIAL_RESTAURANT_TABLES);
  const [selectedTableId, setSelectedTableId] = useState<string>(defaultTableId);
  const [partySize, setPartySize] = useState<number>(defaultPartySize);
  const [timeSlot, setTimeSlot] = useState<string>('9:15 PM');

  const selectedTable = tables.find(t => t.id === selectedTableId);

  const handleConfirm = () => {
    if (selectedTableId) {
      onConfirm(selectedTableId, timeSlot, partySize);
    }
  };

  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Utensils className="w-5 h-5 text-amber-400" />
          <h3 className="font-display font-bold text-base text-white">Reserve Dining Table</h3>
        </div>
        <span className="text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
          Spice Route Bistro
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Party Size</span>
          </label>
          <select
            value={partySize}
            onChange={(e) => setPartySize(parseInt(e.target.value, 10))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value={2}>2 Guests (Couples)</option>
            <option value={4}>4 Guests (Family / Friends)</option>
            <option value={6}>6 Guests (Group)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Dining Time Slot</span>
          </label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="7:00 PM">7:00 PM (Early Dinner)</option>
            <option value="8:15 PM">8:15 PM (Prime Hour)</option>
            <option value="9:15 PM">9:15 PM (Post Movie)</option>
            <option value="10:00 PM">10:00 PM (Late Night)</option>
          </select>
        </div>
      </div>

      {/* Table Cards Grid */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-slate-400 mb-2">Available Tables</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tables.map((tbl) => {
            const isSelected = tbl.id === selectedTableId;
            const isOccupied = tbl.status === 'occupied';

            return (
              <button
                key={tbl.id}
                disabled={isOccupied}
                onClick={() => setSelectedTableId(tbl.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isOccupied
                    ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                    : isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold text-xs text-slate-100">{tbl.tableNumber}</div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>Max {tbl.capacity} People</span>
                </div>
                <div className="mt-2 text-[10px] uppercase font-bold">
                  {isOccupied ? (
                    <span className="text-slate-600">Occupied</span>
                  ) : isSelected ? (
                    <span className="text-amber-400">Selected</span>
                  ) : (
                    <span className="text-emerald-400">Available</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Selected Reservation</span>
          <span className="font-semibold text-xs text-amber-300">
            {selectedTable ? `${selectedTable.tableNumber} @ ${timeSlot}` : 'Select a table'}
          </span>
        </div>

        <button
          disabled={!selectedTableId}
          onClick={handleConfirm}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-amber-400 transition-all flex items-center space-x-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm Table</span>
        </button>
      </div>
    </div>
  );
};

export default RestaurantTablePicker;
