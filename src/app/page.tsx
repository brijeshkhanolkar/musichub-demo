import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import MusicianCard from '@/components/MusicianCard';
import InstrumentCard from '@/components/InstrumentCard';
import { SlideUp, StaggerContainer, StaggerItem } from '@/components/animations';

export default async function HomePage() {
  let musicians: Array<{id: string; name: string; genre: string; instrument: string; pricePerEvent: number; image: string; rating: number; experience: number; location: string}> = [];
  let instruments: Array<{id: string; name: string; category: string; pricePerDay: number; image: string; brand: string; condition: string; available: boolean}> = [];
  
  try {
    musicians = await prisma.musician.findMany({ take: 4, orderBy: { rating: 'desc' } });
    instruments = await prisma.rentalItem.findMany({ take: 4, orderBy: { createdAt: 'desc' } });
  } catch {
    // DB not available yet — render with empty data
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-900 to-surface-900">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99,102,241,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168,85,247,0.2) 0%, transparent 50%)'}} />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <SlideUp className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-8">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Trusted by 1000+ event organizers
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Music for
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-accent-400 bg-clip-text text-transparent">
                Every Moment
              </span>
            </h1>
            <p className="text-xl text-surface-300 mt-6 max-w-xl leading-relaxed">
              Hire world-class musicians for your events or rent premium instruments. 
              MusicHub connects you with talent and tools to make magic happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/musicians"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl hover:from-primary-700 hover:to-primary-600 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                🎵 Hire Musicians
              </Link>
              <Link
                href="/instruments"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                🎸 Rent Instruments
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-surface-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
              Two Services, One Platform
            </h2>
            <p className="text-surface-500 dark:text-surface-400 mt-4 max-w-2xl mx-auto">
              Whether you need live performers or instruments, MusicHub has you covered.
            </p>
          </SlideUp>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            <StaggerItem>
              <Link href="/musicians" className="group block">
                <div className="card-hover relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-10 h-72 flex flex-col justify-end text-white">
                  <div className="absolute top-6 right-6 text-8xl opacity-20 group-hover:opacity-30 transition-opacity">🎤</div>
                  <h3 className="text-2xl font-bold mb-2">Hire Musicians</h3>
                  <p className="text-primary-100">
                    Browse talented artists by genre, check availability, and book directly for your events.
                  </p>
                  <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary-200 group-hover:text-white transition-colors">
                    Browse Musicians
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link href="/instruments" className="group block">
                <div className="card-hover relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-600 to-accent-800 p-10 h-72 flex flex-col justify-end text-white">
                  <div className="absolute top-6 right-6 text-8xl opacity-20 group-hover:opacity-30 transition-opacity">🎸</div>
                  <h3 className="text-2xl font-bold mb-2">Rent Instruments</h3>
                  <p className="text-accent-100">
                    Access premium instruments at affordable daily rates with multi-day discounts.
                  </p>
                  <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-accent-200 group-hover:text-white transition-colors">
                    Browse Instruments
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Musicians */}
      {musicians.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SlideUp className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white">Featured Musicians</h2>
                <p className="text-surface-500 mt-2">Top-rated performers ready for your event</p>
              </div>
              <Link href="/musicians" className="hidden sm:inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all">
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </SlideUp>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {musicians.map((m) => (
                <StaggerItem key={m.id}>
                  <MusicianCard {...m} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Featured Instruments */}
      {instruments.length > 0 && (
        <section className="py-24 bg-surface-50 dark:bg-surface-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SlideUp className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-surface-900 dark:text-white">Featured Instruments</h2>
                <p className="text-surface-500 mt-2">Premium instruments available for rent</p>
              </div>
              <Link href="/instruments" className="hidden sm:inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:gap-3 transition-all">
                View All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </SlideUp>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instruments.map((i) => (
                <StaggerItem key={i.id}>
                  <InstrumentCard {...i} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">How It Works</h2>
            <p className="text-surface-500 dark:text-surface-400 mt-4">Simple steps to get started</p>
          </SlideUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Browse & Discover', desc: 'Search musicians by genre or browse our instrument catalog with detailed profiles and specs.' },
              { step: '02', icon: '📋', title: 'Book or Rent', desc: 'Select your dates, review pricing with automatic discounts, and place your order securely.' },
              { step: '03', icon: '🎉', title: 'Enjoy the Music', desc: 'Musicians arrive at your event ready to perform, or your rented instruments are delivered to your door.' },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative text-center p-8 h-full rounded-3xl bg-white dark:bg-surface-800/50 border border-surface-100 dark:border-surface-700/50">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                    Step {item.step}
                  </span>
                  <div className="text-5xl mb-6 mt-2">{item.icon}</div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-surface-500 dark:text-surface-400">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-50 dark:bg-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">What Our Users Say</h2>
          </SlideUp>
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah K.', role: 'Event Planner', text: 'MusicHub made finding a jazz quartet for our gala so easy. The booking process was seamless and the musicians were incredible!' },
              { name: 'Mike R.', role: 'Wedding Planner', text: 'We rented a grand piano and hired a vocalist for a wedding. Both arrived on time and exceeded expectations. 5 stars!' },
              { name: 'David L.', role: 'Music Student', text: 'As a student, renting instruments saves me thousands. The multi-day discounts are amazing and the quality is top-notch.' },
            ].map((t, i) => (
              <StaggerItem key={i}>
                <div className="p-8 h-full rounded-3xl bg-white dark:bg-surface-800/50 border border-surface-100 dark:border-surface-700/50">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-surface-600 dark:text-surface-300 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-surface-900 dark:text-white text-sm">{t.name}</p>
                      <p className="text-xs text-surface-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <SlideUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-6">
            Ready to Make Music?
          </h2>
          <p className="text-lg text-surface-500 dark:text-surface-400 mb-10 max-w-2xl mx-auto">
            Join thousands of event planners and music enthusiasts who trust MusicHub for their musical needs.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl hover:from-primary-700 hover:to-primary-600 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300"
          >
            Get Started Free
          </Link>
        </SlideUp>
      </section>
    </div>
  );
}
