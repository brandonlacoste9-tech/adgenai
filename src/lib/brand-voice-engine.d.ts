export interface BrandAssets {
    websiteContent: string[];
    marketingMaterials: string[];
    brandGuidelines: string;
    previousCampaigns: string[];
    competitorAnalysis?: string[];
}
export interface BrandVoiceProfile {
    id: string;
    brandId: string;
    voiceCharacteristics: {
        tone: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'playful';
        personality: string[];
        vocabulary: string[];
        avoidWords: string[];
        sentenceStructure: 'short' | 'medium' | 'long' | 'varied';
    };
    visualIdentity: {
        colorPalette: string[];
        typography: string[];
        imageStyle: string;
        layoutPreferences: string[];
    };
    messagingFramework: {
        valueProposition: string;
        keyMessages: string[];
        targetAudience: string;
        competitiveDifferentiation: string[];
    };
    complianceRules: {
        industryRegulations: string[];
        brandSafetyGuidelines: string[];
        legalRequirements: string[];
    };
    trainingData: {
        textSamples: string[];
        approvedCreatives: string[];
        rejectedExamples: string[];
    };
    modelMetrics: {
        accuracy: number;
        consistency: number;
        lastTrained: Date;
        trainingDataSize: number;
    };
}
export interface BrandConsistencyScore {
    overallScore: number;
    breakdown: {
        toneConsistency: number;
        visualAlignment: number;
        messagingAccuracy: number;
        complianceAdherence: number;
    };
    violations: {
        type: string;
        severity: 'low' | 'medium' | 'high';
        description: string;
        suggestion: string;
    }[];
    improvements: string[];
}
export declare class BrandVoiceEngine {
    private brandProfiles;
    private trainingQueue;
    private isTraining;
    createBrandProfile(brandId: string, assets: BrandAssets): Promise<BrandVoiceProfile>;
    validateBrandConsistency(brandId: string, creative: any): Promise<BrandConsistencyScore>;
    private analyzeVoiceCharacteristics;
    private analyzeVisualIdentity;
    private extractMessagingFramework;
    private identifyComplianceRequirements;
    private trainBrandModel;
    private analyzeTone;
    private extractVocabulary;
    private analyzeSentenceStructure;
    private analyzeToneConsistency;
    private analyzeVisualAlignment;
    private analyzeMessagingAccuracy;
    private analyzeComplianceAdherence;
    private identifyViolations;
    private generateImprovementSuggestions;
    private getFallbackConsistencyScore;
    getBrandProfile(brandId: string): Promise<BrandVoiceProfile | null>;
    updateBrandProfile(brandId: string, updates: Partial<BrandVoiceProfile>): Promise<void>;
}
export declare const brandVoiceEngine: BrandVoiceEngine;
