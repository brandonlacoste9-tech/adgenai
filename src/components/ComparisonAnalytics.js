import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Eye, Target, ArrowRight } from 'lucide-react';
export const ComparisonAnalytics = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7d');
    useEffect(() => {
        loadAnalytics();
    }, [timeRange]);
    const loadAnalytics = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics-tracker/analytics-summary?range=${timeRange}`, {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setMetrics(data);
            }
        }
        catch (error) {
            console.error('Failed to load analytics:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-6 bg-gray-200 rounded w-1/3" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx("div", { className: "h-20 bg-gray-200 rounded" }), _jsx("div", { className: "h-20 bg-gray-200 rounded" }), _jsx("div", { className: "h-20 bg-gray-200 rounded" })] })] }) }));
    }
    if (!metrics)
        return null;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 flex items-center", children: [_jsx("div", { className: "bg-primary-100 p-2 rounded-lg mr-3", children: _jsx(BarChart3, { className: "w-6 h-6 text-primary-600" }) }), "Comparison Analytics"] }), _jsxs("select", { value: timeRange, onChange: (e) => setTimeRange(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500", children: [_jsx("option", { value: "7d", children: "Last 7 days" }), _jsx("option", { value: "30d", children: "Last 30 days" }), _jsx("option", { value: "90d", children: "Last 90 days" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [_jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Total Views" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: metrics.totalViews.toLocaleString() }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +23% vs previous period" })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl", children: _jsx(Eye, { className: "w-8 h-8 text-primary-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Conversion Rate" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900", children: [(metrics.conversionRate * 100).toFixed(1), "%"] }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +1.2% improvement" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl", children: _jsx(Target, { className: "w-8 h-8 text-success-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Top Competitor" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: Object.entries(metrics.comparisonViews).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A' }), _jsx("p", { className: "text-xs text-primary-600 font-medium", children: "Most compared" })] }), _jsx("div", { className: "bg-warning-100 p-3 rounded-xl", children: _jsx(Users, { className: "w-8 h-8 text-warning-600" }) })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold text-gray-900", children: "Competitor Comparison Views" }), Object.entries(metrics.comparisonViews)
                        .sort(([, a], [, b]) => b - a)
                        .map(([competitor, views], index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", children: index + 1 }), _jsx("span", { className: "font-medium text-gray-900", children: competitor })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-24 bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000", style: { width: `${(views / Math.max(...Object.values(metrics.comparisonViews))) * 100}%` } }) }), _jsx("span", { className: "font-bold text-gray-900 min-w-[3rem]", children: views.toLocaleString() })] })] }, competitor)))] })] }));
};
