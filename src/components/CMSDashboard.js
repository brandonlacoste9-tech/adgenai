import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Calendar, TrendingUp, Eye, Edit, Trash2, Search, Filter, Download, Share2, BarChart3, Target, Clock, Users, MessageSquare, ExternalLink, CheckCircle, AlertTriangle, Zap, Brain, Shield } from 'lucide-react';
export const CMSDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isGenerating, setIsGenerating] = useState(false);
    useEffect(() => {
        loadContentData();
    }, []);
    const loadContentData = async () => {
        try {
            // Simulate loading CMS data
            const mockPosts = [
                {
                    id: '1',
                    title: 'Autopsy: AdCreative.ai Campaign Disaster - $47,000 Lost in 14 Days',
                    slug: 'autopsy-adcreative-ai-ecommerce-disaster',
                    excerpt: 'A forensic analysis of an e-commerce campaign that collapsed due to templated designs and zero fraud protection.',
                    author: 'AdGen AI Research Team',
                    publishDate: '2025-01-15',
                    readTime: '8 min read',
                    status: 'published',
                    category: 'autopsy',
                    tags: ['autopsy', 'adcreative-ai', 'ecommerce', 'fraud-detection'],
                    viewCount: 12847,
                    shareCount: 234,
                    conversionRate: 4.2
                },
                {
                    id: '2',
                    title: 'Case Study: TechFlow Achieves 340% ROAS Improvement',
                    slug: 'case-study-techflow-roas-improvement',
                    excerpt: 'How TechFlow Solutions transformed their SaaS marketing performance with AdGen AI\'s Full-Stack Marketing Brain.',
                    author: 'AdGen AI Success Team',
                    publishDate: '2025-01-12',
                    readTime: '6 min read',
                    status: 'published',
                    category: 'case-study',
                    tags: ['case-study', 'saas', 'success-story', 'roas'],
                    viewCount: 8934,
                    shareCount: 156,
                    conversionRate: 6.8
                },
                {
                    id: '3',
                    title: 'Creatopy vs AdGen AI: Performance Analytics Comparison',
                    slug: 'creatopy-vs-adgen-ai-analytics',
                    excerpt: 'Why design tools without performance insights are costing marketers millions in missed opportunities.',
                    author: 'AdGen AI Research Team',
                    publishDate: '2025-01-10',
                    readTime: '5 min read',
                    status: 'published',
                    category: 'comparison',
                    tags: ['comparison', 'creatopy', 'analytics', 'performance'],
                    viewCount: 6721,
                    shareCount: 89,
                    conversionRate: 3.1
                },
                {
                    id: '4',
                    title: 'The $84 Billion Ad Fraud Crisis: How AI Detection Saves Budgets',
                    slug: 'ad-fraud-crisis-ai-detection-solution',
                    excerpt: 'Deep dive into the global ad fraud epidemic and how intelligent detection systems protect marketing budgets.',
                    author: 'AdGen AI Research Team',
                    publishDate: '2025-01-08',
                    readTime: '7 min read',
                    status: 'draft',
                    category: 'strategy',
                    tags: ['fraud-detection', 'strategy', 'ai', 'budget-protection'],
                    viewCount: 0,
                    shareCount: 0,
                    conversionRate: 0
                }
            ];
            const mockMetrics = {
                totalPosts: mockPosts.length,
                publishedPosts: mockPosts.filter(p => p.status === 'published').length,
                totalViews: mockPosts.reduce((sum, post) => sum + post.viewCount, 0),
                avgEngagement: 4.2,
                conversionRate: 4.7,
                topPerformingPost: mockPosts[0].title
            };
            setPosts(mockPosts);
            setMetrics(mockMetrics);
        }
        catch (error) {
            console.error('Failed to load content data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const generateWeeklyAutopsy = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cms-autopsy-generator/weekly-autopsy`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to generate autopsy');
            }
            const newAutopsy = await response.json();
            // Add to posts list
            setPosts(prev => [newAutopsy, ...prev]);
            console.log('✅ Generated new autopsy:', newAutopsy.title);
        }
        catch (error) {
            console.error('Failed to generate autopsy:', error);
            alert('Failed to generate autopsy. Please try again.');
        }
        finally {
            setIsGenerating(false);
        }
    };
    const filteredPosts = posts
        .filter(post => (filterCategory === 'all' || post.category === filterCategory) &&
        (filterStatus === 'all' || post.status === filterStatus) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())));
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-20 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading content management system..." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: "Content Management" }), _jsx("p", { className: "text-gray-600", children: "AI-powered content generation for competitive domination" })] }), _jsxs("div", { className: "flex items-center space-x-4 mt-4 lg:mt-0", children: [_jsxs("button", { className: "btn-secondary flex items-center space-x-2", children: [_jsx(Download, { className: "w-5 h-5" }), _jsx("span", { children: "Export Analytics" })] }), _jsx("button", { onClick: generateWeeklyAutopsy, disabled: isGenerating, className: "btn-primary flex items-center space-x-2", children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Generating..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Brain, { className: "w-5 h-5" }), _jsx("span", { children: "Generate AI Autopsy" })] })) })] })] }), metrics && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8", children: [_jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Total Posts" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: metrics.totalPosts }), _jsxs("p", { className: "text-xs text-primary-600 font-medium", children: [metrics.publishedPosts, " published"] })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl", children: _jsx(FileText, { className: "w-8 h-8 text-primary-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Total Views" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: metrics.totalViews.toLocaleString() }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +23% this month" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl", children: _jsx(Eye, { className: "w-8 h-8 text-success-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Engagement" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900", children: [metrics.avgEngagement, "%"] }), _jsx("p", { className: "text-xs text-warning-600 font-medium", children: "Above industry avg" })] }), _jsx("div", { className: "bg-warning-100 p-3 rounded-xl", children: _jsx(MessageSquare, { className: "w-8 h-8 text-warning-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Conversion Rate" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900", children: [metrics.conversionRate, "%"] }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +1.2% improvement" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl", children: _jsx(Target, { className: "w-8 h-8 text-success-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "AI Generated" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: "87%" }), _jsx("p", { className: "text-xs text-primary-600 font-medium", children: "Automation rate" })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl", children: _jsx(Zap, { className: "w-8 h-8 text-primary-600" }) })] }) })] })), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-4 items-center justify-between", children: [_jsx("div", { className: "flex items-center space-x-4 w-full lg:w-auto", children: _jsxs("div", { className: "relative flex-1 lg:flex-none lg:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search content...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent" })] }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("select", { value: filterCategory, onChange: (e) => setFilterCategory(e.target.value), className: "px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500", children: [_jsx("option", { value: "all", children: "All Categories" }), _jsx("option", { value: "autopsy", children: "AI Ad Autopsy" }), _jsx("option", { value: "case-study", children: "Case Studies" }), _jsx("option", { value: "comparison", children: "Comparisons" }), _jsx("option", { value: "strategy", children: "Strategy" })] }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "published", children: "Published" }), _jsx("option", { value: "draft", children: "Draft" }), _jsx("option", { value: "scheduled", children: "Scheduled" })] })] })] }) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8", children: filteredPosts.map((post, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "card hover:shadow-xl hover:scale-105 transition-all duration-300 group", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${post.category === 'autopsy' ? 'bg-red-100 text-red-700' :
                                                    post.category === 'case-study' ? 'bg-success-100 text-success-700' :
                                                        post.category === 'comparison' ? 'bg-warning-100 text-warning-700' :
                                                            'bg-primary-100 text-primary-700'}`, children: post.category }), _jsx("span", { className: `w-3 h-3 rounded-full ${post.status === 'published' ? 'bg-success-500' :
                                                    post.status === 'scheduled' ? 'bg-warning-500' :
                                                        'bg-gray-400'}` })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 transition-colors", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 transition-colors", children: _jsx(ExternalLink, { className: "w-4 h-4" }) })] })] }), _jsx("h3", { className: "text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2", children: post.title }), _jsx("p", { className: "text-gray-600 text-sm mb-4 line-clamp-3", children: post.excerpt }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500 mb-4", children: [_jsx("span", { children: post.author }), _jsx("span", { children: new Date(post.publishDate).toLocaleDateString() })] }), post.status === 'published' && (_jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-100", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Views" }), _jsx("p", { className: "font-bold text-gray-900", children: post.viewCount.toLocaleString() })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Shares" }), _jsx("p", { className: "font-bold text-gray-900", children: post.shareCount })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "CVR" }), _jsxs("p", { className: "font-bold text-success-600", children: [post.conversionRate, "%"] })] })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-gray-500", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: post.readTime })] }), _jsx("div", { className: "flex items-center space-x-1", children: post.tags.slice(0, 2).map(tag => (_jsx("span", { className: "bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs", children: tag }, tag))) })] })] }, post.id))) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mt-12", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-2xl font-bold mb-2 flex items-center", children: [_jsx(Brain, { className: "w-8 h-8 mr-3" }), "AI Content Generation Engine"] }), _jsx("p", { className: "opacity-90 mb-6", children: "Automatically generate competitor analysis, case studies, and strategic content to maintain thought leadership and drive organic acquisition." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4", children: [_jsx(Shield, { className: "w-6 h-6 mb-2" }), _jsx("h4", { className: "font-semibold mb-1", children: "Weekly Autopsies" }), _jsx("p", { className: "text-sm opacity-90", children: "Automated competitor failure analysis" })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4", children: [_jsx(Target, { className: "w-6 h-6 mb-2" }), _jsx("h4", { className: "font-semibold mb-1", children: "Case Studies" }), _jsx("p", { className: "text-sm opacity-90", children: "Success story generation from data" })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4", children: [_jsx(BarChart3, { className: "w-6 h-6 mb-2" }), _jsx("h4", { className: "font-semibold mb-1", children: "SEO Optimization" }), _jsx("p", { className: "text-sm opacity-90", children: "Keyword targeting and ranking" })] })] })] }), _jsxs("div", { className: "flex flex-col space-y-3", children: [_jsx("button", { onClick: generateWeeklyAutopsy, disabled: isGenerating, className: "bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors", children: "Generate Autopsy" }), _jsx("button", { className: "border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors", children: "Schedule Content" })] })] }) }), filteredPosts.length === 0 && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-16", children: [_jsx("div", { className: "bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center", children: _jsx(Search, { className: "w-12 h-12 text-gray-400" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No content found" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Try adjusting your filters or search terms" }), _jsx("button", { onClick: () => {
                                setSearchTerm('');
                                setFilterCategory('all');
                                setFilterStatus('all');
                            }, className: "btn-secondary", children: "Clear Filters" })] }))] }) }));
};
