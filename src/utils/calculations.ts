import { Subscription } from "../features/subscriptions/types/Subscription";
import { convertToPLN } from "./currencyUtils";

export function calculateMonthlyCost(subscriptions: Subscription[], rates: Record<string, number>): number {
  return subscriptions.reduce((total, sub) => {
    const amountInPLN = convertToPLN(sub.price, sub.currency, rates);
    if (sub.billingCycle === "monthly") {
      return total + amountInPLN;
    } else if (sub.billingCycle === "yearly") {
      return total + (amountInPLN / 12);
    }
    return total;
  }, 0);
}

export function calculateYearlyCost(subscriptions: Subscription[], rates: Record<string, number>): number {
  return subscriptions.reduce((total, sub) => {
    const amountInPLN = convertToPLN(sub.price, sub.currency, rates);
    if (sub.billingCycle === "monthly") {
      return total + (amountInPLN * 12);
    } else if (sub.billingCycle === "yearly") {
      return total + amountInPLN;
    }
    return total;
  }, 0);
}
