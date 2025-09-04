export interface CreativeAnalysis {
    visualComplexity: number;
    textDensity: number;
    colorHarmony: number;
    ctaStrength: number;
    brandAlignment: number;
    emotionalResonance: number;
    platformOptimization: number;
}
export interface PerformancePrediction {
    score: number;
    expectedCtr: number;
    expectedCpa: number;
    expectedRoas: number;
    confidence: number;
    insights: string[];
    recommendations: string[];
    riskFactors: string[];
}
export interface TrainingData {
    features: number[];
    performance: {
        ctr: number;
        cpa: number;
        roas: number;
        conversions: number;
    };
    metadata: {
        platform: string;
        industry: string;
        budget: number;
        duration: number;
    };
}
export declare class MLPerformanceEngine {
    private model;
    private isInitialized;
    private trainingHistory;
    initialize(): Promise<void>;
    analyzeCreative(creative: any): Promise<CreativeAnalysis>;
    predictPerformance(creative: any, targetAudience?: any): Promise<PerformancePrediction>;
    private extractMLFeatures;
    private calculateVisualComplexity;
    private calculateTextDensity;
    private calculateColorHarmony;
    private calculateCTAStrength;
    private calculateBrandAlignment;
    private calculateEmotionalResonance;
    private calculatePlatformOptimization;
    private checkFacebookOptimization;
    private checkInstagramOptimization;
    private checkTikTokOptimization;
    private checkGoogleOptimization;
    private checkLinkedInOptimization;
    private encodePlatform;
    private encodeIndustry;
    private encodeAudienceSize;
    private encodeBudgetTier;
    private encodeTimeOfDay;
    private getPlatformMultiplier;
    private normalizeMetric;
    private calculatePerformanceScore;
    private generateAdvancedInsights;
    private generateActionableRecommendations;
    private identifyRiskFactors;
    private getFallbackPrediction;
    private loadPretrainedWeights;
    trainOnNewData(data: TrainingData[]): Promise<void>;
    getModelMetrics(): Promise<{
        accuracy: number;
        precision: number;
        recall: number;
        f1Score: number;
        trainingSize: number;
    }>;
}
export declare const mlPerformanceEngine: MLPerformanceEngine;
