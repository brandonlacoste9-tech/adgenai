export interface SubscriptionData {
    id: string;
    email: string | null;
    full_name: string | null;
    subscription_status: 'free' | 'active' | 'cancelled' | 'past_due';
    subscription_id: string | null;
    plan_type: 'free' | 'pro' | 'enterprise';
    subscription_created_at: string | null;
    subscription_updated_at: string | null;
    created_at: string;
    updated_at: string;
}
export declare const useSubscription: () => {
    subscription: SubscriptionData | null;
    loading: boolean;
    error: string | null;
    refreshSubscription: () => Promise<void>;
    isPro: boolean;
    isEnterprise: boolean;
    isPaid: boolean;
    isActive: boolean;
    isPastDue: boolean;
    isCancelled: boolean;
};
