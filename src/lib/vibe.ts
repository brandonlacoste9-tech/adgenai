// Dual-mode UX logic for Bro Edition vs Influencer Edition
export type VibeMode = 'bro' | 'influencer';

export interface VibeConfig {
  mode: VibeMode;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  typography: {
    heroFont: string;
    bodyFont: string;
    buttonStyle: string;
  };
  badges: {
    style: string;
    animations: boolean;
  };
  language: {
    cta: string;
    motivational: string[];
    badges: Record<string, string>;
  };
}

export const VIBE_CONFIGS: Record<VibeMode, VibeConfig> = {
  bro: {
    mode: 'bro',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      gradient: 'from-blue-600 to-purple-600'
    },
    typography: {
      heroFont: 'font-bold',
      bodyFont: 'font-medium',
      buttonStyle: 'font-bold uppercase tracking-wider'
    },
    badges: {
      style: 'bg-gradient-to-r from-blue-600 to-purple-600',
      animations: true
    },
    language: {
      cta: 'LET\'S GRIND',
      motivational: [
        'Time to crush it! 💪',
        'No days off, brother!',
        'Strength builds legends',
        'The grind never stops',
        'Beast mode: ACTIVATED'
      ],
      badges: {
        'Glow Getter': 'Grind Getter',
        'Streak Beast': 'Streak Beast',
        'Crypto Queen': 'Crypto Grinder',
        'Launch Muse': 'Launch Bro',
        'Creator Unlocked': 'Creator Unlocked',
        'Influencer Pulse': 'Badge Beast',
        'Badge Beast': 'Badge Beast',
        'Referral Ritualist': 'Referral Ritualist',
        'Trend Ritualist': 'Trend Ritualist'
      }
    }
  },
  influencer: {
    mode: 'influencer',
    colors: {
      primary: '#EC4899',
      secondary: '#BE185D',
      accent: '#10B981',
      gradient: 'from-pink-500 to-rose-500'
    },
    typography: {
      heroFont: 'font-light',
      bodyFont: 'font-normal',
      buttonStyle: 'font-medium'
    },
    badges: {
      style: 'bg-gradient-to-r from-pink-500 to-rose-500',
      animations: true
    },
    language: {
      cta: 'Start Glowing ✨',
      motivational: [
        'You\'re absolutely glowing! ✨',
        'Manifesting those gains 💫',
        'Self-care is the best care',
        'Glow up season activated',
        'Beautiful inside and out'
      ],
      badges: {
        'Glow Getter': 'Glow Getter',
        'Streak Beast': 'Streak Goddess',
        'Crypto Queen': 'Crypto Queen',
        'Launch Muse': 'Launch Muse',
        'Creator Unlocked': 'Creator Unlocked',
        'Influencer Pulse': 'Influencer Pulse',
        'Badge Beast': 'Badge Goddess',
        'Referral Ritualist': 'Referral Ritualist',
        'Trend Ritualist': 'Trend Ritualist'
      }
    }
  }
};

export class VibeManager {
  private currentVibe: VibeMode = 'influencer';
  private config: VibeConfig = VIBE_CONFIGS.influencer;

  constructor(initialVibe: VibeMode = 'influencer') {
    this.setVibe(initialVibe);
  }

  /**
   * Set the current vibe mode
   */
  setVibe(vibe: VibeMode): void {
    this.currentVibe = vibe;
    this.config = VIBE_CONFIGS[vibe];
    this.updateDocumentStyles();
  }

  /**
   * Get current vibe
   */
  getCurrentVibe(): VibeMode {
    return this.currentVibe;
  }

  /**
   * Get current vibe configuration
   */
  getConfig(): VibeConfig {
    return this.config;
  }

  /**
   * Get vibe-specific colors
   */
  getColors() {
    return this.config.colors;
  }

  /**
   * Get vibe-specific typography
   */
  getTypography() {
    return this.config.typography;
  }

  /**
   * Get motivational message for current vibe
   */
  getMotivationalMessage(): string {
    const messages = this.config.language.motivational;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  /**
   * Get vibe-specific badge name
   */
  getBadgeName(originalBadge: string): string {
    return this.config.language.badges[originalBadge] || originalBadge;
  }

  /**
   * Get vibe-specific CTA text
   */
  getCTA(): string {
    return this.config.language.cta;
  }

  /**
   * Generate vibe-specific CSS classes
   */
  getButtonClasses(): string {
    const base = 'px-6 py-3 rounded-full transition-all hover:shadow-lg';
    const vibeStyle = `bg-gradient-to-r ${this.config.colors.gradient} text-white`;
    const typography = this.config.typography.buttonStyle;
    
    return `${base} ${vibeStyle} ${typography}`;
  }

  /**
   * Generate vibe-specific badge classes
   */
  getBadgeClasses(): string {
    const base = 'px-3 py-1 rounded-full text-sm font-semibold shadow-lg';
    return `${base} ${this.config.badges.style} text-white`;
  }

  /**
   * Update document CSS custom properties
   */
  private updateDocumentStyles(): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--vibe-primary', this.config.colors.primary);
      root.style.setProperty('--vibe-secondary', this.config.colors.secondary);
      root.style.setProperty('--vibe-accent', this.config.colors.accent);
    }
  }

  /**
   * Generate workout suggestions based on vibe
   */
  getWorkoutSuggestions(): string[] {
    if (this.currentVibe === 'bro') {
      return [
        'Heavy Deadlifts',
        'Bench Press Max',
        'Squat Session',
        'Pull-up Challenge',
        'Powerlifting Circuit',
        'Strength Training',
        'Muscle Building'
      ];
    } else {
      return [
        'Morning Yoga Flow',
        'Pilates Core',
        'Barre Workout',
        'Dance Cardio',
        'Mindful Movement',
        'HIIT Circuit',
        'Wellness Walk'
      ];
    }
  }

  /**
   * Get vibe-appropriate emojis
   */
  getVibeEmojis(): string[] {
    if (this.currentVibe === 'bro') {
      return ['💪', '🔥', '🚀', '⚡', '🏋️', '💯', '🎯'];
    } else {
      return ['✨', '💖', '🌟', '💫', '🌸', '💎', '🦋'];
    }
  }

  /**
   * Toggle between vibe modes
   */
  toggleVibe(): VibeMode {
    const newVibe = this.currentVibe === 'bro' ? 'influencer' : 'bro';
    this.setVibe(newVibe);
    return newVibe;
  }
}

// Global vibe manager instance
export const vibeManager = new VibeManager();

// React hook for using vibe in components
export const useVibe = () => {
  return {
    currentVibe: vibeManager.getCurrentVibe(),
    config: vibeManager.getConfig(),
    setVibe: vibeManager.setVibe.bind(vibeManager),
    toggleVibe: vibeManager.toggleVibe.bind(vibeManager),
    getMotivationalMessage: vibeManager.getMotivationalMessage.bind(vibeManager),
    getBadgeName: vibeManager.getBadgeName.bind(vibeManager),
    getCTA: vibeManager.getCTA.bind(vibeManager),
    getButtonClasses: vibeManager.getButtonClasses.bind(vibeManager),
    getBadgeClasses: vibeManager.getBadgeClasses.bind(vibeManager),
    getWorkoutSuggestions: vibeManager.getWorkoutSuggestions.bind(vibeManager),
    getVibeEmojis: vibeManager.getVibeEmojis.bind(vibeManager)
  };
};