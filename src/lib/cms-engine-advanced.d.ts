export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    content: string;
    excerpt: string;
    author: string;
    publishDate: string;
    readTime: string;
    status: 'draft' | 'published' | 'scheduled' | 'archived';
    category: 'autopsy' | 'strategy' | 'case-study' | 'industry-news' | 'tutorial';
    tags: string[];
    featuredImage?: string;
    seoTitle?: string;
    seoDescription?: string;
    viewCount: number;
    shareCount: number;
    engagementScore: number;
    conversionRate: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface AutopsyData {
    competitorName: string;
    campaignBudget: number;
    timeframe: string;
    industry: string;
    performanceMetrics: {
        initialCtr: number;
        finalCtr: number;
        initialCpa: number;
        finalCpa: number;
        fraudPercentage: number;
        wastedSpend: number;
        performanceDecay: number;
    };
    failurePoints: {
        category: string;
        description: string;
        impact: string;
        cost: number;
    }[];
    adgenSolution: {
        preventionMethods: string[];
        estimatedSavings: number;
        features: string[];
    };
}
export interface ContentTemplate {
    id: string;
    name: string;
    type: 'autopsy' | 'case-study' | 'comparison' | 'tutorial';
    template: string;
    variables: string[];
    description: string;
    category: string;
    estimatedReadTime: number;
}
export interface SEOOptimization {
    targetKeywords: string[];
    metaTitle: string;
    metaDescription: string;
    headings: {
        level: number;
        text: string;
    }[];
    internalLinks: string[];
    externalLinks: string[];
    imageAltTexts: string[];
    structuredData: Record<string, any>;
}
export declare class AdvancedCMSEngine {
    private templates;
    private competitorData;
    constructor();
    private configureMarkdown;
    private initializeTemplates;
    private initializeCompetitorData;
    generateAutopsyPost(autopsyData: AutopsyData): Promise<BlogPost>;
    generateCompetitorComparison(competitor: string, focusArea: 'pricing' | 'features' | 'support' | 'performance'): Promise<BlogPost>;
    generateWeeklyAutopsy(): Promise<BlogPost>;
    optimizeForSEO(post: BlogPost): Promise<SEOOptimization>;
    scheduleContent(posts: BlogPost[], schedule: 'daily' | 'weekly' | 'biweekly'): Promise<void>;
    generateContentCalendar(months: number): Promise<{
        autopsies: BlogPost[];
        caseStudies: BlogPost[];
        comparisons: BlogPost[];
        totalPosts: number;
    }>;
    private generateCaseStudy;
    private generateFailurePoints;
    private getRandomIndustry;
    private generateClientName;
    private generateChallenge;
    private getAdgenAdvantages;
    private generateComparisonContent;
    private populateTemplate;
    private generateSlug;
    private calculateReadTime;
    private generateFeaturedImage;
    private extractTargetKeywords;
    private optimizeMetaTitle;
    private optimizeMetaDescription;
    private extractHeadings;
    private extractLinks;
    private generateImageAltTexts;
    private generateStructuredData;
    getContentAnalytics(postId: string): Promise<{
        views: number;
        uniqueViews: number;
        avgTimeOnPage: number;
        bounceRate: number;
        socialShares: number;
        conversionRate: number;
        revenueAttribution: number;
    }>;
}
export declare const advancedCMSEngine: AdvancedCMSEngine;
