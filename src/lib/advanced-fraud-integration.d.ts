export interface FraudProvider {
    name: string;
    apiKey: string;
    endpoint: string;
    capabilities: string[];
    accuracy: number;
    responseTime: number;
}
export interface HybridFraudAnalysis {
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    providerResults: {
        humanSecurity: FraudProviderResult;
        clickCease: FraudProviderResult;
        internal: FraudProviderResult;
    };
    consensusAnalysis: {
        agreementLevel: number;
        conflictingSignals: string[];
        finalRecommendation: string;
    };
    estimatedSavings: number;
    preventionStrategies: string[];
    realTimeMonitoring: {
        alertThresholds: Record<string, number>;
        monitoringFrequency: string;
        escalationProcedures: string[];
    };
}
export interface FraudProviderResult {
    riskScore: number;
    confidence: number;
    detectionMethods: string[];
    specificThreats: string[];
    recommendation: string;
    responseTime: number;
}
export declare class HybridFraudDetectionEngine {
    private providers;
    private cache;
    private realTimeMonitoring;
    constructor();
    private initializeFraudProviders;
    analyzeWithHybridApproach(request: any): Promise<HybridFraudAnalysis>;
    private analyzeWithHumanSecurity;
    private analyzeWithClickCease;
    private analyzeWithInternalEngine;
    private combineProviderResults;
    private identifyConflicts;
    private generateConsensusRecommendation;
    private calculateHybridSavings;
    private generateHybridPreventionStrategies;
    private startRealTimeMonitoring;
    private processRealTimeAlerts;
    private analyzeDevicePatterns;
    private analyzeBehaviorPatterns;
    private analyzeGeographicRisk;
    private identifyInternalThreats;
    private generateInternalRecommendation;
    private translateRecommendation;
    private categorizeRisk;
    private getProviderFallback;
    private getFallbackAnalysis;
}
export declare const hybridFraudEngine: HybridFraudDetectionEngine;
