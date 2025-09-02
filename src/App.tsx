import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CompetitorComparison } from './components/CompetitorComparison';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Dashboard } from './components/Dashboard';
import { ComparisonPage } from './pages/ComparisonPage';
import { AutopsyPage } from './pages/AutopsyPage';
import { MigrationIntake } from './components/MigrationIntake';
import { AgencyPartnerOnePager } from './components/AgencyPartnerOnePager';
import { AgencyManagementDashboard } from './components/AgencyManagementDashboard';
import { CMSDashboard } from './components/CMSDashboard';
import { PerformancePredictionDemo } from './components/PerformancePredictionDemo';
import { Footer } from './components/Footer';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Features />
    <CompetitorComparison />
    <Testimonials />
    <Pricing />
  </>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/compare/:slug" element={<ComparisonPage />} />
            <Route path="/autopsy/:slug" element={<AutopsyPage />} />
            <Route path="/migration" element={<div className="min-h-screen bg-gray-50 pt-20 py-12"><div className="max-w-4xl mx-auto px-4"><MigrationIntake /></div></div>} />
            <Route path="/agency-partners" element={<div className="min-h-screen bg-gray-50 pt-20"><AgencyPartnerOnePager /></div>} />
            <Route path="/agency-dashboard" element={<AgencyManagementDashboard />} />
            <Route path="/cms" element={<CMSDashboard />} />
            <Route path="/demo" element={<div className="min-h-screen bg-gray-50 pt-20 py-12"><PerformancePredictionDemo /></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;