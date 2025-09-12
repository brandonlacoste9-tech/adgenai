import React from 'react';
import { motion } from 'framer-motion';
import { useBrand } from '../brand/BrandingProvider';
import { Shield, TrendingUp, Target, Zap, ArrowRight } from 'lucide-react';

export const BrandAwareHero: React.FC = () => {
  const { config } = useBrand();

  const stats = [
    { label: 'Fraud Savings', value: '$84B+', description: 'Protected annually' },
    { label: 'Performance Boost', value: '45%', description: 'Average ROAS increase' },
    { label: 'Time Saved', value: '90%', description: 'Faster than competitors' },
  ];

  return (
    <section 
      className="relative pt-20 pb-32 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${config.colors.bg} 0%, ${config.colors.primary} 100%)` }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full filter blur-xl animate-float"
             style={{ backgroundColor: config.colors.accent }}></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full filter blur-xl animate-float" 
             style={{ backgroundColor: config.colors.secondary, animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full filter blur-xl animate-float" 
             style={{ backgroundColor: config.colors.highlight, animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            {/* Logo */}
            <div className="mb-8">
              <img 
                src={config.logo} 
                alt={`${config.name} logo`} 
                className="h-12 mx-auto mb-8"
                onError={(e) => {
                  // Fallback to text if logo doesn't exist
                  e.currentTarget.style.display = 'none';
                  const textLogo = document.createElement('div');
                  textLogo.textContent = config.name;
                  textLogo.className = 'text-2xl font-bold mb-8';
                  textLogo.style.color = config.colors.accent;
                  e.currentTarget.parentNode?.appendChild(textLogo);
                }}
              />
            </div>

            <div 
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              style={{ 
                backgroundColor: `${config.colors.accent}20`,
                color: config.colors.accent,
                border: `1px solid ${config.colors.accent}30`
              }}
            >
              <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              🔥 BOOM! LAUNCHED! Competitors fleeing in terror!
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              style={{ color: config.colors.light }}
            >
              {config.copy.heroH1}
              <span 
                className="block animate-pulse"
                style={{ 
                  background: `linear-gradient(45deg, ${config.colors.accent}, ${config.colors.secondary}, ${config.colors.highlight})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {config.copy.heroH2}
              </span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed"
              style={{ color: config.colors.light, opacity: 0.9 }}
            >
              Generate high-converting ad creatives with integrated{' '}
              <span className="font-semibold" style={{ color: config.colors.secondary }}>fraud detection</span>,{' '}
              <span className="font-semibold" style={{ color: config.colors.accent }}>performance prediction</span>, and{' '}
              <span className="font-semibold" style={{ color: config.colors.highlight }}>attribution analysis</span>.{' '}
              Stop wasting budget on templated designs.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
              style={{ 
                backgroundColor: config.colors.accent,
                color: config.colors.bg,
              }}
            >
              Start Free Trial
            </button>
            <button 
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 border-2"
              style={{ 
                borderColor: config.colors.accent,
                color: config.colors.accent,
                backgroundColor: 'transparent'
              }}
            >
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: config.colors.accent }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-lg font-semibold mb-1"
                  style={{ color: config.colors.light }}
                >
                  {stat.label}
                </div>
                <div 
                  className="text-sm"
                  style={{ color: config.colors.light, opacity: 0.7 }}
                >
                  {stat.description}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};