import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const Logo = ({ size = 'md', variant = 'primary', showText = true, className = '' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };
    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl'
    };
    const getLogoColors = () => {
        switch (variant) {
            case 'white':
                return {
                    primary: '#ffffff',
                    secondary: '#f1f5f9',
                    accent: '#e2e8f0'
                };
            case 'dark':
                return {
                    primary: '#1e293b',
                    secondary: '#334155',
                    accent: '#475569'
                };
            case 'gradient':
                return {
                    primary: 'url(#logoGradient)',
                    secondary: 'url(#logoGradient)',
                    accent: 'url(#logoGradient)'
                };
            default:
                return {
                    primary: '#2563eb',
                    secondary: '#3b82f6',
                    accent: '#60a5fa'
                };
        }
    };
    const colors = getLogoColors();
    return (_jsxs("div", { className: `flex items-center space-x-3 ${className}`, children: [_jsx("div", { className: `${sizeClasses[size]} relative`, children: _jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full", xmlns: "http://www.w3.org/2000/svg", children: [variant === 'gradient' && (_jsxs("defs", { children: [_jsxs("linearGradient", { id: "logoGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#2563eb" }), _jsx("stop", { offset: "50%", stopColor: "#3b82f6" }), _jsx("stop", { offset: "100%", stopColor: "#60a5fa" })] }), _jsxs("filter", { id: "glow", children: [_jsx("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }), _jsxs("feMerge", { children: [_jsx("feMergeNode", { in: "coloredBlur" }), _jsx("feMergeNode", { in: "SourceGraphic" })] })] })] })), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: colors.primary, strokeWidth: "3", opacity: "0.3" }), _jsx("circle", { cx: "30", cy: "25", r: "4", fill: colors.primary, opacity: "0.8" }), _jsx("circle", { cx: "70", cy: "25", r: "4", fill: colors.primary, opacity: "0.8" }), _jsx("circle", { cx: "20", cy: "50", r: "4", fill: colors.secondary, opacity: "0.9" }), _jsx("circle", { cx: "80", cy: "50", r: "4", fill: colors.secondary, opacity: "0.9" }), _jsx("circle", { cx: "30", cy: "75", r: "4", fill: colors.accent, opacity: "0.8" }), _jsx("circle", { cx: "70", cy: "75", r: "4", fill: colors.accent, opacity: "0.8" }), _jsx("circle", { cx: "50", cy: "50", r: "18", fill: colors.primary, filter: variant === 'gradient' ? 'url(#glow)' : undefined }), _jsx("path", { d: "M45 40 L52 40 L48 50 L55 50 L48 60 L52 60 L45 60 Z", fill: "white", transform: "translate(0, -5)" }), _jsx("line", { x1: "30", y1: "25", x2: "35", y2: "35", stroke: colors.secondary, strokeWidth: "2", opacity: "0.6" }), _jsx("line", { x1: "70", y1: "25", x2: "65", y2: "35", stroke: colors.secondary, strokeWidth: "2", opacity: "0.6" }), _jsx("line", { x1: "20", y1: "50", x2: "32", y2: "50", stroke: colors.secondary, strokeWidth: "2", opacity: "0.6" }), _jsx("line", { x1: "80", y1: "50", x2: "68", y2: "50", stroke: colors.secondary, strokeWidth: "2", opacity: "0.6" }), _jsx("line", { x1: "30", y1: "75", x2: "35", y2: "65", stroke: colors.accent, strokeWidth: "2", opacity: "0.6" }), _jsx("line", { x1: "70", y1: "75", x2: "65", y2: "65", stroke: colors.accent, strokeWidth: "2", opacity: "0.6" }), _jsx("circle", { cx: "50", cy: "15", r: "2", fill: colors.accent, children: _jsx("animate", { attributeName: "opacity", values: "0.3;1;0.3", dur: "2s", repeatCount: "indefinite" }) }), _jsx("circle", { cx: "85", cy: "50", r: "2", fill: colors.accent, children: _jsx("animate", { attributeName: "opacity", values: "0.3;1;0.3", dur: "2s", repeatCount: "indefinite", begin: "0.5s" }) }), _jsx("circle", { cx: "50", cy: "85", r: "2", fill: colors.accent, children: _jsx("animate", { attributeName: "opacity", values: "0.3;1;0.3", dur: "2s", repeatCount: "indefinite", begin: "1s" }) }), _jsx("circle", { cx: "15", cy: "50", r: "2", fill: colors.accent, children: _jsx("animate", { attributeName: "opacity", values: "0.3;1;0.3", dur: "2s", repeatCount: "indefinite", begin: "1.5s" }) })] }) }), showText && (_jsx("span", { className: `font-bold ${textSizeClasses[size]} ${variant === 'white' ? 'text-white' :
                    variant === 'dark' ? 'text-gray-900' :
                        variant === 'gradient' ? 'bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent' :
                            'text-gray-900'}`, children: "AdGen AI" }))] }));
};
export const LogoMark = (props) => (_jsx(Logo, { ...props, showText: false }));
