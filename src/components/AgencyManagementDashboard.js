import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Award, Settings, Plus, Eye, Edit, Crown, Building, Zap, Palette, Globe, Code, Bell, Download, CheckCircle, AlertTriangle, Star, Target, BarChart3, Shield } from 'lucide-react';
export const AgencyManagementDashboard = () => {
    const [partner, setPartner] = useState(null);
    const [clients, setClients] = useState([]);
    const [whiteLabelSettings, setWhiteLabelSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    useEffect(() => {
        loadAgencyData();
    }, []);
    const loadAgencyData = async () => {
        try {
            // Simulate loading agency data
            const mockPartner = {
                id: 'agency-1',
                name: 'Marcus Rodriguez',
                email: 'marcus@growthlab.com',
                company: 'GrowthLab Agency',
                tier: 'pro',
                status: 'active',
                clientCount: 18,
                monthlyRevenue: 127500,
                commissionRate: 25,
                whiteLabel: true,
                customBranding: {
                    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
                    primaryColor: '#1e40af',
                    companyName: 'GrowthLab AI'
                },
                accountManager: 'Sarah Chen',
                createdAt: '2024-06-15'
            };
            const mockClients = [
                {
                    id: '1',
                    name: 'Emily Watson',
                    company: 'StyleCo Fashion',
                    industry: 'E-commerce',
                    monthlyBudget: 25000,
                    status: 'active',
                    performanceMetrics: {
                        totalSpend: 75000,
                        totalRevenue: 315000,
                        roas: 4.2,
                        avgCtr: 3.1,
                        avgCpa: 12.50
                    },
                    lastActivity: '2025-01-15'
                },
                {
                    id: '2',
                    name: 'David Kim',
                    company: 'TechFlow Solutions',
                    industry: 'SaaS',
                    monthlyBudget: 35000,
                    status: 'active',
                    performanceMetrics: {
                        totalSpend: 105000,
                        totalRevenue: 472500,
                        roas: 4.5,
                        avgCtr: 2.8,
                        avgCpa: 18.75
                    },
                    lastActivity: '2025-01-15'
                },
                {
                    id: '3',
                    name: 'Lisa Chen',
                    company: 'HealthPlus Clinic',
                    industry: 'Healthcare',
                    monthlyBudget: 15000,
                    status: 'active',
                    performanceMetrics: {
                        totalSpend: 45000,
                        totalRevenue: 157500,
                        roas: 3.5,
                        avgCtr: 2.2,
                        avgCpa: 22.30
                    },
                    lastActivity: '2025-01-14'
                }
            ];
            const mockWhiteLabel = {
                branding: {
                    logo: mockPartner.customBranding?.logo || '',
                    primaryColor: mockPartner.customBranding?.primaryColor || '#1e40af',
                    secondaryColor: '#3b82f6',
                    companyName: mockPartner.customBranding?.companyName || 'GrowthLab AI',
                    domain: 'ai.growthlab.com'
                },
                features: {
                    hideAdgenBranding: true,
                    customDomain: true,
                    customReporting: true,
                    customEmailTemplates: false
                },
                pricing: {
                    markup: 15,
                    customPricing: false
                }
            };
            setPartner(mockPartner);
            setClients(mockClients);
            setWhiteLabelSettings(mockWhiteLabel);
        }
        catch (error) {
            console.error('Failed to load agency data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-20 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Loading agency management dashboard..." })] }) }));
    }
    if (!partner) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-20 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(AlertTriangle, { className: "w-16 h-16 text-warning-500 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Agency Access Required" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Please contact support to set up your agency partnership" }), _jsx("button", { className: "btn-primary", children: "Contact Support" })] }) }));
    }
    const totalRevenue = clients.reduce((sum, client) => sum + client.performanceMetrics.totalRevenue, 0);
    const totalCommission = totalRevenue * (partner.commissionRate / 100);
    const activeClients = clients.filter(c => c.status === 'active').length;
    const avgClientRoas = clients.reduce((sum, client) => sum + client.performanceMetrics.roas, 0) / clients.length;
    const getTierIcon = () => {
        switch (partner.tier) {
            case 'enterprise': return _jsx(Building, { className: "w-8 h-8 text-warning-600" });
            case 'pro': return _jsx(Crown, { className: "w-8 h-8 text-primary-600" });
            default: return _jsx(Zap, { className: "w-8 h-8 text-gray-500" });
        }
    };
    const getTierColor = () => {
        switch (partner.tier) {
            case 'enterprise': return 'from-warning-600 to-warning-700';
            case 'pro': return 'from-primary-600 to-primary-700';
            default: return 'from-gray-600 to-gray-700';
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 pt-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: [partner.company, " Agency Portal"] }), _jsx("p", { className: "text-gray-600", children: "Manage clients, track performance, and scale with white-label solutions" })] }), _jsxs("div", { className: "flex items-center space-x-4 mt-4 lg:mt-0", children: [_jsxs("button", { className: "btn-secondary flex items-center space-x-2", children: [_jsx(Download, { className: "w-5 h-5" }), _jsx("span", { children: "Export Report" })] }), _jsxs("button", { className: "btn-primary flex items-center space-x-2", children: [_jsx(Plus, { className: "w-5 h-5" }), _jsx("span", { children: "Add Client" })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: `bg-gradient-to-r ${getTierColor()} rounded-2xl p-6 text-white mb-8 relative overflow-hidden`, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" }), _jsxs("div", { className: "relative z-10 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "bg-white/20 p-3 rounded-xl", children: getTierIcon() }), _jsxs("div", { children: [_jsxs("h3", { className: "text-2xl font-bold capitalize", children: [partner.tier, " Partner"] }), _jsxs("p", { className: "opacity-90", children: [partner.commissionRate, "% commission \u2022 ", activeClients, " active clients \u2022 Since ", new Date(partner.createdAt).getFullYear()] }), _jsxs("div", { className: "flex items-center space-x-4 mt-2 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), _jsx("span", { children: "White-label enabled" })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "w-4 h-4" }), _jsxs("span", { children: ["Dedicated manager: ", partner.accountManager] })] })] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-4xl font-bold", children: ["$", totalCommission.toLocaleString()] }), _jsx("p", { className: "opacity-90", children: "Total commission earned" }), _jsxs("p", { className: "text-sm opacity-75 mt-1", children: ["From $", totalRevenue.toLocaleString(), " client revenue"] })] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8", children: _jsx("div", { className: "flex space-x-2 overflow-x-auto", children: [
                            { id: 'overview', label: 'Overview', icon: BarChart3 },
                            { id: 'clients', label: 'Clients', icon: Users },
                            { id: 'white-label', label: 'White Label', icon: Palette },
                            { id: 'reports', label: 'Reports', icon: Target },
                            { id: 'settings', label: 'Settings', icon: Settings }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'}`, children: [_jsx(Icon, { className: "w-5 h-5" }), _jsx("span", { children: tab.label })] }, tab.id));
                        }) }) }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, children: [activeTab === 'overview' && (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Total Revenue" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900", children: ["$", totalRevenue.toLocaleString()] }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +34% this quarter" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl", children: _jsx(DollarSign, { className: "w-8 h-8 text-success-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Commission" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900", children: ["$", totalCommission.toLocaleString()] }), _jsxs("p", { className: "text-xs text-primary-600 font-medium", children: [partner.commissionRate, "% rate"] })] }), _jsx("div", { className: "bg-primary-100 p-3 rounded-xl", children: _jsx(Award, { className: "w-8 h-8 text-primary-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Active Clients" }), _jsx("p", { className: "text-3xl font-bold text-gray-900", children: activeClients }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "+3 this month" })] }), _jsx("div", { className: "bg-warning-100 p-3 rounded-xl", children: _jsx(Users, { className: "w-8 h-8 text-warning-600" }) })] }) }), _jsx("div", { className: "metric-card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-600 mb-1", children: "Avg ROAS" }), _jsxs("p", { className: "text-3xl font-bold text-gray-900", children: [avgClientRoas.toFixed(1), "x"] }), _jsx("p", { className: "text-xs text-success-600 font-medium", children: "\u2197 +0.8x improvement" })] }), _jsx("div", { className: "bg-success-100 p-3 rounded-xl", children: _jsx(TrendingUp, { className: "w-8 h-8 text-success-600" }) })] }) })] }), _jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-6 flex items-center", children: [_jsx("div", { className: "bg-success-100 p-2 rounded-lg mr-3", children: _jsx(Star, { className: "w-6 h-6 text-success-600" }) }), "Top Performing Clients"] }), _jsx("div", { className: "space-y-4", children: clients.slice(0, 3).map((client, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold", children: index + 1 }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900", children: client.company }), _jsx("p", { className: "text-sm text-gray-600", children: client.industry })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-bold text-success-600", children: [client.performanceMetrics.roas, "x ROAS"] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["$", client.performanceMetrics.totalRevenue.toLocaleString()] })] })] }, client.id))) })] })] })), activeTab === 'clients' && (_jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Client Management" }), _jsxs("button", { className: "btn-primary flex items-center space-x-2", children: [_jsx(Plus, { className: "w-5 h-5" }), _jsx("span", { children: "Add New Client" })] })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6", children: clients.map((client, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "card hover:shadow-xl hover:scale-105 transition-all duration-300 group", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors", children: client.company }), _jsx("p", { className: "text-sm text-gray-600", children: client.industry })] }), _jsx("div", { className: `w-3 h-3 rounded-full ${client.status === 'active' ? 'bg-success-500' :
                                                            client.status === 'paused' ? 'bg-warning-500' :
                                                                'bg-error-500'}` })] }), _jsxs("div", { className: "space-y-3 mb-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Monthly Budget" }), _jsxs("span", { className: "font-semibold text-gray-900", children: ["$", client.monthlyBudget.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600", children: "ROAS" }), _jsxs("span", { className: "font-semibold text-success-600", children: [client.performanceMetrics.roas, "x"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Your Commission" }), _jsxs("span", { className: "font-semibold text-primary-600", children: ["$", (client.performanceMetrics.totalRevenue * (partner.commissionRate / 100)).toLocaleString()] })] })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-100", children: [_jsxs("button", { className: "text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1", children: [_jsx(Eye, { className: "w-4 h-4" }), _jsx("span", { children: "View Dashboard" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 transition-colors", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-2 text-gray-400 hover:text-primary-600 transition-colors", children: _jsx(Settings, { className: "w-4 h-4" }) })] })] })] }, client.id))) })] })), activeTab === 'white-label' && whiteLabelSettings && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [_jsxs("h3", { className: "text-xl font-bold text-gray-900 mb-6 flex items-center", children: [_jsx("div", { className: "bg-primary-100 p-2 rounded-lg mr-3", children: _jsx(Palette, { className: "w-6 h-6 text-primary-600" }) }), "White Label Configuration"] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Company Name" }), _jsx("input", { type: "text", value: whiteLabelSettings.branding.companyName, onChange: (e) => setWhiteLabelSettings(prev => prev ? {
                                                                        ...prev,
                                                                        branding: { ...prev.branding, companyName: e.target.value }
                                                                    } : null), className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Primary Color" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "color", value: whiteLabelSettings.branding.primaryColor, onChange: (e) => setWhiteLabelSettings(prev => prev ? {
                                                                                ...prev,
                                                                                branding: { ...prev.branding, primaryColor: e.target.value }
                                                                            } : null), className: "w-12 h-12 border border-gray-300 rounded-lg" }), _jsx("input", { type: "text", value: whiteLabelSettings.branding.primaryColor, className: "flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500", readOnly: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Custom Domain" }), _jsx("input", { type: "text", value: whiteLabelSettings.branding.domain || '', placeholder: "ai.youragency.com", className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500" })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900", children: "Features & Customization" }), _jsx("div", { className: "space-y-4", children: [
                                                                { key: 'hideAdgenBranding', label: 'Hide AdGen Branding', desc: 'Remove all AdGen AI references' },
                                                                { key: 'customDomain', label: 'Custom Domain', desc: 'Use your domain for client access' },
                                                                { key: 'customReporting', label: 'Custom Reporting', desc: 'Branded reports and analytics' },
                                                                { key: 'customEmailTemplates', label: 'Custom Email Templates', desc: 'Branded email communications' }
                                                            ].map(feature => (_jsxs("label", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: feature.label }), _jsx("p", { className: "text-sm text-gray-600", children: feature.desc })] }), _jsx("input", { type: "checkbox", checked: whiteLabelSettings.features[feature.key], onChange: (e) => setWhiteLabelSettings(prev => prev ? {
                                                                            ...prev,
                                                                            features: { ...prev.features, [feature.key]: e.target.checked }
                                                                        } : null), className: "w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500" })] }, feature.key))) }), _jsx("button", { className: "w-full btn-primary", children: "Save Configuration" })] })] })] }), _jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-900 mb-4", children: "White Label Preview" }), _jsxs("div", { className: "bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center", children: _jsx(Zap, { className: "w-6 h-6 text-white" }) }), _jsx("span", { className: "text-xl font-bold", style: { color: whiteLabelSettings.branding.primaryColor }, children: whiteLabelSettings.branding.companyName })] }), _jsxs("p", { className: "text-gray-600", children: ["This is how your clients will see the platform with your branding applied.", whiteLabelSettings.features.hideAdgenBranding && ' AdGen AI branding will be completely hidden.'] })] })] })] })), activeTab === 'reports' && (_jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 mb-6", children: "Performance Reports" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "card text-center hover:shadow-xl transition-all duration-300", children: [_jsx(BarChart3, { className: "w-12 h-12 text-primary-600 mx-auto mb-4" }), _jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Monthly Performance" }), _jsx("p", { className: "text-gray-600 text-sm mb-4", children: "Comprehensive client performance analysis" }), _jsx("button", { className: "btn-secondary w-full", children: "Generate Report" })] }), _jsxs("div", { className: "card text-center hover:shadow-xl transition-all duration-300", children: [_jsx(DollarSign, { className: "w-12 h-12 text-success-600 mx-auto mb-4" }), _jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Commission Report" }), _jsx("p", { className: "text-gray-600 text-sm mb-4", children: "Detailed commission breakdown" }), _jsx("button", { className: "btn-secondary w-full", children: "Generate Report" })] }), _jsxs("div", { className: "card text-center hover:shadow-xl transition-all duration-300", children: [_jsx(Target, { className: "w-12 h-12 text-warning-600 mx-auto mb-4" }), _jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Client Health" }), _jsx("p", { className: "text-gray-600 text-sm mb-4", children: "Satisfaction and retention metrics" }), _jsx("button", { className: "btn-secondary w-full", children: "Generate Report" })] })] })] }))] }, activeTab)] }) }));
};
