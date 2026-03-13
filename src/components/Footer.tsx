import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-900 dark:bg-surface-950 text-surface-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MusicHub</span>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed">
              Your one-stop marketplace for hiring talented musicians and renting premium instruments for any occasion.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/musicians" className="text-sm hover:text-primary-400 transition-colors">Hire Musicians</Link></li>
              <li><Link href="/instruments" className="text-sm hover:text-primary-400 transition-colors">Rent Instruments</Link></li>
              <li><Link href="/musicians?genre=Jazz" className="text-sm hover:text-primary-400 transition-colors">Jazz Musicians</Link></li>
              <li><Link href="/instruments?category=Guitars" className="text-sm hover:text-primary-400 transition-colors">Guitar Rentals</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">About Us</span></li>
              <li><span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">Contact</span></li>
              <li><span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">Careers</span></li>
              <li><span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">Blog</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">Refund Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            © 2026 MusicHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map(social => (
              <span
                key={social}
                className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-primary-600 flex items-center justify-center text-surface-400 hover:text-white transition-all cursor-pointer text-xs font-medium"
              >
                {social[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
