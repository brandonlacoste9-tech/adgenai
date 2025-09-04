import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Shield, CheckCircle, ArrowRight, Calendar, Star, Target, TrendingUp } from 'lucide-react';
export const MigrationIntake = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        currentTool: '',
        monthlySpend: '',
        painPoints: [],
        urgency: '',
        teamSize: '',
        calendlyPreference: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const currentTools = [
        'AdCreative.ai',
        'Creatopy',
        'Canva Pro',
        'Smartly.io',
        'Jasper',
        'Copy.ai',
        'Figma',
        'Adobe Creative Suite',
        'Other'
    ];
    const painPointOptions = [
        'Surprise billing/hidden fees',
        'Poor customer support',
        'Generic/templated output',
        'No performance analytics',
        'Slow export times',
        'Limited customization',
        'No fraud detection',
        'Complex setup/learning curve',
        'Expensive pricing',
        'No A/B testing features',
        'Poor brand consistency',
        'No attribution tracking'
    ];
    const handlePainPointChange = (painPoint) => {
        setFormData(prev => ({
            ...prev,
            painPoints: prev.painPoints.includes(painPoint)
                ? prev.painPoints.filter(p => p !== painPoint)
                : [...prev.painPoints, painPoint]
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { error } = await supabase
                .from('migration_requests')
                .insert({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                current_tool: formData.currentTool,
                monthly_spend: formData.monthlySpend,
                pain_points: formData.painPoints,
                urgency: formData.urgency,
                team_size: formData.teamSize,
                calendly_preference: formData.calendlyPreference,
                status: 'new'
            });
            if (error) {
                throw error;
            }
            setSubmitted(true);
        }
        catch (error) {
            console.error('Error submitting migration request:', error);
            alert('Something went wrong. Please try again.');
        }
        finally {
            setSubmitting(false);
        }
    };
    if (submitted) {
        return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-success-50 to-success-100 opacity-50" }), _jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-success-200 rounded-full -translate-y-16 translate-x-16 opacity-30" }), _jsxs("div", { className: "relative z-10", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: "spring", stiffness: 200 }, className: "bg-success-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center", children: _jsx(CheckCircle, { className: "w-12 h-12 text-success-600" }) }), _jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Migration Request Received! \uD83C\uDF89" }), _jsxs("p", { className: "text-gray-600 mb-8 text-lg", children: ["Our migration specialist will contact you within ", _jsx("span", { className: "font-bold text-success-600", children: "24 hours" }), " to schedule your white-glove migration and strategy session."] }), _jsxs("div", { className: "bg-primary-50 border border-primary-200 rounded-2xl p-6 mb-8", children: [_jsx("h3", { className: "font-bold text-primary-900 mb-3", children: "What happens next:" }), _jsxs("div", { className: "space-y-3 text-left", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold", children: "1" }), _jsx("span", { className: "text-primary-800", children: "Personal consultation call within 24 hours" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold", children: "2" }), _jsx("span", { className: "text-primary-800", children: "Custom migration plan created for your needs" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold", children: "3" }), _jsx("span", { className: "text-primary-800", children: "Complete asset transfer and team training" })] })] })] }), _jsx("div", { className: "bg-success-50 border border-success-200 rounded-xl p-4 mb-8", children: _jsxs("p", { className: "text-success-800 font-semibold flex items-center justify-center", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), "\uD83D\uDCE7 Check your email for calendar link and next steps"] }) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx("button", { onClick: () => setSubmitted(false), className: "btn-secondary", children: "Submit Another Request" }), _jsx("button", { className: "btn-primary", children: _jsxs("a", { href: "/dashboard", className: "flex items-center space-x-2", children: [_jsx("span", { children: "Explore Dashboard" }), _jsx(ArrowRight, { className: "w-4 h-4" })] }) })] })] })] }));
    }
    return (_jsxs("div", { className: "max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden", children: [_jsxs("div", { className: "bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 p-8 text-white relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "bg-white/20 p-3 rounded-xl", children: _jsx(Shield, { className: "w-8 h-8" }) }), _jsx("h1", { className: "text-3xl font-bold", children: "White Glove Migration" })] }), _jsxs("p", { className: "text-xl opacity-90 mb-6", children: ["We'll migrate all your assets, data, and workflows for free. Plus get a ", _jsx("span", { className: "font-bold", children: "90-day performance guarantee" }), "."] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center", children: [_jsx(Star, { className: "w-6 h-6 mx-auto mb-2" }), _jsx("p", { className: "text-sm font-medium", children: "Free Migration" })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center", children: [_jsx(Target, { className: "w-6 h-6 mx-auto mb-2" }), _jsx("p", { className: "text-sm font-medium", children: "90-Day Guarantee" })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center", children: [_jsx(TrendingUp, { className: "w-6 h-6 mx-auto mb-2" }), _jsx("p", { className: "text-sm font-medium", children: "24hr Response" })] })] })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-8 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Full Name *" }), _jsx("input", { type: "text", required: true, value: formData.name, onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value })), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200", placeholder: "John Smith" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Work Email *" }), _jsx("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200", placeholder: "john@company.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Company Name *" }), _jsx("input", { type: "text", required: true, value: formData.company, onChange: (e) => setFormData(prev => ({ ...prev, company: e.target.value })), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200", placeholder: "Acme Corp" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Current Creative Tool *" }), _jsxs("select", { required: true, value: formData.currentTool, onChange: (e) => setFormData(prev => ({ ...prev, currentTool: e.target.value })), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200", children: [_jsx("option", { value: "", children: "Select your current tool" }), currentTools.map(tool => (_jsx("option", { value: tool, children: tool }, tool)))] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Monthly Ad Spend" }), _jsxs("select", { value: formData.monthlySpend, onChange: (e) => setFormData(prev => ({ ...prev, monthlySpend: e.target.value })), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200", children: [_jsx("option", { value: "", children: "Select range" }), _jsx("option", { value: "<$5K", children: "Less than $5K" }), _jsx("option", { value: "$5K-$25K", children: "$5K - $25K" }), _jsx("option", { value: "$25K-$100K", children: "$25K - $100K" }), _jsx("option", { value: "$100K+", children: "$100K+" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Team Size" }), _jsxs("select", { value: formData.teamSize, onChange: (e) => setFormData(prev => ({ ...prev, teamSize: e.target.value })), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200", children: [_jsx("option", { value: "", children: "Select size" }), _jsx("option", { value: "1", children: "Just me" }), _jsx("option", { value: "2-5", children: "2-5 people" }), _jsx("option", { value: "6-20", children: "6-20 people" }), _jsx("option", { value: "20+", children: "20+ people" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-4", children: "What problems are you experiencing? (Select all that apply)" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: painPointOptions.map(painPoint => (_jsxs(motion.label, { className: "flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("input", { type: "checkbox", checked: formData.painPoints.includes(painPoint), onChange: () => handlePainPointChange(painPoint), className: "w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500 transition-colors" }), _jsx("span", { className: "text-sm text-gray-700 font-medium", children: painPoint })] }, painPoint))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-4", children: "How urgent is this migration?" }), _jsx("div", { className: "space-y-3", children: [
                                    { value: 'asap', label: 'ASAP - We need to switch immediately', badge: 'Priority' },
                                    { value: 'month', label: 'Within the next month', badge: null },
                                    { value: 'quarter', label: 'Within the next quarter', badge: null },
                                    { value: 'exploring', label: 'Just exploring options', badge: null }
                                ].map(option => (_jsxs(motion.label, { className: "flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-all duration-200", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "radio", name: "urgency", value: option.value, checked: formData.urgency === option.value, onChange: (e) => setFormData(prev => ({ ...prev, urgency: e.target.value })), className: "w-5 h-5 text-primary-600 border-2 border-gray-300 focus:ring-primary-500" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: option.label })] }), option.badge && (_jsx("span", { className: "bg-error-100 text-error-700 px-3 py-1 rounded-full text-xs font-bold", children: option.badge }))] }, option.value))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Preferred meeting time" }), _jsxs("select", { value: formData.calendlyPreference, onChange: (e) => setFormData(prev => ({ ...prev, calendlyPreference: e.target.value })), className: "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200", children: [_jsx("option", { value: "", children: "Select preference" }), _jsx("option", { value: "morning", children: "Morning (9AM - 12PM EST)" }), _jsx("option", { value: "afternoon", children: "Afternoon (12PM - 5PM EST)" }), _jsx("option", { value: "evening", children: "Evening (5PM - 8PM EST)" }), _jsx("option", { value: "flexible", children: "I'm flexible" })] })] }), _jsx(motion.button, { type: "submit", disabled: submitting, className: "w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden shimmer animate-glow", whileHover: { scale: submitting ? 1 : 1.02 }, whileTap: { scale: submitting ? 1 : 0.98 }, children: submitting ? (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin shadow-lg" }), _jsx("span", { children: "Submitting..." })] })) : (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx("span", { children: "Start My Free Migration" }), _jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" })] })) }), _jsxs("div", { className: "bg-success-50 border border-success-200 rounded-xl p-6 text-center", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 mb-2", children: [_jsx(Shield, { className: "w-5 h-5 text-success-600" }), _jsx("p", { className: "text-success-800 font-bold", children: "90-Day Performance Guarantee" })] }), _jsx("p", { className: "text-success-700 text-sm", children: "See measurable improvement in your ad performance or get your money back. Plus, migration is completely free regardless." })] })] })] }));
};
