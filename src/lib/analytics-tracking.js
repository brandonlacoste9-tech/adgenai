export class AnalyticsTracker {
    events = [];
    sessionId;
    startTime;
    constructor() {
        this.sessionId = crypto.randomUUID();
        this.startTime = Date.now();
        this.initializeTracking();
    }
    initializeTracking() {
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.track('page_hidden', { duration: Date.now() - this.startTime });
            }
            else {
                this.startTime = Date.now();
                this.track('page_visible', {});
            }
        });
        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                this.track('scroll_depth', { depth: scrollDepth });
            }
        });
        // Track clicks on comparison elements
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.closest('[data-track]')) {
                const trackingData = target.closest('[data-track]')?.getAttribute('data-track');
                if (trackingData) {
                    this.track('element_click', { element: trackingData });
                }
            }
        });
    }
    track(event, properties = {}) {
        const trackingEvent = {
            event,
            properties: {
                ...properties,
                sessionId: this.sessionId,
                url: window.location.href,
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            },
            timestamp: new Date()
        };
        this.events.push(trackingEvent);
        // Send to analytics service
        this.sendToAnalytics(trackingEvent);
    }
    trackComparisonView(competitorName) {
        this.track('comparison_view', {
            competitor: competitorName,
            page: window.location.pathname
        });
    }
    trackCTAClick(ctaType, competitor) {
        this.track('cta_click', {
            type: ctaType,
            competitor: competitor || 'unknown',
            position: this.getElementPosition(event?.target)
        });
    }
    trackConversion(type, competitor) {
        this.track('conversion', {
            type,
            competitor: competitor || 'unknown',
            sessionDuration: Date.now() - this.startTime
        });
    }
    trackFeatureInteraction(feature, action) {
        this.track('feature_interaction', {
            feature,
            action,
            timestamp: new Date().toISOString()
        });
    }
    async sendToAnalytics(event) {
        try {
            // Send to Supabase edge function for analytics processing
            await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics-tracker`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify(event)
            });
        }
        catch (error) {
            console.error('Analytics tracking error:', error);
        }
    }
    getElementPosition(element) {
        if (!element)
            return { x: 0, y: 0 };
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }
    getSessionSummary() {
        const duration = Date.now() - this.startTime;
        const eventCounts = this.events.reduce((acc, event) => {
            acc[event.event] = (acc[event.event] || 0) + 1;
            return acc;
        }, {});
        const topEvents = Object.entries(eventCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([event]) => event);
        return {
            sessionId: this.sessionId,
            duration,
            eventCount: this.events.length,
            topEvents
        };
    }
}
// Singleton instance
export const analyticsTracker = new AnalyticsTracker();
// Convenience functions
export const trackComparisonView = (competitor) => analyticsTracker.trackComparisonView(competitor);
export const trackCTAClick = (type, competitor) => analyticsTracker.trackCTAClick(type, competitor);
export const trackConversion = (type, competitor) => analyticsTracker.trackConversion(type, competitor);
export const trackFeature = (feature, action) => analyticsTracker.trackFeatureInteraction(feature, action);
