import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Crown, Zap, ArrowRight, Sparkles, MessageSquare, TrendingUp } from 'lucide-react';

export interface BotAdMessageProps {
  context: 'chat' | 'dashboard' | 'sidebar' | 'modal';
  messageCount?: number;
  limit?: number;
  onDismiss?: () => void;
  className?: string;
}

export const BotAdMessage: React.FC<BotAdMessageProps> = ({
  context,
  messageCount = 0,
  limit = 10,
  onDismiss,
  className = ''
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const isNearLimit = messageCount >= limit * 0.8; // Show when 80% of limit reached
  const isAtLimit = messageCount >= limit;

  // Don't show if dismissed or not needed for context
  if (isDismissed) return null;

  const getContextConfig = () => {
    switch (context) {
      case 'chat':
        return {
          title: isAtLimit ? 'Free Messages Exhausted!' : isNearLimit ? 'Almost at Your Free Limit' : 'Unlock Unlimited Messages',
          message: isAtLimit 
            ? `You've used all ${limit} free messages. Upgrade to Pro for unlimited AI-powered ad generation!`
            : isNearLimit 
            ? `You've used ${messageCount} of ${limit} free messages. Upgrade to Pro for unlimited access!`
            : 'Get unlimited AI conversations and advanced features with Pro.',
          icon: MessageSquare,
          variant: isAtLimit ? 'urgent' : isNearLimit ? 'warning' : 'info',
          dismissible: !isAtLimit,
          ctaText: isAtLimit ? 'Upgrade Now' : 'Upgrade to Pro',
          compact: true
        };
      
      case 'dashboard':
        return {
          title: 'Supercharge Your Ad Performance',
          message: 'Unlock advanced analytics, fraud detection, and unlimited AI generations with Pro.',
          icon: TrendingUp,
          variant: 'info',
          dismissible: true,
          ctaText: 'See Pro Features',
          compact: false
        };
      
      case 'sidebar':
        return {
          title: 'Upgrade to Pro',
          message: 'Get unlimited access to all features.',
          icon: Crown,
          variant: 'info',
          dismissible: true,
          ctaText: 'Upgrade',
          compact: true
        };
      
      case 'modal':
        return {
          title: 'Free Tier Exhausted',
          message: `You've reached your limit of ${limit} free messages. Upgrade to Pro for unlimited AI-powered ad creation and advanced features.`,
          icon: Sparkles,
          variant: 'urgent',
          dismissible: false,
          ctaText: 'Upgrade to Pro',
          compact: false
        };
      
      default:
        return {
          title: 'Upgrade to Pro',
          message: 'Unlock all features',
          icon: Crown,
          variant: 'info',
          dismissible: true,
          ctaText: 'Upgrade',
          compact: true
        };
    }
  };

  const config = getContextConfig();
  const IconComponent = config.icon;

  const getVariantStyles = () => {
    switch (config.variant) {
      case 'urgent':
        return {
          container: 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200',
          icon: 'text-red-600 bg-red-100',
          title: 'text-red-900',
          message: 'text-red-800',
          cta: 'bg-red-600 hover:bg-red-700 text-white',
          pulse: 'animate-pulse'
        };
      case 'warning':
        return {
          container: 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200',
          icon: 'text-yellow-600 bg-yellow-100',
          title: 'text-yellow-900',
          message: 'text-yellow-800',
          cta: 'bg-yellow-600 hover:bg-yellow-700 text-white',
          pulse: ''
        };
      default:
        return {
          container: 'bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200',
          icon: 'text-primary-600 bg-primary-100',
          title: 'text-primary-900',
          message: 'text-primary-800',
          cta: 'bg-primary-600 hover:bg-primary-700 text-white',
          pulse: ''
        };
    }
  };

  const styles = getVariantStyles();

  const containerClasses = `
    ${styles.container} 
    ${config.compact ? 'p-3' : 'p-4'} 
    rounded-lg shadow-sm relative 
    ${styles.pulse}
    ${className}
  `;

  const content = (
    <div className={containerClasses}>
      {config.dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
      
      <div className={`flex ${config.compact ? 'items-center space-x-3' : 'items-start space-x-4'}`}>
        <div className={`${styles.icon} p-2 rounded-full flex-shrink-0`}>
          <IconComponent className={`w-${config.compact ? '4' : '5'} h-${config.compact ? '4' : '5'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`${styles.title} font-semibold ${config.compact ? 'text-sm' : 'text-base'} mb-1`}>
            {config.title}
          </h3>
          <p className={`${styles.message} ${config.compact ? 'text-xs' : 'text-sm'}`}>
            {config.message}
          </p>
          
          {!config.compact && (
            <div className="mt-3">
              <Link
                to="/pricing"
                className={`${styles.cta} inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md`}
              >
                <span>{config.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
        
        {config.compact && (
          <Link
            to="/pricing"
            className={`${styles.cta} px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 flex-shrink-0`}
          >
            {config.ctaText}
          </Link>
        )}
      </div>
    </div>
  );

  // For modal context, wrap in motion.div with backdrop
  if (context === 'modal') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="max-w-md w-full"
          >
            {content}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // For other contexts, animate in place
  return (
    <motion.div
      initial={{ opacity: 0, y: context === 'chat' ? 10 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: context === 'chat' ? -10 : -20 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
};