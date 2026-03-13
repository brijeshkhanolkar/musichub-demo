'use client';

import { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';

interface Musician { id: string; name: string; genre: string; instrument: string; pricePerEvent: number; rating: number; location: string; }
interface Instrument { id: string; name: string; category: string; pricePerDay: number; brand: string; condition: string; available: boolean; }
interface Booking { id: string; eventDate: string; eventType: string; venue: string; status: string; totalPrice: number; user: { name: string; email: string }; musician: { name: string }; }
interface Rental { id: string; startDate: string; endDate: string; days: number; discount: number; totalPrice: number; status: string; user: { name: string; email: string }; rentalItem: { name: string }; }

type Tab = 'musicians' | 'instruments' | 'bookings' | 'rentals';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('musicians');
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, string | number | boolean>>({});
  const [editId, setEditId] = useState<string | null>(null);

  const fetchAll = () => {
    Promise.all([
      fetch('/api/admin/musicians').then(r => r.ok ? r.json() : []),
      fetch('/api/admin/instruments').then(r => r.ok ? r.json() : []),
      fetch('/api/admin/bookings').then(r => r.ok ? r.json() : []),
      fetch('/api/admin/rentals').then(r => r.ok ? r.json() : []),
    ]).then(([m, i, b, r]) => {
      setMusicians(Array.isArray(m) ? m : []); setInstruments(Array.isArray(i) ? i : []);
      setBookings(Array.isArray(b) ? b : []); setRentals(Array.isArray(r) ? r : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    fetchAll();
  }, []);

  const submitMusician = async () => {
    const url = editId ? `/api/admin/musicians/${editId}` : '/api/admin/musicians';
    await fetch(url, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, pricePerEvent: Number(form.pricePerEvent), rating: Number(form.rating || 4.5), experience: Number(form.experience || 5) }),
    });
    setShowForm(false); setEditId(null); fetchAll();
  };

  const submitInstrument = async () => {
    const url = editId ? `/api/admin/instruments/${editId}` : '/api/admin/instruments';
    await fetch(url, { method: editId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, pricePerDay: Number(form.pricePerDay), available: form.available !== 'false' && form.available !== false }),
    });
    setShowForm(false); setEditId(null); fetchAll();
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' }); fetchAll();
  };

  const updateStatus = async (type: string, id: string, status: string) => {
    await fetch(`/api/admin/${type}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }); fetchAll();
  };

  const openMusician = (m?: Musician) => {
    setEditId(m?.id || null);
    setForm(m ? { name: m.name, genre: m.genre, instrument: m.instrument, location: m.location, bio: '', image: '/musicians/default.jpg', pricePerEvent: m.pricePerEvent, rating: m.rating, experience: 5 }
      : { name: '', genre: '', instrument: '', location: '', bio: '', image: '/musicians/default.jpg', pricePerEvent: 0, rating: 4.5, experience: 5 });
    setShowForm(true);
  };

  const openInstrument = (i?: Instrument) => {
    setEditId(i?.id || null);
    setForm(i ? { name: i.name, category: i.category, brand: i.brand, condition: i.condition, description: '', image: '/instruments/default.jpg', pricePerDay: i.pricePerDay, available: i.available }
      : { name: '', category: '', brand: '', condition: 'Excellent', description: '', image: '/instruments/default.jpg', pricePerDay: 0, available: true });
    setShowForm(true);
  };

  const inp = (label: string, key: string, type = 'text') => (
    <div key={key}>
      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea rows={3} value={String(form[key] || '')} onChange={e => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
      ) : (
        <input type={type} value={String(form[key] || '')} onChange={e => setForm({ ...form, [key]: e.target.value })}
          className="w-full px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
      )}
    </div>
  );

  const tabData = [
    { key: 'musicians' as Tab, label: 'Musicians', count: musicians.length, icon: '🎵' },
    { key: 'instruments' as Tab, label: 'Instruments', count: instruments.length, icon: '🎸' },
    { key: 'bookings' as Tab, label: 'Bookings', count: bookings.length, icon: '📋' },
    { key: 'rentals' as Tab, label: 'Rentals', count: rentals.length, icon: '📦' },
  ];

  if (loading) return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-1/3" />
        <div className="grid grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-surface-200 dark:bg-surface-700 rounded-2xl" />)}</div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-surface-500 mb-8">Manage your marketplace</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {tabData.map(t => (
            <div key={t.key} onClick={() => { setTab(t.key); setShowForm(false); }}
              className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6 cursor-pointer hover:border-primary-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{t.icon}</span>
                <span className="text-3xl font-bold text-surface-900 dark:text-white">{t.count}</span>
              </div>
              <p className="text-sm text-surface-500 mt-2">{t.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 border-b border-surface-200 dark:border-surface-700 overflow-x-auto">
          {tabData.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setShowForm(false); }}
              className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-all ${tab === t.key ? 'border-primary-600 text-primary-600' : 'border-transparent text-surface-500 hover:text-surface-700'}`}>
              {t.icon} {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* Musicians */}
        {tab === 'musicians' && (<div>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">Manage Musicians</h2>
            <button onClick={() => openMusician()} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700">+ Add Musician</button>
          </div>
          {showForm && <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6 mb-6">
            <h3 className="font-bold mb-4">{editId ? 'Edit' : 'Add'} Musician</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {inp('Name', 'name')}{inp('Genre', 'genre')}{inp('Instrument', 'instrument')}{inp('Location', 'location')}
              <div className="sm:col-span-2">{inp('Bio', 'bio', 'textarea')}</div>
              {inp('Price/Event', 'pricePerEvent', 'number')}{inp('Experience (yrs)', 'experience', 'number')}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={submitMusician} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold">{editId ? 'Update' : 'Create'}</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-surface-100 dark:bg-surface-700 rounded-xl text-sm font-semibold">Cancel</button>
            </div>
          </div>}
          <div className="overflow-x-auto"><table className="w-full"><thead><tr className="text-left text-xs font-semibold text-surface-400 uppercase border-b border-surface-200 dark:border-surface-700">
            <th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Genre</th><th className="pb-3 pr-4">Instrument</th><th className="pb-3 pr-4">Price</th><th className="pb-3 pr-4">Rating</th><th className="pb-3">Actions</th>
          </tr></thead><tbody className="divide-y divide-surface-100 dark:divide-surface-700/50">
            {musicians.map(m => <tr key={m.id} className="text-sm">
              <td className="py-4 pr-4 font-medium text-surface-900 dark:text-white">{m.name}</td>
              <td className="py-4 pr-4 text-surface-600 dark:text-surface-300">{m.genre}</td>
              <td className="py-4 pr-4 text-surface-600 dark:text-surface-300">{m.instrument}</td>
              <td className="py-4 pr-4 font-semibold text-primary-600">${m.pricePerEvent}</td>
              <td className="py-4 pr-4">⭐ {m.rating}</td>
              <td className="py-4"><button onClick={() => openMusician(m)} className="text-primary-600 text-xs font-semibold mr-2">Edit</button><button onClick={() => handleDelete('musicians', m.id)} className="text-red-500 text-xs font-semibold">Delete</button></td>
            </tr>)}
          </tbody></table></div>
        </div>)}

        {/* Instruments */}
        {tab === 'instruments' && (<div>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">Manage Instruments</h2>
            <button onClick={() => openInstrument()} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700">+ Add Instrument</button>
          </div>
          {showForm && <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6 mb-6">
            <h3 className="font-bold mb-4">{editId ? 'Edit' : 'Add'} Instrument</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {inp('Name', 'name')}{inp('Category', 'category')}{inp('Brand', 'brand')}{inp('Condition', 'condition')}
              <div className="sm:col-span-2">{inp('Description', 'description', 'textarea')}</div>
              {inp('Price/Day', 'pricePerDay', 'number')}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={submitInstrument} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold">{editId ? 'Update' : 'Create'}</button>
              <button onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-surface-100 dark:bg-surface-700 rounded-xl text-sm font-semibold">Cancel</button>
            </div>
          </div>}
          <div className="overflow-x-auto"><table className="w-full"><thead><tr className="text-left text-xs font-semibold text-surface-400 uppercase border-b border-surface-200 dark:border-surface-700">
            <th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Category</th><th className="pb-3 pr-4">Brand</th><th className="pb-3 pr-4">Price/Day</th><th className="pb-3 pr-4">Status</th><th className="pb-3">Actions</th>
          </tr></thead><tbody className="divide-y divide-surface-100 dark:divide-surface-700/50">
            {instruments.map(i => <tr key={i.id} className="text-sm">
              <td className="py-4 pr-4 font-medium text-surface-900 dark:text-white">{i.name}</td>
              <td className="py-4 pr-4">{i.category}</td><td className="py-4 pr-4">{i.brand}</td>
              <td className="py-4 pr-4 font-semibold text-primary-600">${i.pricePerDay}</td>
              <td className="py-4 pr-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${i.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{i.available ? 'Available' : 'Unavailable'}</span></td>
              <td className="py-4"><button onClick={() => openInstrument(i)} className="text-primary-600 text-xs font-semibold mr-2">Edit</button><button onClick={() => handleDelete('instruments', i.id)} className="text-red-500 text-xs font-semibold">Delete</button></td>
            </tr>)}
          </tbody></table></div>
        </div>)}

        {/* Bookings */}
        {tab === 'bookings' && (<div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">Manage Bookings</h2>
          {bookings.length === 0 ? <p className="text-center py-12 text-surface-500">No bookings yet</p> :
          <div className="space-y-4">{bookings.map(b => (
            <div key={b.id} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-surface-900 dark:text-white">{b.musician.name}</h3>
                  <p className="text-sm text-surface-500 mt-1">By <strong>{b.user.name}</strong> ({b.user.email})</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-surface-500">
                    <span>📅 {new Date(b.eventDate).toLocaleDateString()}</span><span>📍 {b.venue}</span><span>🎭 {b.eventType}</span><span className="font-semibold text-primary-600">${b.totalPrice}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={b.status} />
                  <select value={b.status} onChange={e => updateStatus('bookings', b.id, e.target.value)}
                    className="px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm outline-none">
                    <option value="PENDING">Pending</option><option value="CONFIRMED">Confirmed</option><option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}</div>}
        </div>)}

        {/* Rentals */}
        {tab === 'rentals' && (<div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">Manage Rentals</h2>
          {rentals.length === 0 ? <p className="text-center py-12 text-surface-500">No rentals yet</p> :
          <div className="space-y-4">{rentals.map(r => (
            <div key={r.id} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-surface-900 dark:text-white">{r.rentalItem.name}</h3>
                  <p className="text-sm text-surface-500 mt-1">By <strong>{r.user.name}</strong> ({r.user.email})</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-surface-500">
                    <span>📅 {new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()}</span>
                    <span>⏱️ {r.days}d</span>{r.discount > 0 && <span className="text-success">🏷️ {r.discount}%</span>}<span className="font-semibold text-primary-600">${r.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={r.status} />
                  <select value={r.status} onChange={e => updateStatus('rentals', r.id, e.target.value)}
                    className="px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-sm outline-none">
                    <option value="PENDING">Pending</option><option value="ACTIVE">Active</option><option value="RETURNED">Returned</option><option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}</div>}
        </div>)}
      </div>
    </div>
  );
}
