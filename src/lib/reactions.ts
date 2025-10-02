// Social reactions system for likes, hearts, muscle emoji, fire, badge reactions
export type ReactionType = 'like' | 'heart' | 'muscle' | 'fire' | 'badge' | 'crypto' | 'streak' | 'glow';

export interface Reaction {
  id: string;
  type: ReactionType;
  emoji: string;
  label: string;
  color: string;
  animation: string;
  vibeSpecific?: {
    bro?: string;
    influencer?: string;
  };
}

export interface PostReaction {
  reactionId: string;
  userId: string;
  postId: string;
  timestamp: Date;
}

export interface ReactionStats {
  [key: string]: {
    count: number;
    userReacted: boolean;
  };
}

export const REACTIONS: Reaction[] = [
  {
    id: 'like',
    type: 'like',
    emoji: '👍',
    label: 'Like',
    color: '#3B82F6',
    animation: 'bounce'
  },
  {
    id: 'heart',
    type: 'heart',
    emoji: '❤️',
    label: 'Love',
    color: '#EF4444',
    animation: 'pulse'
  },
  {
    id: 'muscle',
    type: 'muscle',
    emoji: '💪',
    label: 'Strong',
    color: '#F59E0B',
    animation: 'flex',
    vibeSpecific: {
      bro: 'Beast!',
      influencer: 'Powerful!'
    }
  },
  {
    id: 'fire',
    type: 'fire',
    emoji: '🔥',
    label: 'Fire',
    color: '#EF4444',
    animation: 'flicker'
  },
  {
    id: 'badge',
    type: 'badge',
    emoji: '🏆',
    label: 'Badge Worthy',
    color: '#F59E0B',
    animation: 'shine'
  },
  {
    id: 'crypto',
    type: 'crypto',
    emoji: '💰',
    label: 'Crypto Gains',
    color: '#10B981',
    animation: 'coin-flip'
  },
  {
    id: 'streak',
    type: 'streak',
    emoji: '⚡',
    label: 'Streak Power',
    color: '#8B5CF6',
    animation: 'lightning'
  },
  {
    id: 'glow',
    type: 'glow',
    emoji: '✨',
    label: 'Glowing',
    color: '#EC4899',
    animation: 'sparkle',
    vibeSpecific: {
      bro: 'Shine!',
      influencer: 'Glowing!'
    }
  }
];

export class ReactionsManager {
  private reactions: Reaction[] = REACTIONS;
  private userReactions: Map<string, Set<string>> = new Map(); // postId -> Set<reactionIds>

  /**
   * Get all available reactions
   */
  getReactions(): Reaction[] {
    return this.reactions;
  }

  /**
   * Get reactions filtered by vibe
   */
  getVibeReactions(vibe: 'bro' | 'influencer'): Reaction[] {
    if (vibe === 'bro') {
      return this.reactions.filter(r => 
        ['like', 'muscle', 'fire', 'badge', 'crypto', 'streak'].includes(r.type)
      );
    } else {
      return this.reactions.filter(r => 
        ['like', 'heart', 'glow', 'badge', 'crypto', 'streak'].includes(r.type)
      );
    }
  }

  /**
   * Add reaction to a post
   */
  addReaction(postId: string, userId: string, reactionType: ReactionType): boolean {
    const userPostReactions = this.userReactions.get(postId) || new Set();
    const reaction = this.reactions.find(r => r.type === reactionType);
    
    if (!reaction) return false;

    // Toggle reaction if user already reacted with this type
    if (userPostReactions.has(reaction.id)) {
      userPostReactions.delete(reaction.id);
    } else {
      userPostReactions.add(reaction.id);
    }

    this.userReactions.set(postId, userPostReactions);
    return true;
  }

  /**
   * Remove reaction from a post
   */
  removeReaction(postId: string, userId: string, reactionType: ReactionType): boolean {
    const userPostReactions = this.userReactions.get(postId);
    const reaction = this.reactions.find(r => r.type === reactionType);
    
    if (!userPostReactions || !reaction) return false;

    userPostReactions.delete(reaction.id);
    this.userReactions.set(postId, userPostReactions);
    return true;
  }

  /**
   * Get reaction stats for a post
   */
  getPostReactionStats(postId: string, userId: string): ReactionStats {
    const userPostReactions = this.userReactions.get(postId) || new Set();
    const stats: ReactionStats = {};

    this.reactions.forEach(reaction => {
      // In a real app, this would come from the database
      const mockCount = Math.floor(Math.random() * 100);
      stats[reaction.id] = {
        count: mockCount,
        userReacted: userPostReactions.has(reaction.id)
      };
    });

    return stats;
  }

  /**
   * Get most popular reaction for a post
   */
  getTopReaction(postId: string, userId: string): Reaction | null {
    const stats = this.getPostReactionStats(postId, userId);
    let topReaction: Reaction | null = null;
    let maxCount = 0;

    Object.entries(stats).forEach(([reactionId, stat]) => {
      if (stat.count > maxCount) {
        maxCount = stat.count;
        topReaction = this.reactions.find(r => r.id === reactionId) || null;
      }
    });

    return topReaction;
  }

  /**
   * Generate reaction burst animation data
   */
  generateReactionBurst(reactionType: ReactionType, count: number = 5): Array<{
    id: string;
    emoji: string;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }> {
    const reaction = this.reactions.find(r => r.type === reactionType);
    if (!reaction) return [];

    const burst = [];
    for (let i = 0; i < count; i++) {
      burst.push({
        id: `${reaction.id}-${i}-${Date.now()}`,
        emoji: reaction.emoji,
        x: Math.random() * 200 - 100, // Random X offset
        y: Math.random() * 200 - 100, // Random Y offset
        delay: i * 0.1, // Staggered delays
        duration: 1 + Math.random() * 0.5 // Random duration between 1-1.5s
      });
    }

    return burst;
  }

  /**
   * Get reaction animation CSS class
   */
  getAnimationClass(reactionType: ReactionType): string {
    const reaction = this.reactions.find(r => r.type === reactionType);
    if (!reaction) return '';

    const animationMap: Record<string, string> = {
      bounce: 'animate-bounce',
      pulse: 'animate-pulse',
      flex: 'animate-pulse scale-110',
      flicker: 'animate-pulse',
      shine: 'animate-bounce',
      'coin-flip': 'animate-spin',
      lightning: 'animate-pulse',
      sparkle: 'animate-ping'
    };

    return animationMap[reaction.animation] || 'animate-pulse';
  }

  /**
   * Get vibe-specific reaction label
   */
  getVibeLabel(reactionType: ReactionType, vibe: 'bro' | 'influencer'): string {
    const reaction = this.reactions.find(r => r.type === reactionType);
    if (!reaction) return '';

    if (reaction.vibeSpecific && reaction.vibeSpecific[vibe]) {
      return reaction.vibeSpecific[vibe];
    }

    return reaction.label;
  }

  /**
   * Calculate engagement score based on reactions
   */
  calculateEngagementScore(stats: ReactionStats): number {
    const weights: Record<string, number> = {
      like: 1,
      heart: 2,
      muscle: 3,
      fire: 3,
      badge: 5,
      crypto: 4,
      streak: 4,
      glow: 2
    };

    let score = 0;
    Object.entries(stats).forEach(([reactionId, stat]) => {
      const reaction = this.reactions.find(r => r.id === reactionId);
      if (reaction && weights[reaction.type]) {
        score += stat.count * weights[reaction.type];
      }
    });

    return score;
  }

  /**
   * Get reaction recommendations based on post content
   */
  getRecommendedReactions(
    postContent: string,
    badges: string[],
    workoutType?: string
  ): ReactionType[] {
    const content = postContent.toLowerCase();
    const recommendations: ReactionType[] = [];

    // Content-based recommendations
    if (content.includes('streak') || content.includes('day')) {
      recommendations.push('streak');
    }
    if (content.includes('crypto') || content.includes('usdc') || content.includes('earned')) {
      recommendations.push('crypto');
    }
    if (content.includes('badge') || badges.length > 0) {
      recommendations.push('badge');
    }
    if (content.includes('strong') || content.includes('lift') || workoutType?.includes('Strength')) {
      recommendations.push('muscle');
    }
    if (content.includes('glow') || content.includes('beautiful') || content.includes('aesthetic')) {
      recommendations.push('glow');
    }
    if (content.includes('fire') || content.includes('amazing') || content.includes('incredible')) {
      recommendations.push('fire');
    }

    // Always include basic reactions
    recommendations.unshift('like', 'heart');

    // Remove duplicates and limit to 4 recommendations
    return [...new Set(recommendations)].slice(0, 4);
  }
}

// Global reactions manager instance
export const reactionsManager = new ReactionsManager();