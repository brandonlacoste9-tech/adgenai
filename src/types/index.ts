export interface AdCreative {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  platform: 'facebook' | 'google' | 'instagram' | 'tiktok';
  performanceScore: number;
  fraudScore: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: Date;
  metrics?: AdMetrics;
}

export interface AdMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpa: number;
  roas: number;
}

export interface BrandKit {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  fonts: string[];
  tone: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  brandKits: BrandKit[];
  createdAt: Date;
}

export interface FraudAnalysis {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
  recommendation: string;
}

export interface PerformancePrediction {
  score: number;
  expectedCtr: number;
  expectedCpa: number;
  confidence: number;
  insights: string[];
}

// Fitness Social Platform Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'legendary';
  requirements: string;
  rewards: {
    usdc?: number;
    xp?: number;
    unlocks?: string[];
  };
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  badges: string[];
  streakCount: number;
  cryptoEarned: number;
  vibe: 'bro' | 'influencer';
  createdAt: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  vibe: 'bro' | 'influencer';
  badges: Badge[];
  stats: {
    followers: number;
    following: number;
    posts: number;
    totalCryptoEarned: number;
    currentStreak: number;
    longestStreak: number;
  };
}