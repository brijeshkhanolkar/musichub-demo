'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import InstrumentCard from '@/components/InstrumentCard';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/animations';

interface Instrument {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  image: string;
  brand: string;
  condition: string;
  available: boolean;
}

const categories = ['All', 'Guitars', 'Pianos', 'Drums', 'Strings', 'Wind', 'Percussion'];

function InstrumentsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'All') params.set('category', category);
    if (search) params.set('search', search);

    fetch(`/api/instruments?${params}`)
      .then(res => res.json())
      .then(data => { setInstruments(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SlideUp className="mb-12">
          <h1 className="text-4xl font-bold text-surface-900 dark:text-white">
            Rent Instruments
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-3 text-lg">
            Premium instruments at affordable daily rates with multi-day discounts
          </p>
        </SlideUp>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search instruments..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === c
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-600 hover:border-primary-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <StaggerItem key={i}>
                <div className="bg-surface-100 dark:bg-surface-800 rounded-2xl h-80 animate-pulse" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : instruments.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🎸</p>
            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">No instruments found</h3>
            <p className="text-surface-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {instruments.map(i => (
              <StaggerItem key={i.id}>
                <InstrumentCard {...i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}

export default function InstrumentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
      <InstrumentsContent />
    </Suspense>
  );
}
