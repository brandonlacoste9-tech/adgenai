import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
export const CompetitorComparison = () => {
    const features = [
        {
            feature: 'Core Creative Generation',
            adgenAi: 'Unlimited',
            adcreativeAi: '10 Credits/mo',
            creatopy: 'Unlimited',
            smartly: 'Unlimited',
        },
        {
            feature: 'Fraud Detection',
            adgenAi: '✓ Built-in',
            adcreativeAi: '✗ None',
            creatopy: '✗ None',
            smartly: '✗ Separate Tool',
        },
        {
            feature: 'Performance Prediction',
            adgenAi: '✓ AI-Powered',
            adcreativeAi: '✓ Basic',
            creatopy: '✗ None',
            smartly: '✓ Advanced',
        },
        {
            feature: 'Attribution Analysis',
            adgenAi: '✓ Multi-Touch',
            adcreativeAi: '✗ None',
            creatopy: '✗ None',
            smartly: '✓ Advanced',
        },
        {
            feature: 'Brand Voice Consistency',
            adgenAi: '✓ AI-Trained',
            adcreativeAi: '⚠ Limited',
            creatopy: '✓ Good',
            smartly: '✓ Advanced',
        },
        {
            feature: 'Pricing (Starting)',
            adgenAi: 'Free / $15/mo',
            adcreativeAi: '$29/mo',
            creatopy: '$36/mo',
            smartly: '$2,500+/mo',
        },
        {
            feature: 'Customer Support',
            adgenAi: 'White Glove',
            adcreativeAi: '⚠ Poor Reviews',
            creatopy: 'Standard',
            smartly: 'Dedicated Manager',
        },
    ];
    const getIcon = (value) => {
        if (value.includes('✓'))
            return _jsx(Check, { className: "w-5 h-5 text-success-600" });
        if (value.includes('✗'))
            return _jsx(X, { className: "w-5 h-5 text-error-500" });
        if (value.includes('⚠'))
            return _jsx(AlertTriangle, { className: "w-5 h-5 text-warning-500" });
        return null;
    };
    return (_jsx("section", { className: "py-20 bg-gray-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Why AdGen AI Dominates the Competition" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "A comprehensive comparison showing how we deliver enterprise features at startup prices while competitors struggle with basic reliability." })] }), _jsx("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 text-left text-sm font-semibold text-gray-900", children: "Feature" }), _jsx("th", { className: "px-6 py-4 text-center text-sm font-semibold text-primary-600 animate-gradient-x", children: "AdGen AI" }), _jsx("th", { className: "px-6 py-4 text-center text-sm font-semibold text-gray-600", children: "AdCreative.ai" }), _jsx("th", { className: "px-6 py-4 text-center text-sm font-semibold text-gray-600", children: "Creatopy" }), _jsx("th", { className: "px-6 py-4 text-center text-sm font-semibold text-gray-600", children: "Smartly.io" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100", children: features.map((row, index) => (_jsxs("tr", { className: "hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-transparent transition-all duration-300 hover:scale-105", children: [_jsx("td", { className: "px-6 py-4 text-sm font-medium text-gray-900", children: row.feature }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [getIcon(row.adgenAi), _jsx("span", { className: "text-sm font-medium text-primary-600 animate-pulse-slow", children: row.adgenAi.replace(/[✓✗⚠]/g, '').trim() })] }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [getIcon(row.adcreativeAi), _jsx("span", { className: "text-sm text-gray-600", children: row.adcreativeAi.replace(/[✓✗⚠]/g, '').trim() })] }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [getIcon(row.creatopy), _jsx("span", { className: "text-sm text-gray-600", children: row.creatopy.replace(/[✓✗⚠]/g, '').trim() })] }) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [getIcon(row.smartly), _jsx("span", { className: "text-sm text-gray-600", children: row.smartly.replace(/[✓✗⚠]/g, '').trim() })] }) })] }, index))) })] }) }) }), _jsx("div", { className: "mt-12 text-center", children: _jsxs("div", { className: "bg-primary-600 text-white p-6 rounded-xl max-w-2xl mx-auto", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "Ready to Switch?" }), _jsx("p", { className: "mb-4", children: "Join thousands of marketers who've left overpriced, unreliable competitors" }), _jsx("button", { className: "bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors", children: "Start Your Free Migration" })] }) })] }) }));
};
