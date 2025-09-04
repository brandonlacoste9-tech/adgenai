import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, TrendingDown, AlertTriangle, Shield, Target } from 'lucide-react';
const autopsies = {
    'templated-campaign-fatigue': {
        id: '1',
        title: 'Autopsy of a Templated Campaign: 80% Ad Fatigue in 7 Days',
        subtitle: 'How a major D2C brand\'s AdCreative.ai ads suffered catastrophic performance decay',
        publishDate: '2025-01-15',
        author: 'AdGen AI Research Team',
        readTime: '8 min read',
        summary: 'A comprehensive analysis of a $50K campaign that used templated AI creatives, resulting in 80% performance decay within one week due to creative fatigue and audience saturation.',
        sections: [
            {
                title: 'The Campaign Setup',
                content: 'A fast-growing D2C skincare brand launched a Black Friday campaign using 12 creatives generated from AdCreative.ai templates. Initial budget: $50,000 over 14 days across Facebook and Instagram.',
                metrics: [
                    { label: 'Initial CTR', value: '3.2%', trend: 'neutral' },
                    { label: 'Initial CPA', value: '$18.50', trend: 'neutral' },
                    { label: 'Creative Variations', value: '12', trend: 'neutral' }
                ]
            },
            {
                title: 'The Rapid Decline',
                content: 'By day 3, performance began deteriorating rapidly. The templated nature of the creatives meant they all shared similar visual patterns, color schemes, and layouts - leading to immediate audience fatigue.',
                metrics: [
                    { label: 'Day 7 CTR', value: '0.64%', trend: 'down' },
                    { label: 'Day 7 CPA', value: '$89.20', trend: 'down' },
                    { label: 'Performance Decay', value: '80%', trend: 'down' }
                ],
                insights: [
                    'All 12 creatives used identical template structures',
                    'Color palette variations were minimal (3 total schemes)',
                    'Typography and layout patterns were nearly identical',
                    'Audience quickly learned to ignore the "samey" creative pattern'
                ]
            },
            {
                title: 'The Hidden Fraud Tax',
                content: 'Analysis revealed that 34% of the campaign traffic was fraudulent - bot clicks and invalid traffic that went undetected, further inflating the true cost per acquisition.',
                metrics: [
                    { label: 'Fraudulent Traffic', value: '34%', trend: 'down' },
                    { label: 'Wasted Ad Spend', value: '$17,000', trend: 'down' },
                    { label: 'True CPA (fraud-adjusted)', value: '$127.80', trend: 'down' }
                ]
            }
        ],
        keyTakeaways: [
            'Template-based AI tools create visual monotony that accelerates ad fatigue',
            'Lack of fraud detection can inflate campaign costs by 30-50%',
            'Creative diversity is essential for sustained performance',
            'Performance prediction could have prevented this $17K waste'
        ],
        adgenSolution: {
            title: 'How AdGen AI Prevents This Disaster',
            description: 'Our Full-Stack Marketing Brain would have identified and prevented every failure point in this campaign.',
            features: [
                'Fraud Shield: Real-time bot detection would have saved $17,000 in wasted spend',
                'Creative Diversity Engine: AI ensures visual variety to prevent fatigue patterns',
                'Performance Prediction: Pre-launch scoring would have flagged the template monotony',
                'Fatigue Prevention AI: Automatic creative refresh triggers before performance decay'
            ]
        }
    }
};
export const AutopsyPage = () => {
    const { slug } = useParams();
    const autopsy = slug ? autopsies[slug] : null;
    if (!autopsy) {
        return _jsx("div", { className: "min-h-screen pt-20 flex items-center justify-center", children: _jsx("h1", { className: "text-2xl text-gray-600", children: "Autopsy not found" }) });
    }
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return _jsx(TrendingDown, { className: "w-4 h-4 text-success-600 rotate-180" });
            case 'down': return _jsx(TrendingDown, { className: "w-4 h-4 text-error-500" });
            default: return _jsx(Target, { className: "w-4 h-4 text-gray-500" });
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-white pt-20", children: _jsxs("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("header", { className: "mb-12", children: [_jsxs("div", { className: "bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-8", children: [_jsxs("div", { className: "flex items-center space-x-2 text-sm text-red-600 mb-4", children: [_jsx(AlertTriangle, { className: "w-4 h-4" }), _jsxs("span", { className: "font-medium", children: ["AI Ad Autopsy #", autopsy.id] })] }), _jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: autopsy.title }), _jsx("p", { className: "text-xl text-gray-600 mb-6", children: autopsy.subtitle }), _jsxs("div", { className: "flex items-center space-x-6 text-sm text-gray-500", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { children: new Date(autopsy.publishDate).toLocaleDateString() })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "w-4 h-4" }), _jsx("span", { children: autopsy.author })] }), _jsx("span", { children: autopsy.readTime })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-xl p-6 mb-8", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-3", children: "Executive Summary" }), _jsx("p", { className: "text-gray-700 leading-relaxed", children: autopsy.summary })] })] }), _jsx("div", { className: "space-y-12", children: autopsy.sections.map((section, index) => (_jsxs("section", { className: "border-l-4 border-primary-200 pl-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: section.title }), _jsx("p", { className: "text-gray-700 leading-relaxed mb-6", children: section.content }), section.metrics && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: section.metrics.map((metric, metricIndex) => (_jsxs("div", { className: "bg-white border border-gray-200 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: metric.label }), getTrendIcon(metric.trend)] }), _jsx("span", { className: `text-2xl font-bold ${metric.trend === 'down' ? 'text-red-600' :
                                                metric.trend === 'up' ? 'text-green-600' : 'text-gray-900'}`, children: metric.value })] }, metricIndex))) })), section.insights && (_jsxs("div", { className: "bg-blue-50 rounded-lg p-6", children: [_jsx("h3", { className: "font-semibold text-blue-900 mb-3", children: "Key Insights" }), _jsx("ul", { className: "space-y-2", children: section.insights.map((insight, insightIndex) => (_jsxs("li", { className: "flex items-start space-x-2 text-blue-800", children: [_jsx("span", { className: "w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { children: insight })] }, insightIndex))) })] }))] }, index))) }), _jsxs("div", { className: "bg-yellow-50 rounded-2xl p-8 my-12", children: [_jsx("h2", { className: "text-2xl font-bold text-yellow-900 mb-6", children: "Key Takeaways" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: autopsy.keyTakeaways.map((takeaway, index) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-yellow-800", children: takeaway })] }, index))) })] }), _jsxs("div", { className: "bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx(Shield, { className: "w-8 h-8" }), _jsx("h2", { className: "text-2xl font-bold", children: autopsy.adgenSolution.title })] }), _jsx("p", { className: "text-lg opacity-90 mb-6", children: autopsy.adgenSolution.description }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: autopsy.adgenSolution.features.map((feature, index) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" }), _jsx("span", { children: feature })] }, index))) }), _jsx("div", { className: "mt-8 text-center", children: _jsx("button", { className: "bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors", children: "Prevent This Disaster - Start Free Trial" }) })] })] }) }));
};
