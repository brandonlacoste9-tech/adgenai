import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackComparisonView, trackCTAClick } from '../lib/analytics-tracking';
import { Check, X, AlertTriangle, Shield, TrendingUp, DollarSign } from 'lucide-react';
const comparisons = {
    'adcreative-ai-alternative': {
        title: 'AdCreative.ai Alternative',
        subtitle: 'Transparent pricing, no surprise bills, actual performance focus',
        competitor: {
            name: 'AdCreative.ai',
            logo: '🎨',
            pricing: '$29-$599+/mo (credits)',
            issues: [
                'Surprise billing charges ($339-$400)',
                'Non-existent customer support',
                'Generic, templated output',
                'Restrictive credit system'
            ]
        },
        features: [
            { feature: 'Unlimited Creative Generation', adgen: true, competitor: '10 credits/mo', advantage: 'No artificial limits' },
            { feature: 'Fraud Detection', adgen: true, competitor: false, advantage: 'Save $2,847/month avg' },
            { feature: 'Performance Prediction', adgen: true, competitor: 'Basic', advantage: '94% accuracy' },
            { feature: 'Brand Voice Consistency', adgen: true, competitor: false, advantage: 'AI-trained on your assets' },
            { feature: 'Transparent Billing', adgen: true, competitor: false, advantage: 'No surprise charges ever' },
            { feature: 'White Glove Support', adgen: true, competitor: false, advantage: '24hr response guarantee' }
        ],
        testimonial: {
            name: 'Sarah Chen',
            role: 'Performance Marketing Manager',
            quote: 'After getting burned by AdCreative.ai\'s surprise billing, AdGen AI was a breath of fresh air. The fraud detection alone saved us $3,200 in our first month.',
            savings: '340% ROAS increase'
        },
        cta: {
            primary: 'Start Free Migration',
            secondary: 'See Billing Comparison'
        }
    },
    'creatopy-vs-adgen': {
        title: 'Creatopy vs AdGen AI',
        subtitle: 'Keep the design polish, gain the performance intelligence',
        competitor: {
            name: 'Creatopy',
            logo: '🎭',
            pricing: '$36-$249+/mo',
            issues: [
                'No performance analytics',
                'Slow export times (45+ seconds)',
                'No product feed integration',
                'Key features gated behind expensive tiers'
            ]
        },
        features: [
            { feature: 'Design Tools', adgen: true, competitor: true, advantage: 'Plus performance optimization' },
            { feature: 'Performance Analytics', adgen: true, competitor: false, advantage: 'Real-time ROI tracking' },
            { feature: 'Product Feed Integration', adgen: true, competitor: false, advantage: 'Dynamic catalog ads' },
            { feature: 'Export Speed', adgen: '< 5 seconds', competitor: '45+ seconds', advantage: '9x faster workflow' },
            { feature: 'Team Collaboration', adgen: 'All plans', competitor: 'Plus tier only', advantage: 'No feature gates' },
            { feature: 'A/B Testing', adgen: true, competitor: false, advantage: 'Automated optimization' }
        ],
        testimonial: {
            name: 'Marcus Rodriguez',
            role: 'Creative Director',
            quote: 'Creatopy was great for design, but we needed performance data. AdGen AI gives us both beautiful creatives AND the analytics to prove they work.',
            savings: '156% CTR improvement'
        },
        cta: {
            primary: 'Upgrade Your Workflow',
            secondary: 'Compare Features'
        }
    },
    'smartly-io-pricing': {
        title: 'Smartly.io Pricing Alternative',
        subtitle: 'Enterprise features at startup prices - 80% cost reduction',
        competitor: {
            name: 'Smartly.io',
            logo: '🏢',
            pricing: '$2,500-$5,000+/mo',
            issues: [
                'Extremely expensive pricing',
                '90-day implementation time',
                'Steep learning curve',
                'Overkill for most companies'
            ]
        },
        features: [
            { feature: 'Creative Generation', adgen: true, competitor: true, advantage: 'Simpler workflow' },
            { feature: 'Cross-Platform Management', adgen: true, competitor: true, advantage: '80% less cost' },
            { feature: 'Performance Analytics', adgen: true, competitor: true, advantage: 'Easier to use' },
            { feature: 'Setup Time', adgen: '24 hours', competitor: '90 days', advantage: '90x faster deployment' },
            { feature: 'Monthly Cost', adgen: '$500', competitor: '$2,500+', advantage: '80% savings' },
            { feature: 'Learning Curve', adgen: 'Intuitive', competitor: 'Complex', advantage: 'No consultants needed' }
        ],
        testimonial: {
            name: 'Emily Watson',
            role: 'Marketing Director',
            quote: 'We were paying $2,800/month for Smartly.io and getting the same results we now get with AdGen AI for $500. The ROI is incredible.',
            savings: '82% cost reduction'
        },
        cta: {
            primary: 'Start Enterprise Pilot',
            secondary: 'Calculate Savings'
        }
    }
};
export const ComparisonPage = () => {
    const { slug } = useParams();
    const data = slug ? comparisons[slug] : null;
    useEffect(() => {
        if (data) {
            trackComparisonView(data.competitor.name);
        }
    }, [data]);
    if (!data) {
        return _jsx("div", { className: "min-h-screen pt-20 flex items-center justify-center", children: _jsx("h1", { className: "text-2xl text-gray-600", children: "Comparison not found" }) });
    }
    const getIcon = (value) => {
        if (value === true || (typeof value === 'string' && !value.includes('false') && !value.includes('No'))) {
            return _jsx(Check, { className: "w-5 h-5 text-success-600" });
        }
        if (value === false || (typeof value === 'string' && (value.includes('false') || value.includes('No')))) {
            return _jsx(X, { className: "w-5 h-5 text-error-500" });
        }
        return _jsx(AlertTriangle, { className: "w-5 h-5 text-warning-500" });
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-5" }), _jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-success-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float", style: { animationDelay: '3s' } }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "text-center mb-16", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: data.title }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: data.subtitle })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2 }, className: "bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-3xl p-8 mb-12 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" }), _jsxs("h2", { className: "text-2xl font-bold text-red-900 mb-6 flex items-center", children: [_jsx(AlertTriangle, { className: "w-6 h-6 mr-3 animate-bounce-gentle" }), "Why Customers Are Leaving ", data.competitor.name] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: data.competitor.issues.map((issue, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, className: "flex items-start space-x-3 p-3 bg-white/50 rounded-xl hover:bg-white/80 transition-all duration-300", children: [_jsx(X, { className: "w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-red-800", children: issue })] }, index))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, className: "bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-100 hover:shadow-3xl transition-all duration-500", children: [_jsx("div", { className: "bg-gray-50 px-6 py-4", children: _jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Feature Comparison" }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-900", children: "Feature" }), _jsx("th", { className: "px-6 py-4 text-center text-sm font-semibold text-primary-600", children: "AdGen AI" }), _jsx("th", { className: "px-6 py-4 text-center text-sm font-semibold text-gray-600", children: data.competitor.name }), _jsx("th", { className: "px-6 py-4 text-center text-sm font-semibold text-success-600", children: "Advantage" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100", children: data.features.map((row, index) => (_jsxs(motion.tr, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: index * 0.05 }, className: "hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-transparent transition-all duration-300 hover:scale-105", children: [_jsx("td", { className: "px-6 py-4 text-sm font-medium text-gray-900", children: row.feature }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [getIcon(row.adgen), _jsx("span", { className: "text-sm font-medium text-primary-600 animate-pulse-slow", children: typeof row.adgen === 'boolean' ? (row.adgen ? 'Yes' : 'No') : row.adgen })] }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [getIcon(row.competitor), _jsx("span", { className: "text-sm text-gray-600", children: typeof row.competitor === 'boolean' ? (row.competitor ? 'Yes' : 'No') : row.competitor })] }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("span", { className: "text-sm font-medium text-success-600", children: row.advantage }) })] }, index))) })] }) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.6 }, className: "bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden animate-glow", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-gradient-x" }), _jsx("div", { className: "max-w-4xl mx-auto text-center", children: _jsxs("div", { className: "relative z-10", children: [_jsxs("blockquote", { className: "text-xl mb-6", children: ["\"", data.testimonial.quote, "\""] }), _jsxs("div", { className: "flex items-center justify-center space-x-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: data.testimonial.name }), _jsx("p", { className: "opacity-90", children: data.testimonial.role })] }), _jsx("div", { className: "bg-white/20 px-4 py-2 rounded-lg", children: _jsx("p", { className: "font-bold", children: data.testimonial.savings }) })] })] }) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.8 }, className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12", children: [_jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center", children: [_jsx(Shield, { className: "w-12 h-12 text-success-600 mx-auto mb-4 animate-bounce-gentle" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "90-Day Performance Guarantee" }), _jsx("p", { className: "text-gray-600", children: "See measurable improvement or get your money back" })] }), _jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center", children: [_jsx(TrendingUp, { className: "w-12 h-12 text-primary-600 mx-auto mb-4 animate-bounce-gentle", style: { animationDelay: '0.2s' } }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "White Glove Migration" }), _jsx("p", { className: "text-gray-600", children: "We'll migrate all your assets and data for free" })] }), _jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center", children: [_jsx(DollarSign, { className: "w-12 h-12 text-warning-600 mx-auto mb-4 animate-bounce-gentle", style: { animationDelay: '0.4s' } }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Transparent Pricing" }), _jsx("p", { className: "text-gray-600", children: "No hidden fees, no surprise charges, ever" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 1.0 }, className: "text-center", children: _jsxs("div", { className: "bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden animate-glow", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-gradient-x" }), _jsxs("div", { className: "relative z-10", children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "Ready to Make the Switch?" }), _jsxs("p", { className: "text-xl opacity-90 mb-8", children: ["Join thousands of marketers who've left ", data.competitor.name, " for better results"] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx("button", { onClick: () => trackCTAClick('primary_migration', data.competitor.name), "data-track": "primary-cta-migration", className: "bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 shimmer", children: data.cta.primary }), _jsx("button", { onClick: () => trackCTAClick('secondary_comparison', data.competitor.name), "data-track": "secondary-cta-comparison", className: "border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105", children: data.cta.secondary })] })] })] }) })] })] }));
};
