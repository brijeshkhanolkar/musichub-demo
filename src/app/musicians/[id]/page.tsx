'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Musician {
  id: string;
  name: string;
  genre: string;
  instrument: string;
  bio: string;
  pricePerEvent: number;
  image: string;
  rating: number;
  experience: number;
  location: string;
}

export default function MusicianProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [musician, setMusician] = useState<Musician | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    eventDate: '',
    eventType: '',
    venue: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/musicians/${id}`)
      .then(res => res.json())
      .then(data => { setMusician(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          musicianId: id,
          ...booking,
          totalPrice: musician?.pricePerEvent || 0,
        }),
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Booking failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-1/3" />
          <div className="h-64 bg-surface-200 dark:bg-surface-700 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!musician) {
    return (
      <div className="pt-24 pb-16 text-center">
        <p className="text-6xl mb-4">😔</p>
        <h2 className="text-2xl font-bold">Musician not found</h2>
      </div>
    );
  }

  const genreColors: Record<string, string> = {
    Jazz: 'bg-amber-100 text-amber-700',
    Classical: 'bg-purple-100 text-purple-700',
    Rock: 'bg-red-100 text-red-700',
    Pop: 'bg-pink-100 text-pink-700',
    Blues: 'bg-blue-100 text-blue-700',
    Folk: 'bg-green-100 text-green-700',
    Electronic: 'bg-cyan-100 text-cyan-700',
    Latin: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <div className="bg-white dark:bg-surface-800/50 rounded-3xl border border-surface-100 dark:border-surface-700/50 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 relative">
                <div className="absolute -bottom-16 left-8">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-300 to-primary-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-white dark:border-surface-800">
                    {musician.name.charAt(0)}
                  </div>
                </div>
              </div>
              <div className="pt-20 pb-8 px-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-surface-900 dark:text-white">{musician.name}</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">{musician.instrument}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${genreColors[musician.genre] || 'bg-surface-100 text-surface-600'}`}>
                    {musician.genre}
                  </span>
                </div>

                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center gap-2 text-surface-600 dark:text-surface-300">
                    <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{musician.rating}</span>
                    <span className="text-surface-400">rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-surface-600 dark:text-surface-300">
                    <svg className="w-5 h-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{musician.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-surface-600 dark:text-surface-300">
                    <svg className="w-5 h-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{musician.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white dark:bg-surface-800/50 rounded-3xl border border-surface-100 dark:border-surface-700/50 p-8">
              <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">About</h2>
              <p className="text-surface-600 dark:text-surface-300 leading-relaxed">{musician.bio}</p>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-surface-800/50 rounded-3xl border border-surface-100 dark:border-surface-700/50 p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">Booking Submitted!</h3>
                  <p className="text-surface-500 mb-6">We&apos;ll notify you when the musician confirms.</p>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    View Dashboard
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <p className="text-sm text-surface-400">Price per event</p>
                    <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mt-1">
                      ${musician.pricePerEvent}
                    </p>
                  </div>

                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Event Date</label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={booking.eventDate}
                        onChange={e => setBooking({...booking, eventDate: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Event Type</label>
                      <select
                        required
                        value={booking.eventType}
                        onChange={e => setBooking({...booking, eventType: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                      >
                        <option value="">Select type...</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Birthday">Birthday Party</option>
                        <option value="Concert">Concert</option>
                        <option value="Festival">Festival</option>
                        <option value="Private">Private Event</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Venue</label>
                      <input
                        type="text"
                        required
                        placeholder="Event venue/location"
                        value={booking.venue}
                        onChange={e => setBooking({...booking, venue: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Notes (optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Any special requirements..."
                        value={booking.notes}
                        onChange={e => setBooking({...booking, notes: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : `Book for $${musician.pricePerEvent}`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
