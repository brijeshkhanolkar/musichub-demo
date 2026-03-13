'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatusBadge from '@/components/StatusBadge';

interface Booking {
  id: string;
  eventDate: string;
  eventType: string;
  venue: string;
  status: string;
  totalPrice: number;
  notes: string;
  musician: { name: string; genre: string; instrument: string };
  createdAt: string;
}

interface Rental {
  id: string;
  startDate: string;
  endDate: string;
  days: number;
  discount: number;
  totalPrice: number;
  status: string;
  rentalItem: { name: string; brand: string; category: string };
  createdAt: string;
}

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'rentals' | 'profile'>('bookings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(r => r.json()),
      fetch('/api/bookings').then(r => r.ok ? r.json() : []),
      fetch('/api/rentals').then(r => r.ok ? r.json() : []),
    ]).then(([userData, bookingsData, rentalsData]) => {
      setUser(userData.user);
      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setRentals(Array.isArray(rentalsData) ? rentalsData : []);
      setLoading(false);
    }).catch(() => {
      router.push('/login');
    });
  }, [router]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-1/3" />
          <div className="h-64 bg-surface-200 dark:bg-surface-700 rounded-2xl" />
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'bookings' as const, label: 'My Bookings', count: bookings.length },
    { key: 'rentals' as const, label: 'My Rentals', count: rentals.length },
    { key: 'profile' as const, label: 'Profile', count: null },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-2">
            Manage your bookings, rentals, and account settings
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
            <p className="text-sm text-surface-500">Total Bookings</p>
            <p className="text-3xl font-bold text-surface-900 dark:text-white mt-1">{bookings.length}</p>
          </div>
          <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
            <p className="text-sm text-surface-500">Total Rentals</p>
            <p className="text-3xl font-bold text-surface-900 dark:text-white mt-1">{rentals.length}</p>
          </div>
          <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
            <p className="text-sm text-surface-500">Total Spent</p>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1">
              ${[...bookings, ...rentals].reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-surface-200 dark:border-surface-700">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
                activeTab === tab.key
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          bookings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🎵</p>
              <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">No bookings yet</h3>
              <p className="text-surface-500 mb-6">Start by browsing our talented musicians</p>
              <button onClick={() => router.push('/musicians')} className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                Browse Musicians
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b.id} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-surface-900 dark:text-white">{b.musician.name}</h3>
                      <p className="text-sm text-surface-500 mt-1">{b.musician.instrument} · {b.musician.genre}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-surface-500">
                        <span>📅 {new Date(b.eventDate).toLocaleDateString()}</span>
                        <span>📍 {b.venue}</span>
                        <span>🎭 {b.eventType}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={b.status} />
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${b.totalPrice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          rentals.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🎸</p>
              <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">No rentals yet</h3>
              <p className="text-surface-500 mb-6">Browse our instrument catalog to get started</p>
              <button onClick={() => router.push('/instruments')} className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                Browse Instruments
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {rentals.map(r => (
                <div key={r.id} className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-surface-900 dark:text-white">{r.rentalItem.name}</h3>
                      <p className="text-sm text-surface-500 mt-1">{r.rentalItem.brand} · {r.rentalItem.category}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-surface-500">
                        <span>📅 {new Date(r.startDate).toLocaleDateString()} - {new Date(r.endDate).toLocaleDateString()}</span>
                        <span>⏱️ {r.days} days</span>
                        {r.discount > 0 && <span className="text-success">🏷️ {r.discount}% off</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={r.status} />
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${r.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && user && (
          <div className="max-w-2xl">
            <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-surface-900 dark:text-white">{user.name}</h2>
                  <p className="text-surface-500">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
                  <p className="text-xs text-surface-400 uppercase">Account Type</p>
                  <p className="font-semibold text-surface-900 dark:text-white mt-1">{user.role}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
                  <p className="text-xs text-surface-400 uppercase">Email Address</p>
                  <p className="font-semibold text-surface-900 dark:text-white mt-1">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
