import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu, X, User, Settings, Link2, LogOut, Crown } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { subscription, loading } = useSubscription();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow animate-scale-pulse">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">AdGen AI</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Dashboard
            </Link>
            <Link to="/demo" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              AI Demo
            </Link>
            <Link to="/autopsy/templated-campaign-fatigue" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              AI Ad Autopsy
            </Link>
            <Link to="/cms" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Content
            </Link>
            <Link to="/analytics" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Analytics
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Community
            </Link>
            <Link to="/ml-dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              ML Intelligence
            </Link>
            <Link to="/agency-partners" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Partners
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Pricing
            </Link>
            <Link to="/share/adgenai" className="text-gray-600 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 hover:text-shadow relative">
              Share
            </Link>
            
            {/* User Menu */}
            {!loading && (
              <div className="flex items-center space-x-4">
                {subscription ? (
                  <div className="relative user-menu-container">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {subscription.full_name || subscription.email}
                        </div>
                        <div className="flex items-center space-x-1">
                          {subscription.plan_type !== 'free' && (
                            <Crown className="w-3 h-3 text-yellow-500" />
                          )}
                          <span className="text-xs text-gray-500 capitalize">
                            {subscription.plan_type}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {subscription.full_name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500">{subscription.email}</p>
                        </div>
                        
                        <Link
                          to="/account-settings"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </Link>
                        
                        <Link
                          to="/account-linking"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Link2 className="w-4 h-4" />
                          <span>Linked Accounts</span>
                        </Link>
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={handleSignIn}
                    className="btn-primary animate-glow"
                  >
                    Sign In
                  </button>
                )}
              </div>
            )}
            
            {!subscription && (
              <button className="btn-primary animate-glow">
                <a href="/migration" className="block">Start Free Migration</a>
              </button>
            )}
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
            <Link to="/demo" className="block text-gray-600 hover:text-primary-600 font-medium">
              AI Demo
            </Link>
            <Link to="/cms" className="block text-gray-600 hover:text-primary-600 font-medium">
              Content
            </Link>
            <Link to="/pricing" className="block text-gray-600 hover:text-primary-600 font-medium">
              Pricing
            </Link>
            
            {subscription && (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {subscription.full_name || subscription.email}
                    </span>
                    {subscription.plan_type !== 'free' && (
                      <Crown className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <Link 
                    to="/account-linking" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 font-medium mb-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Linked Accounts</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
            
            {!subscription && (
              <>
                <button 
                  onClick={() => {
                    handleSignIn();
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary w-full mb-2"
                >
                  Sign In
                </button>
                <button className="btn-primary w-full">
                  Start Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};