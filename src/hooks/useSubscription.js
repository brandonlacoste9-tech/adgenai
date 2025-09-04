import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
export const useSubscription = () => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                setLoading(true);
                setError(null);
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setSubscription(null);
                    setLoading(false);
                    return;
                }
                // First check if profile exists
                const { data: existingProfile, error: fetchError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                if (fetchError && fetchError.code === 'PGRST116') {
                    // Profile doesn't exist, create it
                    const { data: newProfile, error: createError } = await supabase
                        .from('profiles')
                        .insert({
                        id: user.id,
                        email: user.email,
                        full_name: user.user_metadata?.full_name || null,
                        subscription_status: 'free',
                        plan_type: 'free',
                    })
                        .select()
                        .single();
                    if (createError) {
                        throw createError;
                    }
                    setSubscription(newProfile);
                }
                else if (fetchError) {
                    throw fetchError;
                }
                else {
                    setSubscription(existingProfile);
                }
            }
            catch (err) {
                console.error('Subscription fetch error:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
            }
            finally {
                setLoading(false);
            }
        };
        fetchSubscription();
        // Listen for auth changes
        const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
                fetchSubscription();
            }
        });
        // Listen for real-time subscription updates
        const subscriptionChannel = supabase
            .channel('subscription-updates')
            .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
        }, (payload) => {
            console.log('Real-time subscription update:', payload);
            if (payload.new && subscription && payload.new.id === subscription.id) {
                setSubscription(payload.new);
            }
        })
            .subscribe();
        return () => {
            authSubscription.unsubscribe();
            subscriptionChannel.unsubscribe();
        };
    }, []);
    const refreshSubscription = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                if (error)
                    throw error;
                setSubscription(data);
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to refresh subscription');
        }
        finally {
            setLoading(false);
        }
    };
    return {
        subscription,
        loading,
        error,
        refreshSubscription,
        isPro: subscription?.plan_type === 'pro',
        isEnterprise: subscription?.plan_type === 'enterprise',
        isPaid: subscription?.plan_type !== 'free',
        isActive: subscription?.subscription_status === 'active',
        isPastDue: subscription?.subscription_status === 'past_due',
        isCancelled: subscription?.subscription_status === 'cancelled',
    };
};
