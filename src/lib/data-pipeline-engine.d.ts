export interface UserResponseData {
    userId: string;
    creativeId: string;
    campaignId: string;
    responseType: 'impression' | 'click' | 'conversion' | 'engagement';
    timestamp: Date;
    deviceType: 'mobile' | 'desktop' | 'tablet';
    platform: string;
    demographics: {
        ageRange: string;
        gender: string;
        location: string;
        interests: string[];
    };
    contextualFactors: {
        timeOfDay: number;
        dayOfWeek: number;
        seasonality: string;
        competitorActivity: number;
    };
    responseMetrics: {
        engagementDuration: number;
        scrollDepth: number;
        clickPosition?: {
            x: number;
            y: number;
        };
        conversionValue?: number;
    };
}
export interface ForecastingModel {
    modelId: string;
    modelType: 'dnn' | 'gbdt' | 'ensemble';
    trainingData: UserResponseData[];
    accuracy: number;
    lastTrained: Date;
    features: string[];
}
export interface ResponseForecast {
    creativeId: string;
    predictedCtr: number;
    predictedConversionRate: number;
    predictedEngagement: number;
    confidence: number;
    audienceSegments: {
        segment: string;
        expectedResponse: number;
        confidence: number;
    }[];
    optimizationRecommendations: string[];
}
export declare class DataPipelineEngine {
    private models;
    private trainingQueue;
    private isTraining;
    constructor();
    private initializeModels;
    private startDataPipeline;
    ingestUserResponse(responseData: UserResponseData): Promise<void>;
    generateResponseForecast(creativeId: string, targetAudience: any, campaignContext: any): Promise<ResponseForecast>;
    private extractPredictionFeatures;
    private runDNNPrediction;
    private runGBDTPrediction;
    private combineModelPredictions;
    private generateSegmentForecasts;
    private generateOptimizationRecommendations;
    private normalizeTextLength;
    private calculateVisualComplexity;
    private analyzeCTAStrength;
    private calculateBrandAlignment;
    private calculatePlatformOptimization;
    private encodeAudienceSize;
    private calculateDemographicMatch;
    private encodeTemporalFactors;
    private assessCompetitivePressure;
    private getHistoricalPerformance;
    private calculateMarketSaturation;
    private encodeBudgetTier;
    private matrixMultiply;
    private applyActivation;
    private generateWeights;
    private simulateDecisionTree;
    private storeResponseData;
    private processDataQueue;
    private retrainModels;
    private getFallbackForecast;
    getModelMetrics(): Promise<Record<string, any>>;
    exportTrainingData(format: 'csv' | 'json'): Promise<string>;
    private convertToCSV;
}
export declare const dataPipelineEngine: DataPipelineEngine;
