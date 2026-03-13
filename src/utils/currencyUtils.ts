export function convertToPLN(amount: number, currency: string, rates: Record<string, number>): number {
  const rate = rates[currency] || 1;
  return amount * rate;
}

export function formatCurrency(amount: number, currency: string = "PLN"): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
