import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubscriptionStatus } from './SubscriptionStatus';
import { ComparisonAnalytics } from './ComparisonAnalytics';
import { useSubscription } from '../hooks/useSubscription';
import { mlPerformanceAPI } from '../lib/ml-performance-api';
import { fraudDetectionService } from '../lib/fraud-detection-service';
import { attributionAnalyticsService } from '../lib/attribution-analytics-service';
import { trackFeature } from '../lib/analytics-tracking';
import { Plus, Shield, TrendingUp, Target, X, Eye, Edit, BarChart3, Download, Share2, Zap, Brain, Sparkles, Rocket, Crown, Star, Search } from 'lucide-react';
export const EnhancedDashboard = () => {
    const [selectedAd, setSelectedAd] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('performance');
    const [analyzing, setAnalyzing] = useState(null);
    const { isPro, isEnterprise, isPaid } = useSubscription();
    const [ads, setAds] = useState([
        {
            id: '1',
            title: 'Summer Sale Campaign - 50% Off Everything',
            description: 'Limited time offer! Get 50% off all products. Shop now before this amazing deal expires. Free shipping on orders over $50. Don\'t miss out!',
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
            title: 'Product Launch Teaser - Revolutionary AI Tool',
            description: 'Discover the future of marketing automation. Join thousands of professionals who trust our AI-powered platform for better results.',
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
            title: 'Retargeting Campaign - Complete Your Purchase',
            description: 'You left something in your cart! Complete your purchase now and get free shipping. Limited time offer expires soon.',
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
        }
    ]);
    const runFullAnalysis = async (ad) => {
        setAnalyzing(ad.id);
        trackFeature('full_analysis', 'started');
        try {
            // Run all three analyses in parallel
            const [prediction, fraudAnalysis, attribution] = await Promise.all([
                mlPerformanceAPI.predict(ad),
                fraudDetectionService.analyzeFraud({
                    creativeId: ad.id,
                    campaignId: `campaign_${ad.id}`,
                    targetAudience: { size: 'medium' },
                    budget: 5000,
                    platform: ad.platform
                }),
                attributionAnalyticsService.analyzeAttribution([`campaign_${ad.id}`], 'linear', { start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() })
            ]);
            // Update ad with analysis results
            setAds(prev => prev.map(a => a.id === ad.id
                ? { ...a, prediction, fraudAnalysis, attributionData: attribution }
                : a));
            trackFeature('full_analysis', 'completed');
        }
        catch (error) {
            console.error('Analysis failed:', error);
            trackFeature('full_analysis', 'failed');
        }
        finally {
            setAnalyzing(null);
        }
    };
    const filteredAds = ads
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
    const totalMetrics = ads.reduce((acc, ad) => {
        if (ad.metrics) {
            acc.impressions += ad.metrics.impressions;
            acc.clicks += ad.metrics.clicks;
            acc.conversions += ad.metrics.conversions;
            acc.spend += ad.metrics.cpa * ad.metrics.conversions;
        }
        return acc;
    }, { impressions: 0, clicks: 0, conversions: 0, spend: 0 });
    const avgRoas = totalMetrics.spend > 0 ? (totalMetrics.conversions * 50) / totalMetrics.spend : 0;
    const fraudSavings = ads.reduce((sum, ad) => sum + (ad.fraudScore * 50), 0);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-grid-pattern opacity-5" }), _jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-success-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float", style: { animationDelay: '3s' } }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-5xl font-bold text-gray-900 mb-2 text-shadow", children: ["Intelligence Dashboard", _jsx(Sparkles, { className: "inline-block w-8 h-8 ml-3 text-primary-600 animate-bounce-gentle" })] }), _jsxs("p", { className: "text-xl text-gray-600", children: ["Monitor performance and optimize with AI-powered insights", !isPaid && _jsx("span", { className: "text-primary-600 font-semibold ml-1 animate-pulse-slow", children: "- Upgrade for advanced features" })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("button", { title: "View Analytics", onClick: () => trackFeature('analytics_view', 'clicked'), className: "btn-secondary flex items-center space-x-2 hover:scale-110 transition-all duration-300", children: [_jsx(BarChart3, { className: "w-5 h-5" }), _jsx("span", { children: "Analytics" })] }), _jsxs("button", { title: "Generate New Ad", onClick: () => trackFeature('generate_ad', 'clicked'), className: "btn-primary flex items-center space-x-2 group animate-glow hover:scale-110 transition-all duration-300", children: [_jsx(Plus, { className: "w-5 h-5 group-hover:rotate-90 transition-transform duration-300" }), _jsx("span", { children: "Generate New Ad" }), _jsx(Rocket, { className: "w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" })] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "mb-8", children: _jsx(SubscriptionStatus, {}) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx("div", { className: "metric-card group hover:scale-110 transition-all duration-500", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Total ROAS" }), _jsxs("p", { className: "text-4xl font-bold text-gray-900 animate-scale-pulse", children: [avgRoas.toFixed(1), "x"] }), _jsx("p", { className: "text-xs text-success-600 font-medium animate-bounce-gentle", children: "\u2197 +12% vs last month" }), !isPaid && _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Limited tracking" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl group-hover:scale-125 group-hover:shadow-glow transition-all duration-500 success-glow", children: _jsx(TrendingUp, { className: "w-8 h-8 text-success-600 animate-float" }) })] }) }), _jsx("div", { className: "metric-card group hover:scale-110 transition-all duration-500", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "AI Performance Score" }), _jsx("p", { className: "text-4xl font-bold text-gray-900 animate-scale-pulse", children: ads.reduce((sum, ad) => sum + ad.performanceScore, 0) / ads.length || 0 }), _jsx("p", { className: "text-xs text-primary-600 font-medium animate-bounce-gentle", children: "\u2197 +8 points this week" }), !isPro && !isEnterprise && _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "5/month limit" })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl group-hover:scale-125 group-hover:shadow-glow transition-all duration-500 neon-glow", children: _jsx(Brain, { className: "w-8 h-8 text-primary-600 animate-float", style: { animationDelay: '1s' } }) })] }) }), _jsx("div", { className: "metric-card group hover:scale-110 transition-all duration-500", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Fraud Savings" }), _jsxs("p", { className: "text-4xl font-bold text-gray-900 animate-scale-pulse", children: ["$", fraudSavings.toLocaleString()] }), _jsx("p", { className: "text-xs text-success-600 font-medium animate-bounce-gentle", children: "Protected this month" }), !isPaid && _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Pro feature" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl group-hover:scale-125 group-hover:shadow-glow transition-all duration-500 success-glow", children: _jsx(Shield, { className: "w-8 h-8 text-success-600 animate-float", style: { animationDelay: '2s' } }) })] }) }), _jsx("div", { className: "metric-card group hover:scale-110 transition-all duration-500", children: _jsxs("div", { className: "flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Active Campaigns" }), _jsx("p", { className: "text-4xl font-bold text-gray-900 animate-scale-pulse", children: ads.filter(ad => ad.status === 'active').length }), _jsxs("p", { className: "text-xs text-gray-600", children: ["of ", ads.length, " total"] })] }), _jsx("div", { className: "bg-warning-100 p-3 rounded-xl group-hover:scale-125 group-hover:shadow-glow transition-all duration-500 warning-glow", children: _jsx(Target, { className: "w-8 h-8 text-warning-600 animate-float", style: { animationDelay: '3s' } }) })] }) })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "glass-card p-6 mb-8 hover:shadow-2xl transition-all duration-500", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-4 items-center justify-between", children: [_jsx("div", { className: "flex items-center space-x-4 w-full lg:w-auto", children: _jsxs("div", { className: "relative flex-1 lg:flex-none lg:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 animate-bounce-gentle" }), _jsx("input", { type: "text", placeholder: "Search campaigns...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 hover:border-primary-400 shimmer" })] }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("select", { title: "Select Filter Status", value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 hover:border-primary-400", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "paused", children: "Paused" }), _jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "draft", children: "Draft" })] }), _jsxs("select", { title: "Select Sort Option", value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 hover:border-primary-400", children: [_jsx("option", { value: "performance", children: "Sort by Performance" }), _jsx("option", { value: "created", children: "Sort by Date" }), _jsx("option", { value: "fraud", children: "Sort by Fraud Risk" })] })] })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "mb-8", children: _jsx(ComparisonAnalytics, {}) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8", children: _jsx(AnimatePresence, { children: filteredAds.map((ad, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -30, scale: 0.95 }, transition: { duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }, className: "card group cursor-pointer hover:shadow-3xl hover:scale-110 transition-all duration-500 relative overflow-hidden shimmer", onClick: () => setSelectedAd(ad), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary-500/10 via-success-500/5 to-warning-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" }), _jsx("div", { className: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500", children: _jsx("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500 via-success-500 to-warning-500 opacity-20 blur-sm animate-pulse-slow" }) }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "relative mb-6", children: [_jsx("img", { src: ad.imageUrl, alt: ad.title, className: "w-full h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 group-hover:shadow-2xl" }), _jsx("div", { className: "absolute top-3 right-3 flex space-x-2", children: _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${ad.status === 'active' ? 'bg-success-500 text-white animate-pulse-slow' :
                                                                ad.status === 'paused' ? 'bg-warning-500 text-white' :
                                                                    ad.status === 'completed' ? 'bg-primary-500 text-white' :
                                                                        'bg-gray-500 text-white'}`, children: ad.status }) }), _jsx("div", { className: "absolute bottom-3 left-3", children: _jsx("span", { className: "bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm animate-bounce-gentle", children: ad.platform }) }), ad.performanceScore > 90 && (_jsx("div", { className: "absolute top-3 left-3", children: _jsx("div", { className: "bg-success-500 text-white p-2 rounded-full animate-bounce-gentle", children: _jsx(Crown, { className: "w-4 h-4" }) }) }))] }), _jsx("h3", { className: "text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300 text-shadow", children: ad.title }), _jsx("p", { className: "text-gray-600 text-sm mb-6 line-clamp-2 group-hover:text-gray-700 transition-colors", children: ad.description }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "AI Performance Score" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-24 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${ad.performanceScore}%` }, transition: { duration: 1.5, delay: index * 0.1 }, className: `h-3 rounded-full relative overflow-hidden ${ad.performanceScore > 85 ? 'bg-gradient-to-r from-success-400 via-success-500 to-success-600' :
                                                                                ad.performanceScore > 70 ? 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600' :
                                                                                    'bg-gradient-to-r from-warning-400 via-warning-500 to-warning-600'}`, children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" }) }) }), _jsx("span", { className: "text-sm font-bold text-gray-900 min-w-[2rem] animate-scale-pulse", children: ad.performanceScore })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Fraud Shield Status" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full shadow-lg animate-pulse-slow ${ad.fraudScore <= 20 ? 'bg-success-500 success-glow' :
                                                                            ad.fraudScore <= 40 ? 'bg-warning-500 warning-glow' :
                                                                                'bg-error-500'}` }), _jsx("span", { className: "text-sm font-semibold capitalize", children: ad.fraudScore <= 20 ? 'Protected' : ad.fraudScore <= 40 ? 'Monitoring' : 'High Risk' })] })] }), ad.metrics && (_jsx("div", { className: "pt-4 border-t border-gray-100", children: _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:scale-105 transition-all duration-300", children: [_jsx("p", { className: "text-gray-600 mb-1", children: "CTR" }), _jsxs("p", { className: "font-bold text-gray-900 text-lg animate-scale-pulse", children: [ad.metrics.ctr, "%"] })] }), _jsxs("div", { className: "text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:scale-105 transition-all duration-300", children: [_jsx("p", { className: "text-gray-600 mb-1", children: "ROAS" }), _jsxs("p", { className: "font-bold text-success-600 text-lg animate-scale-pulse", children: [ad.metrics.roas, "x"] })] })] }) })), _jsx("div", { className: "pt-4 border-t border-gray-100", children: _jsx("button", { title: "Run Full AI Analysis", onClick: (e) => {
                                                                e.stopPropagation();
                                                                runFullAnalysis(ad);
                                                            }, disabled: analyzing === ad.id, className: "w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shimmer", children: analyzing === ad.id ? (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Analyzing..." })] })) : (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx(Brain, { className: "w-5 h-5" }), _jsx("span", { children: "Run Full AI Analysis" }), _jsx(Zap, { className: "w-5 h-5" })] })) }) })] }), _jsxs("div", { className: "flex items-center justify-between mt-6 pt-4 border-t border-gray-100", children: [_jsxs("button", { title: "View Details", onClick: (e) => {
                                                            e.stopPropagation();
                                                            trackFeature('view_details', ad.id);
                                                        }, className: "text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 group hover:scale-110 transition-all duration-300", children: [_jsx(Eye, { className: "w-4 h-4 group-hover:scale-125 transition-transform duration-300" }), _jsx("span", { children: "View Details" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { title: "Edit Ad", className: "p-2 text-gray-400 hover:text-primary-600 transition-all duration-300 hover:scale-125 hover:bg-primary-50 rounded-lg", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx("button", { title: "Share Ad", className: "p-2 text-gray-400 hover:text-primary-600 transition-all duration-300 hover:scale-125 hover:bg-primary-50 rounded-lg", children: _jsx(Share2, { className: "w-4 h-4" }) })] })] })] })] }, ad.id))) }) }), _jsx(AnimatePresence, { children: selectedAd && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4 z-50", onClick: () => setSelectedAd(null), children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9, y: 30 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: 30 }, transition: { type: "spring", stiffness: 300, damping: 30 }, className: "glass-card max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-3xl border border-white/20", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex justify-between items-start mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 mb-2 text-shadow", children: selectedAd.title }), _jsx("p", { className: "text-gray-600 text-lg", children: selectedAd.description })] }), _jsx("button", { title: "Close Modal", onClick: () => setSelectedAd(null), className: "p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-125", children: _jsx(X, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsxs("div", { className: "relative group", children: [_jsx("img", { src: selectedAd.imageUrl, alt: selectedAd.title, className: "w-full rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 hover:scale-105" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" })] }), _jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { className: `px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${selectedAd.status === 'active' ? 'bg-success-100 text-success-700 animate-pulse-slow' :
                                                                                selectedAd.status === 'paused' ? 'bg-warning-100 text-warning-700' :
                                                                                    'bg-gray-100 text-gray-700'}`, children: selectedAd.status }), _jsxs("span", { className: "text-sm text-gray-500", children: ["Created ", selectedAd.createdAt.toLocaleDateString()] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { title: "Download Ad", className: "p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-125", children: _jsx(Download, { className: "w-5 h-5" }) }), _jsx("button", { title: "Share Ad", className: "p-3 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-125", children: _jsx(Share2, { className: "w-5 h-5" }) })] })] })] }), _jsxs("div", { className: "space-y-6", children: [selectedAd.prediction && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "card hover:shadow-xl transition-all duration-500", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-4 flex items-center", children: [_jsx("div", { className: "bg-primary-100 p-2 rounded-lg mr-3 animate-scale-pulse", children: _jsx(Brain, { className: "w-5 h-5 text-primary-600" }) }), "AI Performance Analysis"] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { className: "bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Score" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900 animate-scale-pulse", children: [selectedAd.prediction.score, "/100"] })] }), _jsxs("div", { className: "bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Confidence" }), _jsxs("p", { className: "text-3xl font-bold text-primary-600 animate-scale-pulse", children: [selectedAd.prediction.confidence, "%"] })] })] }), _jsx("div", { className: "space-y-2", children: selectedAd.prediction.insights.slice(0, 3).map((insight, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex items-start space-x-2 text-sm text-gray-700 p-2 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-300", children: [_jsx(Star, { className: "w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0 animate-bounce-gentle" }), _jsx("span", { children: insight })] }, index))) })] })), selectedAd.fraudAnalysis && (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, className: "card hover:shadow-xl transition-all duration-500", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-4 flex items-center", children: [_jsx("div", { className: "bg-success-100 p-2 rounded-lg mr-3 animate-scale-pulse", children: _jsx(Shield, { className: "w-5 h-5 text-success-600" }) }), "Fraud Shield Analysis"] }), _jsxs("div", { className: "flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mb-4 hover:scale-105 transition-all duration-300", children: [_jsx("span", { className: "font-medium", children: "Risk Assessment" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-4 h-4 rounded-full shadow-lg animate-pulse-slow ${selectedAd.fraudAnalysis.riskLevel === 'low' ? 'bg-success-500 success-glow' :
                                                                                        selectedAd.fraudAnalysis.riskLevel === 'medium' ? 'bg-warning-500 warning-glow' :
                                                                                            'bg-error-500'}` }), _jsxs("span", { className: "font-bold capitalize text-lg", children: [selectedAd.fraudAnalysis.riskLevel, " Risk"] })] })] }), _jsx("div", { className: "bg-success-50 border border-success-200 rounded-xl p-4", children: _jsxs("p", { className: "text-success-800 font-medium", children: ["\uD83D\uDCB0 Estimated Savings: $", selectedAd.fraudAnalysis.estimatedSavings.toLocaleString()] }) })] }))] })] })] }) }) })) })] })] }));
};
