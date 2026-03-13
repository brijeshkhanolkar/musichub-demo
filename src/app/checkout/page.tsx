'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type'); // 'booking' or 'rental'
  const itemName = searchParams.get('item') || 'Item';
  const total = searchParams.get('total') || '0';
  const [address, setAddress] = useState({ street: '', city: '', zip: '' });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!type) router.push('/');
  }, [type, router]);

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">Order Confirmed!</h1>
          <p className="text-surface-500 mb-8">Thank you for your {type === 'booking' ? 'booking' : 'rental'}. Check your dashboard for updates.</p>
          <button onClick={() => router.push('/dashboard')} className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl font-semibold hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/25 transition-all">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Checkout</h1>
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
              <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-4">
                {type === 'rental' ? 'Delivery Address' : 'Contact Information'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Street Address</label>
                  <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} placeholder="123 Main St"
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">City</label>
                    <input type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="New York"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">ZIP Code</label>
                    <input type="text" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} placeholder="10001"
                      className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="sticky top-28 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-100 dark:border-surface-700/50 p-6">
              <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Item</span>
                  <span className="font-medium text-surface-900 dark:text-white">{itemName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-surface-500">Type</span>
                  <span className="capitalize font-medium text-surface-900 dark:text-white">{type}</span>
                </div>
                <div className="pt-3 border-t border-surface-100 dark:border-surface-700 flex justify-between">
                  <span className="font-bold text-surface-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${total}</span>
                </div>
              </div>
              <button onClick={() => setConfirmed(true)}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/25 transition-all">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
