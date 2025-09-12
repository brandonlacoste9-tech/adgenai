export interface SlackWebhookConfig {
  webhookUrl: string;
  channel?: string;
  username?: string;
  iconEmoji?: string;
}

export interface SlackMessage {
  text: string;
  channel?: string;
  username?: string;
  icon_emoji?: string;
  attachments?: SlackAttachment[];
  blocks?: SlackBlock[];
}

export interface SlackAttachment {
  color?: string;
  pretext?: string;
  author_name?: string;
  author_link?: string;
  author_icon?: string;
  title?: string;
  title_link?: string;
  text?: string;
  fields?: SlackField[];
  image_url?: string;
  thumb_url?: string;
  footer?: string;
  footer_icon?: string;
  ts?: number;
}

export interface SlackField {
  title: string;
  value: string;
  short?: boolean;
}

export interface SlackBlock {
  type: string;
  text?: {
    type: string;
    text: string;
  };
  accessory?: any;
  fields?: any[];
}

export interface SlackChannelInfo {
  id: string;
  name: string;
  is_channel: boolean;
  is_group: boolean;
  is_im: boolean;
  created: number;
  creator: string;
  is_archived: boolean;
  is_general: boolean;
  name_normalized: string;
  is_shared: boolean;
  is_org_shared: boolean;
  is_member: boolean;
  is_private: boolean;
  is_mpim: boolean;
  topic: {
    value: string;
    creator: string;
    last_set: number;
  };
  purpose: {
    value: string;
    creator: string;
    last_set: number;
  };
}

export interface SlackInviteResponse {
  ok: boolean;
  error?: string;
  channel?: SlackChannelInfo;
}

export class SlackIntegrationService {
  private webhookConfigs: Map<string, SlackWebhookConfig> = new Map();
  private botToken: string | null = null;

  constructor() {
    this.initializeWebhooks();
    this.botToken = import.meta.env.VITE_SLACK_BOT_TOKEN || null;
  }

  private initializeWebhooks(): void {
    // Fraud Detection Alerts
    const fraudWebhook = import.meta.env.VITE_SLACK_FRAUD_WEBHOOK;
    if (fraudWebhook) {
      this.webhookConfigs.set('fraud', {
        webhookUrl: fraudWebhook,
        channel: '#fraud-alerts',
        username: 'AdGen AI Fraud Detection',
        iconEmoji: ':warning:'
      });
    }

    // Performance Marketing Community
    const communityWebhook = import.meta.env.VITE_SLACK_COMMUNITY_WEBHOOK;
    if (communityWebhook) {
      this.webhookConfigs.set('community', {
        webhookUrl: communityWebhook,
        channel: '#performance-marketing',
        username: 'AdGen AI Community',
        iconEmoji: ':rocket:'
      });
    }

    // General Notifications
    const generalWebhook = import.meta.env.VITE_SLACK_GENERAL_WEBHOOK;
    if (generalWebhook) {
      this.webhookConfigs.set('general', {
        webhookUrl: generalWebhook,
        channel: '#general',
        username: 'AdGen AI',
        iconEmoji: ':robot_face:'
      });
    }

    console.log(`🚀 Slack Integration initialized with ${this.webhookConfigs.size} webhook configurations`);
  }

  async sendWebhookMessage(configKey: string, message: Partial<SlackMessage>): Promise<boolean> {
    const config = this.webhookConfigs.get(configKey);
    if (!config) {
      console.error(`❌ Slack webhook config not found for key: ${configKey}`);
      return false;
    }

    try {
      const payload: SlackMessage = {
        channel: message.channel || config.channel,
        username: message.username || config.username,
        icon_emoji: message.icon_emoji || config.iconEmoji,
        text: message.text || '',
        ...message
      };

      const response = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(`✅ Slack message sent successfully to ${configKey}`);
        return true;
      } else {
        console.error(`❌ Failed to send Slack message to ${configKey}:`, response.statusText);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error sending Slack webhook message:`, error);
      return false;
    }
  }

  async sendFraudAlert(data: {
    riskScore: number;
    riskLevel: string;
    campaignName: string;
    estimatedSavings: number;
    details: string;
  }): Promise<boolean> {
    const color = this.getRiskColor(data.riskLevel);
    const emoji = this.getRiskEmoji(data.riskLevel);
    
    const message: SlackMessage = {
      text: `${emoji} Fraud Alert: ${data.riskLevel.toUpperCase()} risk detected`,
      attachments: [
        {
          color,
          title: `Campaign: ${data.campaignName}`,
          fields: [
            {
              title: 'Risk Score',
              value: `${data.riskScore}/100`,
              short: true
            },
            {
              title: 'Risk Level',
              value: data.riskLevel.toUpperCase(),
              short: true
            },
            {
              title: 'Estimated Savings',
              value: `$${data.estimatedSavings.toLocaleString()}`,
              short: true
            },
            {
              title: 'Details',
              value: data.details,
              short: false
            }
          ],
          footer: 'AdGen AI Fraud Detection',
          footer_icon: 'https://adgenai.com/favicon.ico',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };

    return this.sendWebhookMessage('fraud', message);
  }

  async sendCommunityWelcome(memberName: string, memberEmail: string): Promise<boolean> {
    const message: SlackMessage = {
      text: `🎉 Welcome to the Performance Marketing Community!`,
      attachments: [
        {
          color: '#36a64f',
          title: `New Member: ${memberName}`,
          fields: [
            {
              title: 'Email',
              value: memberEmail,
              short: true
            },
            {
              title: 'Joined',
              value: new Date().toLocaleDateString(),
              short: true
            }
          ],
          text: 'A new member has joined our exclusive Performance Marketing Community. Let\'s give them a warm welcome! 🚀',
          footer: 'AdGen AI Community',
          footer_icon: 'https://adgenai.com/favicon.ico',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };

    return this.sendWebhookMessage('community', message);
  }

  async sendPerformanceUpdate(data: {
    metric: string;
    value: number;
    change: number;
    period: string;
  }): Promise<boolean> {
    const emoji = data.change > 0 ? '📈' : data.change < 0 ? '📉' : '📊';
    const changeText = data.change > 0 ? `+${data.change}%` : `${data.change}%`;
    const changeColor = data.change > 0 ? '#36a64f' : data.change < 0 ? '#ff0000' : '#ffa500';

    const message: SlackMessage = {
      text: `${emoji} Performance Update: ${data.metric}`,
      attachments: [
        {
          color: changeColor,
          fields: [
            {
              title: 'Current Value',
              value: data.value.toLocaleString(),
              short: true
            },
            {
              title: 'Change',
              value: changeText,
              short: true
            },
            {
              title: 'Period',
              value: data.period,
              short: true
            }
          ],
          footer: 'AdGen AI Analytics',
          footer_icon: 'https://adgenai.com/favicon.ico',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };

    return this.sendWebhookMessage('general', message);
  }

  async inviteToChannel(channelId: string, userEmail: string): Promise<SlackInviteResponse> {
    if (!this.botToken) {
      console.error('❌ Slack bot token not configured');
      return { ok: false, error: 'Bot token not configured' };
    }

    try {
      // First, try to find the user by email
      const userResponse = await fetch('https://slack.com/api/users.lookupByEmail', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.botToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail
        }),
      });

      const userData = await userResponse.json();
      
      if (!userData.ok) {
        console.error('❌ User not found in Slack workspace:', userData.error);
        return { ok: false, error: userData.error };
      }

      // Invite the user to the channel
      const inviteResponse = await fetch('https://slack.com/api/conversations.invite', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.botToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: channelId,
          users: userData.user.id
        }),
      });

      const inviteData = await inviteResponse.json();
      
      if (inviteData.ok) {
        console.log(`✅ Successfully invited ${userEmail} to channel ${channelId}`);
      } else {
        console.error(`❌ Failed to invite user to channel:`, inviteData.error);
      }

      return inviteData;
    } catch (error) {
      console.error(`❌ Error inviting user to Slack channel:`, error);
      return { ok: false, error: 'Network error' };
    }
  }

  async getChannelInfo(channelId: string): Promise<SlackChannelInfo | null> {
    if (!this.botToken) {
      console.error('❌ Slack bot token not configured');
      return null;
    }

    try {
      const response = await fetch('https://slack.com/api/conversations.info', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.botToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: channelId
        }),
      });

      const data = await response.json();
      
      if (data.ok) {
        return data.channel;
      } else {
        console.error('❌ Failed to get channel info:', data.error);
        return null;
      }
    } catch (error) {
      console.error('❌ Error getting channel info:', error);
      return null;
    }
  }

  private getRiskColor(riskLevel: string): string {
    switch (riskLevel.toLowerCase()) {
      case 'low': return '#36a64f';
      case 'medium': return '#ffa500';
      case 'high': return '#ff8c00';
      case 'critical': return '#ff0000';
      default: return '#808080';
    }
  }

  private getRiskEmoji(riskLevel: string): string {
    switch (riskLevel.toLowerCase()) {
      case 'low': return '✅';
      case 'medium': return '⚠️';
      case 'high': return '🚨';
      case 'critical': return '🛑';
      default: return 'ℹ️';
    }
  }

  // Test webhook connectivity
  async testWebhook(configKey: string): Promise<boolean> {
    const testMessage: SlackMessage = {
      text: '🧪 Test message from AdGen AI',
      attachments: [
        {
          color: '#36a64f',
          title: 'Webhook Test',
          text: 'If you can see this message, the Slack integration is working correctly!',
          footer: 'AdGen AI Slack Integration',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    };

    return this.sendWebhookMessage(configKey, testMessage);
  }
}

export const slackService = new SlackIntegrationService();