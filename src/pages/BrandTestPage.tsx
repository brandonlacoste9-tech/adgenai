// Test component to showcase brand switching
import React from 'react';
import { useBrand } from '../brand/BrandingProvider';
import { BrandAwareHero } from '../components/BrandAwareHero';
import BrandAwarePricing from '../components/BrandAwarePricing';

export const BrandTestPage: React.FC = () => {
  const { key, config } = useBrand();

  return (
    <div>
      {/* Brand info display */}
      <div className="fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg" style={{ backgroundColor: config.colors.primary, color: config.colors.light }}>
        <h3 className="font-bold">Current Brand: {config.name}</h3>
        <p>Key: {key}</p>
        <p>Host: {typeof window !== 'undefined' ? window.location.hostname : 'SSR'}</p>
        <div className="mt-2">
          <div className="w-4 h-4 rounded mr-2 inline-block" style={{ backgroundColor: config.colors.accent }}></div>
          <span>Accent</span>
        </div>
        <div className="mt-1">
          <div className="w-4 h-4 rounded mr-2 inline-block" style={{ backgroundColor: config.colors.secondary }}></div>
          <span>Secondary</span>
        </div>
      </div>

      {/* Brand-aware components */}
      <BrandAwareHero />
      <BrandAwarePricing />
    </div>
  );
};