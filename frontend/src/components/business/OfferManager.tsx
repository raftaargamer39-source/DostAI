import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, Trash2, CheckCircle, X } from 'lucide-react';

export const OfferManager: React.FC = () => {
  const { offers, addOffer, deleteOffer } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [discountText, setDiscountText] = useState('₹200 OFF');
  const [discountValue, setDiscountValue] = useState('200');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addOffer({
      businessId: 'b-city-mall',
      businessName: 'City Mall Promo',
      title,
      discountText,
      discountValue: parseFloat(discountValue),
      category: 'Malls',
      validUntil: 'End of week',
      minOrder: 1000,
      code: `OFF${Math.floor(100 + Math.random() * 900)}`,
    });

    setTitle('');
    setShowModal(false);
  };

  return (
    <div className="glass-card p-6 border border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-amber-400" />
          <h3 className="font-display font-bold text-base text-white">Promotional Offer Management</h3>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>New Offer</span>
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">{offer.title}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  {offer.discountText}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">Code: <span className="font-mono text-slate-200">{offer.code}</span> • {offer.validUntil}</p>
            </div>

            <button
              onClick={() => deleteOffer(offer.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Delete Offer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-sm w-full p-6 border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-sm text-white">Create New Offer</h4>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Offer Title</label>
                <input
                  type="text"
                  placeholder="e.g. Weekend Special Discount"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Discount Label</label>
                <input
                  type="text"
                  placeholder="₹250 OFF"
                  value={discountText}
                  onChange={e => setDiscountText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Discount Amount (₹)</label>
                <input
                  type="number"
                  placeholder="250"
                  value={discountValue}
                  onChange={e => setDiscountValue(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-lg"
              >
                Launch Offer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferManager;
