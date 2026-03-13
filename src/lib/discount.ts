export function calculateDiscount(days: number): number {
  if (days >= 30) return 20;
  if (days >= 14) return 15;
  if (days >= 7) return 10;
  if (days >= 3) return 5;
  return 0;
}

export function calculateRentalPrice(pricePerDay: number, days: number): {
  subtotal: number;
  discount: number;
  discountAmount: number;
  total: number;
} {
  const subtotal = pricePerDay * days;
  const discount = calculateDiscount(days);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount,
    discountAmount: Math.round(discountAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}
