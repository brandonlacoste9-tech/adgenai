import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubscriptionStatus } from './SubscriptionStatus';
import { useSubscription } from '../hooks/useSubscription';
import { Plus, Shield, TrendingUp, Target, AlertTriangle, CheckCircle, X, Eye, Edit, Play, Pause, BarChart3, Users, Calendar, Download, Share2, Filter, Search, SortDesc } from 'lucide-react';
export const Dashboard = () => {
    const [selectedAd, setSelectedAd] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('performance');
    const { isPro, isEnterprise, isPaid, subscription } = useSubscription();
    const mockAds = [
        {
            id: '1',
            title: 'Summer Sale Campaign',
            description: 'High-converting summer promotion for e-commerce with urgency messaging',
            imageUrl: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400',
            platform: 'facebook',
            performanceScore: 92,
            fraudScore: 15,
            status: 'active',
            createdAt: new Date('2025-01-10'),
            metrics: {
                impressions: 125000,
                clicks: 3750,
                conversions: 187,
                ctr: 3.0,
                cpa: 12.50,
                roas: 4.2
            }
        },
        {
            id: '2',
            title: 'Product Launch Teaser',
            description: 'Brand awareness campaign for new product line with social proof',
            imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
            platform: 'instagram',
            performanceScore: 87,
            fraudScore: 8,
            status: 'active',
            createdAt: new Date('2025-01-08'),
            metrics: {
                impressions: 89000,
                clicks: 2670,
                conversions: 134,
                ctr: 3.0,
                cpa: 15.75,
                roas: 3.8
            }
        },
        {
            id: '3',
            title: 'Retargeting Campaign',
            description: 'Cart abandonment recovery with urgency messaging and social proof',
            imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
            platform: 'google',
            performanceScore: 78,
            fraudScore: 45,
            status: 'paused',
            createdAt: new Date('2025-01-05'),
            metrics: {
                impressions: 45000,
                clicks: 900,
                conversions: 27,
                ctr: 2.0,
                cpa: 22.30,
                roas: 2.1
            }
        },
        {
            id: '4',
            title: 'Black Friday Blitz',
            description: 'High-impact promotional campaign with countdown timer',
            imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
            platform: 'tiktok',
            performanceScore: 95,
            fraudScore: 12,
            status: 'completed',
            createdAt: new Date('2024-11-25'),
            metrics: {
                impressions: 234000,
                clicks: 8190,
                conversions: 412,
                ctr: 3.5,
                cpa: 9.80,
                roas: 5.7
            }
        }
    ];
    const getFraudAnalysis = (score) => {
        if (score <= 20) {
            return {
                score,
                riskLevel: 'low',
                factors: ['Clean traffic patterns', 'Verified user behavior', 'Low bot activity', 'High engagement quality'],
                recommendation: 'Campaign is safe to scale. Consider increasing budget allocation.'
            };
        }
        else if (score <= 40) {
            return {
                score,
                riskLevel: 'medium',
                factors: ['Some suspicious activity', 'Mixed traffic quality', 'Moderate bot detection', 'Variable engagement'],
                recommendation: 'Continue with caution. Implement additional targeting filters and monitor closely.'
            };
        }
        else {
            return {
                score,
                riskLevel: 'high',
                factors: ['High bot activity detected', 'Suspicious click patterns', 'Low-quality traffic sources', 'Poor engagement metrics'],
                recommendation: 'Pause campaign immediately. Refine targeting and implement stricter fraud filters.'
            };
        }
    };
    const getPerformancePrediction = (score) => {
        return {
            score,
            expectedCtr: score > 90 ? 3.8 : score > 85 ? 3.2 : score > 70 ? 2.8 : 1.9,
            expectedCpa: score > 90 ? 7.50 : score > 85 ? 10.50 : score > 70 ? 14.75 : 22.90,
            confidence: score > 90 ? 96 : score > 85 ? 91 : score > 70 ? 84 : 72,
            insights: [
                score > 90 ? 'Exceptional visual hierarchy and contrast' : score > 80 ? 'Strong visual hierarchy' : 'Consider improving visual contrast',
                score > 85 ? 'Highly compelling call-to-action' : score > 75 ? 'Good call-to-action placement' : 'CTA could be more prominent',
                score > 80 ? 'Perfect brand alignment and consistency' : score > 70 ? 'Good brand alignment' : 'Ensure stronger brand consistency',
                score > 75 ? 'Optimal text-to-image ratio' : 'Consider adjusting text density'
            ]
        };
    };
    const filteredAds = mockAds
        .filter(ad => filterStatus === 'all' || ad.status === filterStatus)
        .filter(ad => ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
        switch (sortBy) {
            case 'performance': return b.performanceScore - a.performanceScore;
            case 'fraud': return a.fraudScore - b.fraudScore;
            case 'created': return b.createdAt.getTime() - a.createdAt.getTime();
            default: return 0;
        }
    });
    const totalMetrics = mockAds.reduce((acc, ad) => {
        if (ad.metrics) {
            acc.impressions += ad.metrics.impressions;
            acc.clicks += ad.metrics.clicks;
            acc.conversions += ad.metrics.conversions;
            acc.spend += ad.metrics.cpa * ad.metrics.conversions;
        }
        return acc;
    }, { impressions: 0, clicks: 0, conversions: 0, spend: 0 });
    const avgRoas = totalMetrics.spend > 0 ? (totalMetrics.conversions * 50) / totalMetrics.spend : 0;
    const avgPerformanceScore = mockAds.reduce((sum, ad) => sum + ad.performanceScore, 0) / mockAds.length;
    const fraudSavings = mockAds.reduce((sum, ad) => sum + (ad.fraudScore * 50), 0);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: "Campaign Dashboard" }), _jsxs("p", { className: "text-gray-600", children: ["Monitor performance and optimize your ad creatives with AI-powered insights", !isPaid && _jsx("span", { className: "text-primary-600 font-semibold ml-1", children: "- Upgrade for advanced features" })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("button", { className: "btn-secondary flex items-center space-x-2", children: [_jsx(BarChart3, { className: "w-5 h-5" }), _jsx("span", { children: "Analytics" })] }), _jsxs("button", { className: "btn-primary flex items-center space-x-2 group animate-glow", children: [_jsx(Plus, { className: "w-5 h-5 group-hover:rotate-90 transition-transform duration-300" }), _jsx("span", { children: "Generate New Ad" })] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: _jsx(SubscriptionStatus, {}) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx("div", { className: "metric-card group", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Total ROAS" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900", children: [avgRoas.toFixed(1), "x"] }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +12% vs last month" }), !isPaid && _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Limited tracking" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300", children: _jsx(TrendingUp, { className: "w-8 h-8 text-success-600" }) })] }) }), _jsx("div", { className: "metric-card group", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Performance Score" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: avgPerformanceScore.toFixed(0) }), _jsx("p", { className: "text-xs text-primary-600 font-medium", children: "\u2197 +8 points this week" }), !isPro && !isEnterprise && _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "5/month limit" })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300", children: _jsx(Target, { className: "w-8 h-8 text-primary-600" }) })] }) }), _jsx("div", { className: "metric-card group", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Fraud Savings" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900 animate-scale-pulse", children: ["$", fraudSavings.toLocaleString()] }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "Protected this month" }), !isPaid && _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Pro feature" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300", children: _jsx(Shield, { className: "w-8 h-8 text-success-600 animate-bounce-gentle" }) })] }) }), _jsx("div", { className: "metric-card group", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Active Campaigns" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: mockAds.filter(ad => ad.status === 'active').length }), _jsxs("p", { className: "text-xs text-gray-600", children: ["of ", mockAds.length, " total"] })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300", children: _jsx(CheckCircle, { className: "w-8 h-8 text-primary-600" }) })] }) })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-4 items-center justify-between", children: [_jsx("div", { className: "flex items-center space-x-4 w-full lg:w-auto", children: _jsxs("div", { className: "relative flex-1 lg:flex-none lg:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search campaigns...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200" })] }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "paused", children: "Paused" }), _jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "draft", children: "Draft" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent", children: [_jsx("option", { value: "performance", children: "Sort by Performance" }), _jsx("option", { value: "created", children: "Sort by Date" }), _jsx("option", { value: "fraud", children: "Sort by Fraud Risk" })] })] })] }) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 }, className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8", children: _jsx(AnimatePresence, { children: filteredAds.map((ad, index) => {
                            const fraudAnalysis = getFraudAnalysis(ad.fraudScore);
                            const performancePrediction = getPerformancePrediction(ad.performanceScore);
                            return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.4, delay: index * 0.1 }, className: "card group cursor-pointer hover:shadow-3xl hover:scale-110 transition-all duration-500 relative overflow-hidden shimmer", onClick: () => setSelectedAd(ad), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary-500/10 via-success-500/5 to-warning-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "relative mb-6", children: [_jsx("img", { src: ad.imageUrl, alt: ad.title, className: "w-full h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-2xl" }), _jsx("div", { className: "absolute top-3 right-3 flex space-x-2", children: _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${ad.status === 'active' ? 'bg-success-500 text-white' :
                                                                ad.status === 'paused' ? 'bg-warning-500 text-white' :
                                                                    ad.status === 'completed' ? 'bg-primary-500 text-white' :
                                                                        'bg-gray-500 text-white'} animate-pulse-slow`, children: ad.status }) }), _jsx("div", { className: "absolute bottom-3 left-3", children: _jsx("span", { className: "bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm", children: ad.platform }) })] }), _jsx("h3", { className: "text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors", children: ad.title }), _jsx("p", { className: "text-gray-600 text-sm mb-6 line-clamp-2", children: ad.description }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Performance Score" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-20 bg-gray-200 rounded-full h-3 overflow-hidden", children: _jsx("div", { className: `h-3 rounded-full transition-all duration-1000 relative overflow-hidden ${ad.performanceScore > 85 ? 'bg-gradient-to-r from-success-400 via-success-500 to-success-600' :
                                                                                ad.performanceScore > 70 ? 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600' :
                                                                                    'bg-gradient-to-r from-warning-400 via-warning-500 to-warning-600'}`, style: { width: `${ad.performanceScore}%` }, children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" }) }) }), _jsx("span", { className: "text-sm font-bold text-gray-900 min-w-[2rem] animate-scale-pulse", children: ad.performanceScore })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Fraud Risk" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full shadow-sm ${fraudAnalysis.riskLevel === 'low' ? 'bg-success-500' :
                                                                            fraudAnalysis.riskLevel === 'medium' ? 'bg-warning-500' :
                                                                                'bg-error-500'}` }), _jsx("span", { className: "text-sm font-semibold capitalize", children: fraudAnalysis.riskLevel })] })] }), ad.metrics && (_jsx("div", { className: "pt-4 border-t border-gray-100", children: _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-600 mb-1", children: "CTR" }), _jsxs("p", { className: "font-bold text-gray-900", children: [ad.metrics.ctr, "%"] })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-600 mb-1", children: "ROAS" }), _jsxs("p", { className: "font-bold text-gray-900", children: [ad.metrics.roas, "x"] })] })] }) }))] }), _jsxs("div", { className: "flex items-center justify-between mt-6 pt-4 border-t border-gray-100", children: [_jsxs("button", { className: "text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 group", children: [_jsx(Eye, { className: "w-4 h-4 group-hover:scale-110 transition-transform" }), _jsx("span", { children: "View Details" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 transition-colors", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 transition-colors", children: _jsx(Share2, { className: "w-4 h-4" }) })] })] })] })] }, ad.id));
                        }) }) }), _jsx(AnimatePresence, { children: selectedAd && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50", onClick: () => setSelectedAd(null), children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex justify-between items-start mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-2", children: selectedAd.title }), _jsx("p", { className: "text-gray-600", children: selectedAd.description })] }), _jsx("button", { onClick: () => setSelectedAd(null), className: "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200", children: _jsx(X, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsxs("div", { className: "relative group", children: [_jsx("img", { src: selectedAd.imageUrl, alt: selectedAd.title, className: "w-full rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }), _jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { className: `px-3 py-1 rounded-full text-sm font-semibold ${selectedAd.status === 'active' ? 'bg-success-100 text-success-700' :
                                                                            selectedAd.status === 'paused' ? 'bg-warning-100 text-warning-700' :
                                                                                'bg-gray-100 text-gray-700'}`, children: selectedAd.status }), _jsxs("span", { className: "text-sm text-gray-500", children: ["Created ", selectedAd.createdAt.toLocaleDateString()] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200", children: _jsx(Download, { className: "w-5 h-5" }) }), _jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200", children: _jsx(Share2, { className: "w-5 h-5" }) })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "card", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-4 flex items-center", children: [_jsx("div", { className: "bg-primary-100 p-2 rounded-lg mr-3", children: _jsx(TrendingUp, { className: "w-5 h-5 text-primary-600" }) }), "Performance Analysis"] }), (() => {
                                                                const prediction = getPerformancePrediction(selectedAd.performanceScore);
                                                                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Score" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [prediction.score, "/100"] })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Confidence" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [prediction.confidence, "%"] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Expected CTR" }), _jsxs("p", { className: "text-lg font-semibold text-primary-600", children: [prediction.expectedCtr, "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Expected CPA" }), _jsxs("p", { className: "text-lg font-semibold text-primary-600", children: ["$", prediction.expectedCpa] })] })] }), _jsxs("div", { className: "pt-4 border-t border-gray-100", children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-3", children: "AI Insights:" }), _jsx("ul", { className: "space-y-2", children: prediction.insights.map((insight, index) => (_jsxs("li", { className: "flex items-start space-x-2 text-sm text-gray-700", children: [_jsx("div", { className: "w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { children: insight })] }, index))) })] })] }));
                                                            })()] }), _jsxs("div", { className: "card", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-4 flex items-center", children: [_jsx("div", { className: "bg-success-100 p-2 rounded-lg mr-3", children: _jsx(Shield, { className: "w-5 h-5 text-success-600" }) }), "Fraud Protection", !isPaid && (_jsx("span", { className: "ml-2 text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full", children: "Pro Feature" }))] }), (() => {
                                                                const fraudAnalysis = getFraudAnalysis(selectedAd.fraudScore);
                                                                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [_jsx("span", { className: "font-medium", children: "Risk Assessment" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-4 h-4 rounded-full shadow-sm ${fraudAnalysis.riskLevel === 'low' ? 'bg-success-500' :
                                                                                                fraudAnalysis.riskLevel === 'medium' ? 'bg-warning-500' :
                                                                                                    'bg-error-500'}` }), _jsxs("span", { className: "font-bold capitalize text-lg", children: [fraudAnalysis.riskLevel, " Risk"] }), _jsxs("span", { className: "text-sm text-gray-600", children: ["(", fraudAnalysis.score, "/100)"] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-3", children: "Analysis Factors:" }), _jsx("ul", { className: "space-y-2", children: fraudAnalysis.factors.map((factor, index) => (_jsxs("li", { className: "flex items-start space-x-2 text-sm text-gray-700", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" }), _jsx("span", { children: factor })] }, index))) })] }), _jsxs("div", { className: "bg-primary-50 border border-primary-200 rounded-lg p-4", children: [_jsx("h4", { className: "font-semibold text-primary-900 mb-2", children: "AI Recommendation:" }), _jsx("p", { className: "text-sm text-primary-800", children: fraudAnalysis.recommendation })] })] }));
                                                            })()] }), selectedAd.metrics && (_jsxs("div", { className: "card", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-4 flex items-center", children: [_jsx("div", { className: "bg-warning-100 p-2 rounded-lg mr-3", children: _jsx(BarChart3, { className: "w-5 h-5 text-warning-600" }) }), "Live Performance"] }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Impressions" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: selectedAd.metrics.impressions.toLocaleString() })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Clicks" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: selectedAd.metrics.clicks.toLocaleString() })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "CTR" }), _jsxs("p", { className: "text-2xl font-bold text-primary-600", children: [selectedAd.metrics.ctr, "%"] })] }), _jsxs("div", { className: "text-center p-4 bg-gray-50 rounded-lg", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "ROAS" }), _jsxs("p", { className: "text-2xl font-bold text-success-600", children: [selectedAd.metrics.roas, "x"] })] })] }), _jsxs("div", { className: "mt-6 pt-4 border-t border-gray-100", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Total Conversions:" }), _jsx("span", { className: "font-bold text-gray-900", children: selectedAd.metrics.conversions })] }), _jsxs("div", { className: "flex items-center justify-between text-sm mt-2", children: [_jsx("span", { className: "text-gray-600", children: "Cost per Acquisition:" }), _jsxs("span", { className: "font-bold text-gray-900", children: ["$", selectedAd.metrics.cpa] })] })] })] }))] })] })] }) }) })) }), filteredAds.length === 0 && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-16", children: [_jsx("div", { className: "bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center", children: _jsx(Search, { className: "w-12 h-12 text-gray-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No campaigns found" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Try adjusting your filters or search terms" }), _jsx("button", { onClick: () => {
                                setSearchTerm('');
                                setFilterStatus('all');
                            }, className: "btn-secondary", children: "Clear Filters" })] }))] }) }));
};
