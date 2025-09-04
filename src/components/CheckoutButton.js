import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2, CreditCard, Shield } from 'lucide-react';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
export const CheckoutButton = ({ priceId, planName, className = '', children, userId, userEmail, disabled = false, }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleCheckout = async () => {
        try {
            setLoading(true);
            setError(null);
            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error('Stripe failed to load. Please refresh and try again.');
            }
            // Call Supabase edge function to create checkout session
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({
                    priceId,
                    successUrl: `${window.location.origin}/dashboard?success=true&plan=${planName.toLowerCase()}`,
                    cancelUrl: `${window.location.origin}/pricing?canceled=true`,
                    customerEmail: userEmail,
                    userId,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create checkout session');
            }
            const { sessionId, url } = await response.json();
            if (url) {
                // Direct redirect for better UX
                window.location.href = url;
            }
            else {
                // Fallback to Stripe redirect
                const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
                if (stripeError) {
                    throw stripeError;
                }
            }
        }
        catch (err) {
            console.error('Checkout error:', err);
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "w-full", children: [_jsxs("button", { onClick: handleCheckout, disabled: loading || disabled, className: `${className} ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''} relative overflow-hidden group shimmer`, children: [loading ? (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin text-white" }), _jsx("span", { children: "Processing..." })] })) : (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(CreditCard, { className: "w-4 h-4 group-hover:scale-110 transition-transform duration-300" }), _jsx("span", { children: children })] })), _jsx("div", { className: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" })] }), error && (_jsx("div", { className: "mt-2 text-sm text-error-600 bg-error-50 border border-error-200 rounded-lg p-2", children: error })), _jsxs("div", { className: "mt-2 flex items-center justify-center space-x-1 text-xs text-gray-500", children: [_jsx(Shield, { className: "w-3 h-3" }), _jsx("span", { children: "Secured by Stripe" })] })] }));
};
