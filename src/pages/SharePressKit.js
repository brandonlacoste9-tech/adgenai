import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import TrackShareView from '../components/TrackShareView';
import { Callout } from '../components/Callout';
import { Download, Image, FileText, Users, TrendingUp, Shield, Crown } from 'lucide-react';
export const SharePressKit = () => {
    const assets = [
        {
            type: 'Logo Package',
            description: 'High-resolution logos in PNG, SVG, and vector formats',
            files: ['logo-primary.svg', 'logo-white.svg', 'logo-mark.png'],
            icon: Image
        },
        {
            type: 'Brand Guidelines',
            description: 'Complete brand identity guide with colors, typography, and usage',
            files: ['brand-guidelines.pdf', 'color-palette.pdf'],
            icon: FileText
        },
        {
            type: 'Product Screenshots',
            description: 'High-quality product interface screenshots and demos',
            files: ['dashboard-hero.png', 'analytics-view.png', 'ml-dashboard.png'],
            icon: Image
        },
        {
            type: 'Executive Bios',
            description: 'Founder and leadership team biographies and headshots',
            files: ['founder-bio.pdf', 'team-headshots.zip'],
            icon: Users
        }
    ];
    const keyMetrics = [
        { label: 'Platform Accuracy', value: '95.8%', description: 'ML prediction accuracy' },
        { label: 'Fraud Savings', value: '$2.4M+', description: 'Protected for customers' },
        { label: 'Customer Growth', value: '340%', description: 'Month-over-month' },
        { label: 'Enterprise Adoption', value: '50+', description: 'Fortune 1000 companies' }
    ];
    const factSheet = {
        founded: '2024',
        headquarters: 'San Francisco, CA',
        employees: '25+',
        funding: 'Series A',
        customers: '10,000+',
        markets: 'Global'
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20", children: [_jsx(TrackShareView, { page: "share/press-kit", meta: { tag: 'press-kit-share' } }), _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center mb-12", children: [_jsx("h1", { className: "text-5xl font-bold text-gray-900 mb-4", children: "AdGen AI Press Kit" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Media resources, company information, and key metrics for press coverage" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Company Overview" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "About AdGen AI" }), _jsx("p", { className: "text-gray-700 leading-relaxed mb-4", children: "AdGen AI is the world's first Full-Stack Marketing Brain, combining AI-powered creative generation with integrated fraud detection, performance prediction, and attribution analysis. Unlike competitors that focus solely on design, AdGen AI optimizes for measurable business results." }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: "Founded in 2024, the company has quickly become the preferred alternative to expensive, unreliable competitors like AdCreative.ai and Smartly.io, offering enterprise features at startup prices with transparent billing." })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Company Facts" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(factSheet).map(([key, value]) => (_jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [_jsx("p", { className: "text-sm text-gray-600 capitalize", children: key.replace(/([A-Z])/g, ' $1') }), _jsx("p", { className: "font-bold text-gray-900", children: value })] }, key))) })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8", children: [_jsx("h2", { className: "text-3xl font-bold mb-6 text-center", children: "Key Performance Metrics" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: keyMetrics.map((metric, index) => (_jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center", children: [_jsx("p", { className: "text-3xl font-bold mb-2", children: metric.value }), _jsx("p", { className: "font-semibold mb-1", children: metric.label }), _jsx("p", { className: "text-sm opacity-90", children: metric.description })] }, index))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Media Assets" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: assets.map((asset, index) => {
                                    const Icon = asset.icon;
                                    return (_jsxs("div", { className: "card hover:shadow-xl transition-all duration-300", children: [_jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [_jsx("div", { className: "bg-primary-100 p-3 rounded-xl", children: _jsx(Icon, { className: "w-6 h-6 text-primary-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-900", children: asset.type }), _jsx("p", { className: "text-sm text-gray-600", children: asset.description })] })] }), _jsx("div", { className: "space-y-2 mb-4", children: asset.files.map(file => (_jsxs("div", { className: "flex items-center justify-between p-2 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "text-sm text-gray-700", children: file }), _jsx("button", { className: "text-primary-600 hover:text-primary-700 text-sm font-medium", children: "Download" })] }, file))) }), _jsxs("button", { className: "btn-secondary w-full flex items-center justify-center space-x-2", children: [_jsx(Download, { className: "w-4 h-4" }), _jsx("span", { children: "Download Package" })] })] }, index));
                                }) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Key Messages for Media" }), _jsxs(Callout, { type: "pro", children: [_jsx("strong", { children: "Primary Narrative:" }), " AdGen AI is revolutionizing performance marketing by being the first platform to integrate creative generation with fraud detection, performance prediction, and attribution analysis - delivering enterprise intelligence at startup prices."] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-8", children: [_jsxs("div", { className: "bg-success-50 border border-success-200 rounded-xl p-6", children: [_jsx(Shield, { className: "w-8 h-8 text-success-600 mb-3" }), _jsx("h3", { className: "font-bold text-success-900 mb-2", children: "Fraud Protection Leader" }), _jsx("p", { className: "text-success-800 text-sm", children: "Only AI creative platform with built-in fraud detection, saving customers average $2,847/month" })] }), _jsxs("div", { className: "bg-primary-50 border border-primary-200 rounded-xl p-6", children: [_jsx(Brain, { className: "w-8 h-8 text-primary-600 mb-3" }), _jsx("h3", { className: "font-bold text-primary-900 mb-2", children: "AI Prediction Accuracy" }), _jsx("p", { className: "text-primary-800 text-sm", children: "95.8% accuracy in performance prediction using hybrid DNN + GBDT architecture" })] }), _jsxs("div", { className: "bg-warning-50 border border-warning-200 rounded-xl p-6", children: [_jsx(Target, { className: "w-8 h-8 text-warning-600 mb-3" }), _jsx("h3", { className: "font-bold text-warning-900 mb-2", children: "Market Disruption" }), _jsx("p", { className: "text-warning-800 text-sm", children: "Transparent pricing vs competitor deception - no hidden fees or surprise charges" })] })] }), _jsxs("div", { className: "mt-8 bg-gray-50 rounded-xl p-6", children: [_jsx("h3", { className: "font-bold text-gray-900 mb-4", children: "Media Contact" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-gray-700", children: [_jsx("strong", { children: "Press Inquiries:" }), " press@adgen.ai"] }), _jsxs("p", { className: "text-gray-700", children: [_jsx("strong", { children: "Partnership Inquiries:" }), " partners@adgen.ai"] })] }), _jsxs("div", { children: [_jsxs("p", { className: "text-gray-700", children: [_jsx("strong", { children: "Investor Relations:" }), " investors@adgen.ai"] }), _jsxs("p", { className: "text-gray-700", children: [_jsx("strong", { children: "General:" }), " hello@adgen.ai"] })] })] })] })] })] })] }));
};
