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

// Fitness Social Platform Pages
import Feed from './pages/feed';
import Upload from './pages/upload';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Explore from './pages/explore';
import Store from './pages/store';
import Chat from './pages/chat';
import Builder from './pages/builder';

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
          {/* Original AdGenAI Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/adgen" element={<HomePage />} />
          <Route path="/adgen/dashboard" element={<EnhancedDashboard />} />
          <Route path="/adgen/pricing" element={<Pricing />} />
          <Route path="/adgen/compare/:slug" element={<ComparisonPage />} />
          <Route path="/adgen/autopsy/:slug" element={<AutopsyPage />} />
          <Route path="/adgen/migration" element={<div className="min-h-screen bg-gray-50 pt-20 py-12"><div className="max-w-4xl mx-auto px-4"><MigrationIntake /></div></div>} />
          <Route path="/adgen/auth/callback" element={<OAuthCallback />} />
          <Route path="/adgen/launch" element={<LaunchCommand />} />
          <Route path="/adgen/red-carpet" element={<RedCarpetShowcase />} />
          
          {/* Fitness Social Platform Routes */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/store" element={<Store />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;