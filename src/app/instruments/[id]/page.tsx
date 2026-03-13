'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RentalCalculator from '@/components/RentalCalculator';

interface Instrument {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  image: string;
  brand: string;
  condition: string;
  available: boolean;
}

export default function InstrumentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [instrument, setInstrument] = useState<Instrument | null>(null);
  const [loading, setLoading] = useState(true);
  const [rentalData, setRentalData] = useState<{ days: number; total: number; discount: number; startDate: string; endDate: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/instruments/${id}`)
      .then(res => res.json())
      .then(data => { setInstrument(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleCalculate = useCallback((data: { days: number; total: number; discount: number; startDate: string; endDate: string }) => {
    setRentalData(data);
  }, []);

  const handleRent = async () => {
    if (!rentalData) return;
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rentalItemId: id,
          startDate: rentalData.startDate,
          endDate: rentalData.endDate,
        }),
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Rental failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const categoryIcons: Record<string, string> = {
    Guitars: '🎸', Pianos: '🎹', Drums: '🥁', Strings: '🎻', Wind: '🎷', Percussion: '🪘',
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-1/3" />
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="h-96 bg-surface-200 dark:bg-surface-700 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded w-1/2" />
              <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded" />
              <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!instrument) {
    return (
      <div className="pt-24 pb-16 text-center">
        <p className="text-6xl mb-4">😔</p>
        <h2 className="text-2xl font-bold">Instrument not found</h2>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Product Image & Details */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-surface-800 dark:to-surface-700 rounded-3xl h-96 flex items-center justify-center">
              <span className="text-[120px]">{categoryIcons[instrument.category] || '🎵'}</span>
            </div>

            <div className="bg-white dark:bg-surface-800/50 rounded-3xl border border-surface-100 dark:border-surface-700/50 p-8">
              <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Description</h2>
              <p className="text-surface-600 dark:text-surface-300 leading-relaxed">{instrument.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
                  <p className="text-xs text-surface-400 uppercase tracking-wider">Brand</p>
                  <p className="font-semibold text-surface-900 dark:text-white mt-1">{instrument.brand}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
                  <p className="text-xs text-surface-400 uppercase tracking-wider">Condition</p>
                  <p className="font-semibold text-surface-900 dark:text-white mt-1">{instrument.condition}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
                  <p className="text-xs text-surface-400 uppercase tracking-wider">Category</p>
                  <p className="font-semibold text-surface-900 dark:text-white mt-1">{instrument.category}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-700/50">
                  <p className="text-xs text-surface-400 uppercase tracking-wider">Availability</p>
                  <p className={`font-semibold mt-1 ${instrument.available ? 'text-success' : 'text-danger'}`}>
                    {instrument.available ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Sidebar */}
          <div>
            <div className="sticky top-28 space-y-6">
              <div className="bg-white dark:bg-surface-800/50 rounded-3xl border border-surface-100 dark:border-surface-700/50 p-8">
                <p className="text-xs text-surface-400 uppercase tracking-wider">{instrument.brand}</p>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{instrument.name}</h1>
                <div className="mt-4 mb-8">
                  <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">${instrument.pricePerDay}</span>
                  <span className="text-surface-400 ml-2">/day</span>
                </div>

                {success ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">Rental Confirmed!</h3>
                    <p className="text-surface-500 mb-6">Check your dashboard for details.</p>
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                    >
                      View Dashboard
                    </button>
                  </div>
                ) : (
                  <>
                    <RentalCalculator
                      pricePerDay={instrument.pricePerDay}
                      onCalculate={handleCalculate}
                    />

                    {error && (
                      <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleRent}
                      disabled={!rentalData || submitting || !instrument.available}
                      className="w-full mt-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Processing...' : rentalData ? `Rent for $${rentalData.total.toFixed(2)}` : 'Select dates to rent'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
