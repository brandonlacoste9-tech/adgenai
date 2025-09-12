import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StarsBackground } from '../components/StarsBackground';
import { BusinessAssistantTabs } from '../components/BusinessAssistantTabs';

export const BrainPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stars Background */}
      <StarsBackground />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <Link
                to="/"
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Home</span>
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                  <Brain className="w-10 h-10 text-blue-400 relative z-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">AdGenAI Brain</h1>
                  <p className="text-sm text-gray-300">Neural Business Intelligence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-4 sm:px-6 lg:px-8 pb-16"
        >
          <div className="max-w-7xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full"></div>
              <h2 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                NeuroSphere
              </h2>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              <p className="text-xl text-gray-300 font-light">
                Advanced AI Business Intelligence Platform
              </p>
              <Zap className="w-6 h-6 text-blue-400 animate-bounce" />
            </div>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Harness the power of artificial intelligence to transform your business operations. 
              From content creation to strategic planning, our neural network adapts to your needs.
            </p>
          </div>
        </motion.section>

        {/* Main Business Assistant */}
        <motion.main
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-4 sm:px-6 lg:px-8 pb-20"
        >
          <BusinessAssistantTabs />
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-blue-400" />
                <span className="text-white font-semibold">AdGenAI NeuroSphere</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">BETA</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Powered by Advanced AI</span>
                <span>•</span>
                <span>Enterprise Ready</span>
                <span>•</span>
                <span>99.9% Uptime</span>
              </div>
              
              <div className="text-sm text-gray-500">
                © 2024 AdGenAI. Neural Intelligence Platform.
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};