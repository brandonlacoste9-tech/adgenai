export interface MLFeatures {
    textLength: number;
    wordCount: number;
    hasUrgency: boolean;
    hasCTA: boolean;
    hasNumbers: boolean;
    hasEmotional: boolean;
    platform: string;
    industry: string;
    audienceSize: string;
    budgetTier: number;
    timeOfDay: number;
    brandAlignment: number;
}
export interface PerformancePredictionResult {
    score: number;
    expectedCtr: number;
    expectedCpa: number;
    expectedRoas: number;
    confidence: number;
    insights: string[];
    recommendations: string[];
    riskFactors: string[];
    modelVersion: string;
}
export declare class MLPerformanceAPI {
    private model;
    private isInitialized;
    private modelVersion;
    initialize(): Promise<void>;
    predict(creative: any, targetAudience?: any): Promise<PerformancePredictionResult>;
    private extractFeatures;
    private featuresToArray;
    private encodePlatform;
    private encodeIndustry;
    private encodeAudienceSize;
    private encodeBudget;
    private encodeTimeOfDay;
    private getPlatformMultiplier;
    private normalizeMetric;
    private calculatePerformanceScore;
    private generateInsights;
    private generateRecommendations;
    private identifyRiskFactors;
    private getFallbackPrediction;
}
export declare const mlPerformanceAPI: MLPerformanceAPI;
