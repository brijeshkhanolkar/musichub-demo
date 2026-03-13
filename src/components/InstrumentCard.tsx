import Link from 'next/link';

interface InstrumentCardProps {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  image: string;
  brand: string;
  condition: string;
  available: boolean;
}

export default function InstrumentCard({
  id, name, category, pricePerDay, brand, condition, available,
}: InstrumentCardProps) {
  const conditionColors: Record<string, string> = {
    Excellent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    Good: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    Fair: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  };

  const categoryIcons: Record<string, string> = {
    Guitars: '🎸',
    Pianos: '🎹',
    Drums: '🥁',
    Strings: '🎻',
    Wind: '🎷',
    Percussion: '🪘',
  };

  return (
    <Link href={`/instruments/${id}`} className="group block">
      <div className="card-hover bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 overflow-hidden">
        {/* Image */}
        <div className="relative h-52 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-surface-800 dark:to-surface-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl transition-transform group-hover:scale-110 duration-500">
              {categoryIcons[category] || '🎵'}
            </span>
          </div>
          {!available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Unavailable</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-surface-800/90 text-surface-700 dark:text-surface-200 backdrop-blur-sm">
              {category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${conditionColors[condition] || 'bg-surface-100 text-surface-600'}`}>
              {condition}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs font-medium text-surface-400 dark:text-surface-500 uppercase tracking-wider">{brand}</p>
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mt-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {name}
          </h3>
          <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700/50 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${pricePerDay}</span>
              <span className="text-sm text-surface-400 ml-1">/day</span>
            </div>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Details
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
