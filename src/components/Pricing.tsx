import React from 'react';
import { Check, Zap, Crown, Building } from 'lucide-react';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with AI ad creation',
      icon: Zap,
      features: [
        'Unlimited basic ad generation',
        '5 performance predictions/month',
        '1 brand kit',
        'Community support',
        'Basic templates library'
      ],
      limitations: [
        'No fraud detection',
        'No attribution analysis',
        'No automated A/B testing'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$15',
      period: 'per month',
      description: 'For growing businesses and agencies',
      icon: Crown,
      features: [
        'Everything in Free',
        '100 fraud scans/month',
        'Unlimited performance predictions',
        'Basic attribution models',
        '10 automated A/B tests/month',
        '5 brand kits',
        '3 team seats',
        'Email & chat support',
        'White glove migration'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$500',
      period: 'per month',
      description: 'For large teams requiring advanced features',
      icon: Building,
      features: [
        'Everything in Pro',
        'Unlimited fraud detection',
        'Advanced attribution models',
        'Unlimited automated A/B testing',
        'Unlimited brand kits',
        'Unlimited team seats',
        'Dedicated account manager',
        'Custom onboarding',
        'API access',
        'Priority support'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise Features at Startup Prices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, predictable pricing with no hidden fees or surprise charges. 
            90-day performance guarantee included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? 'border-primary-500 shadow-xl scale-105'
                    : 'border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-full mb-4 ${
                    plan.popular ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      plan.popular ? 'text-primary-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  {plan.cta}
                </button>

                {plan.name === 'Pro' && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      90-day performance guarantee
                    </p>
                    <a 
                      href="/migration" 
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      Need help switching? Get free migration →
                    </a>
                  </div>
                )}

                {plan.name === 'Pro' && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      90-day performance guarantee
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Switching from a Competitor?
            </h3>
            <p className="text-gray-600 mb-6">
              Get our White Glove Migration Service absolutely free. We'll handle the entire 
              transition process and ensure you're set up for success from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <a href="/migration" className="block">Start Free Migration</a>
              </button>
              <button className="btn-secondary">
                <a href="/compare/adcreative-ai-alternative" className="block">Compare with AdCreative.ai</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};