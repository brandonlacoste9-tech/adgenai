import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Target, Zap, Users, BarChart3 } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Ad Fraud Annihilation',
      description: 'Built-in fraud detection saves up to $84B in wasted ad spend. Protect your budget before fraudulent traffic drains your ROI.',
      stats: 'Saves avg. $2,847/month',
      color: 'success'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Performance Engine',
      description: 'AI-powered performance scores predict campaign success before you spend a dollar. Eliminate guesswork from your creative strategy.',
      stats: '94% prediction accuracy',
      color: 'primary'
    },
    {
      icon: Target,
      title: 'Multi-Touch Attribution',
      description: 'Track the complete customer journey across all touchpoints. See exactly which creatives drive revenue, not just clicks.',
      stats: '5 attribution models',
      color: 'warning'
    },
    {
      icon: Zap,
      title: 'Brand Voice Consistency',
      description: 'AI learns your brand identity from your website and guidelines. Every creative maintains perfect brand alignment automatically.',
      stats: '99% brand consistency',
      color: 'primary'
    },
    {
      icon: Users,
      title: 'Automated A/B Testing',
      description: 'Generate variations, launch tests, and get statistical significance alerts automatically. Optimize performance without manual effort.',
      stats: '3x faster optimization',
      color: 'success'
    },
    {
      icon: BarChart3,
      title: 'Cross-Platform Intelligence',
      description: 'Unified insights across Facebook, Google, TikTok, and more. Break free from platform silos and see the complete picture.',
      stats: '12+ platforms supported',
      color: 'warning'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return 'bg-success-100 text-success-600';
      case 'warning':
        return 'bg-warning-100 text-warning-600';
      default:
        return 'bg-primary-100 text-primary-600';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Full-Stack Marketing Brain
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beyond creative generation. We manage the entire performance lifecycle 
            of your ad assets from prediction to attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-full mb-6 ${getColorClasses(feature.color)} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-primary-600">
                    {feature.stats}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Annihilate Your Competition?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join the performance marketers who've already switched from overpriced, 
              unreliable competitors to the future of AI advertising.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};