import type { BlogPost, AutopsyPost, CaseStudyPost, SEOData } from '../types/cms';
export declare class CMSEngine {
    createBlogPost(post: Partial<BlogPost>): Promise<BlogPost>;
    generateAutopsyPost(competitorData: {
        competitorName: string;
        campaignBudget: number;
        performanceMetrics: any;
        keyFailures: string[];
    }): Promise<AutopsyPost>;
    generateCaseStudyPost(clientData: {
        clientName: string;
        industry: string;
        challenge: string;
        results: any;
        testimonial: any;
    }): Promise<CaseStudyPost>;
    private generateSlug;
    private calculateReadTime;
    private generateExcerpt;
    private getTemplate;
    private populateTemplate;
    publishPost(postId: string): Promise<void>;
    schedulePost(postId: string, publishDate: Date): Promise<void>;
    generateSEOData(post: BlogPost): Promise<SEOData>;
    getAnalytics(postId: string): Promise<{
        views: number;
        shares: number;
        engagement: number;
        conversionRate: number;
    }>;
}
export declare const cmsEngine: CMSEngine;
