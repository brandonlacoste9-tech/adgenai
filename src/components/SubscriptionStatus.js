import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { useSubscription } from '../hooks/useSubscription';
import { CheckoutButton } from './CheckoutButton';
import { STRIPE_PRICE_IDS } from '../lib/stripe';
import { CheckCircle, AlertTriangle, XCircle, Crown, Building, Zap, ArrowRight, Shield, Star, CreditCard, Calendar } from 'lucide-react';
export const SubscriptionStatus = () => {
    const { subscription, loading, isPro, isEnterprise, isPaid } = useSubscription();
    if (loading) {
        return (_jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: _jsxs("div", { className: "animate-pulse flex space-x-4", children: [_jsx("div", { className: "rounded-full bg-gray-200 h-12 w-12" }), _jsxs("div", { className: "flex-1 space-y-3 py-1", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2" })] })] }) }));
    }
    if (!subscription) {
        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-gradient-to-r from-warning-50 to-warning-100 border-2 border-warning-200 rounded-2xl p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "bg-warning-200 p-3 rounded-xl", children: _jsx(AlertTriangle, { className: "w-6 h-6 text-warning-700" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-warning-900 font-semibold text-lg", children: "Authentication Required" }), _jsx("p", { className: "text-warning-800", children: "Please sign in to view your subscription status and access premium features" })] })] }), _jsx("button", { className: "btn-primary", children: "Sign In" })] }) }));
    }
    const getStatusIcon = () => {
        switch (subscription.subscription_status) {
            case 'active':
                return _jsx(CheckCircle, { className: "w-6 h-6 text-success-600" });
            case 'past_due':
                return _jsx(AlertTriangle, { className: "w-6 h-6 text-warning-600" });
            case 'cancelled':
                return _jsx(XCircle, { className: "w-6 h-6 text-error-500" });
            default:
                return _jsx(Zap, { className: "w-6 h-6 text-gray-500" });
        }
    };
    const getPlanIcon = () => {
        if (isEnterprise)
            return _jsx(Building, { className: "w-8 h-8 text-warning-600" });
        if (isPro)
            return _jsx(Crown, { className: "w-8 h-8 text-primary-600" });
        return _jsx(Zap, { className: "w-8 h-8 text-gray-500" });
    };
    const getStatusColor = () => {
        switch (subscription.subscription_status) {
            case 'active':
                return 'from-success-50 to-success-100 border-success-200';
            case 'past_due':
                return 'from-warning-50 to-warning-100 border-warning-200';
            case 'cancelled':
                return 'from-error-50 to-error-100 border-error-200';
            default:
                return 'from-gray-50 to-gray-100 border-gray-200';
        }
    };
    const getPlanFeatures = () => {
        if (isEnterprise) {
            return ['Unlimited everything', 'Dedicated manager', 'API access', 'Priority support'];
        }
        if (isPro) {
            return ['100 fraud scans/month', 'Performance predictions', 'A/B testing', 'Email support'];
        }
        return ['Basic generation', '5 predictions/month', 'Community support'];
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: `bg-gradient-to-r ${getStatusColor()} border-2 rounded-2xl p-6 shadow-lg`, children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "bg-white/90 p-3 rounded-xl shadow-lg animate-scale-pulse backdrop-blur-sm", children: getPlanIcon() }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-3 mb-1", children: [_jsxs("h3", { className: "text-2xl font-bold text-gray-900 capitalize text-shadow", children: [subscription.plan_type, " Plan"] }), isPaid && _jsx(Star, { className: "w-5 h-5 text-yellow-500 fill-current animate-bounce-gentle" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [getStatusIcon(), _jsx("span", { className: "text-sm font-medium text-gray-700 capitalize", children: subscription.subscription_status }), subscription.subscription_status === 'active' && (_jsx("span", { className: "text-xs bg-success-200 text-success-800 px-2 py-1 rounded-full animate-pulse-slow", children: "Active" }))] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [subscription.plan_type === 'pro' ? '$15' :
                                        subscription.plan_type === 'enterprise' ? '$500' : '$0', _jsx("span", { className: "text-sm font-normal text-gray-600", children: "/month" })] }), subscription.subscription_created_at && (_jsxs("p", { className: "text-xs text-gray-500 flex items-center", children: [_jsx(Calendar, { className: "w-3 h-3 mr-1" }), "Since ", new Date(subscription.subscription_created_at).toLocaleDateString()] }))] })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: getPlanFeatures().map((feature, index) => (_jsx("div", { className: "bg-white/70 backdrop-blur-md rounded-lg p-3 text-center hover:bg-white/80 hover:scale-105 transition-all duration-300 border border-white/20", children: _jsx("p", { className: "text-xs text-gray-700 font-medium", children: feature }) }, index))) }), subscription.subscription_status === 'past_due' && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-warning-100 border border-warning-300 rounded-xl p-4 mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(CreditCard, { className: "w-5 h-5 text-warning-700" }), _jsxs("div", { children: [_jsx("p", { className: "text-warning-900 font-semibold", children: "Payment Issue Detected" }), _jsx("p", { className: "text-warning-800 text-sm", children: "Your payment is past due. Please update your payment method to continue using premium features." })] })] }), _jsx("button", { className: "mt-3 bg-warning-600 hover:bg-warning-700 text-white px-4 py-2 rounded-lg font-medium transition-colors", children: "Update Payment Method" })] })), subscription.subscription_status === 'cancelled' && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-error-100 border border-error-300 rounded-xl p-4 mb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(XCircle, { className: "w-5 h-5 text-error-700" }), _jsxs("div", { children: [_jsx("p", { className: "text-error-900 font-semibold", children: "Subscription Cancelled" }), _jsx("p", { className: "text-error-800 text-sm", children: "Your subscription has been cancelled. Resubscribe to regain access to premium features." })] })] }), _jsx("button", { className: "bg-error-600 hover:bg-error-700 text-white px-4 py-2 rounded-lg font-medium transition-colors", children: "Resubscribe" })] }) })), subscription.plan_type === 'free' && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-bold mb-2", children: "Unlock Advanced Features" }), _jsx("p", { className: "text-sm opacity-90 mb-4", children: "Get fraud detection, unlimited predictions, and A/B testing" }), _jsxs("div", { className: "flex items-center space-x-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Shield, { className: "w-4 h-4" }), _jsx("span", { children: "Fraud Protection" })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "w-4 h-4" }), _jsx("span", { children: "Performance Boost" })] })] })] }), _jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(CheckoutButton, { priceId: STRIPE_PRICE_IDS.pro, planName: "Pro", className: "bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors", children: "Upgrade to Pro" }), _jsx("a", { href: "/pricing", className: "text-center text-xs text-white/80 hover:text-white", children: "View all plans" })] })] }) })), isPro && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl p-4 text-white", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-bold mb-1", children: "Ready for Enterprise?" }), _jsx("p", { className: "text-sm opacity-90", children: "Unlimited everything + dedicated support" })] }), _jsx(CheckoutButton, { priceId: STRIPE_PRICE_IDS.enterprise, planName: "Enterprise", className: "bg-white text-warning-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm", children: "Upgrade" })] }) }))] }));
};
