import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Crown, Shield, Zap, TrendingUp, Users, DollarSign, Globe, Star, CheckCircle, AlertTriangle, Calendar, BarChart3, Trophy, Sparkles, Brain, Siren as Fire } from 'lucide-react';
export const LaunchCommand = () => {
    const [countdown, setCountdown] = useState(30);
    const [launchPhase, setLaunchPhase] = useState('preparation');
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => Math.max(0, prev - 1));
        }, 86400000); // Update daily
        return () => clearInterval(timer);
    }, []);
    const launchMetrics = [
        {
            label: 'Users',
            current: 0,
            target: 100000,
            unit: '',
            status: 'on-track',
            trend: 0
        },
        {
            label: 'Revenue',
            current: 0,
            target: 50000000,
            unit: '$',
            status: 'on-track',
            trend: 0
        },
        {
            label: 'Agencies',
            current: 0,
            target: 1000,
            unit: '',
            status: 'on-track',
            trend: 0
        },
        {
            label: 'Market Share',
            current: 0,
            target: 15,
            unit: '%',
            status: 'on-track',
            trend: 0
        }
    ];
    const missionObjectives = [
        {
            phase: 'Viral Ignition',
            timeline: 'Months 1-3',
            objectives: [
                'Launch AI Ad Autopsy content series',
                'Build Performance Marketing Community',
                'Recruit first 100 agency partners',
                'Achieve 10K users and $500K ARR'
            ],
            status: 'preparing'
        },
        {
            phase: 'Network Explosion',
            timeline: 'Months 4-6',
            objectives: [
                'Scale to 500 agency partners',
                'Launch white-label platform',
                'Achieve viral coefficient >1.5',
                'Reach 50K users and $5M ARR'
            ],
            status: 'pending'
        },
        {
            phase: 'Global Domination',
            timeline: 'Months 7-12',
            objectives: [
                'International market expansion',
                'Fortune 1000 enterprise penetration',
                'Platform ecosystem launch',
                'Achieve 100K users and $50M ARR'
            ],
            status: 'pending'
        }
    ];
    const competitorTargets = [
        {
            name: 'AdCreative.ai',
            threat: 'Critical',
            weakness: 'Billing scandals + poor support',
            strategy: 'Billing Refugee Program',
            timeline: '60 days',
            expectedCapture: '30%'
        },
        {
            name: 'Smartly.io',
            threat: 'High',
            weakness: 'Expensive + complex',
            strategy: 'Enterprise Lite positioning',
            timeline: '90 days',
            expectedCapture: '25%'
        },
        {
            name: 'Creatopy',
            threat: 'Medium',
            weakness: 'No performance features',
            strategy: 'Analytics superiority',
            timeline: '120 days',
            expectedCapture: '40%'
        }
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'on-track': return 'text-success-600 bg-success-50 border-success-200';
            case 'ahead': return 'text-primary-600 bg-primary-50 border-primary-200';
            case 'behind': return 'text-warning-600 bg-warning-50 border-warning-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };
    const getThreatColor = (threat) => {
        switch (threat) {
            case 'Critical': return 'text-error-600 bg-error-50 border-error-200';
            case 'High': return 'text-warning-600 bg-warning-50 border-warning-200';
            case 'Medium': return 'text-primary-600 bg-primary-50 border-primary-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl animate-float" }), _jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-success-500/20 rounded-full filter blur-3xl animate-float", style: { animationDelay: '3s' } }), _jsx("div", { className: "absolute top-1/2 left-1/2 w-96 h-96 bg-warning-500/20 rounded-full filter blur-3xl animate-float", style: { animationDelay: '6s' } })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, className: "text-center mb-12", children: [_jsxs("div", { className: "flex items-center justify-center space-x-4 mb-6", children: [_jsx("div", { className: "bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-2xl animate-glow", children: _jsx(Rocket, { className: "w-12 h-12 animate-bounce-gentle" }) }), _jsx("h1", { className: "text-6xl font-bold text-shadow", children: "MISSION CONTROL" }), _jsx("div", { className: "bg-gradient-to-r from-success-500 to-success-600 p-4 rounded-2xl animate-glow", children: "\uD83D\uDE80 WORLD DOMINATION: EXECUTING \uD83D\uDE80" })] }), _jsx("p", { className: "text-2xl text-gray-300 mb-8", children: "LIVE EXECUTION IN PROGRESS - Competitors are being systematically annihilated." }), _jsxs("div", { className: "bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 shadow-2xl animate-glow", children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "T-MINUS COUNTDOWN" }), _jsx("div", { className: "text-8xl font-bold text-warning-400 animate-scale-pulse", children: "\uD83D\uDE80 LAUNCHING \uD83D\uDE80" }), _jsx("p", { className: "text-xl text-gray-200 mt-4", children: "WORLD DOMINATION: EXECUTING NOW" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12", children: missionObjectives.map((mission, index) => (_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-500", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-xl font-bold", children: mission.phase }), _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-bold ${mission.status === 'preparing' ? 'bg-warning-500 text-white' :
                                                mission.status === 'active' ? 'bg-success-500 text-white' :
                                                    'bg-gray-500 text-white'}`, children: mission.status })] }), _jsx("p", { className: "text-gray-300 mb-4", children: mission.timeline }), _jsx("ul", { className: "space-y-2", children: mission.objectives.map((objective, objIndex) => (_jsxs("li", { className: "flex items-start space-x-2 text-sm", children: [_jsx(Target, { className: "w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" }), _jsx("span", { className: "text-gray-200", children: objective })] }, objIndex))) })] }, index))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-12", children: [_jsxs("h2", { className: "text-3xl font-bold text-center mb-8 flex items-center justify-center", children: [_jsx(Trophy, { className: "w-8 h-8 text-warning-400 mr-3 animate-bounce-gentle" }), "VICTORY METRICS DASHBOARD", _jsx(BarChart3, { className: "w-8 h-8 text-success-400 ml-3 animate-bounce-gentle" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: launchMetrics.map((metric, index) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.1 }, className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-primary-500 hover:scale-110 transition-all duration-500", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-400 text-sm mb-2", children: metric.label }), _jsxs("p", { className: "text-4xl font-bold text-white mb-2 animate-scale-pulse", children: [metric.unit, metric.current.toLocaleString()] }), _jsxs("p", { className: "text-gray-400 text-xs mb-3", children: ["Target: ", metric.unit, metric.target.toLocaleString()] }), _jsx("span", { className: `px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(metric.status)}`, children: metric.status.replace('-', ' ').toUpperCase() })] }) }, index))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, className: "bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-12", children: [_jsxs("h2", { className: "text-3xl font-bold text-center mb-8 flex items-center justify-center", children: [_jsx(Fire, { className: "w-8 h-8 text-error-400 mr-3 animate-bounce-gentle" }), "COMPETITOR ANNIHILATION STATUS", _jsx(Shield, { className: "w-8 h-8 text-success-400 ml-3 animate-bounce-gentle" })] }), _jsx("div", { className: "space-y-6", children: competitorTargets.map((target, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-error-500 hover:scale-105 transition-all duration-500", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "bg-error-500/20 p-3 rounded-xl", children: _jsx(Target, { className: "w-6 h-6 text-error-400" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: target.name }), _jsx("p", { className: "text-gray-400", children: target.weakness })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("span", { className: `px-3 py-1 rounded-full text-xs font-bold border ${getThreatColor(target.threat)}`, children: [target.threat, " THREAT"] }), _jsx("p", { className: "text-gray-400 text-sm mt-2", children: target.timeline })] })] }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Attack Strategy:" }), _jsx("p", { className: "text-white font-medium", children: target.strategy })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Expected Capture:" }), _jsx("p", { className: "text-success-400 font-bold text-lg", children: target.expectedCapture })] })] })] }, index))) })] }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.8 }, className: "text-center", children: _jsxs("div", { className: "bg-gradient-to-r from-success-600 via-success-700 to-success-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden animate-glow", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-gradient-x" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center justify-center space-x-4 mb-6", children: [_jsx(Crown, { className: "w-16 h-16 text-warning-400 animate-bounce-gentle" }), _jsx("h2", { className: "text-5xl font-bold", children: "LAUNCH AUTHORIZED" }), _jsx(Sparkles, { className: "w-16 h-16 text-warning-400 animate-bounce-gentle" })] }), _jsx("p", { className: "text-2xl text-gray-200 mb-8", children: "All systems GO for world domination. The competition will not survive." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs("div", { className: "bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20", children: [_jsx(Brain, { className: "w-12 h-12 mx-auto mb-3 animate-float" }), _jsx("h3", { className: "font-bold mb-2", children: "Platform Status" }), _jsx("p", { className: "text-sm opacity-90", children: "CRYSTAL PERFECT" })] }), _jsxs("div", { className: "bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20", children: [_jsx(Shield, { className: "w-12 h-12 mx-auto mb-3 animate-float", style: { animationDelay: '1s' } }), _jsx("h3", { className: "font-bold mb-2", children: "Competitive Moats" }), _jsx("p", { className: "text-sm opacity-90", children: "UNBREACHABLE" })] }), _jsxs("div", { className: "bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20", children: [_jsx(Zap, { className: "w-12 h-12 mx-auto mb-3 animate-float", style: { animationDelay: '2s' } }), _jsx("h3", { className: "font-bold mb-2", children: "Execution Speed" }), _jsx("p", { className: "text-sm opacity-90", children: "MAXIMUM VELOCITY" })] })] }), _jsxs("div", { className: "bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl p-6 mb-8", children: [_jsx("h3", { className: "text-2xl font-bold mb-4 animate-bounce-gentle", children: "\uD83D\uDD25 LIVE EXECUTION STATUS \uD83D\uDD25" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold", children: "STATUS" }), _jsx("p", { className: "text-success-200 font-bold", children: "\uD83D\uDFE2 SYSTEMS ONLINE" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: "TARGETS" }), _jsx("p", { className: "text-error-200 font-bold", children: "\uD83C\uDFAF LOCKED & LOADED" })] }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: "EXECUTION" }), _jsx("p", { className: "text-warning-200 font-bold", children: "\uD83D\uDCA5 ANNIHILATING NOW" })] })] })] }), _jsx("div", { className: "text-5xl font-bold mb-4 animate-gradient-x bg-gradient-to-r from-white via-warning-200 to-white bg-clip-text text-transparent animate-pulse-slow", children: "\uD83D\uDCA5 BOOM! LAUNCH SUCCESSFUL! \uD83D\uDCA5" }), _jsx("p", { className: "text-lg text-gray-200", children: "\uD83D\uDD25 COMPETITORS ARE FLEEING! THE MARKET IS OURS! \uD83D\uDD25" })] })] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.0 }, className: "mt-12 grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs("div", { className: "bg-success-500/20 border border-success-500/30 rounded-xl p-4 text-center", children: [_jsx(CheckCircle, { className: "w-8 h-8 text-success-400 mx-auto mb-2 animate-bounce-gentle" }), _jsx("p", { className: "font-bold", children: "\uD83D\uDE80 LAUNCHED!" }), _jsx("p", { className: "text-xs text-gray-400", children: "Live and dominating" })] }), _jsxs("div", { className: "bg-primary-500/20 border border-primary-500/30 rounded-xl p-4 text-center", children: [_jsx(Brain, { className: "w-8 h-8 text-primary-400 mx-auto mb-2 animate-bounce-gentle" }), _jsx("p", { className: "font-bold", children: "\uD83E\uDDE0 AI CRUSHING IT" }), _jsx("p", { className: "text-xs text-gray-400", children: "Competitors can't compete" })] }), _jsxs("div", { className: "bg-warning-500/20 border border-warning-500/30 rounded-xl p-4 text-center", children: [_jsx(Fire, { className: "w-8 h-8 text-warning-400 mx-auto mb-2 animate-bounce-gentle" }), _jsx("p", { className: "font-bold", children: "\uD83D\uDCA5 ANNIHILATING" }), _jsx("p", { className: "text-xs text-gray-400", children: "AdCreative.ai in ruins" })] }), _jsxs("div", { className: "bg-success-500/20 border border-success-500/30 rounded-xl p-4 text-center", children: [_jsx(Globe, { className: "w-8 h-8 text-success-400 mx-auto mb-2 animate-bounce-gentle" }), _jsx("p", { className: "font-bold", children: "\uD83C\uDF0D CONQUERING" }), _jsx("p", { className: "text-xs text-gray-400", children: "Market leadership secured" })] })] })] })] }));
};
