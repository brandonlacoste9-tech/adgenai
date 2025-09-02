import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo size="md" variant="gradient" showText={true} className="group-hover:scale-110 transition-all duration-300" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Dashboard
            </Link>
            <Link to="/autopsy/templated-campaign-fatigue" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              AI Ad Autopsy
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Pricing
            </Link>
            <Link to="/launch" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Launch
            </Link>
            <Link to="/red-carpet" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              🎭 Red Carpet
            </Link>
            <button className="btn-primary animate-glow">
              <a href="/migration" className="block">Start Free Migration</a>
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <Link to="/dashboard" className="block text-gray-600 hover:text-primary-600 font-medium">
              Dashboard
            </Link>
            <Link to="/pricing" className="block text-gray-600 hover:text-primary-600 font-medium">
              Pricing
            </Link>
            <button className="btn-primary w-full">
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};