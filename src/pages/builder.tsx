import React, { useState } from 'react';
import { Zap, Sparkles, Rocket, Code, Smartphone, Globe, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: 'fitness' | 'social' | 'productivity' | 'ecommerce';
  icon: React.ReactNode;
  estimatedTime: string;
  features: string[];
  preview: string;
}

interface BuildRequest {
  prompt: string;
  template?: string;
  features: string[];
  platform: 'web' | 'mobile' | 'both';
  complexity: 'simple' | 'medium' | 'advanced';
}

const Builder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [platform, setPlatform] = useState<'web' | 'mobile' | 'both'>('web');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  const templates: AppTemplate[] = [
    {
      id: 'fitness-tracker',
      name: 'Fitness Tracker',
      description: 'Personal workout and progress tracking app',
      category: 'fitness',
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      estimatedTime: '5-10 minutes',
      features: ['Workout Logging', 'Progress Charts', 'Goal Setting', 'Streak Tracking'],
      preview: '/previews/fitness-tracker.jpg'
    },
    {
      id: 'social-feed',
      name: 'Social Feed',
      description: 'Social media feed with posts and interactions',
      category: 'social',
      icon: <Globe className="w-8 h-8 text-pink-500" />,
      estimatedTime: '10-15 minutes',
      features: ['Post Creation', 'Like & Comment', 'User Profiles', 'Real-time Feed'],
      preview: '/previews/social-feed.jpg'
    },
    {
      id: 'habit-ritual',
      name: 'Habit Ritual',
      description: 'Daily habit tracking with streaks and rewards',
      category: 'productivity',
      icon: <Settings className="w-8 h-8 text-green-500" />,
      estimatedTime: '7-12 minutes',
      features: ['Daily Check-ins', 'Habit Streaks', 'Reward System', 'Analytics'],
      preview: '/previews/habit-ritual.jpg'
    },
    {
      id: 'crypto-store',
      name: 'Crypto Store',
      description: 'E-commerce with crypto payments',
      category: 'ecommerce',
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      estimatedTime: '15-20 minutes',
      features: ['Product Catalog', 'USDC Payments', 'Order Tracking', 'User Dashboard'],
      preview: '/previews/crypto-store.jpg'
    }
  ];

  const availableFeatures = [
    'User Authentication',
    'Real-time Notifications',
    'Social Sharing',
    'Payment Integration',
    'Analytics Dashboard',
    'Push Notifications',
    'Dark Mode',
    'Multi-language Support',
    'Offline Functionality',
    'AI Recommendations',
    'Video/Image Upload',
    'Chat/Messaging',
    'Subscription Management',
    'Export Data',
    'Admin Panel'
  ];

  const handleBuild = async () => {
    setIsBuilding(true);
    setBuildProgress(0);

    // Simulate build process
    const steps = [
      'Analyzing prompt...',
      'Generating app structure...',
      'Creating components...',
      'Setting up database...',
      'Configuring features...',
      'Building UI...',
      'Testing functionality...',
      'Deploying app...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBuildProgress(((i + 1) / steps.length) * 100);
    }

    // Mock completion
    setTimeout(() => {
      setIsBuilding(false);
      setBuildProgress(0);
      alert('🚀 Your app has been built successfully! Check your dashboard for the live link.');
    }, 1000);
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const renderTemplate = (template: AppTemplate) => (
    <motion.div
      key={template.id}
      whileHover={{ y: -5 }}
      onClick={() => setSelectedTemplate(template.id)}
      className={`bg-white rounded-2xl p-6 cursor-pointer transition-all border-2 ${
        selectedTemplate === template.id
          ? 'border-purple-500 shadow-xl'
          : 'border-gray-200 hover:border-gray-300 shadow-lg'
      }`}
    >
      <div className="flex items-center space-x-4 mb-4">
        {template.icon}
        <div>
          <h3 className="font-bold text-lg text-gray-900">{template.name}</h3>
          <p className="text-sm text-gray-600">{template.description}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">Features included:</div>
        <div className="flex flex-wrap gap-2">
          {template.features.map(feature => (
            <span
              key={feature}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div className="text-sm text-purple-600 font-medium">
        ⏱️ {template.estimatedTime}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              SwarmStarter 🚀
            </h1>
            <p className="text-gray-600 text-lg">AI-Powered App Builder</p>
            <p className="text-sm text-gray-500 mt-2">
              Describe your idea and watch it come to life in minutes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Prompt Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ✨ Describe Your App Idea
          </h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I want to build an app that helps people track their daily water intake with reminders and progress visualization..."
            className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Be specific about features, design, and functionality
            </div>
            <div className="text-sm text-gray-400">
              {prompt.length}/500 characters
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              🎯 Choose a Starting Template (Optional)
            </h2>
            <button
              onClick={() => setSelectedTemplate('')}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              Clear Selection
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map(renderTemplate)}
          </div>
        </div>

        {/* Platform Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📱 Target Platform
          </h2>
          <div className="flex space-x-4">
            {[
              { id: 'web', name: 'Web App', icon: Globe, desc: 'Browser-based application' },
              { id: 'mobile', name: 'Mobile App', icon: Smartphone, desc: 'iOS & Android native' },
              { id: 'both', name: 'Both', icon: Code, desc: 'Web + Mobile apps' }
            ].map(({ id, name, icon: Icon, desc }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setPlatform(id as any)}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  platform === id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-gray-600">{desc}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ⚡ Additional Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableFeatures.map(feature => (
              <motion.button
                key={feature}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleFeature(feature)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  selectedFeatures.includes(feature)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {feature}
              </motion.button>
            ))}
          </div>
          {selectedFeatures.length > 0 && (
            <div className="mt-4 p-3 bg-purple-50 rounded-xl">
              <div className="text-sm font-medium text-purple-700 mb-2">
                Selected Features ({selectedFeatures.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFeatures.map(feature => (
                  <span
                    key={feature}
                    className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Build Button & Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AnimatePresence mode="wait">
            {!isBuilding ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Ready to Build Your App?
                  </h3>
                  <p className="text-gray-600">
                    Our AI will analyze your requirements and generate a fully functional app
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuild}
                  disabled={!prompt.trim()}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    prompt.trim()
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl hover:shadow-2xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Rocket className="w-6 h-6 inline mr-3" />
                  Start Building with SwarmStarter AI
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto mb-4"
                  >
                    <Sparkles className="w-16 h-16 text-purple-600" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Building Your App...
                  </h3>
                  <p className="text-gray-600">
                    AI is working its magic ✨
                  </p>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full"
                    animate={{ width: `${buildProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div className="text-sm text-gray-600">
                  {Math.round(buildProgress)}% Complete
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Info */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">
              🚀 Launch Muse / Launch Bro Badge
            </h3>
            <p className="text-purple-100 mb-4">
              Build your first app and unlock exclusive creator badges!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="font-semibold">Free Tier</div>
                <div className="text-purple-100">1 app build/month</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="font-semibold">Pro Tier</div>
                <div className="text-purple-100">Unlimited builds</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="font-semibold">Team Tier</div>
                <div className="text-purple-100">Collaboration tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;