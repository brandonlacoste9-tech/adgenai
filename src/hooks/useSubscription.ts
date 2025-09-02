import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SubscriptionData {
  id: string;
  subscription_status: 'free' | 'active' | 'cancelled' | 'past_due';
  subscription_id: string | null;
  plan_type: 'free' | 'pro' | 'enterprise';
  subscription_created_at: string | null;
  subscription_updated_at: string | null;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setSubscription(null);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setSubscription(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          fetchSubscription();
        }
      }
    );

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  const refreshSubscription = () => {
    setLoading(true);
    setError(null);
    // Re-trigger the effect
    window.location.reload();
  };

  return {
    subscription,
    loading,
    error,
    refreshSubscription,
    isPro: subscription?.plan_type === 'pro',
    isEnterprise: subscription?.plan_type === 'enterprise',
    isPaid: subscription?.plan_type !== 'free',
  };
};