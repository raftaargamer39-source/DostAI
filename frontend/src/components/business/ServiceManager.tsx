import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import { Layers, Plus, Trash2, Edit3, CheckCircle, X } from 'lucide-react';

export const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([
    { id: 's-1', businessId: 'b-city-mall', name: 'IMAX 3D Movie Ticket', category: 'Cinema', price: 280, durationMinutes: 150, description: 'Recliner seat ticket' },
    { id: 's-2', businessId: 'b-city-mall', name: 'Reserved Dining Table (4 Seater)', category: 'Dining', price: 950, durationMinutes: 90, description: 'Prime dining table reservation' },
    { id: 's-3', businessId: 'b-city-mall', name: 'Covered Parking Pass (4 Hrs)', category: 'Parking', price: 60, durationMinutes: 240, description: 'Basement P1 slot' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newPrice) return;

    const item: ServiceItem = {
      id: `s-${Date.now()}`,
      businessId: 'b-city-mall',
      name: newServiceName,
      category: newCategory,
      price: parseFloat(newPrice),
      durationMinutes: 60,
      description: 'Business service slot',
    };

    setServices([...services, item]);
    setNewServiceName('');
    setNewPrice('');
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-brand-400" />
          <h3 className="font-display font-bold text-base text-white">Business Service Management</h3>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 rounded-lg gradient-bg text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {services.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">{item.name}</span>
                <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[10px] font-semibold">
                  {item.category}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">{item.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-mono font-bold text-emerald-400 text-sm">₹{item.price}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-sm w-full p-6 border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-sm text-white">Add New Service</h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddService} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Service Title</label>
                <input
                  type="text"
                  placeholder="e.g. VIP Cinema Box"
                  value={newServiceName}
                  onChange={e => setNewServiceName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Price (₹)</label>
                <input
                  type="number"
                  placeholder="350"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Cinema">Cinema</option>
                  <option value="Dining">Dining</option>
                  <option value="Parking">Parking</option>
                  <option value="Appointment">Appointment</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-xl gradient-bg text-white font-semibold shadow-lg"
              >
                Create Service
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
