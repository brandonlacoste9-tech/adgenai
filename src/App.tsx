import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { BrandAwareHero } from './components/BrandAwareHero';
import { BrandAwareSEO } from './components/BrandAwareSEO';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import BrandAwarePricing from './components/BrandAwarePricing';
import { EnhancedDashboard } from './components/EnhancedDashboard';
import { ComparisonPage } from './pages/ComparisonPage';
import { AutopsyPage } from './pages/AutopsyPage';
import { MigrationIntake } from './components/MigrationIntake';
import { OAuthCallback } from './components/OAuthCallback';
import { Footer } from './components/Footer';
import { LaunchCommand } from './pages/LaunchCommand';
import { RedCarpetShowcase } from './pages/RedCarpetShowcase';
import { BrandTestPage } from './pages/BrandTestPage';

const HomePage: React.FC = () => (
  <>
    <BrandAwareSEO />
    <BrandAwareHero />
    <Features />
    <Testimonials />
    <BrandAwarePricing />
  </>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<EnhancedDashboard />} />
          <Route path="/brand-test" element={<BrandTestPage />} />
          <Route path="/pricing" element={
            <>
              <BrandAwareSEO title="Pricing" description="Transparent pricing for AI-powered advertising solutions" />
              <BrandAwarePricing />
            </>
          } />
          <Route path="/compare/:slug" element={<ComparisonPage />} />
          <Route path="/autopsy/:slug" element={<AutopsyPage />} />
          <Route path="/migration" element={<div className="min-h-screen bg-gray-50 pt-20 py-12"><div className="max-w-4xl mx-auto px-4"><MigrationIntake /></div></div>} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/launch" element={<LaunchCommand />} />
          <Route path="/red-carpet" element={<RedCarpetShowcase />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;