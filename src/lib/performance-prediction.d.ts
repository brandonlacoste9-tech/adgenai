export interface CreativeFeatures {
    textLength: number;
    imageAspectRatio: number;
    colorContrast: number;
    ctaPresence: boolean;
    brandElementsCount: number;
    emotionalTone: number;
    visualComplexity: number;
    platform: 'facebook' | 'google' | 'instagram' | 'tiktok' | 'linkedin';
}
export interface PerformancePrediction {
    score: number;
    expectedCtr: number;
    expectedCpa: number;
    confidence: number;
    insights: string[];
    recommendations: string[];
}
export declare class PerformancePredictionEngine {
    private model;
    private isInitialized;
    initialize(): Promise<void>;
    private extractFeatures;
    private platformMultiplier;
    predict(creative: any): Promise<PerformancePrediction>;
    private generateInsights;
    private generateRecommendations;
    trainModel(trainingData: any[]): Promise<void>;
}
export declare const performancePredictionEngine: PerformancePredictionEngine;
