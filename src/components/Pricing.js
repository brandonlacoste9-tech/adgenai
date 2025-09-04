import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckoutButton } from './CheckoutButton';
import { STRIPE_PRICE_IDS } from '../lib/stripe';
import { Check, Zap, Crown, Building, Star, Shield, ArrowRight, X } from 'lucide-react';
export const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const plans = [
        {
            name: 'Free',
            price: '$0',
            originalPrice: null,
            period: 'forever',
            description: 'Perfect for getting started with AI ad creation',
            icon: Zap,
            iconColor: 'text-gray-600',
            bgColor: 'bg-gray-100',
            features: [
                'Unlimited basic ad generation',
                '5 performance predictions/month',
                '1 brand kit',
                'Community support',
                'Basic templates library',
                'Standard export formats'
            ],
            limitations: [
                'No fraud detection',
                'No attribution analysis',
                'No automated A/B testing',
                'No priority support'
            ],
            cta: 'Start Free',
            stripeAction: null,
            popular: false,
            badge: null
        },
        {
            name: 'Pro',
            price: billingCycle === 'monthly' ? '$15' : '$150',
            originalPrice: billingCycle === 'yearly' ? '$180' : null,
            period: billingCycle === 'monthly' ? 'per month' : 'per year',
            description: 'For growing businesses and agencies',
            icon: Crown,
            iconColor: 'text-primary-600',
            bgColor: 'bg-primary-100',
            features: [
                'Everything in Free',
                '100 fraud scans/month',
                'Unlimited performance predictions',
                'Basic attribution models',
                '10 automated A/B tests/month',
                '5 brand kits',
                '3 team seats',
                'Email & chat support',
                'White glove migration',
                'Advanced export formats',
                'API access (limited)'
            ],
            limitations: [],
            cta: 'Start Pro Trial',
            stripeAction: 'pro',
            popular: true,
            badge: 'Most Popular'
        },
        {
            name: 'Enterprise',
            price: billingCycle === 'monthly' ? '$500' : '$5,000',
            originalPrice: billingCycle === 'yearly' ? '$6,000' : null,
            period: billingCycle === 'monthly' ? 'per month' : 'per year',
            description: 'For large teams requiring advanced features',
            icon: Building,
            iconColor: 'text-warning-600',
            bgColor: 'bg-warning-100',
            features: [
                'Everything in Pro',
                'Unlimited fraud detection',
                'Advanced attribution models',
                'Unlimited automated A/B testing',
                'Unlimited brand kits',
                'Unlimited team seats',
                'Dedicated account manager',
                'Custom onboarding & training',
                'Full API access',
                'Priority support (2hr response)',
                'Custom integrations',
                'White-label options'
            ],
            limitations: [],
            cta: 'Start Enterprise Trial',
            stripeAction: 'enterprise',
            popular: false,
            badge: 'Best Value'
        }
    ];
    return (_jsxs("section", { className: "py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-5" }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6", children: ["Enterprise Features at", ' ', _jsx("span", { className: "gradient-text", children: "Startup Prices" })] }), _jsxs("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto mb-8", children: ["Transparent, predictable pricing with no hidden fees or surprise charges.", _jsx("span", { className: "font-semibold text-success-600", children: "90-day performance guarantee" }), " included."] })] }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 0.2 }, className: "inline-flex items-center bg-white rounded-xl p-1 shadow-lg border border-gray-200 mb-12", children: [_jsx("div", { onClick: () => setBillingCycle('monthly'), className: `px-6 py-3 rounded-lg font-medium transition-all duration-200 ${billingCycle === 'monthly'
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-gray-600 hover:text-gray-900'}`, children: "Monthly" }), _jsxs("div", { onClick: () => setBillingCycle('yearly'), className: `px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${billingCycle === 'yearly'
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-gray-600 hover:text-gray-900'}`, children: ["Yearly", _jsx("span", { className: "absolute -top-2 -right-2 bg-success-500 text-white text-xs px-2 py-1 rounded-full", children: "Save 17%" })] })] })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16", children: plans.map((plan, index) => {
                            const Icon = plan.icon;
                            return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: index * 0.1 }, className: `relative rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-2xl ${plan.popular
                                    ? 'border-primary-500 shadow-3xl scale-105 bg-gradient-to-br from-white to-primary-50 neon-glow animate-glow'
                                    : 'border-gray-200 shadow-lg bg-white hover:border-primary-300 hover:shadow-3xl hover:scale-105'}`, children: [plan.badge && (_jsx("div", { className: "absolute -top-4 left-1/2 transform -translate-x-1/2", children: _jsx("span", { className: `px-6 py-2 rounded-full text-sm font-bold shadow-2xl animate-bounce-gentle ${plan.popular
                                                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white neon-glow'
                                                : 'bg-gradient-to-r from-warning-500 to-warning-600 text-white warning-glow'}`, children: plan.badge }) })), _jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: `inline-flex p-4 rounded-2xl mb-6 ${plan.bgColor} group-hover:scale-125 transition-transform duration-500 animate-scale-pulse`, children: _jsx(Icon, { className: `w-10 h-10 ${plan.iconColor}` }) }), _jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300", children: plan.name }), _jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-baseline justify-center space-x-2", children: [_jsx("span", { className: "text-5xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300", children: plan.price }), plan.originalPrice && (_jsx("span", { className: "text-xl text-gray-500 line-through", children: plan.originalPrice }))] }), _jsxs("span", { className: "text-gray-600", children: ["/", plan.period] })] }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: plan.description })] }), _jsxs("div", { className: "space-y-4 mb-8", children: [plan.features.map((feature, featureIndex) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3, delay: featureIndex * 0.05 }, className: "flex items-start space-x-3", children: [_jsx(Check, { className: "w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-gray-700", children: feature })] }, featureIndex))), plan.limitations.length > 0 && (_jsxs("div", { className: "pt-4 border-t border-gray-100", children: [_jsx("p", { className: "text-sm text-gray-500 mb-2", children: "Not included:" }), plan.limitations.map((limitation, limitIndex) => (_jsxs("div", { className: "flex items-start space-x-3 mb-2", children: [_jsx(X, { className: "w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-sm text-gray-500", children: limitation })] }, limitIndex)))] }))] }), plan.stripeAction ? (_jsx(CheckoutButton, { priceId: STRIPE_PRICE_IDS[plan.stripeAction], planName: plan.name, className: `w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${plan.popular
                                            ? 'btn-primary shadow-lg hover:shadow-xl'
                                            : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'}`, children: plan.cta })) : (_jsx("button", { className: "w-full py-4 px-6 rounded-xl font-bold text-lg bg-gray-100 hover:bg-gray-200 text-gray-900 transition-all duration-300", children: plan.cta })), plan.name === 'Pro' && (_jsxs("div", { className: "mt-6 text-center", children: [_jsx("div", { className: "bg-success-50 border border-success-200 rounded-lg p-3 mb-3", children: _jsxs("p", { className: "text-success-800 font-medium text-sm flex items-center justify-center", children: [_jsx(Shield, { className: "w-4 h-4 mr-2" }), "90-day performance guarantee"] }) }), _jsxs("a", { href: "/migration", className: "text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center justify-center group", children: ["Need help switching? Get free migration", _jsx(ArrowRight, { className: "w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" })] })] }))] }, plan.name));
                        }) }), _jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, className: "text-center", children: _jsxs("div", { className: "bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" }), _jsxs("div", { className: "relative", children: [_jsx("h3", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Switching from a Competitor?" }), _jsxs("p", { className: "text-xl opacity-90 mb-8 max-w-3xl mx-auto", children: ["Get our ", _jsx("span", { className: "font-bold", children: "White Glove Migration Service" }), " absolutely free. We'll handle the entire transition process and ensure you\\'re set up for success from day one."] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-4", children: [_jsx(Shield, { className: "w-8 h-8 mx-auto mb-2" }), _jsx("h4", { className: "font-semibold mb-1", children: "Asset Migration" }), _jsx("p", { className: "text-sm opacity-90", children: "Transfer all your creatives & data" })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-4", children: [_jsx(Star, { className: "w-8 h-8 mx-auto mb-2" }), _jsx("h4", { className: "font-semibold mb-1", children: "Team Training" }), _jsx("p", { className: "text-sm opacity-90", children: "Get your team up to speed fast" })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-4", children: [_jsx(Crown, { className: "w-8 h-8 mx-auto mb-2" }), _jsx("h4", { className: "font-semibold mb-1", children: "Performance Guarantee" }), _jsx("p", { className: "text-sm opacity-90", children: "90-day improvement promise" })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx("button", { className: "bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group", children: _jsxs("a", { href: "/migration", className: "flex items-center space-x-2", children: [_jsx("span", { children: "Start Free Migration" }), _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })] }) }), _jsx("button", { className: "border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-primary-600 transition-all duration-300", children: _jsx("a", { href: "/compare/adcreative-ai-alternative", className: "block", children: "Compare with AdCreative.ai" }) })] })] })] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.6 }, className: "mt-20", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 text-center mb-8", children: "Frequently Asked Questions" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: [_jsxs("div", { className: "card", children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Can I cancel anytime?" }), _jsx("p", { className: "text-gray-600 text-sm", children: "Yes, cancel anytime with no penalties. Your subscription remains active until the end of your billing period." })] }), _jsxs("div", { className: "card", children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "What's included in migration?" }), _jsx("p", { className: "text-gray-600 text-sm", children: "Complete asset transfer, team training, workflow setup, and 90-day performance guarantee - all free." })] }), _jsxs("div", { className: "card", children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "How does fraud detection work?" }), _jsx("p", { className: "text-gray-600 text-sm", children: "Real-time analysis of traffic patterns, click behavior, and conversion quality to identify and block fraudulent activity." })] }), _jsxs("div", { className: "card", children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Do you offer refunds?" }), _jsx("p", { className: "text-gray-600 text-sm", children: "Yes, 90-day performance guarantee. If you don't see measurable improvement, we'll refund your subscription." })] })] })] })] })] }));
};
