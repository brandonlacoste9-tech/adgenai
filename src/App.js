import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { EnhancedDashboard } from './components/EnhancedDashboard';
import { ComparisonPage } from './pages/ComparisonPage';
import { AutopsyPage } from './pages/AutopsyPage';
import { MigrationIntake } from './components/MigrationIntake';
import { OAuthCallback } from './components/OAuthCallback';
import { Footer } from './components/Footer';
import { LaunchCommand } from './pages/LaunchCommand';
import { RedCarpetShowcase } from './pages/RedCarpetShowcase';
const HomePage = () => (_jsxs(_Fragment, { children: [_jsx(Hero, {}), _jsx(Features, {}), _jsx(Testimonials, {}), _jsx(Pricing, {})] }));
function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsx(Header, { isMenuOpen: isMenuOpen, setIsMenuOpen: setIsMenuOpen }), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(EnhancedDashboard, {}) }), _jsx(Route, { path: "/pricing", element: _jsx(Pricing, {}) }), _jsx(Route, { path: "/compare/:slug", element: _jsx(ComparisonPage, {}) }), _jsx(Route, { path: "/autopsy/:slug", element: _jsx(AutopsyPage, {}) }), _jsx(Route, { path: "/migration", element: _jsx("div", { className: "min-h-screen bg-gray-50 pt-20 py-12", children: _jsx("div", { className: "max-w-4xl mx-auto px-4", children: _jsx(MigrationIntake, {}) }) }) }), _jsx(Route, { path: "/auth/callback", element: _jsx(OAuthCallback, {}) }), _jsx(Route, { path: "/launch", element: _jsx(LaunchCommand, {}) }), _jsx(Route, { path: "/red-carpet", element: _jsx(RedCarpetShowcase, {}) })] }) }), _jsx(Footer, {})] }));
}
export default App;
