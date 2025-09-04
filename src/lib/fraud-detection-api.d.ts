export interface FraudDetectionConfig {
    apiKey: string;
    endpoint: string;
    provider: 'human-security' | 'clickcease' | 'fraudlogix' | 'internal';
    riskThresholds: {
        low: number;
        medium: number;
        high: number;
    };
}
export interface FraudAnalysisRequest {
    campaignId: string;
    creativeId: string;
    targetAudience: {
        demographics: any;
        interests: string[];
        behaviors: string[];
        locations: string[];
    };
    budget: number;
    platform: string;
    historicalData?: any[];
}
export interface DetailedFraudAnalysis {
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    analysisFactors: {
        deviceFingerprinting: {
            score: number;
            uniqueDevices: number;
            suspiciousPatterns: string[];
        };
        behaviorAnalysis: {
            score: number;
            clickPatterns: string[];
            engagementQuality: number;
        };
        geographicRisk: {
            score: number;
            highRiskRegions: string[];
            vpnDetection: number;
        };
        temporalPatterns: {
            score: number;
            unusualTiming: string[];
            botActivity: number;
        };
    };
    estimatedSavings: number;
    recommendation: string;
    preventionStrategies: string[];
    monitoringAlerts: string[];
}
export declare class FraudDetectionAPI {
    private config;
    private cache;
    constructor(config: FraudDetectionConfig);
    analyzeCampaignFraud(request: FraudAnalysisRequest): Promise<DetailedFraudAnalysis>;
    private analyzeWithHumanSecurity;
    private analyzeWithClickCease;
    private analyzeWithFraudlogix;
    private analyzeWithInternalEngine;
    private analyzeDeviceFingerprints;
    private analyzeBehaviorPatterns;
    private analyzeGeographicRisk;
    private analyzeTemporalPatterns;
    private calculateCompositeRiskScore;
    private categorizeRiskLevel;
    private calculateEstimatedSavings;
    private generateRecommendation;
    private generatePreventionStrategies;
    private generateMonitoringAlerts;
    private makeAPICall;
    private parseHumanSecurityResponse;
    private parseClickCeaseResponse;
    private parseFraudlogixResponse;
}
export declare const fraudDetectionAPI: FraudDetectionAPI;
