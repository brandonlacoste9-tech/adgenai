export interface AutopsyData {
    competitorName: string;
    industry: string;
    campaignBudget: number;
    timeframe: string;
    performanceMetrics: {
        initialCtr: number;
        finalCtr: number;
        initialCpa: number;
        finalCpa: number;
        fraudPercentage: number;
        wastedSpend: number;
    };
    failurePoints: string[];
    estimatedSavings: number;
}
export interface GeneratedContent {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: 'autopsy' | 'case-study' | 'comparison';
    tags: string[];
    seoData: {
        title: string;
        description: string;
        keywords: string[];
    };
    publishDate: string;
    readTime: string;
}
export declare class CMSAutomationService {
    private competitorData;
    generateWeeklyAutopsy(): Promise<GeneratedContent>;
    private generateFailurePoints;
    private createAutopsyPost;
    generateCaseStudy(clientData: {
        clientName: string;
        industry: string;
        roasImprovement: number;
        costReduction: number;
        timeframe: string;
    }): Promise<GeneratedContent>;
    private generateSlug;
    private calculateReadTime;
    scheduleWeeklyContent(): Promise<GeneratedContent[]>;
    generateCompetitorComparison(competitor: string): Promise<GeneratedContent>;
}
export declare const cmsAutomationService: CMSAutomationService;
