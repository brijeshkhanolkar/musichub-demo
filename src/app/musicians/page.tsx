'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MusicianCard from '@/components/MusicianCard';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/animations';

interface Musician {
  id: string;
  name: string;
  genre: string;
  instrument: string;
  pricePerEvent: number;
  image: string;
  rating: number;
  experience: number;
  location: string;
}

const genres = ['All', 'Jazz', 'Classical', 'Rock', 'Pop', 'Blues', 'Folk', 'Electronic', 'Latin'];

function MusiciansContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get('genre') || 'All';
  
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [genre, setGenre] = useState(initialGenre);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (genre !== 'All') params.set('genre', genre);
    if (search) params.set('search', search);

    fetch(`/api/musicians?${params}`)
      .then(res => res.json())
      .then(data => { setMusicians(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [genre, search]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp className="mb-12">
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
            Hire Musicians
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-3 text-lg">
            Find and book talented musicians for your next event
          </p>
        </SlideUp>

        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search musicians..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all placeholder:text-surface-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {genres.map(g => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  genre === g
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-600 hover:border-primary-300 dark:hover:border-primary-500'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <StaggerItem key={i}>
                <div className="bg-surface-100 dark:bg-surface-800 rounded-2xl h-96 animate-pulse" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : musicians.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🎵</p>
            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">No musicians found</h3>
            <p className="text-surface-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {musicians.map(m => (
              <StaggerItem key={m.id}>
                <MusicianCard {...m} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}

export default function MusiciansPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
      <MusiciansContent />
    </Suspense>
  );
}
