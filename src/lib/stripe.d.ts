export declare const stripePromise: Promise<import("@stripe/stripe-js").Stripe | null>;
export declare const STRIPE_PRICE_IDS: {
    readonly pro: "price_1QdVJhP8mnDdBQuYhvQBQtY1";
    readonly enterprise: "price_1QdVJhP8mnDdBQuYhvQBQtY2";
};
export type PlanType = keyof typeof STRIPE_PRICE_IDS;
export interface SubscriptionData {
    priceId: string;
    planName: string;
    amount: number;
    interval: 'month' | 'year';
    features: string[];
    description: string;
}
export declare const SUBSCRIPTION_PLANS: Record<PlanType, SubscriptionData>;
export declare const formatPrice: (amount: number) => string;
export declare const getPlanDisplayName: (planType: string) => string;
export declare const getPlanPrice: (planType: string) => string;
