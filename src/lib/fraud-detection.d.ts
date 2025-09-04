export interface FraudAnalysis {
    score: number;
    riskLevel: 'low' | 'medium' | 'high';
    factors: string[];
    recommendation: string;
    estimatedSavings: number;
    confidence: number;
}
export interface TrafficPattern {
    clickVelocity: number;
    deviceFingerprints: number;
    geoDistribution: Record<string, number>;
    timeDistribution: Record<string, number>;
    userBehaviorScore: number;
}
export declare class FraudDetectionEngine {
    private apiKey;
    private baseUrl;
    constructor();
    analyzeCampaignFraud(campaignData: any): Promise<FraudAnalysis>;
    private analyzeTrafficPattern;
    private analyzeDeviceFingerprints;
    private analyzeBehaviorPatterns;
    private calculateRiskScore;
    private categorizeRisk;
    private identifyRiskFactors;
    private generateRecommendation;
    private calculateSavings;
    private calculateConfidence;
    private getFallbackAnalysis;
    getHistoricalFraudData(timeRange: string): Promise<any[]>;
    updateFraudFilters(campaignId: string, filters: any): Promise<boolean>;
}
export declare const fraudDetectionEngine: FraudDetectionEngine;
