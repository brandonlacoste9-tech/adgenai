import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { TrendingUp, Users, DollarSign, Shield, CheckCircle, ArrowRight } from 'lucide-react';
export const AgencyPartnerOnePager = () => {
    const benefits = [
        {
            icon: TrendingUp,
            title: 'Improve Client Results',
            description: 'Deliver 45% average ROAS improvement with fraud detection and performance prediction',
            metric: '45% avg ROAS boost'
        },
        {
            icon: Users,
            title: 'Scale Your Team',
            description: 'Serve 3x more clients with the same headcount using automated workflows',
            metric: '3x team efficiency'
        },
        {
            icon: DollarSign,
            title: 'Increase Margins',
            description: 'White-label pricing and revenue sharing opportunities',
            metric: '25% commission'
        },
        {
            icon: Shield,
            title: 'Risk-Free Guarantee',
            description: '90-day performance guarantee for all your clients',
            metric: '90-day guarantee'
        }
    ];
    const features = [
        'Unlimited creative generation for all clients',
        'White-label dashboard and reporting',
        'Dedicated account manager',
        'Priority support (2-hour response)',
        'Custom onboarding for your team',
        'Co-marketing opportunities',
        'Revenue sharing program',
        'Client migration assistance'
    ];
    const pricing = [
        {
            tier: 'Agency Starter',
            price: '$99/month',
            description: 'Perfect for boutique agencies',
            limits: 'Up to 5 client accounts',
            features: ['Basic fraud detection', 'Performance prediction', 'Email support']
        },
        {
            tier: 'Agency Pro',
            price: '$299/month',
            description: 'For growing agencies',
            limits: 'Up to 25 client accounts',
            features: ['Full fraud suite', 'Advanced attribution', 'Priority support', 'White-label options'],
            popular: true
        },
        {
            tier: 'Agency Enterprise',
            price: 'Custom',
            description: 'For large agencies',
            limits: 'Unlimited client accounts',
            features: ['Everything in Pro', 'Dedicated success manager', 'Custom integrations', 'Revenue sharing']
        }
    ];
    return (_jsxs("div", { className: "max-w-6xl mx-auto bg-white", children: [_jsxs("div", { className: "bg-gradient-to-r from-primary-600 to-primary-700 text-white p-12 text-center", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Agency Partner Program" }), _jsx("p", { className: "text-xl opacity-90 max-w-3xl mx-auto", children: "Scale your agency with the Full-Stack Marketing Brain. Deliver enterprise results at startup prices while increasing your margins." })] }), _jsxs("div", { className: "p-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 text-center mb-12", children: "Why Top Agencies Choose AdGen AI" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16", children: benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center", children: _jsx(Icon, { className: "w-8 h-8 text-primary-600" }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: benefit.title }), _jsx("p", { className: "text-gray-600 mb-3", children: benefit.description }), _jsx("div", { className: "bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium", children: benefit.metric })] }, index));
                        }) }), _jsxs("div", { className: "bg-gray-50 rounded-2xl p-8 mb-16", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-6 text-center", children: "What's Included in Your Partnership" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: features.map((feature, index) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-success-600 flex-shrink-0" }), _jsx("span", { className: "text-gray-700", children: feature })] }, index))) })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 text-center mb-8", children: "Agency Pricing Tiers" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: pricing.map((plan, index) => (_jsxs("div", { className: `rounded-2xl border-2 p-8 ${plan.popular ? 'border-primary-500 shadow-xl scale-105' : 'border-gray-200'}`, children: [plan.popular && (_jsx("div", { className: "bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium text-center mb-4", children: "Most Popular" })), _jsx("h4", { className: "text-xl font-bold text-gray-900 mb-2", children: plan.tier }), _jsx("div", { className: "text-3xl font-bold text-primary-600 mb-2", children: plan.price }), _jsx("p", { className: "text-gray-600 mb-4", children: plan.description }), _jsx("p", { className: "text-sm text-gray-500 mb-6", children: plan.limits }), _jsx("ul", { className: "space-y-2 mb-8", children: plan.features.map((feature, featureIndex) => (_jsxs("li", { className: "flex items-center space-x-2 text-sm", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-success-600" }), _jsx("span", { children: feature })] }, featureIndex))) }), _jsx("button", { className: `w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.popular
                                                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`, children: plan.price === 'Custom' ? 'Contact Sales' : 'Start Partnership' })] }, index))) })] }), _jsx("div", { className: "bg-primary-600 text-white rounded-2xl p-8 mb-16", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx("h3", { className: "text-2xl font-bold mb-4", children: "Success Story" }), _jsx("blockquote", { className: "text-xl mb-6", children: "\"AdGen AI helped us scale from 12 to 40 clients without hiring additional creatives. Our client retention improved 67% because we're delivering measurably better results.\"" }), _jsxs("div", { className: "flex items-center justify-center space-x-8", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Marcus Rodriguez" }), _jsx("p", { className: "opacity-90", children: "GrowthLab Agency" })] }), _jsx("div", { className: "bg-white/20 px-4 py-2 rounded-lg", children: _jsx("p", { className: "font-bold", children: "67% retention boost" }) })] })] }) }), _jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Ready to Scale Your Agency?" }), _jsx("p", { className: "text-gray-600 mb-8 max-w-2xl mx-auto", children: "Join 50+ agencies already using AdGen AI to deliver better results, serve more clients, and increase their margins." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs("button", { className: "bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2", children: [_jsx("span", { children: "Apply for Partnership" }), _jsx(ArrowRight, { className: "w-5 h-5" })] }), _jsx("button", { className: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold transition-colors", children: "Schedule Demo" })] })] })] })] }));
};
