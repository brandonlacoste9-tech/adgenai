import React from 'react';
import { useParams } from 'react-router-dom';
import { Check, X, AlertTriangle, Shield, TrendingUp, DollarSign } from 'lucide-react';

interface ComparisonData {
  title: string;
  subtitle: string;
  competitor: {
    name: string;
    logo: string;
    pricing: string;
    issues: string[];
  };
  features: {
    feature: string;
    adgen: string | boolean;
    competitor: string | boolean;
    advantage?: string;
  }[];
  testimonial: {
    name: string;
    role: string;
    quote: string;
    savings: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
}

const comparisons: Record<string, ComparisonData> = {
  'adcreative-ai-alternative': {
    title: 'AdCreative.ai Alternative',
    subtitle: 'Transparent pricing, no surprise bills, actual performance focus',
    competitor: {
      name: 'AdCreative.ai',
      logo: '🎨',
      pricing: '$29-$599+/mo (credits)',
      issues: [
        'Surprise billing charges ($339-$400)',
        'Non-existent customer support',
        'Generic, templated output',
        'Restrictive credit system'
      ]
    },
    features: [
      { feature: 'Unlimited Creative Generation', adgen: true, competitor: '10 credits/mo', advantage: 'No artificial limits' },
      { feature: 'Fraud Detection', adgen: true, competitor: false, advantage: 'Save $2,847/month avg' },
      { feature: 'Performance Prediction', adgen: true, competitor: 'Basic', advantage: '94% accuracy' },
      { feature: 'Brand Voice Consistency', adgen: true, competitor: false, advantage: 'AI-trained on your assets' },
      { feature: 'Transparent Billing', adgen: true, competitor: false, advantage: 'No surprise charges ever' },
      { feature: 'White Glove Support', adgen: true, competitor: false, advantage: '24hr response guarantee' }
    ],
    testimonial: {
      name: 'Sarah Chen',
      role: 'Performance Marketing Manager',
      quote: 'After getting burned by AdCreative.ai\'s surprise billing, AdGen AI was a breath of fresh air. The fraud detection alone saved us $3,200 in our first month.',
      savings: '340% ROAS increase'
    },
    cta: {
      primary: 'Start Free Migration',
      secondary: 'See Billing Comparison'
    }
  },
  'creatopy-vs-adgen': {
    title: 'Creatopy vs AdGen AI',
    subtitle: 'Keep the design polish, gain the performance intelligence',
    competitor: {
      name: 'Creatopy',
      logo: '🎭',
      pricing: '$36-$249+/mo',
      issues: [
        'No performance analytics',
        'Slow export times (45+ seconds)',
        'No product feed integration',
        'Key features gated behind expensive tiers'
      ]
    },
    features: [
      { feature: 'Design Tools', adgen: true, competitor: true, advantage: 'Plus performance optimization' },
      { feature: 'Performance Analytics', adgen: true, competitor: false, advantage: 'Real-time ROI tracking' },
      { feature: 'Product Feed Integration', adgen: true, competitor: false, advantage: 'Dynamic catalog ads' },
      { feature: 'Export Speed', adgen: '< 5 seconds', competitor: '45+ seconds', advantage: '9x faster workflow' },
      { feature: 'Team Collaboration', adgen: 'All plans', competitor: 'Plus tier only', advantage: 'No feature gates' },
      { feature: 'A/B Testing', adgen: true, competitor: false, advantage: 'Automated optimization' }
    ],
    testimonial: {
      name: 'Marcus Rodriguez',
      role: 'Creative Director',
      quote: 'Creatopy was great for design, but we needed performance data. AdGen AI gives us both beautiful creatives AND the analytics to prove they work.',
      savings: '156% CTR improvement'
    },
    cta: {
      primary: 'Upgrade Your Workflow',
      secondary: 'Compare Features'
    }
  },
  'smartly-io-pricing': {
    title: 'Smartly.io Pricing Alternative',
    subtitle: 'Enterprise features at startup prices - 80% cost reduction',
    competitor: {
      name: 'Smartly.io',
      logo: '🏢',
      pricing: '$2,500-$5,000+/mo',
      issues: [
        'Extremely expensive pricing',
        '90-day implementation time',
        'Steep learning curve',
        'Overkill for most companies'
      ]
    },
    features: [
      { feature: 'Creative Generation', adgen: true, competitor: true, advantage: 'Simpler workflow' },
      { feature: 'Cross-Platform Management', adgen: true, competitor: true, advantage: '80% less cost' },
      { feature: 'Performance Analytics', adgen: true, competitor: true, advantage: 'Easier to use' },
      { feature: 'Setup Time', adgen: '24 hours', competitor: '90 days', advantage: '90x faster deployment' },
      { feature: 'Monthly Cost', adgen: '$500', competitor: '$2,500+', advantage: '80% savings' },
      { feature: 'Learning Curve', adgen: 'Intuitive', competitor: 'Complex', advantage: 'No consultants needed' }
    ],
    testimonial: {
      name: 'Emily Watson',
      role: 'Marketing Director',
      quote: 'We were paying $2,800/month for Smartly.io and getting the same results we now get with AdGen AI for $500. The ROI is incredible.',
      savings: '82% cost reduction'
    },
    cta: {
      primary: 'Start Enterprise Pilot',
      secondary: 'Calculate Savings'
    }
  }
};

export const ComparisonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? comparisons[slug] : null;

  if (!data) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
      <h1 className="text-2xl text-gray-600">Comparison not found</h1>
    </div>;
  }

  const getIcon = (value: string | boolean) => {
    if (value === true || (typeof value === 'string' && !value.includes('false') && !value.includes('No'))) {
      return <Check className="w-5 h-5 text-success-600" />;
    }
    if (value === false || (typeof value === 'string' && (value.includes('false') || value.includes('No')))) {
      return <X className="w-5 h-5 text-error-500" />;
    }
    return <AlertTriangle className="w-5 h-5 text-warning-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.subtitle}</p>
        </div>

        {/* Issues with Competitor */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3" />
            Why Customers Are Leaving {data.competitor.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.competitor.issues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-red-800">{issue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="bg-gray-50 px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary-600">AdGen AI</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">{data.competitor.name}</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-success-600">Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.features.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {getIcon(row.adgen)}
                        <span className="text-sm font-medium text-primary-600">
                          {typeof row.adgen === 'boolean' ? (row.adgen ? 'Yes' : 'No') : row.adgen}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {getIcon(row.competitor)}
                        <span className="text-sm text-gray-600">
                          {typeof row.competitor === 'boolean' ? (row.competitor ? 'Yes' : 'No') : row.competitor}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-success-600">{row.advantage}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Testimonial */}
        <div className="bg-primary-600 text-white rounded-2xl p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-xl mb-6">
              "{data.testimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div>
                <p className="font-semibold">{data.testimonial.name}</p>
                <p className="opacity-90">{data.testimonial.role}</p>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <p className="font-bold">{data.testimonial.savings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <Shield className="w-12 h-12 text-success-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">90-Day Performance Guarantee</h3>
            <p className="text-gray-600">See measurable improvement or get your money back</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">White Glove Migration</h3>
            <p className="text-gray-600">We'll migrate all your assets and data for free</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <DollarSign className="w-12 h-12 text-warning-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">No hidden fees, no surprise charges, ever</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Make the Switch?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of marketers who've left {data.competitor.name} for better results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {data.cta.primary}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                {data.cta.secondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};