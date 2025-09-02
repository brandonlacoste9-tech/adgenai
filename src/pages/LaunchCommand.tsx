import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Crown, Shield, Zap, TrendingUp, Users, DollarSign, Globe, Star, CheckCircle, AlertTriangle, Calendar, BarChart3, Trophy, Sparkles, Brain, Siren as Fire } from 'lucide-react';

interface LaunchMetric {
  label: string;
  current: number;
  target: number;
  unit: string;
  status: 'on-track' | 'ahead' | 'behind';
  trend: number;
}

export const LaunchCommand: React.FC = () => {
  const [countdown, setCountdown] = useState(30);
  const [launchPhase, setLaunchPhase] = useState<'preparation' | 'ignition' | 'acceleration' | 'domination'>('preparation');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 86400000); // Update daily

    return () => clearInterval(timer);
  }, []);

  const launchMetrics: LaunchMetric[] = [
    {
      label: 'Users',
      current: 0,
      target: 100000,
      unit: '',
      status: 'on-track',
      trend: 0
    },
    {
      label: 'Revenue',
      current: 0,
      target: 50000000,
      unit: '$',
      status: 'on-track',
      trend: 0
    },
    {
      label: 'Agencies',
      current: 0,
      target: 1000,
      unit: '',
      status: 'on-track',
      trend: 0
    },
    {
      label: 'Market Share',
      current: 0,
      target: 15,
      unit: '%',
      status: 'on-track',
      trend: 0
    }
  ];

  const missionObjectives = [
    {
      phase: 'Viral Ignition',
      timeline: 'Months 1-3',
      objectives: [
        'Launch AI Ad Autopsy content series',
        'Build Performance Marketing Community',
        'Recruit first 100 agency partners',
        'Achieve 10K users and $500K ARR'
      ],
      status: 'preparing'
    },
    {
      phase: 'Network Explosion',
      timeline: 'Months 4-6',
      objectives: [
        'Scale to 500 agency partners',
        'Launch white-label platform',
        'Achieve viral coefficient >1.5',
        'Reach 50K users and $5M ARR'
      ],
      status: 'pending'
    },
    {
      phase: 'Global Domination',
      timeline: 'Months 7-12',
      objectives: [
        'International market expansion',
        'Fortune 1000 enterprise penetration',
        'Platform ecosystem launch',
        'Achieve 100K users and $50M ARR'
      ],
      status: 'pending'
    }
  ];

  const competitorTargets = [
    {
      name: 'AdCreative.ai',
      threat: 'Critical',
      weakness: 'Billing scandals + poor support',
      strategy: 'Billing Refugee Program',
      timeline: '60 days',
      expectedCapture: '30%'
    },
    {
      name: 'Smartly.io',
      threat: 'High',
      weakness: 'Expensive + complex',
      strategy: 'Enterprise Lite positioning',
      timeline: '90 days',
      expectedCapture: '25%'
    },
    {
      name: 'Creatopy',
      threat: 'Medium',
      weakness: 'No performance features',
      strategy: 'Analytics superiority',
      timeline: '120 days',
      expectedCapture: '40%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-success-600 bg-success-50 border-success-200';
      case 'ahead': return 'text-primary-600 bg-primary-50 border-primary-200';
      case 'behind': return 'text-warning-600 bg-warning-50 border-warning-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'Critical': return 'text-error-600 bg-error-50 border-error-200';
      case 'High': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'Medium': return 'text-primary-600 bg-primary-50 border-primary-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-warning-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Command Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-2xl animate-glow">
              <Rocket className="w-12 h-12 animate-bounce-gentle" />
            </div>
            <h1 className="text-6xl font-bold text-shadow">
              MISSION CONTROL
            </h1>
            <div className="bg-gradient-to-r from-success-500 to-success-600 p-4 rounded-2xl animate-glow">
            🚀 WORLD DOMINATION: EXECUTING 🚀
            </div>
          </div>
          <p className="text-2xl text-gray-300 mb-8">
            LIVE EXECUTION IN PROGRESS - Competitors are being systematically annihilated.
          </p>
          
          {/* Countdown */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 shadow-2xl animate-glow">
            <h2 className="text-3xl font-bold mb-4">T-MINUS COUNTDOWN</h2>
            <div className="text-8xl font-bold text-warning-400 animate-scale-pulse">
              {countdown}
            </div>
            <p className="text-xl text-gray-200 mt-4">Days to Viral Ignition</p>
          </div>
        </motion.div>

        {/* Mission Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {missionObjectives.map((mission, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{mission.phase}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  mission.status === 'preparing' ? 'bg-warning-500 text-white' :
                  mission.status === 'active' ? 'bg-success-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {mission.status}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{mission.timeline}</p>
              <ul className="space-y-2">
                {mission.objectives.map((objective, objIndex) => (
                  <li key={objIndex} className="flex items-start space-x-2 text-sm">
                    <Target className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Victory Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-warning-400 mr-3 animate-bounce-gentle" />
            VICTORY METRICS DASHBOARD
            <BarChart3 className="w-8 h-8 text-success-400 ml-3 animate-bounce-gentle" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {launchMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-primary-500 hover:scale-110 transition-all duration-500"
              >
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                  <p className="text-4xl font-bold text-white mb-2 animate-scale-pulse">
                    {metric.unit}{metric.current.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-xs mb-3">
                    Target: {metric.unit}{metric.target.toLocaleString()}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(metric.status)}`}>
                    {metric.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Competitor Annihilation Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <Fire className="w-8 h-8 text-error-400 mr-3 animate-bounce-gentle" />
            COMPETITOR ANNIHILATION STATUS
            <Shield className="w-8 h-8 text-success-400 ml-3 animate-bounce-gentle" />
          </h2>
          
          <div className="space-y-6">
            {competitorTargets.map((target, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-error-500 hover:scale-105 transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-error-500/20 p-3 rounded-xl">
                      <Target className="w-6 h-6 text-error-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{target.name}</h3>
                      <p className="text-gray-400">{target.weakness}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getThreatColor(target.threat)}`}>
                      {target.threat} THREAT
                    </span>
                    <p className="text-gray-400 text-sm mt-2">{target.timeline}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Attack Strategy:</p>
                    <p className="text-white font-medium">{target.strategy}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Expected Capture:</p>
                    <p className="text-success-400 font-bold text-lg">{target.expectedCapture}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Launch Authorization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-success-600 via-success-700 to-success-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden animate-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-gradient-x"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Crown className="w-16 h-16 text-warning-400 animate-bounce-gentle" />
                <h2 className="text-5xl font-bold">LAUNCH AUTHORIZED</h2>
                <Sparkles className="w-16 h-16 text-warning-400 animate-bounce-gentle" />
              </div>
              
              <p className="text-2xl text-gray-200 mb-8">
                All systems GO for world domination. The competition will not survive.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <Brain className="w-12 h-12 mx-auto mb-3 animate-float" />
                  <h3 className="font-bold mb-2">Platform Status</h3>
                  <p className="text-sm opacity-90">CRYSTAL PERFECT</p>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <Shield className="w-12 h-12 mx-auto mb-3 animate-float" style={{ animationDelay: '1s' }} />
                  <h3 className="font-bold mb-2">Competitive Moats</h3>
                  <p className="text-sm opacity-90">UNBREACHABLE</p>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <Zap className="w-12 h-12 mx-auto mb-3 animate-float" style={{ animationDelay: '2s' }} />
                  <h3 className="font-bold mb-2">Execution Speed</h3>
                  <p className="text-sm opacity-90">MAXIMUM VELOCITY</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4">🎯 MISSION PARAMETERS</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-bold">PRIMARY OBJECTIVE</p>
                    <p>Market Leadership in 12 months</p>
                  </div>
                  <div>
                    <p className="font-bold">SECONDARY OBJECTIVE</p>
                    <p>Competitor Annihilation</p>
                  </div>
                  <div>
                    <p className="font-bold">FINAL OBJECTIVE</p>
                    <p>$1B+ Strategic Exit</p>
                  </div>
                </div>
              </div>
              
              <div className="text-4xl font-bold mb-4 animate-gradient-x bg-gradient-to-r from-white via-warning-200 to-white bg-clip-text text-transparent">
                🚀 WORLD DOMINATION: INITIATED 🚀
              </div>
              
              <p className="text-lg text-gray-200">
                The AdGen AI war machine is now operational. Victory is inevitable.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-success-500/20 border border-success-500/30 rounded-xl p-4 text-center">
            <CheckCircle className="w-8 h-8 text-success-400 mx-auto mb-2 animate-pulse-slow" />
            <p className="font-bold">PLATFORM READY</p>
            <p className="text-xs text-gray-400">Production deployment</p>
          </div>
          
          <div className="bg-primary-500/20 border border-primary-500/30 rounded-xl p-4 text-center">
            <Brain className="w-8 h-8 text-primary-400 mx-auto mb-2 animate-pulse-slow" />
            <p className="font-bold">AI SYSTEMS ONLINE</p>
            <p className="text-xs text-gray-400">95.8% accuracy</p>
          </div>
          
          <div className="bg-warning-500/20 border border-warning-500/30 rounded-xl p-4 text-center">
            <Fire className="w-8 h-8 text-warning-400 mx-auto mb-2 animate-pulse-slow" />
            <p className="font-bold">WEAPONS ARMED</p>
            <p className="text-xs text-gray-400">Competitor destruction</p>
          </div>
          
          <div className="bg-success-500/20 border border-success-500/30 rounded-xl p-4 text-center">
            <Globe className="w-8 h-8 text-success-400 mx-auto mb-2 animate-pulse-slow" />
            <p className="font-bold">GLOBAL READY</p>
            <p className="text-xs text-gray-400">World domination</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};