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
