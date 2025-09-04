export interface TrackingEvent {
    event: string;
    properties: Record<string, any>;
    userId?: string;
    timestamp: Date;
}
export interface ComparisonView {
    id: string;
    userId?: string;
    competitorName: string;
    viewDuration: number;
    scrollDepth: number;
    ctaClicked: boolean;
    conversionType?: 'signup' | 'migration' | 'demo';
    referrer?: string;
    userAgent: string;
    timestamp: Date;
}
export declare class AnalyticsTracker {
    private events;
    private sessionId;
    private startTime;
    constructor();
    private initializeTracking;
    track(event: string, properties?: Record<string, any>): void;
    trackComparisonView(competitorName: string): void;
    trackCTAClick(ctaType: string, competitor?: string): void;
    trackConversion(type: 'signup' | 'migration' | 'demo', competitor?: string): void;
    trackFeatureInteraction(feature: string, action: string): void;
    private sendToAnalytics;
    private getElementPosition;
    getSessionSummary(): {
        sessionId: string;
        duration: number;
        eventCount: number;
        topEvents: string[];
    };
}
export declare const analyticsTracker: AnalyticsTracker;
export declare const trackComparisonView: (competitor: string) => void;
export declare const trackCTAClick: (type: string, competitor?: string) => void;
export declare const trackConversion: (type: "signup" | "migration" | "demo", competitor?: string) => void;
export declare const trackFeature: (feature: string, action: string) => void;
