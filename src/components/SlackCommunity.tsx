import React, { useState, useEffect } from 'react';
import { Slack, Users, MessageSquare, Zap, Shield, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { slackService } from '../lib/slack-integration';

interface CommunityStats {
  totalMembers: number;
  activeToday: number;
  messagesThisWeek: number;
  avgResponseTime: string;
}

interface JoinFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  experience: string;
}

export const SlackCommunity: React.FC = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [joinStatus, setJoinStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<JoinFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    experience: ''
  });
  const [stats, setStats] = useState<CommunityStats>({
    totalMembers: 847,
    activeToday: 142,
    messagesThisWeek: 2341,
    avgResponseTime: '12 min'
  });

  useEffect(() => {
    // Check if user is already a community member
    const memberStatus = localStorage.getItem('slack-community-member');
    if (memberStatus === 'true') {
      setIsJoined(true);
    }

    // Update stats periodically
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalMembers: prev.totalMembers + Math.floor(Math.random() * 3),
        activeToday: 120 + Math.floor(Math.random() * 50),
        messagesThisWeek: prev.messagesThisWeek + Math.floor(Math.random() * 20)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJoinCommunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setJoinStatus('idle');

    try {
      // Send welcome message to Slack
      const welcomeSuccess = await slackService.sendCommunityWelcome(
        formData.name,
        formData.email
      );

      if (welcomeSuccess) {
        // In a real implementation, you would also:
        // 1. Send Slack invitation link via email
        // 2. Add user to your community database
        // 3. Set up their community profile
        
        setIsJoined(true);
        setJoinStatus('success');
        localStorage.setItem('slack-community-member', 'true');
        
        // Update stats to reflect new member
        setStats(prev => ({
          ...prev,
          totalMembers: prev.totalMembers + 1,
          activeToday: prev.activeToday + 1
        }));
      } else {
        setJoinStatus('error');
      }
    } catch (error) {
      console.error('Error joining community:', error);
      setJoinStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const testSlackIntegration = async () => {
    setIsLoading(true);
    try {
      await slackService.testWebhook('community');
      alert('Test message sent to Slack! Check your community channel.');
    } catch (error) {
      alert('Failed to send test message. Please check your Slack configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
                  <Slack className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Performance Marketing
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join the most exclusive community of performance marketers, growth hackers, and ad optimization experts. 
              Share strategies, get feedback, and dominate your market together.
            </p>

            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stats.totalMembers.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Members</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <MessageSquare className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stats.messagesThisWeek.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Messages/Week</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stats.activeToday}</div>
                <div className="text-sm text-gray-300">Active Today</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stats.avgResponseTime}</div>
                <div className="text-sm text-gray-300">Avg Response</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Community Benefits */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white mb-8">
              What You'll Get
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Fraud Detection Insights</h3>
                  <p className="text-gray-300">
                    Get real-time alerts about ad fraud patterns, bot traffic, and budget protection strategies 
                    that save millions in wasted spend.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Performance Optimization</h3>
                  <p className="text-gray-300">
                    Daily tips, case studies, and proven strategies for maximizing ROAS across all major 
                    advertising platforms and verticals.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Expert Network</h3>
                  <p className="text-gray-300">
                    Connect with industry leaders, agency owners, and performance marketing experts who 
                    manage $500M+ in annual ad spend.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Exclusive Resources</h3>
                  <p className="text-gray-300">
                    Access to premium tools, templates, and AI-powered insights that aren't available 
                    anywhere else in the market.
                  </p>
                </div>
              </div>
            </div>

            {/* Test Integration Button */}
            <div className="pt-6">
              <button
                onClick={testSlackIntegration}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Test Slack Integration
              </button>
            </div>
          </div>

          {/* Join Form or Success State */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {!isJoined ? (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Join the Community
                </h2>
                
                <form onSubmit={handleJoinCommunity} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select your role</option>
                      <option value="performance-marketer">Performance Marketer</option>
                      <option value="agency-owner">Agency Owner</option>
                      <option value="growth-hacker">Growth Hacker</option>
                      <option value="media-buyer">Media Buyer</option>
                      <option value="marketing-director">Marketing Director</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                      <option value="expert">Expert (10+ years)</option>
                    </select>
                  </div>
                  
                  {joinStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Failed to join community. Please try again.</span>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Slack className="h-5 w-5" />
                        <span>Join Performance Marketing Community</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-500/20 rounded-full p-6">
                    <CheckCircle className="h-16 w-16 text-green-400" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to the Community! 🎉
                </h2>
                
                <p className="text-gray-300 mb-8">
                  You've successfully joined our exclusive Performance Marketing Community. 
                  Check your email for the Slack invitation link.
                </p>
                
                <div className="space-y-4">
                  <a
                    href="https://slack.com/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Slack className="h-5 w-5 mr-2" />
                    Open Slack Workspace
                  </a>
                  
                  <div className="text-sm text-gray-400">
                    Don't have Slack? <a href="https://slack.com/downloads" className="text-purple-400 hover:text-purple-300">Download it here</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Community Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-400">✅ Do This</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Share actionable insights and strategies</li>
                <li>• Ask specific, thoughtful questions</li>
                <li>• Help fellow marketers solve problems</li>
                <li>• Celebrate wins and learn from failures</li>
                <li>• Respect confidentiality and NDAs</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400">❌ Don't Do This</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Spam or self-promote aggressively</li>
                <li>• Share fake or misleading results</li>
                <li>• Be disrespectful or unprofessional</li>
                <li>• Share proprietary client information</li>
                <li>• Recruit without permission</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackCommunity;