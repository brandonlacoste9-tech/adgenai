import React, { useState } from 'react';
import { Bell, Slack, TrendingUp, Shield, Users } from 'lucide-react';
import { slackService } from '../lib/slack-integration';

interface SlackNotificationPanelProps {
  className?: string;
}

export const SlackNotificationPanel: React.FC<SlackNotificationPanelProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestNotification = async (type: 'fraud' | 'community' | 'general') => {
    setIsTesting(true);
    try {
      let success = false;
      
      switch (type) {
        case 'fraud':
          success = await slackService.sendFraudAlert({
            riskScore: 75,
            riskLevel: 'high',
            campaignName: 'Test Campaign - Holiday Sale',
            estimatedSavings: 15420,
            details: 'High click velocity detected from suspicious IP ranges. Recommend immediate review.'
          });
          break;
          
        case 'community':
          success = await slackService.sendCommunityWelcome(
            'Test User',
            'test@example.com'
          );
          break;
          
        case 'general':
          success = await slackService.sendPerformanceUpdate({
            metric: 'ROAS',
            value: 4.2,
            change: 15.8,
            period: 'Last 7 days'
          });
          break;
      }
      
      if (success) {
        alert(`✅ Test ${type} notification sent successfully!`);
      } else {
        alert(`❌ Failed to send ${type} notification. Check your Slack configuration.`);
      }
    } catch (error) {
      alert(`❌ Error sending ${type} notification: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="h-6 w-6 text-blue-600" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Slack Notifications</h3>
            <p className="text-sm text-gray-600">Test and manage Slack integrations</p>
          </div>
        </div>
        <Slack className="h-5 w-5 text-gray-400" />
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Fraud Alerts */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="h-5 w-5 text-red-600" />
                <h4 className="font-medium text-red-900">Fraud Alerts</h4>
              </div>
              <p className="text-sm text-red-700 mb-3">
                High-risk fraud detection alerts sent to #fraud-alerts channel
              </p>
              <button
                onClick={() => handleTestNotification('fraud')}
                disabled={isTesting}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors disabled:opacity-50"
              >
                {isTesting ? 'Testing...' : 'Test Fraud Alert'}
              </button>
            </div>

            {/* Community Welcome */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Community</h4>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                New member welcome messages to #performance-marketing
              </p>
              <button
                onClick={() => handleTestNotification('community')}
                disabled={isTesting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors disabled:opacity-50"
              >
                {isTesting ? 'Testing...' : 'Test Welcome'}
              </button>
            </div>

            {/* Performance Updates */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-900">Performance</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Performance metrics and updates to #general channel
              </p>
              <button
                onClick={() => handleTestNotification('general')}
                disabled={isTesting}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors disabled:opacity-50"
              >
                {isTesting ? 'Testing...' : 'Test Update'}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Configuration</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Set up Slack webhook URLs in your environment variables</p>
              <p>• Configure bot token for channel invitations</p>
              <p>• Test notifications above to verify connectivity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlackNotificationPanel;