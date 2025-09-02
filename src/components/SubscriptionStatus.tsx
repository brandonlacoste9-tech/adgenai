import React from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { CheckCircle, AlertTriangle, XCircle, Crown, Building } from 'lucide-react';

export const SubscriptionStatus: React.FC = () => {
  const { subscription, loading, isPro, isEnterprise, isPaid } = useSubscription();

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-10 w-10"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-yellow-800 font-medium">No subscription found</p>
            <p className="text-yellow-700 text-sm">Please sign in to view your subscription status</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (subscription.subscription_status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'past_due':
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-error-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPlanIcon = () => {
    if (isEnterprise) return <Building className="w-5 h-5 text-primary-600" />;
    if (isPro) return <Crown className="w-5 h-5 text-primary-600" />;
    return <CheckCircle className="w-5 h-5 text-gray-500" />;
  };

  const getStatusColor = () => {
    switch (subscription.subscription_status) {
      case 'active':
        return 'bg-success-50 border-success-200';
      case 'past_due':
        return 'bg-warning-50 border-warning-200';
      case 'cancelled':
        return 'bg-error-50 border-error-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getPlanIcon()}
          <div>
            <h3 className="font-semibold text-gray-900 capitalize">
              {subscription.plan_type} Plan
            </h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className="text-sm text-gray-600 capitalize">
                {subscription.subscription_status}
              </span>
            </div>
          </div>
        </div>
        
        {isPaid && (
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {subscription.plan_type === 'pro' ? '$15/month' : '$500/month'}
            </p>
          </div>
        )}
      </div>

      {subscription.subscription_status === 'past_due' && (
        <div className="bg-warning-100 border border-warning-200 rounded p-3 mt-3">
          <p className="text-warning-800 text-sm">
            Your payment is past due. Please update your payment method to continue using premium features.
          </p>
        </div>
      )}

      {subscription.subscription_status === 'cancelled' && (
        <div className="bg-error-100 border border-error-200 rounded p-3 mt-3">
          <p className="text-error-800 text-sm">
            Your subscription has been cancelled. You can resubscribe at any time to regain access to premium features.
          </p>
        </div>
      )}
    </div>
  );
};