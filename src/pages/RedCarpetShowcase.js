import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { Logo, LogoMark } from '../components/Logo';
import { Crown, Star, Sparkles, Award, Zap, Brain, Shield, Target } from 'lucide-react';
export const RedCarpetShowcase = () => {
    const logoVariants = [
        {
            name: 'Primary Logo',
            description: 'The flagship identity for maximum impact',
            component: _jsx(Logo, { size: "xl", variant: "primary" }),
            background: 'bg-white',
            textColor: 'text-gray-900'
        },
        {
            name: 'Gradient Power',
            description: 'Premium gradient for hero sections',
            component: _jsx(Logo, { size: "xl", variant: "gradient" }),
            background: 'bg-gray-900',
            textColor: 'text-white'
        },
        {
            name: 'White Elegance',
            description: 'Clean white for dark backgrounds',
            component: _jsx(Logo, { size: "xl", variant: "white" }),
            background: 'bg-gradient-to-br from-primary-600 to-primary-800',
            textColor: 'text-white'
        },
        {
            name: 'Mark Only',
            description: 'Compact symbol for tight spaces',
            component: _jsx(LogoMark, { size: "xl", variant: "primary" }),
            background: 'bg-gray-50',
            textColor: 'text-gray-900'
        }
    ];
    const brandShowcase = [
        {
            icon: Brain,
            title: 'Intelligence',
            description: 'Neural network represents AI-powered marketing brain',
            color: 'text-primary-600 bg-primary-100'
        },
        {
            icon: Zap,
            title: 'Power',
            description: 'Lightning bolt symbolizes instant performance',
            color: 'text-warning-600 bg-warning-100'
        },
        {
            icon: Shield,
            title: 'Protection',
            description: 'Fraud detection shields your budget',
            color: 'text-success-600 bg-success-100'
        },
        {
            icon: Target,
            title: 'Precision',
            description: 'Accurate targeting and attribution',
            color: 'text-error-600 bg-error-100'
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-red-900 via-red-700/50 to-transparent" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent" }), _jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/30 rounded-full filter blur-3xl animate-pulse" }), _jsx("div", { className: "absolute top-0 right-1/4 w-96 h-96 bg-yellow-300/30 rounded-full filter blur-3xl animate-pulse", style: { animationDelay: '1s' } }), _jsx("div", { className: "absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-300/20 rounded-full filter blur-3xl animate-pulse", style: { animationDelay: '2s' } }), _jsx("div", { className: "absolute top-20 left-20 animate-bounce", children: _jsx(Sparkles, { className: "w-8 h-8 text-yellow-300" }) }), _jsx("div", { className: "absolute top-40 right-32 animate-bounce", style: { animationDelay: '0.5s' }, children: _jsx(Star, { className: "w-6 h-6 text-yellow-400" }) }), _jsx("div", { className: "absolute bottom-32 left-16 animate-bounce", style: { animationDelay: '1s' }, children: _jsx(Crown, { className: "w-10 h-10 text-yellow-300" }) }), _jsx("div", { className: "absolute bottom-20 right-20 animate-bounce", style: { animationDelay: '1.5s' }, children: _jsx(Award, { className: "w-8 h-8 text-yellow-400" }) })] }), _jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, ease: "easeOut" }, className: "text-center mb-20", children: [_jsxs("div", { className: "inline-flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-red-900 px-8 py-4 rounded-full text-lg font-bold mb-8 shadow-2xl animate-glow", children: [_jsx(Crown, { className: "w-6 h-6 mr-3 animate-bounce" }), "RED CARPET PREMIERE", _jsx(Sparkles, { className: "w-6 h-6 ml-3 animate-bounce", style: { animationDelay: '0.3s' } })] }), _jsx("h1", { className: "text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 mb-8 text-shadow-lg animate-gradient-x", children: "AdGen AI" }), _jsx("p", { className: "text-3xl md:text-4xl text-yellow-100 font-bold mb-4 text-shadow", children: "The Full-Stack Marketing Brain" }), _jsx("p", { className: "text-xl text-red-200 max-w-4xl mx-auto leading-relaxed", children: "Presenting the most sophisticated AI marketing intelligence platform ever created. Where performance meets perfection, and competitors meet their doom." })] }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, delay: 0.5 }, className: "mb-20", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold text-yellow-300 mb-4 text-shadow", children: "Logo Showcase Theater" }), _jsx("p", { className: "text-xl text-red-200", children: "Four stunning variations of our iconic brand identity" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: logoVariants.map((variant, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30, rotateY: -15 }, animate: { opacity: 1, y: 0, rotateY: 0 }, transition: {
                                        duration: 0.8,
                                        delay: index * 0.2,
                                        type: "spring",
                                        stiffness: 100
                                    }, className: "group perspective-1000", children: _jsxs("div", { className: "relative transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-12 group-hover:shadow-2xl", children: [_jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-yellow-300/30 to-yellow-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" }), _jsxs("div", { className: `relative ${variant.background} rounded-3xl p-12 border-4 border-yellow-400/30 shadow-2xl backdrop-blur-sm group-hover:border-yellow-300 transition-all duration-500`, children: [_jsx("div", { className: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500", children: _jsx(Star, { className: "w-6 h-6 text-yellow-400 animate-spin" }) }), _jsx("div", { className: "absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500", children: _jsx(Sparkles, { className: "w-5 h-5 text-yellow-300 animate-pulse" }) }), _jsx("div", { className: "flex justify-center mb-8 group-hover:scale-125 transition-transform duration-500", children: variant.component }), _jsxs("div", { className: `text-center ${variant.textColor}`, children: [_jsx("h3", { className: "text-xl font-bold mb-2 group-hover:text-yellow-600 transition-colors duration-300", children: variant.name }), _jsx("p", { className: "text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300", children: variant.description })] }), _jsx("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/10 via-yellow-300/20 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" })] })] }) }, variant.name))) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 1 }, className: "mb-20", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl font-bold text-yellow-300 mb-4 text-shadow", children: "Brand Symbolism & Meaning" }), _jsx("p", { className: "text-xl text-red-200", children: "Every element tells the story of marketing intelligence" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: brandShowcase.map((item, index) => {
                                    const Icon = item.icon;
                                    return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: {
                                            duration: 0.6,
                                            delay: 1.2 + index * 0.15,
                                            type: "spring",
                                            stiffness: 120
                                        }, className: "bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-300 hover:bg-white/20 hover:scale-110 transition-all duration-500 group", children: [_jsx("div", { className: `inline-flex p-4 rounded-2xl mb-4 ${item.color} group-hover:scale-125 transition-transform duration-500`, children: _jsx(Icon, { className: "w-8 h-8" }) }), _jsx("h3", { className: "text-xl font-bold text-yellow-300 mb-2 group-hover:text-yellow-200 transition-colors", children: item.title }), _jsx("p", { className: "text-red-200 text-sm leading-relaxed group-hover:text-red-100 transition-colors", children: item.description })] }, item.title));
                                }) })] }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, delay: 1.8 }, className: "text-center", children: _jsxs("div", { className: "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-3xl p-12 shadow-2xl relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-yellow-500/20 animate-gradient-x" }), _jsxs("div", { className: "absolute top-0 left-0 w-full h-full", children: [_jsx("div", { className: "absolute top-4 left-4 animate-bounce", children: _jsx(Star, { className: "w-6 h-6 text-red-600" }) }), _jsx("div", { className: "absolute top-8 right-8 animate-bounce", style: { animationDelay: '0.5s' }, children: _jsx(Crown, { className: "w-8 h-8 text-red-700" }) }), _jsx("div", { className: "absolute bottom-6 left-8 animate-bounce", style: { animationDelay: '1s' }, children: _jsx(Award, { className: "w-7 h-7 text-red-600" }) }), _jsx("div", { className: "absolute bottom-4 right-6 animate-bounce", style: { animationDelay: '1.5s' }, children: _jsx(Sparkles, { className: "w-6 h-6 text-red-700" }) })] }), _jsxs("div", { className: "relative z-10", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsx(motion.div, { animate: {
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, 5, -5, 0]
                                                }, transition: {
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }, children: _jsx(Logo, { size: "xl", variant: "gradient" }) }) }), _jsx("h3", { className: "text-4xl font-bold text-red-900 mb-4", children: "The Logo That Conquers Markets" }), _jsx("p", { className: "text-xl text-red-800 mb-8 max-w-3xl mx-auto", children: "More than just a symbol - it's the visual representation of marketing intelligence that strikes fear into competitors and inspires confidence in customers." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-red-800/20 backdrop-blur-sm rounded-xl p-6 border border-red-600/30", children: [_jsx(Brain, { className: "w-12 h-12 text-red-700 mx-auto mb-3" }), _jsx("h4", { className: "font-bold text-red-900 mb-2", children: "Neural Intelligence" }), _jsx("p", { className: "text-red-800 text-sm", children: "Connected nodes represent our AI brain network" })] }), _jsxs("div", { className: "bg-red-800/20 backdrop-blur-sm rounded-xl p-6 border border-red-600/30", children: [_jsx(Zap, { className: "w-12 h-12 text-red-700 mx-auto mb-3" }), _jsx("h4", { className: "font-bold text-red-900 mb-2", children: "Lightning Performance" }), _jsx("p", { className: "text-red-800 text-sm", children: "Central bolt shows instant AI-powered results" })] }), _jsxs("div", { className: "bg-red-800/20 backdrop-blur-sm rounded-xl p-6 border border-red-600/30", children: [_jsx(Target, { className: "w-12 h-12 text-red-700 mx-auto mb-3" }), _jsx("h4", { className: "font-bold text-red-900 mb-2", children: "Data Flow" }), _jsx("p", { className: "text-red-800 text-sm", children: "Animated indicators show continuous learning" })] })] })] })] }) }), _jsx("div", { className: "absolute top-32 left-8 animate-float", children: _jsx("div", { className: "bg-yellow-400 text-red-900 p-4 rounded-full shadow-2xl", children: _jsx(Crown, { className: "w-8 h-8" }) }) }), _jsx("div", { className: "absolute top-48 right-12 animate-float", style: { animationDelay: '1s' }, children: _jsx("div", { className: "bg-yellow-300 text-red-900 p-4 rounded-full shadow-2xl", children: _jsx(Award, { className: "w-8 h-8" }) }) }), _jsx("div", { className: "absolute bottom-40 left-16 animate-float", style: { animationDelay: '2s' }, children: _jsx("div", { className: "bg-yellow-400 text-red-900 p-4 rounded-full shadow-2xl", children: _jsx(Star, { className: "w-8 h-8" }) }) })] })] }));
};
