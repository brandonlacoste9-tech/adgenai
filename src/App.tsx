import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { AppHeader } from './components/AppHeader';
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
import SplashScreen from './components/SplashScreen';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Features />
    <Testimonials />
    <Pricing />
  </>
);

const AuroraHomePage: React.FC = () => (
  <div className="min-h-screen relative overflow-hidden">
    {/* Aurora Background for main content */}
    <div 
      className="fixed inset-0 z-0"
      style={{ 
        background: 'linear-gradient(180deg, #0a0f1c 0%, #1a1f3a 50%, #2a2f4a 100%)',
      }}
    >
      <div className="aurora-background">
        <div className="aurora-layer aurora-layer-1"></div>
        <div className="aurora-layer aurora-layer-2"></div>
        <div className="aurora-layer aurora-layer-3"></div>
        <div className="aurora-shimmer"></div>
        <div className="stars-overlay"></div>
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 gradient-shift"
            style={{
              background: 'linear-gradient(45deg, #10b981, #06b6d4, #a855f7, #22c55e)',
              backgroundSize: '400% 400%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 30px rgba(16, 185, 129, 0.5)'
            }}
          >
            Northern Ventures
          </h1>
          
          <p className="text-2xl md:text-3xl text-cyan-100 mb-12 opacity-90">
            Illuminating Innovation in the Digital Aurora
          </p>
          
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-cyan-200 opacity-80 max-w-2xl mx-auto">
              Harnessing the power of artificial intelligence to create stunning advertising experiences that shimmer with possibility and dance with innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                Begin Your Journey
              </button>
              
              <button 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/30"
              >
                Explore Solutions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [auroraMode, setAuroraMode] = useState(false);

  useEffect(() => {
    // Check if this is the first visit or if we should show aurora mode
    const hasVisited = localStorage.getItem('northern-ventures-visited');
    if (!hasVisited) {
      setAuroraMode(true);
      localStorage.setItem('northern-ventures-visited', 'true');
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash && auroraMode) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const headerVariant = auroraMode ? 'aurora' : 'default';
  const HeaderComponent = auroraMode ? AppHeader : Header;

  return (
    <div className={`min-h-screen ${auroraMode ? 'bg-slate-900' : 'bg-white'}`}>
      <HeaderComponent isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} variant={headerVariant} />
      <main>
        <Routes>
          <Route path="/" element={auroraMode ? <AuroraHomePage /> : <HomePage />} />
          <Route path="/dashboard" element={<EnhancedDashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/compare/:slug" element={<ComparisonPage />} />
          <Route path="/autopsy/:slug" element={<AutopsyPage />} />
          <Route path="/migration" element={<div className="min-h-screen bg-gray-50 pt-20 py-12"><div className="max-w-4xl mx-auto px-4"><MigrationIntake /></div></div>} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/launch" element={<LaunchCommand />} />
          <Route path="/red-carpet" element={<RedCarpetShowcase />} />
        </Routes>
      </main>
      {!auroraMode && <Footer />}
    </div>
  );
}

export default App;