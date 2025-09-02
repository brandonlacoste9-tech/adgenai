import React from 'react';
import { Logo, LogoMark } from './Logo';
import { Palette, Type, Layout, Download } from 'lucide-react';

export const BrandGuidelines: React.FC = () => {
  const brandColors = {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    success: {
      500: '#22c55e',
      600: '#16a34a'
    },
    warning: {
      500: '#f59e0b',
      600: '#d97706'
    }
  };

  const typography = [
    { name: 'Inter', weight: '300-800', usage: 'Primary font for all text' },
    { name: 'SF Pro Display', weight: '400-700', usage: 'Alternative for Apple devices' },
    { name: 'System UI', weight: '400-600', usage: 'Fallback system font' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AdGen AI Brand Guidelines</h1>
        <p className="text-xl text-gray-600">Visual identity system for the Full-Stack Marketing Brain</p>
      </div>

      {/* Logo Showcase */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Layout className="w-8 h-8 text-primary-600 mr-3" />
          Logo System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="text-center p-6 bg-gray-50 rounded-2xl">
            <Logo size="xl" variant="primary" />
            <p className="text-sm text-gray-600 mt-4 font-medium">Primary Logo</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900 rounded-2xl">
            <Logo size="xl" variant="white" />
            <p className="text-sm text-gray-300 mt-4 font-medium">White Version</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl">
            <Logo size="xl" variant="gradient" />
            <p className="text-sm text-white mt-4 font-medium">Gradient Version</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-2xl">
            <LogoMark size="xl" variant="primary" />
            <p className="text-sm text-gray-600 mt-4 font-medium">Logo Mark Only</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">Logo Concept</h3>
          <p className="text-blue-800 leading-relaxed">
            The AdGen AI logo represents the convergence of artificial intelligence and marketing performance. 
            The central lightning bolt symbolizes the power and speed of AI, while the surrounding neural network 
            nodes represent the interconnected intelligence that drives our Full-Stack Marketing Brain. The animated 
            data flow indicators show the continuous learning and optimization that sets us apart from static competitors.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Palette className="w-8 h-8 text-primary-600 mr-3" />
          Color Palette
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Blue</h3>
            <div className="space-y-2">
              {Object.entries(brandColors.primary).map(([shade, color]) => (
                <div key={shade} className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>
                    <p className="font-mono text-sm text-gray-900">{color}</p>
                    <p className="text-xs text-gray-600">Blue {shade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Success Green</h3>
            <div className="space-y-2">
              {Object.entries(brandColors.success).map(([shade, color]) => (
                <div key={shade} className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>
                    <p className="font-mono text-sm text-gray-900">{color}</p>
                    <p className="text-xs text-gray-600">Success {shade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Warning Orange</h3>
            <div className="space-y-2">
              {Object.entries(brandColors.warning).map(([shade, color]) => (
                <div key={shade} className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg shadow-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>
                    <p className="font-mono text-sm text-gray-900">{color}</p>
                    <p className="text-xs text-gray-600">Warning {shade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Type className="w-8 h-8 text-primary-600 mr-3" />
          Typography System
        </h2>
        
        <div className="space-y-8">
          {typography.map((font, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{font.name}</h3>
                <span className="text-sm text-gray-600">Weight: {font.weight}</span>
              </div>
              <p className="text-gray-700 mb-4">{font.usage}</p>
              <div className="space-y-3">
                <p className="text-4xl font-light" style={{ fontFamily: font.name }}>
                  The Full-Stack Marketing Brain
                </p>
                <p className="text-2xl font-normal" style={{ fontFamily: font.name }}>
                  Generate high-converting ad creatives
                </p>
                <p className="text-lg font-medium" style={{ fontFamily: font.name }}>
                  With integrated fraud detection and performance prediction
                </p>
                <p className="text-base font-semibold" style={{ fontFamily: font.name }}>
                  Stop wasting budget on templated designs
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Voice */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Brand Voice & Messaging</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-primary-900 mb-4">Brand Personality</h3>
            <ul className="space-y-2 text-primary-800">
              <li><strong>Intelligent:</strong> Data-driven, analytical, precise</li>
              <li><strong>Transparent:</strong> Honest pricing, clear communication</li>
              <li><strong>Performance-Focused:</strong> Results over aesthetics</li>
              <li><strong>Innovative:</strong> Cutting-edge AI technology</li>
              <li><strong>Trustworthy:</strong> Reliable, consistent, dependable</li>
            </ul>
          </div>
          
          <div className="bg-success-50 border border-success-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-success-900 mb-4">Key Messages</h3>
            <ul className="space-y-2 text-success-800">
              <li>"The Full-Stack Marketing Brain"</li>
              <li>"Performance over pretty pictures"</li>
              <li>"Transparent pricing, no surprises"</li>
              <li>"Built for ROI, not just design"</li>
              <li>"Intelligence that pays for itself"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Usage Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">✅ Do</h3>
            <ul className="space-y-2 text-green-800">
              <li>Use the logo with adequate white space</li>
              <li>Maintain consistent proportions</li>
              <li>Use approved color variations</li>
              <li>Ensure high contrast backgrounds</li>
              <li>Use Inter font for all text</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">❌ Don't</h3>
            <ul className="space-y-2 text-red-800">
              <li>Stretch or distort the logo</li>
              <li>Use unauthorized colors</li>
              <li>Place on busy backgrounds</li>
              <li>Modify the lightning bolt icon</li>
              <li>Use Comic Sans or decorative fonts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Download Assets */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Download Brand Assets</h3>
          <p className="text-lg opacity-90 mb-6">
            Get the complete brand package with logos, colors, and guidelines
          </p>
          <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center space-x-2 mx-auto">
            <Download className="w-5 h-5" />
            <span>Download Brand Kit</span>
          </button>
        </div>
      </div>
    </div>
  );
};