import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { EnhancedDashboard } from './components/EnhancedDashboard';
import { ChatInterface } from './components/ChatInterface';
import { TestBotAd } from './components/TestBotAd';
import { ComparisonPage } from './pages/ComparisonPage';
import { AutopsyPage } from './pages/AutopsyPage';
import { MigrationIntake } from './components/MigrationIntake';
import { OAuthCallback } from './components/OAuthCallback';
import { Footer } from './components/Footer';
import { LaunchCommand } from './pages/LaunchCommand';
import { RedCarpetShowcase } from './pages/RedCarpetShowcase';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Features />
    <Testimonials />
    <Pricing />
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
          <Route path="/chat" element={<div className="min-h-screen bg-gray-50 pt-20 py-12"><ChatInterface /></div>} />
          <Route path="/test" element={<div className="min-h-screen pt-20"><TestBotAd /></div>} />
          <Route path="/pricing" element={<Pricing />} />
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