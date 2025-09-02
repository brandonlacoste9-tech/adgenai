import React from 'react';
import { motion } from 'framer-motion';
import { Logo, LogoMark } from '../components/Logo';
import { Crown, Star, Sparkles, Award, Zap, Brain, Shield, Target } from 'lucide-react';

export const RedCarpetShowcase: React.FC = () => {
  const logoVariants = [
    {
      name: 'Primary Logo',
      description: 'The flagship identity for maximum impact',
      component: <Logo size="xl" variant="primary" />,
      background: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      name: 'Gradient Power',
      description: 'Premium gradient for hero sections',
      component: <Logo size="xl" variant="gradient" />,
      background: 'bg-gray-900',
      textColor: 'text-white'
    },
    {
      name: 'White Elegance',
      description: 'Clean white for dark backgrounds',
      component: <Logo size="xl" variant="white" />,
      background: 'bg-gradient-to-br from-primary-600 to-primary-800',
      textColor: 'text-white'
    },
    {
      name: 'Mark Only',
      description: 'Compact symbol for tight spaces',
      component: <LogoMark size="xl" variant="primary" />,
      background: 'bg-gray-50',
      textColor: 'text-gray-900'
    }
  ];

  const brandShowcase = [
    {
      icon: Brain,
      title: 'Intelligence',
      description: 'Neural network represents AI-powered marketing brain',
      color: 'text-primary-600 bg-primary-100'
    },
    {
      icon: Zap,
      title: 'Power',
      description: 'Lightning bolt symbolizes instant performance',
      color: 'text-warning-600 bg-warning-100'
    },
    {
      icon: Shield,
      title: 'Protection',
      description: 'Fraud detection shields your budget',
      color: 'text-success-600 bg-success-100'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Accurate targeting and attribution',
      color: 'text-error-600 bg-error-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 relative overflow-hidden">
      {/* Red Carpet Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-700/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
        
        {/* Spotlight effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-300/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-300/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-20 left-20 animate-bounce">
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Star className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="absolute bottom-32 left-16 animate-bounce" style={{ animationDelay: '1s' }}>
          <Crown className="w-10 h-10 text-yellow-300" />
        </div>
        <div className="absolute bottom-20 right-20 animate-bounce" style={{ animationDelay: '1.5s' }}>
          <Award className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grand Entrance Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-red-900 px-8 py-4 rounded-full text-lg font-bold mb-8 shadow-2xl animate-glow">
            <Crown className="w-6 h-6 mr-3 animate-bounce" />
            RED CARPET PREMIERE
            <Sparkles className="w-6 h-6 ml-3 animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 mb-8 text-shadow-lg animate-gradient-x">
            AdGen AI
          </h1>
          
          <p className="text-3xl md:text-4xl text-yellow-100 font-bold mb-4 text-shadow">
            The Full-Stack Marketing Brain
          </p>
          
          <p className="text-xl text-red-200 max-w-4xl mx-auto leading-relaxed">
            Presenting the most sophisticated AI marketing intelligence platform ever created. 
            Where performance meets perfection, and competitors meet their doom.
          </p>
        </motion.div>

        {/* Logo Showcase Theater */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-300 mb-4 text-shadow">
              Logo Showcase Theater
            </h2>
            <p className="text-xl text-red-200">
              Four stunning variations of our iconic brand identity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {logoVariants.map((variant, index) => (
              <motion.div
                key={variant.name}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="group perspective-1000"
              >
                <div className="relative transform-gpu transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-12 group-hover:shadow-2xl">
                  {/* Spotlight effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 via-yellow-300/30 to-yellow-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  
                  {/* Main showcase card */}
                  <div className={`relative ${variant.background} rounded-3xl p-12 border-4 border-yellow-400/30 shadow-2xl backdrop-blur-sm group-hover:border-yellow-300 transition-all duration-500`}>
                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Star className="w-6 h-6 text-yellow-400 animate-spin" />
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    </div>
                    
                    {/* Logo display */}
                    <div className="flex justify-center mb-8 group-hover:scale-125 transition-transform duration-500">
                      {variant.component}
                    </div>
                    
                    {/* Variant info */}
                    <div className={`text-center ${variant.textColor}`}>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                        {variant.name}
                      </h3>
                      <p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {variant.description}
                      </p>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/10 via-yellow-300/20 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand Symbolism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-300 mb-4 text-shadow">
              Brand Symbolism & Meaning
            </h2>
            <p className="text-xl text-red-200">
              Every element tells the story of marketing intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandShowcase.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.2 + index * 0.15,
                    type: "spring",
                    stiffness: 120
                  }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-300 hover:bg-white/20 hover:scale-110 transition-all duration-500 group"
                >
                  <div className={`inline-flex p-4 rounded-2xl mb-4 ${item.color} group-hover:scale-125 transition-transform duration-500`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-300 mb-2 group-hover:text-yellow-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-red-200 text-sm leading-relaxed group-hover:text-red-100 transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Grand Finale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-yellow-500/20 animate-gradient-x"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 left-4 animate-bounce">
                <Star className="w-6 h-6 text-red-600" />
              </div>
              <div className="absolute top-8 right-8 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Crown className="w-8 h-8 text-red-700" />
              </div>
              <div className="absolute bottom-6 left-8 animate-bounce" style={{ animationDelay: '1s' }}>
                <Award className="w-7 h-7 text-red-600" />
              </div>
              <div className="absolute bottom-4 right-6 animate-bounce" style={{ animationDelay: '1.5s' }}>
                <Sparkles className="w-6 h-6 text-red-700" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Logo size="xl" variant="gradient" />
                </motion.div>
              </div>
              
              <h3 className="text-4xl font-bold text-red-900 mb-4">
                The Logo That Conquers Markets
              </h3>
              <p className="text-xl text-red-800 mb-8 max-w-3xl mx-auto">
                More than just a symbol - it's the visual representation of marketing intelligence 
                that strikes fear into competitors and inspires confidence in customers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-800/20 backdrop-blur-sm rounded-xl p-6 border border-red-600/30">
                  <Brain className="w-12 h-12 text-red-700 mx-auto mb-3" />
                  <h4 className="font-bold text-red-900 mb-2">Neural Intelligence</h4>
                  <p className="text-red-800 text-sm">Connected nodes represent our AI brain network</p>
                </div>
                
                <div className="bg-red-800/20 backdrop-blur-sm rounded-xl p-6 border border-red-600/30">
                  <Zap className="w-12 h-12 text-red-700 mx-auto mb-3" />
                  <h4 className="font-bold text-red-900 mb-2">Lightning Performance</h4>
                  <p className="text-red-800 text-sm">Central bolt shows instant AI-powered results</p>
                </div>
                
                <div className="bg-red-800/20 backdrop-blur-sm rounded-xl p-6 border border-red-600/30">
                  <Target className="w-12 h-12 text-red-700 mx-auto mb-3" />
                  <h4 className="font-bold text-red-900 mb-2">Data Flow</h4>
                  <p className="text-red-800 text-sm">Animated indicators show continuous learning</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Awards */}
        <div className="absolute top-32 left-8 animate-float">
          <div className="bg-yellow-400 text-red-900 p-4 rounded-full shadow-2xl">
            <Crown className="w-8 h-8" />
          </div>
        </div>
        <div className="absolute top-48 right-12 animate-float" style={{ animationDelay: '1s' }}>
          <div className="bg-yellow-300 text-red-900 p-4 rounded-full shadow-2xl">
            <Award className="w-8 h-8" />
          </div>
        </div>
        <div className="absolute bottom-40 left-16 animate-float" style={{ animationDelay: '2s' }}>
          <div className="bg-yellow-400 text-red-900 p-4 rounded-full shadow-2xl">
            <Star className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};