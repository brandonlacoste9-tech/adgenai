export interface TouchPoint {
    id: string;
    userId: string;
    creativeId: string;
    campaignId: string;
    platform: string;
    touchpointType: 'impression' | 'click' | 'conversion';
    timestamp: Date;
    value?: number;
    metadata?: Record<string, any>;
}
export interface AttributionResult {
    creativeId: string;
    attribution: number;
    revenue: number;
    conversions: number;
    touchpoints: number;
}
export interface AttributionAnalysis {
    model: AttributionModel;
    results: AttributionResult[];
    totalRevenue: number;
    totalConversions: number;
    insights: string[];
    recommendations: string[];
}
export type AttributionModel = 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based';
export declare class AttributionEngine {
    private touchpoints;
    recordTouchpoint(touchpoint: TouchPoint): Promise<void>;
    analyzeAttribution(campaignIds: string[], model: AttributionModel, timeRange: {
        start: Date;
        end: Date;
    }): Promise<AttributionAnalysis>;
    private getRelevantTouchpoints;
    private groupTouchpointsByUser;
    private calculateAttribution;
    private calculateAttributionWeights;
    private calculateTimeDecayWeights;
    private calculatePositionBasedWeights;
    private generateAttributionInsights;
    private generateAttributionRecommendations;
    private getFallbackAttribution;
    getAttributionReport(campaignIds: string[], model: AttributionModel, timeRange: {
        start: Date;
        end: Date;
    }): Promise<AttributionAnalysis>;
    compareAttributionModels(campaignIds: string[], timeRange: {
        start: Date;
        end: Date;
    }): Promise<Record<AttributionModel, AttributionAnalysis>>;
}
export declare const attributionEngine: AttributionEngine;
