// components/BrandAwarePricing.tsx
import React, { useState } from 'react';
import { useBrand } from '../brand/BrandingProvider';
import { startCheckout } from '../utils/startCheckout';
import { Crown, Building } from 'lucide-react';

export default function BrandAwarePricing() {
  const { config } = useBrand();
  const [loading, setLoading] = useState<string | null>(null);

  const go = async (price: "pricePro" | "priceTeam") => {
    try {
      setLoading(price);
      await startCheckout(config.stripe[price]);
    } catch (e) {
      alert("Checkout failed. Check your configuration.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--brand-bg)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--brand-light)" }}>
            Choose Your Plan
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: "var(--brand-light)", opacity: 0.8 }}>
            Transparent, predictable pricing with no hidden fees or surprise charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pro Plan */}
          <div 
            className="relative rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-2xl"
            style={{ 
              borderColor: "var(--brand-accent)", 
              backgroundColor: "var(--brand-primary)",
              boxShadow: `0 0 30px ${config.colors.accent}20`
            }}
          >
            <div className="text-center mb-8">
              <div 
                className="inline-flex p-4 rounded-2xl mb-6"
                style={{ backgroundColor: `${config.colors.accent}20` }}
              >
                <Crown className="w-10 h-10" style={{ color: "var(--brand-accent)" }} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--brand-light)" }}>
                Pro
              </h3>
              
              <div className="mb-4">
                <span className="text-5xl font-bold" style={{ color: "var(--brand-accent)" }}>
                  $15
                </span>
                <span style={{ color: "var(--brand-light)", opacity: 0.7 }}>/month</span>
              </div>
              
              <p style={{ color: "var(--brand-light)", opacity: 0.8 }}>
                Best for individuals
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                'Unlimited basic ad generation',
                '100 fraud scans/month',
                'Performance predictions',
                'Basic attribution models',
                'Email & chat support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-5 h-5 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: "var(--brand-secondary)" }}
                  />
                  <span style={{ color: "var(--brand-light)" }}>{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => go("pricePro")}
              disabled={!config.stripe.pricePro || !!loading}
              className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: "var(--brand-accent)",
                color: "var(--brand-bg)",
              }}
            >
              {loading === "pricePro" ? "Starting..." : "Upgrade to Pro"}
            </button>
          </div>

          {/* Team Plan */}
          <div 
            className="relative rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-2xl"
            style={{ 
              borderColor: "var(--brand-secondary)", 
              backgroundColor: "var(--brand-primary)",
              boxShadow: `0 0 30px ${config.colors.secondary}20`
            }}
          >
            <div className="text-center mb-8">
              <div 
                className="inline-flex p-4 rounded-2xl mb-6"
                style={{ backgroundColor: `${config.colors.secondary}20` }}
              >
                <Building className="w-10 h-10" style={{ color: "var(--brand-secondary)" }} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--brand-light)" }}>
                Team
              </h3>
              
              <div className="mb-4">
                <span className="text-5xl font-bold" style={{ color: "var(--brand-secondary)" }}>
                  $500
                </span>
                <span style={{ color: "var(--brand-light)", opacity: 0.7 }}>/month</span>
              </div>
              
              <p style={{ color: "var(--brand-light)", opacity: 0.8 }}>
                Best for teams & agencies
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                'Everything in Pro',
                'Unlimited fraud detection',
                'Advanced attribution models',
                'Unlimited team seats',
                'Dedicated account manager',
                'Priority support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-5 h-5 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: "var(--brand-highlight)" }}
                  />
                  <span style={{ color: "var(--brand-light)" }}>{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => go("priceTeam")}
              disabled={!config.stripe.priceTeam || !!loading}
              className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: "var(--brand-secondary)",
                color: "var(--brand-bg)",
              }}
            >
              {loading === "priceTeam" ? "Starting..." : "Upgrade to Team"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}