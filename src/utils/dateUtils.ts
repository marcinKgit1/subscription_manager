import { differenceInDays, parseISO, isBefore, startOfDay } from "date-fns";

export function getDaysUntilPayment(nextPaymentDate: string): number {
  const today = startOfDay(new Date());
  const paymentDate = startOfDay(parseISO(nextPaymentDate));
  
  if (isBefore(paymentDate, today)) {
    return differenceInDays(paymentDate, today); // Will be negative
  }
  return differenceInDays(paymentDate, today);
}

export function getPaymentStatus(daysUntilPayment: number): "normal" | "warning" | "urgent" | "overdue" {
  if (daysUntilPayment < 0) return "overdue";
  if (daysUntilPayment <= 3) return "urgent";
  if (daysUntilPayment <= 7) return "warning";
  return "normal";
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (e) {
    return dateString;
  }
}
