export interface AdvancedTouchpoint {
    id: string;
    userId: string;
    sessionId: string;
    creativeId: string;
    campaignId: string;
    platform: string;
    touchpointType: 'impression' | 'click' | 'view' | 'engagement' | 'conversion';
    timestamp: Date;
    value: number;
    conversionType?: 'purchase' | 'signup' | 'download' | 'lead';
    deviceType: 'mobile' | 'desktop' | 'tablet';
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    metadata: {
        pageUrl?: string;
        timeOnPage?: number;
        scrollDepth?: number;
        clickPosition?: {
            x: number;
            y: number;
        };
        adPosition?: string;
        audienceSegment?: string;
    };
}
export interface AttributionModelConfig {
    name: string;
    description: string;
    algorithm: AttributionAlgorithm;
    parameters: Record<string, any>;
    useCase: string;
}
export type AttributionAlgorithm = 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based' | 'data-driven' | 'shapley-value' | 'markov-chain';
export interface AttributionInsight {
    type: 'opportunity' | 'warning' | 'optimization' | 'trend';
    title: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
    actionable: boolean;
    recommendation?: string;
    estimatedValue?: number;
}
export interface AdvancedAttributionResult {
    creativeId: string;
    campaignId: string;
    attribution: {
        weight: number;
        revenue: number;
        conversions: number;
        assistedConversions: number;
        touchpoints: number;
    };
    performance: {
        ctr: number;
        conversionRate: number;
        averageOrderValue: number;
        customerLifetimeValue: number;
    };
    journey: {
        averageTouchpoints: number;
        averageTimeToPurchase: number;
        topChannels: string[];
        conversionPath: string[];
    };
}
export interface AttributionReport {
    model: AttributionModelConfig;
    timeRange: {
        start: Date;
        end: Date;
    };
    results: AdvancedAttributionResult[];
    summary: {
        totalRevenue: number;
        totalConversions: number;
        averageOrderValue: number;
        customerAcquisitionCost: number;
        returnOnAdSpend: number;
    };
    insights: AttributionInsight[];
    recommendations: string[];
    modelComparison?: Record<string, number>;
}
export declare class AdvancedAttributionEngine {
    private touchpoints;
    private models;
    constructor();
    private initializeAttributionModels;
    recordAdvancedTouchpoint(touchpoint: AdvancedTouchpoint): Promise<void>;
    generateAttributionReport(campaignIds: string[], model: AttributionAlgorithm, timeRange: {
        start: Date;
        end: Date;
    }): Promise<AttributionReport>;
    private calculateAdvancedAttribution;
    private calculateAttributionWeights;
    private calculateTimeDecayWeights;
    private calculatePositionBasedWeights;
    private calculateDataDrivenWeights;
    private calculateShapleyWeights;
    private calculateMarkovWeights;
    private getChannelPerformanceMultiplier;
    private calculateCoalitionValue;
    private popCount;
    private factorial;
    private buildTransitionMatrix;
    private calculateRemovalEffects;
    private calculateConversionProbability;
    private normalizeWeights;
    private getRelevantTouchpoints;
    private groupTouchpointsByUser;
    private calculateSummaryMetrics;
    private generateAdvancedInsights;
    private generateStrategicRecommendations;
    private analyzeChannelPerformance;
    compareAttributionModels(campaignIds: string[], timeRange: {
        start: Date;
        end: Date;
    }): Promise<Record<AttributionAlgorithm, AttributionReport>>;
    exportAttributionData(campaignIds: string[], model: AttributionAlgorithm, format: 'csv' | 'json' | 'xlsx'): Promise<string>;
    private convertToCSV;
    private convertToXLSX;
}
export declare const advancedAttributionEngine: AdvancedAttributionEngine;
