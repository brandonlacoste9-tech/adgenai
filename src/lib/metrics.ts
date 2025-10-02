// FFmpeg WASM metrics overlay generator
import { Badge } from '../types';

export interface MetricsOverlayConfig {
  streakCount: number;
  cryptoEarned: number;
  badgeGlow?: string;
  vibe: 'bro' | 'influencer';
  position: 'top-right' | 'bottom-left' | 'center';
}

export interface ExportPlatform {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
  };
  aspectRatio: string;
}

export const EXPORT_PLATFORMS: ExportPlatform[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    dimensions: { width: 1080, height: 1920 },
    aspectRatio: '9:16'
  },
  {
    id: 'instagram',
    name: 'Instagram Stories',
    dimensions: { width: 1080, height: 1920 },
    aspectRatio: '9:16'
  },
  {
    id: 'youtube',
    name: 'YouTube Shorts',
    dimensions: { width: 1080, height: 1920 },
    aspectRatio: '9:16'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    dimensions: { width: 1080, height: 1920 },
    aspectRatio: '9:16'
  }
];

export class MetricsOverlay {
  private canvas: OffscreenCanvas | null = null;
  private ctx: OffscreenCanvasRenderingContext2D | null = null;

  constructor() {
    if (typeof OffscreenCanvas !== 'undefined') {
      this.canvas = new OffscreenCanvas(400, 200);
      this.ctx = this.canvas.getContext('2d');
    }
  }

  /**
   * Generate metrics overlay for video/image
   */
  async generateOverlay(config: MetricsOverlayConfig): Promise<Blob | null> {
    if (!this.ctx || !this.canvas) {
      console.warn('Canvas not supported in this environment');
      return null;
    }

    const { streakCount, cryptoEarned, vibe, position } = config;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set styling based on vibe
    const colors = vibe === 'bro' 
      ? { primary: '#3B82F6', secondary: '#1E40AF', accent: '#F59E0B' }
      : { primary: '#EC4899', secondary: '#BE185D', accent: '#10B981' };

    // Create gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, colors.primary + '40');
    gradient.addColorStop(1, colors.secondary + '40');
    
    this.ctx.fillStyle = gradient;
    this.ctx.roundRect(10, 10, this.canvas.width - 20, this.canvas.height - 20, 20);
    this.ctx.fill();

    // Add streak counter
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.fillText(`🔥 ${streakCount} day streak`, 30, 50);

    // Add crypto earnings
    this.ctx.fillStyle = colors.accent;
    this.ctx.font = 'bold 20px Arial';
    this.ctx.fillText(`💰 +$${cryptoEarned.toFixed(2)} USDC`, 30, 90);

    // Add badge glow effect
    if (config.badgeGlow) {
      this.ctx.fillStyle = colors.primary;
      this.ctx.font = '16px Arial';
      this.ctx.fillText(`✨ ${config.badgeGlow} Badge`, 30, 130);
    }

    // Convert to blob
    return this.canvas.convertToBlob({ type: 'image/png' });
  }

  /**
   * Process video with overlay using FFmpeg WASM
   */
  async processVideoWithOverlay(
    videoBlob: Blob,
    overlayConfig: MetricsOverlayConfig,
    platform: ExportPlatform
  ): Promise<Blob> {
    // In a real implementation, this would use FFmpeg WASM
    // For now, return the original video
    console.log('Processing video with overlay for', platform.name);
    
    // Mock processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return videoBlob;
  }

  /**
   * Generate AI-suggested captions based on content
   */
  generateSuggestedCaptions(
    workoutType: string,
    badges: string[],
    vibe: 'bro' | 'influencer'
  ): string[] {
    const broTemplates = [
      `Just crushed a ${workoutType} session! 💪 Who's ready to grind?`,
      `${workoutType} complete. Badge unlocked: ${badges[0] || 'Beast Mode'} 🔥`,
      `Another day, another gain. ${workoutType} ✅ #GrindNeverStops`,
      `Strength builds character. ${workoutType} session done! 🚀`
    ];

    const influencerTemplates = [
      `✨ ${workoutType} glow session complete! Feeling so energized `,
      `Manifesting strength through ${workoutType} today 💫 Badge: ${badges[0] || 'Glow Getter'}`,
      `Self-care Sunday: ${workoutType} edition ✨ What's your ritual?`,
      `Glowing from within after this ${workoutType} session 🌟`
    ];

    return vibe === 'bro' ? broTemplates : influencerTemplates;
  }

  /**
   * Generate trending hashtags
   */
  generateHashtags(workoutType: string, badges: string[], vibe: 'bro' | 'influencer'): string[] {
    const commonTags = ['#fitness', '#workout', '#crypto', '#badges'];
    const workoutTags = [`#${workoutType.toLowerCase().replace(' ', '')}`];
    const badgeTags = badges.map(badge => `#${badge.replace(' ', '')}`);
    
    const vibeTags = vibe === 'bro' 
      ? ['#grind', '#gains', '#strength', '#brotherhood']
      : ['#glow', '#manifest', '#wellness', '#selflove'];

    return [...commonTags, ...workoutTags, ...badgeTags, ...vibeTags].slice(0, 10);
  }
}

export const metricsOverlay = new MetricsOverlay();