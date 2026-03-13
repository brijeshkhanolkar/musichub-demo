'use client';

import { useState, useEffect } from 'react';
import { calculateRentalPrice } from '@/lib/discount';

interface RentalCalculatorProps {
  pricePerDay: number;
  onCalculate?: (data: { days: number; total: number; discount: number; startDate: string; endDate: string }) => void;
}

export default function RentalCalculator({ pricePerDay, onCalculate }: RentalCalculatorProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [calculation, setCalculation] = useState<ReturnType<typeof calculateRentalPrice> & { days: number } | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        const result = calculateRentalPrice(pricePerDay, days);
        setCalculation({ ...result, days });
        onCalculate?.({ days, total: result.total, discount: result.discount, startDate, endDate });
      } else {
        setCalculation(null);
      }
    }
  }, [startDate, endDate, pricePerDay, onCalculate]);

  const discountTiers = [
    { days: '3-6 days', discount: '5% off' },
    { days: '7-13 days', discount: '10% off' },
    { days: '14-29 days', discount: '15% off' },
    { days: '30+ days', discount: '20% off' },
  ];

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Start Date
          </label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            End Date
          </label>
          <input
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Discount Tiers */}
      <div className="bg-primary-50 dark:bg-primary-500/10 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-primary-700 dark:text-primary-400 mb-3">
          📦 Multi-Day Discounts
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {discountTiers.map(tier => (
            <div
              key={tier.days}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                calculation && tier.discount.includes(`${calculation.discount}%`) 
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                  : 'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-400'
              }`}
            >
              <span className="block">{tier.days}</span>
              <span className="font-bold">{tier.discount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calculation Result */}
      {calculation && calculation.days > 0 && (
        <div className="bg-white dark:bg-surface-800 rounded-xl border-2 border-primary-200 dark:border-primary-500/30 p-5 space-y-3 animate-fade-in-up">
          <div className="flex justify-between text-sm">
            <span className="text-surface-500">Rate</span>
            <span className="font-medium text-surface-700 dark:text-surface-300">${pricePerDay} × {calculation.days} days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-surface-500">Subtotal</span>
            <span className="font-medium text-surface-700 dark:text-surface-300">${calculation.subtotal.toFixed(2)}</span>
          </div>
          {calculation.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-success font-medium">Discount ({calculation.discount}%)</span>
              <span className="font-medium text-success">-${calculation.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-3 border-t border-surface-100 dark:border-surface-700 flex justify-between">
            <span className="text-lg font-bold text-surface-900 dark:text-white">Total</span>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${calculation.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
