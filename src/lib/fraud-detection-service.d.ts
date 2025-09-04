export interface FraudDetectionResult {
    riskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    factors: string[];
    recommendation: string;
    estimatedSavings: number;
    preventionStrategies: string[];
    monitoringAlerts: string[];
}
export interface FraudAnalysisRequest {
    creativeId: string;
    campaignId: string;
    targetAudience: any;
    budget: number;
    platform: string;
    historicalData?: any[];
}
export declare class FraudDetectionService {
    private apiKey;
    private baseUrl;
    private cache;
    constructor();
    analyzeFraud(request: FraudAnalysisRequest): Promise<FraudDetectionResult>;
    private performFraudAnalysis;
    private analyzeDevicePatterns;
    private analyzeBehaviorPatterns;
    private analyzeGeographicRisk;
    private analyzeTemporalPatterns;
    private calculateCompositeRisk;
    private categorizeRisk;
    private calculateSavings;
    private identifyRiskFactors;
    private generateRecommendation;
    private generatePreventionStrategies;
    private generateMonitoringAlerts;
    private getFallbackAnalysis;
}
export declare const fraudDetectionService: FraudDetectionService;
