import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface AppHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  variant?: 'default' | 'aurora';
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  variant = 'default' 
}) => {
  const isAurora = variant === 'aurora';

  return (
    <header 
      className={`${
        isAurora 
          ? 'bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
      } sticky top-0 z-40 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            {isAurora ? (
              // Northern Ventures Aurora Logo
              <div className="relative">
                <img
                  src="/branding/logo-nv-static.svg"
                  alt="Northern Ventures"
                  className="w-10 h-10 transition-all duration-300 group-hover:scale-110"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                    filter: 'blur(10px)'
                  }}
                ></div>
              </div>
            ) : (
              // Default AdGenAI Logo
              <div className="w-10 h-10 relative">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="3" opacity="0.3" />
                  <circle cx="50" cy="50" r="18" fill="url(#headerLogoGradient)" />
                  <path d="M45 40 L52 40 L48 50 L55 50 L48 60 L52 60 L45 60 Z" fill="white" transform="translate(0, -5)" />
                </svg>
              </div>
            )}
            
            <span 
              className={`font-bold text-xl transition-all duration-300 group-hover:scale-105 ${
                isAurora 
                  ? 'text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text' 
                  : 'text-gray-900'
              }`}
            >
              {isAurora ? 'Northern Ventures' : 'AdGen AI'}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                isAurora 
                  ? 'text-cyan-100 hover:text-cyan-300' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Dashboard
              {isAurora && (
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
            
            <Link 
              to="/autopsy/templated-campaign-fatigue" 
              className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                isAurora 
                  ? 'text-cyan-100 hover:text-cyan-300' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              AI Ad Autopsy
              {isAurora && (
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
            
            <Link 
              to="/pricing" 
              className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                isAurora 
                  ? 'text-cyan-100 hover:text-cyan-300' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Pricing
              {isAurora && (
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
            
            <Link 
              to="/launch" 
              className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                isAurora 
                  ? 'text-cyan-100 hover:text-cyan-300' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Launch
              {isAurora && (
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
            
            <Link 
              to="/red-carpet" 
              className={`font-medium transition-all duration-300 hover:scale-105 relative ${
                isAurora 
                  ? 'text-cyan-100 hover:text-cyan-300' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              🎭 Red Carpet
              {isAurora && (
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Link>
            
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 relative overflow-hidden ${
                isAurora 
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white' 
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white'
              }`}
            >
              <a href="/migration" className="block">
                {isAurora ? 'Start Innovation' : 'Start Free Migration'}
              </a>
              
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 shimmer"
              ></div>
            </button>
          </nav>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isAurora 
                ? 'hover:bg-cyan-500/20 text-cyan-100' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className={`md:hidden transition-all duration-300 ${
            isAurora 
              ? 'bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/20' 
              : 'bg-white border-t border-gray-100'
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/dashboard" 
              className={`block font-medium transition-colors ${
                isAurora 
                  ? 'text-cyan-100 hover:text-cyan-300' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/pricing" 
              className={`block font-medium transition-colors ${
                isAurora 
                  ? 'text-cyan-100 hover:text-cyan-300' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Pricing
            </Link>
            <button 
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isAurora 
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white' 
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white'
              }`}
            >
              {isAurora ? 'Start Innovation' : 'Start Free Trial'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};