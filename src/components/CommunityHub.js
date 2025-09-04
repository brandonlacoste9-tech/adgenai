import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Award, TrendingUp, MessageSquare, Calendar, Crown, Shield, Target, Zap } from 'lucide-react';
export const CommunityHub = () => {
    const [selectedTab, setSelectedTab] = useState('members');
    const topMembers = [
        {
            id: '1',
            name: 'Sarah Chen',
            role: 'Performance Marketing Manager',
            company: 'TechFlow Solutions',
            avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
            tier: 'champion',
            achievements: ['First 1000 Club', 'Fraud Detective', 'ROAS Master'],
            stats: {
                roasImprovement: 340,
                fraudSavings: 12400,
                referrals: 8
            }
        },
        {
            id: '2',
            name: 'Marcus Rodriguez',
            role: 'Agency Owner',
            company: 'GrowthLab Agency',
            avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100',
            tier: 'advocate',
            achievements: ['Agency Pioneer', 'Community Builder', 'Success Story'],
            stats: {
                roasImprovement: 156,
                fraudSavings: 8900,
                referrals: 12
            }
        },
        {
            id: '3',
            name: 'Emily Watson',
            role: 'E-commerce Director',
            company: 'StyleCo',
            avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100',
            tier: 'advocate',
            achievements: ['Attribution Expert', 'Performance Optimizer'],
            stats: {
                roasImprovement: 234,
                fraudSavings: 6700,
                referrals: 5
            }
        }
    ];
    const upcomingEvents = [
        {
            id: '1',
            title: 'Advanced Attribution Modeling Workshop',
            type: 'workshop',
            date: '2025-01-25',
            attendees: 247,
            speaker: 'Dr. Analytics Expert',
            description: 'Deep dive into multi-touch attribution and revenue optimization strategies'
        },
        {
            id: '2',
            title: 'Fraud Detection Masterclass',
            type: 'webinar',
            date: '2025-01-30',
            attendees: 189,
            speaker: 'Security Specialist',
            description: 'Learn advanced fraud detection techniques and save thousands monthly'
        },
        {
            id: '3',
            title: 'Agency Success Stories Showcase',
            type: 'case-study',
            date: '2025-02-05',
            attendees: 156,
            speaker: 'Top Agency Partners',
            description: 'Real agencies share their transformation stories and results'
        }
    ];
    const getTierIcon = (tier) => {
        switch (tier) {
            case 'champion': return _jsx(Crown, { className: "w-5 h-5 text-warning-600" });
            case 'advocate': return _jsx(Star, { className: "w-5 h-5 text-primary-600" });
            default: return _jsx(Users, { className: "w-5 h-5 text-gray-500" });
        }
    };
    const getTierColor = (tier) => {
        switch (tier) {
            case 'champion': return 'from-warning-100 to-warning-200 border-warning-300';
            case 'advocate': return 'from-primary-100 to-primary-200 border-primary-300';
            default: return 'from-gray-100 to-gray-200 border-gray-300';
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Performance Marketing Community" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Join 10,000+ performance marketers sharing strategies, success stories, and advanced techniques for marketing intelligence." })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Active Members" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: "10,247" }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +23% this month" })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl", children: _jsx(Users, { className: "w-8 h-8 text-primary-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Success Stories" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: "1,847" }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "Shared this month" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl", children: _jsx(Star, { className: "w-8 h-8 text-success-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Total Fraud Saved" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: "$2.4M" }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "Community total" })] }), _jsx("div", { className: "bg-warning-100 p-3 rounded-xl", children: _jsx(Shield, { className: "w-8 h-8 text-warning-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Avg ROAS Boost" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: "267%" }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "Member average" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl", children: _jsx(TrendingUp, { className: "w-8 h-8 text-success-600" }) })] }) })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8", children: _jsx("div", { className: "flex space-x-2", children: [
                            { id: 'members', label: 'Top Members', icon: Users },
                            { id: 'events', label: 'Events', icon: Calendar },
                            { id: 'leaderboard', label: 'Leaderboard', icon: Award }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (_jsxs("button", { onClick: () => setSelectedTab(tab.id), className: `flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedTab === tab.id
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`, children: [_jsx(Icon, { className: "w-5 h-5" }), _jsx("span", { children: tab.label })] }, tab.id));
                        }) }) }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, children: [selectedTab === 'members' && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: topMembers.map((member, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: `card hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-br ${getTierColor(member.tier)} border-2`, children: [_jsxs("div", { className: "flex items-center space-x-4 mb-6", children: [_jsx("img", { src: member.avatar, alt: member.name, className: "w-16 h-16 rounded-full object-cover shadow-lg" }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900", children: member.name }), getTierIcon(member.tier)] }), _jsx("p", { className: "text-sm text-gray-600", children: member.role }), _jsx("p", { className: "text-sm text-gray-500", children: member.company })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-lg font-bold text-success-600", children: [member.stats.roasImprovement, "%"] }), _jsx("p", { className: "text-xs text-gray-600", children: "ROAS Boost" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-lg font-bold text-primary-600", children: ["$", member.stats.fraudSavings.toLocaleString()] }), _jsx("p", { className: "text-xs text-gray-600", children: "Fraud Saved" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-lg font-bold text-warning-600", children: member.stats.referrals }), _jsx("p", { className: "text-xs text-gray-600", children: "Referrals" })] })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: member.achievements.map(achievement => (_jsx("span", { className: "bg-white/80 text-gray-700 px-2 py-1 rounded-full text-xs font-medium", children: achievement }, achievement))) })] }, member.id))) })), selectedTab === 'events' && (_jsx("div", { className: "space-y-6", children: upcomingEvents.map((event, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "card hover:shadow-xl hover:scale-105 transition-all duration-300", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `p-3 rounded-xl ${event.type === 'webinar' ? 'bg-primary-100' :
                                                            event.type === 'workshop' ? 'bg-success-100' :
                                                                event.type === 'case-study' ? 'bg-warning-100' :
                                                                    'bg-gray-100'}`, children: event.type === 'webinar' ? _jsx(Zap, { className: "w-6 h-6 text-primary-600" }) :
                                                            event.type === 'workshop' ? _jsx(Target, { className: "w-6 h-6 text-success-600" }) :
                                                                event.type === 'case-study' ? _jsx(Star, { className: "w-6 h-6 text-warning-600" }) :
                                                                    _jsx(Users, { className: "w-6 h-6 text-gray-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-900", children: event.title }), _jsxs("p", { className: "text-sm text-gray-600", children: ["by ", event.speaker] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm text-gray-600", children: new Date(event.date).toLocaleDateString() }), _jsxs("p", { className: "text-xs text-gray-500", children: [event.attendees, " attending"] })] })] }), _jsx("p", { className: "text-gray-700 mb-4", children: event.description }), _jsx("button", { className: "btn-primary w-full", children: "Register for Event" })] }, event.id))) })), selectedTab === 'leaderboard' && (_jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 mb-6", children: "Performance Leaderboard" }), _jsx("div", { className: "space-y-4", children: topMembers.map((member, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-warning-500' :
                                                            index === 1 ? 'bg-gray-400' :
                                                                index === 2 ? 'bg-warning-600' :
                                                                    'bg-gray-300'}`, children: index + 1 }), _jsx("img", { src: member.avatar, alt: member.name, className: "w-12 h-12 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900", children: member.name }), _jsx("p", { className: "text-sm text-gray-600", children: member.company })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-bold text-success-600", children: [member.stats.roasImprovement, "% ROAS"] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["$", member.stats.fraudSavings.toLocaleString(), " saved"] })] })] }, member.id))) })] }))] }, selectedTab), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center mt-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Join the Elite Performance Marketing Community" }), _jsx("p", { className: "text-lg opacity-90 mb-6", children: "Connect with top marketers, share success stories, and learn advanced strategies" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx("button", { className: "bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors", children: "Join Community" }), _jsx("button", { className: "border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors", children: "View Success Stories" })] })] })] }) }));
};
