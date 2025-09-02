import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Target, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Built for Performance, Not Just Pretty Pictures
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              The Full-Stack
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent block">
                Marketing Brain
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Generate high-converting ad creatives with integrated fraud detection, 
              performance prediction, and attribution analysis. Stop wasting budget on 
              templated designs and start optimizing for ROI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="btn-primary text-lg px-8 py-4">
              <a href="/migration" className="block">Start Free Migration - No Credit Card</a>
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              <a href="/compare/adcreative-ai-alternative" className="block">See Comparison</a>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-success-100 p-4 rounded-full mb-4">
                <Shield className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fraud Protection</h3>
              <p className="text-gray-600">
                Built-in fraud detection saves up to $84B in wasted ad spend annually
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary-100 p-4 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Prediction</h3>
              <p className="text-gray-600">
                AI-powered performance scores predict success before you spend
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-warning-100 p-4 rounded-full mb-4">
                <Target className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Attribution Analysis</h3>
              <p className="text-gray-600">
                Multi-touch attribution across all platforms and touchpoints
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};