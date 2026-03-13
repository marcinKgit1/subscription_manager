export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
  nextPayment: string; // ISO date string YYYY-MM-DD
  category?: string;
  createdAt: string; // ISO date string
}
