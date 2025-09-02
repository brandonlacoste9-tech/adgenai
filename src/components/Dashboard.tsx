import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SubscriptionStatus } from './SubscriptionStatus';
import { useSubscription } from '../hooks/useSubscription';
import { Plus, Shield, TrendingUp, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import type { AdCreative, FraudAnalysis, PerformancePrediction } from '../types';

export const Dashboard: React.FC = () => {
  const [selectedAd, setSelectedAd] = useState<AdCreative | null>(null);
  const { isPro, isEnterprise, isPaid } = useSubscription();

  const mockAds: AdCreative[] = [
    {
      id: '1',
      title: 'Summer Sale Campaign',
      description: 'High-converting summer promotion for e-commerce',
      imageUrl: 'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'facebook',
      performanceScore: 92,
      fraudScore: 15,
      status: 'active',
      createdAt: new Date(),
      metrics: {
        impressions: 125000,
        clicks: 3750,
        conversions: 187,
        ctr: 3.0,
        cpa: 12.50,
        roas: 4.2
      }
    },
    {
      id: '2',
      title: 'Product Launch Teaser',
      description: 'Brand awareness campaign for new product line',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'instagram',
      performanceScore: 87,
      fraudScore: 8,
      status: 'active',
      createdAt: new Date(),
      metrics: {
        impressions: 89000,
        clicks: 2670,
        conversions: 134,
        ctr: 3.0,
        cpa: 15.75,
        roas: 3.8
      }
    },
    {
      id: '3',
      title: 'Retargeting Campaign',
      description: 'Cart abandonment recovery with urgency messaging',
      imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'google',
      performanceScore: 78,
      fraudScore: 45,
      status: 'paused',
      createdAt: new Date(),
      metrics: {
        impressions: 45000,
        clicks: 900,
        conversions: 27,
        ctr: 2.0,
        cpa: 22.30,
        roas: 2.1
      }
    }
  ];

  const getFraudAnalysis = (score: number): FraudAnalysis => {
    if (score <= 20) {
      return {
        score,
        riskLevel: 'low',
        factors: ['Clean traffic patterns', 'Verified user behavior', 'Low bot activity'],
        recommendation: 'Campaign is safe to scale'
      };
    } else if (score <= 40) {
      return {
        score,
        riskLevel: 'medium',
        factors: ['Some suspicious activity', 'Mixed traffic quality', 'Monitor closely'],
        recommendation: 'Continue with caution, implement additional filters'
      };
    } else {
      return {
        score,
        riskLevel: 'high',
        factors: ['High bot activity detected', 'Suspicious click patterns', 'Low-quality traffic'],
        recommendation: 'Pause campaign and refine targeting'
      };
    }
  };

  const getPerformancePrediction = (score: number): PerformancePrediction => {
    return {
      score,
      expectedCtr: score > 85 ? 3.5 : score > 70 ? 2.8 : 1.9,
      expectedCpa: score > 85 ? 8.50 : score > 70 ? 12.75 : 18.90,
      confidence: score > 85 ? 94 : score > 70 ? 87 : 72,
      insights: [
        score > 85 ? 'Strong visual hierarchy' : 'Consider improving visual contrast',
        score > 80 ? 'Compelling call-to-action' : 'CTA could be more prominent',
        score > 75 ? 'Good brand alignment' : 'Ensure brand consistency'
      ]
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Monitor performance and optimize your ad creatives
              {!isPaid && <span className="text-primary-600 font-medium"> - Upgrade for advanced features</span>}
            </p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Generate New Ad</span>
          </button>
        </div>

        {/* Subscription Status */}
        <div className="mb-8">
          <SubscriptionStatus />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total ROAS</p>
                <p className="text-2xl font-bold text-gray-900">3.7x</p>
                {!isPaid && <p className="text-xs text-gray-500">Limited tracking</p>}
              </div>
              {!isPaid && <div className="absolute top-2 right-2 w-2 h-2 bg-gray-400 rounded-full"></div>}
              <TrendingUp className="w-8 h-8 text-success-600" />
            </div>
          </div>
          
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Performance Score</p>
                <p className="text-2xl font-bold text-gray-900">85.7</p>
                {!isPro && !isEnterprise && <p className="text-xs text-gray-500">5/month limit</p>}
              </div>
              {!isPaid && <div className="absolute top-2 right-2 w-2 h-2 bg-gray-400 rounded-full"></div>}
              <Target className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fraud Savings</p>
                <p className="text-2xl font-bold text-gray-900">$2,847</p>
                {!isPaid && <p className="text-xs text-gray-500">Pro feature</p>}
              </div>
              {!isPaid && <div className="absolute top-2 right-2 w-2 h-2 bg-gray-400 rounded-full"></div>}
              <Shield className="w-8 h-8 text-success-600" />
            </div>
          </div>
          
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary-600" />
            </div>
          </div>
        </div>

        {/* Ad Creatives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {mockAds.map((ad) => {
            const fraudAnalysis = getFraudAnalysis(ad.fraudScore);
            const performancePrediction = getPerformancePrediction(ad.performanceScore);
            
            return (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => setSelectedAd(ad)}
              >
                <div className="relative mb-4">
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ad.status === 'active' ? 'bg-success-100 text-success-700' :
                      ad.status === 'paused' ? 'bg-warning-100 text-warning-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ad.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{ad.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{ad.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Performance Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${ad.performanceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{ad.performanceScore}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fraud Risk</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        fraudAnalysis.riskLevel === 'low' ? 'bg-success-500' :
                        fraudAnalysis.riskLevel === 'medium' ? 'bg-warning-500' :
                        'bg-error-500'
                      }`}></div>
                      <span className="text-sm font-medium capitalize">{fraudAnalysis.riskLevel}</span>
                    </div>
                  </div>

                  {ad.metrics && (
                    <div className="pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">CTR:</span>
                          <span className="font-medium ml-1">{ad.metrics.ctr}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">ROAS:</span>
                          <span className="font-medium ml-1">{ad.metrics.roas}x</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Analysis Modal */}
        {selectedAd && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAd.title}</h2>
                  <button
                    onClick={() => setSelectedAd(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedAd.imageUrl}
                      alt={selectedAd.title}
                      className="w-full rounded-lg mb-4"
                    />
                    <p className="text-gray-600">{selectedAd.description}</p>
                  </div>

                  <div className="space-y-6">
                    {/* Performance Analysis */}
                    <div className="card">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                        Performance Analysis
                      </h3>
                      {(() => {
                        const prediction = getPerformancePrediction(selectedAd.performanceScore);
                        return (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Performance Score</span>
                              <span className="font-semibold">{prediction.score}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Expected CTR</span>
                              <span className="font-semibold">{prediction.expectedCtr}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Expected CPA</span>
                              <span className="font-semibold">${prediction.expectedCpa}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Confidence</span>
                              <span className="font-semibold">{prediction.confidence}%</span>
                            </div>
                            <div className="pt-3 border-t">
                              <h4 className="font-medium mb-2">AI Insights:</h4>
                              <ul className="space-y-1 text-sm text-gray-600">
                                {prediction.insights.map((insight, index) => (
                                  <li key={index}>• {insight}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Fraud Analysis */}
                    <div className="card">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-success-600" />
                        Fraud Protection
                      </h3>
                      {(() => {
                        const fraudAnalysis = getFraudAnalysis(selectedAd.fraudScore);
                        return (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span>Risk Level</span>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  fraudAnalysis.riskLevel === 'low' ? 'bg-success-500' :
                                  fraudAnalysis.riskLevel === 'medium' ? 'bg-warning-500' :
                                  'bg-error-500'
                                }`}></div>
                                <span className="font-semibold capitalize">{fraudAnalysis.riskLevel}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span>Fraud Score</span>
                              <span className="font-semibold">{fraudAnalysis.score}/100</span>
                            </div>
                            <div className="pt-3 border-t">
                              <h4 className="font-medium mb-2">Analysis Factors:</h4>
                              <ul className="space-y-1 text-sm text-gray-600">
                                {fraudAnalysis.factors.map((factor, index) => (
                                  <li key={index}>• {factor}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-3 border-t">
                              <h4 className="font-medium mb-2">Recommendation:</h4>
                              <p className="text-sm text-gray-600">{fraudAnalysis.recommendation}</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Live Metrics */}
                    {selectedAd.metrics && (
                      <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Target className="w-5 h-5 mr-2 text-warning-600" />
                          Live Performance
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Impressions</p>
                            <p className="text-xl font-bold">{selectedAd.metrics.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Clicks</p>
                            <p className="text-xl font-bold">{selectedAd.metrics.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">CTR</p>
                            <p className="text-xl font-bold">{selectedAd.metrics.ctr}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">ROAS</p>
                            <p className="text-xl font-bold">{selectedAd.metrics.roas}x</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};