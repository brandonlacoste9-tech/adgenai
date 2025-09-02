import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const STRIPE_PRICE_IDS = {
  pro: 'price_1234567890', // Replace with your actual Stripe Price ID for Pro plan
  enterprise: 'price_0987654321', // Replace with your actual Stripe Price ID for Enterprise plan
} as const;

export type PlanType = keyof typeof STRIPE_PRICE_IDS;

export interface SubscriptionData {
  priceId: string;
  planName: string;
  amount: number;
  interval: 'month' | 'year';
}

export const SUBSCRIPTION_PLANS: Record<PlanType, SubscriptionData> = {
  pro: {
    priceId: STRIPE_PRICE_IDS.pro,
    planName: 'Pro',
    amount: 1500, // $15.00 in cents
    interval: 'month',
  },
  enterprise: {
    priceId: STRIPE_PRICE_IDS.enterprise,
    planName: 'Enterprise',
    amount: 50000, // $500.00 in cents
    interval: 'month',
  },
};