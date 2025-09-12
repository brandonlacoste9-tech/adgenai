import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [supportsSVGAnimation, setSupportsSVGAnimation] = useState(true);

  useEffect(() => {
    // Check for SVG animation support (Safari often has issues)
    const checkSVGAnimationSupport = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
      setSupportsSVGAnimation(!isSafari);
    };

    checkSVGAnimationSupport();

    // Start fade out after 1.8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Complete transition after fade animation
      setTimeout(() => {
        onComplete();
      }, 500); // 500ms for fade out animation
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleLogoLoad = () => {
    setIsLogoLoaded(true);
  };

  const logoSrc = supportsSVGAnimation 
    ? '/branding/logo-nv-aurora-animated.svg'
    : '/branding/logo-nv-static.svg';

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        background: 'linear-gradient(180deg, #0a0f1c 0%, #1a1f3a 50%, #2a2f4a 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Aurora Background */}
      <div className="aurora-background">
        <div className="aurora-layer aurora-layer-1"></div>
        <div className="aurora-layer aurora-layer-2"></div>
        <div className="aurora-layer aurora-layer-3"></div>
        <div className="aurora-shimmer"></div>
        
        {/* Stars overlay */}
        <div className="stars-overlay"></div>
        
        {/* Floating particles */}
        <div className="aurora-particles">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="aurora-particle"></div>
          ))}
        </div>
      </div>

      {/* Logo Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`transition-all duration-1000 ${
            isLogoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Logo */}
          <div className="relative">
            <img
              src={logoSrc}
              alt="Northern Ventures"
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 drop-shadow-2xl"
              onLoad={handleLogoLoad}
              style={{
                filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3)) drop-shadow(0 0 40px rgba(6, 182, 212, 0.2))'
              }}
            />
            
            {/* Additional glow effect for browsers without SVG animation */}
            {!supportsSVGAnimation && (
              <div 
                className="absolute inset-0 rounded-full opacity-30 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              ></div>
            )}
          </div>

          {/* Company Name */}
          <div className="text-center mt-8">
            <h1 
              className={`text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-1000 ${
                isLogoLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${supportsSVGAnimation ? 'gradient-shift' : ''}`}
              style={{
                background: 'linear-gradient(45deg, #10b981, #06b6d4, #a855f7, #22c55e)',
                backgroundSize: '400% 400%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 30px rgba(16, 185, 129, 0.5)'
              }}
            >
              Northern Ventures
            </h1>
            
            {/* Tagline */}
            <p 
              className={`text-lg md:text-xl text-cyan-100 mt-4 transition-all duration-1000 delay-300 ${
                isLogoLoaded ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              Illuminating Innovation
            </p>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;