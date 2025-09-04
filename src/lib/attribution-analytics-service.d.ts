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
    performance: {
        ctr: number;
        conversionRate: number;
        averageOrderValue: number;
    };
}
export interface AttributionAnalysis {
    model: AttributionModel;
    results: AttributionResult[];
    totalRevenue: number;
    totalConversions: number;
    insights: string[];
    recommendations: string[];
    summary: {
        topPerformer: string;
        avgTouchpoints: number;
        totalROI: number;
    };
}
export type AttributionModel = 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based';
export declare class AttributionAnalyticsService {
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
    private generateInsights;
    private generateRecommendations;
    private generateSummary;
    private getFallbackAttribution;
    compareModels(campaignIds: string[], timeRange: {
        start: Date;
        end: Date;
    }): Promise<Record<AttributionModel, AttributionAnalysis>>;
}
export declare const attributionAnalyticsService: AttributionAnalyticsService;
