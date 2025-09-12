import { useState, useEffect } from 'react';
import { useSubscription } from './useSubscription';

export interface MessageLimits {
  free: number;
  pro: number;
  enterprise: number;
}

export interface MessageTracking {
  count: number;
  limit: number;
  isNearLimit: boolean;
  isAtLimit: boolean;
  remainingMessages: number;
  resetDate: Date;
}

const DEFAULT_LIMITS: MessageLimits = {
  free: 10,
  pro: 1000,
  enterprise: -1 // unlimited
};

export const useMessageTracking = (limits: MessageLimits = DEFAULT_LIMITS) => {
  const { subscription, isPaid, isPro, isEnterprise } = useSubscription();
  const [messageCount, setMessageCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState<Date>(new Date());

  // Get current limit based on subscription
  const getCurrentLimit = (): number => {
    if (isEnterprise) return limits.enterprise;
    if (isPro) return limits.pro;
    return limits.free;
  };

  const currentLimit = getCurrentLimit();

  // Calculate tracking info
  const tracking: MessageTracking = {
    count: messageCount,
    limit: currentLimit,
    isNearLimit: currentLimit > 0 && messageCount >= currentLimit * 0.8,
    isAtLimit: currentLimit > 0 && messageCount >= currentLimit,
    remainingMessages: currentLimit > 0 ? Math.max(0, currentLimit - messageCount) : -1,
    resetDate: new Date(lastResetDate.getTime() + 24 * 60 * 60 * 1000) // Reset daily
  };

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('messageTracking');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const storedDate = new Date(data.date);
        const now = new Date();
        
        // Reset if it's a new day
        if (storedDate.toDateString() !== now.toDateString()) {
          setMessageCount(0);
          setLastResetDate(now);
          localStorage.setItem('messageTracking', JSON.stringify({
            count: 0,
            date: now.toISOString()
          }));
        } else {
          setMessageCount(data.count || 0);
          setLastResetDate(storedDate);
        }
      } catch (error) {
        console.error('Error loading message tracking:', error);
        resetDailyCount();
      }
    } else {
      resetDailyCount();
    }
  }, []);

  // Save to localStorage when count changes
  useEffect(() => {
    localStorage.setItem('messageTracking', JSON.stringify({
      count: messageCount,
      date: lastResetDate.toISOString()
    }));
  }, [messageCount, lastResetDate]);

  const incrementMessageCount = (): boolean => {
    if (tracking.isAtLimit && !isPaid) {
      return false; // Cannot send more messages
    }
    
    setMessageCount(prev => prev + 1);
    return true;
  };

  const resetDailyCount = () => {
    const now = new Date();
    setMessageCount(0);
    setLastResetDate(now);
    localStorage.setItem('messageTracking', JSON.stringify({
      count: 0,
      date: now.toISOString()
    }));
  };

  const canSendMessage = (): boolean => {
    return isPaid || !tracking.isAtLimit;
  };

  const getMessageForContext = (context: 'chat' | 'dashboard' | 'sidebar' | 'modal'): string => {
    if (isPaid) return '';
    
    switch (context) {
      case 'chat':
        if (tracking.isAtLimit) {
          return `You've used all ${tracking.limit} free messages today. Upgrade to Pro for unlimited messages!`;
        }
        if (tracking.isNearLimit) {
          return `You've used ${tracking.count} of ${tracking.limit} free messages today. ${tracking.remainingMessages} remaining.`;
        }
        return '';
      
      case 'dashboard':
        return `${tracking.count}/${tracking.limit} free messages used today. Upgrade for unlimited access.`;
      
      case 'sidebar':
        if (tracking.isAtLimit) return 'Free limit reached';
        if (tracking.isNearLimit) return `${tracking.remainingMessages} messages left`;
        return '';
      
      case 'modal':
        return `You've reached your daily limit of ${tracking.limit} free messages. Upgrade to Pro for unlimited AI-powered conversations.`;
      
      default:
        return '';
    }
  };

  const shouldShowAdForContext = (context: 'chat' | 'dashboard' | 'sidebar' | 'modal'): boolean => {
    if (isPaid) return false;
    
    switch (context) {
      case 'chat':
        return tracking.isNearLimit || tracking.isAtLimit;
      case 'dashboard':
        return true; // Always show on dashboard for free users
      case 'sidebar':
        return tracking.isNearLimit || tracking.isAtLimit;
      case 'modal':
        return tracking.isAtLimit;
      default:
        return false;
    }
  };

  return {
    tracking,
    incrementMessageCount,
    canSendMessage,
    resetDailyCount,
    getMessageForContext,
    shouldShowAdForContext,
    isPaid,
    currentLimit
  };
};