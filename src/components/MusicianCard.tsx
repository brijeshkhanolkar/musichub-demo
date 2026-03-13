import Link from 'next/link';

interface MusicianCardProps {
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

export default function MusicianCard({
  id, name, genre, instrument, pricePerEvent, rating, experience, location,
}: MusicianCardProps) {
  const genreColors: Record<string, string> = {
    Jazz: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    Classical: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    Rock: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    Pop: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400',
    Blues: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    Folk: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    Electronic: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400',
    Latin: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
  };

  return (
    <Link href={`/musicians/${id}`} className="group block">
      <div className="card-hover bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 overflow-hidden">
        {/* Image */}
        <div className="relative h-56 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              {name.charAt(0)}
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${genreColors[genre] || 'bg-surface-100 text-surface-600'}`}>
              {genre}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
            <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-sm font-medium">{rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-surface-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            {instrument} · {experience} yrs experience
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm text-surface-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
          <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700/50 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${pricePerEvent}</span>
              <span className="text-sm text-surface-400 ml-1">/event</span>
            </div>
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              View Profile
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
