import React, { useState } from 'react';
import { Shield, CheckCircle, ArrowRight, Calendar } from 'lucide-react';

interface MigrationFormData {
  name: string;
  email: string;
  company: string;
  currentTool: string;
  monthlySpend: string;
  painPoints: string[];
  urgency: string;
  teamSize: string;
  calendlyPreference: string;
}

export const MigrationIntake: React.FC = () => {
  const [formData, setFormData] = useState<MigrationFormData>({
    name: '',
    email: '',
    company: '',
    currentTool: '',
    monthlySpend: '',
    painPoints: [],
    urgency: '',
    teamSize: '',
    calendlyPreference: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const currentTools = [
    'AdCreative.ai',
    'Creatopy',
    'Canva Pro',
    'Smartly.io',
    'Jasper',
    'Copy.ai',
    'Other'
  ];

  const painPointOptions = [
    'Surprise billing/hidden fees',
    'Poor customer support',
    'Generic/templated output',
    'No performance analytics',
    'Slow export times',
    'Limited customization',
    'No fraud detection',
    'Complex setup/learning curve',
    'Expensive pricing',
    'No A/B testing features'
  ];

  const handlePainPointChange = (painPoint: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(painPoint)
        ? prev.painPoints.filter(p => p !== painPoint)
        : [...prev.painPoints, painPoint]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send to your backend/CRM
    console.log('Migration intake submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-success-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Migration Request Received!
        </h2>
        <p className="text-gray-600 mb-6">
          Our migration specialist will contact you within 24 hours to schedule your 
          white-glove migration and strategy session.
        </p>
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <p className="text-primary-800 font-medium">
            📧 Check your email for next steps and calendar link
          </p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl font-bold">White Glove Migration</h1>
        </div>
        <p className="text-lg opacity-90">
          We'll migrate all your assets, data, and workflows for free. 
          Plus get a 90-day performance guarantee.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Acme Corp"
          />
        </div>

        {/* Current Tool */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Creative Tool *
          </label>
          <select
            required
            value={formData.currentTool}
            onChange={(e) => setFormData(prev => ({ ...prev, currentTool: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select your current tool</option>
            {currentTools.map(tool => (
              <option key={tool} value={tool}>{tool}</option>
            ))}
          </select>
        </div>

        {/* Monthly Spend & Team Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Ad Spend
            </label>
            <select
              value={formData.monthlySpend}
              onChange={(e) => setFormData(prev => ({ ...prev, monthlySpend: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select range</option>
              <option value="<$5K">Less than $5K</option>
              <option value="$5K-$25K">$5K - $25K</option>
              <option value="$25K-$100K">$25K - $100K</option>
              <option value="$100K+">$100K+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Size
            </label>
            <select
              value={formData.teamSize}
              onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select size</option>
              <option value="1">Just me</option>
              <option value="2-5">2-5 people</option>
              <option value="6-20">6-20 people</option>
              <option value="20+">20+ people</option>
            </select>
          </div>
        </div>

        {/* Pain Points */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What problems are you experiencing? (Select all that apply)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {painPointOptions.map(painPoint => (
              <label key={painPoint} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.painPoints.includes(painPoint)}
                  onChange={() => handlePainPointChange(painPoint)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{painPoint}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How urgent is this migration?
          </label>
          <div className="space-y-2">
            {[
              { value: 'asap', label: 'ASAP - We need to switch immediately' },
              { value: 'month', label: 'Within the next month' },
              { value: 'quarter', label: 'Within the next quarter' },
              { value: 'exploring', label: 'Just exploring options' }
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Calendar Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred meeting time
          </label>
          <select
            value={formData.calendlyPreference}
            onChange={(e) => setFormData(prev => ({ ...prev, calendlyPreference: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select preference</option>
            <option value="morning">Morning (9AM - 12PM EST)</option>
            <option value="afternoon">Afternoon (12PM - 5PM EST)</option>
            <option value="flexible">I'm flexible</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <span>Start My Free Migration</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Guarantee */}
        <div className="bg-success-50 rounded-lg p-4 text-center">
          <p className="text-success-800 font-medium">
            🛡️ 90-Day Performance Guarantee + Free Migration
          </p>
          <p className="text-success-700 text-sm mt-1">
            See measurable improvement or get your money back
          </p>
        </div>
      </form>
    </div>
  );
};