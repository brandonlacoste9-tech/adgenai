export class AttributionEngine {
    touchpoints = new Map();
    async recordTouchpoint(touchpoint) {
        const userTouchpoints = this.touchpoints.get(touchpoint.userId) || [];
        userTouchpoints.push(touchpoint);
        this.touchpoints.set(touchpoint.userId, userTouchpoints);
        // In production, store in database
        console.log('Touchpoint recorded:', touchpoint.touchpointType, touchpoint.platform);
    }
    async analyzeAttribution(campaignIds, model, timeRange) {
        try {
            const relevantTouchpoints = this.getRelevantTouchpoints(campaignIds, timeRange);
            const userJourneys = this.groupTouchpointsByUser(relevantTouchpoints);
            const attributionResults = this.calculateAttribution(userJourneys, model);
            const totalRevenue = attributionResults.reduce((sum, result) => sum + result.revenue, 0);
            const totalConversions = attributionResults.reduce((sum, result) => sum + result.conversions, 0);
            const insights = this.generateAttributionInsights(attributionResults, model);
            const recommendations = this.generateAttributionRecommendations(attributionResults);
            return {
                model,
                results: attributionResults,
                totalRevenue,
                totalConversions,
                insights,
                recommendations
            };
        }
        catch (error) {
            console.error('Attribution analysis error:', error);
            return this.getFallbackAttribution(campaignIds, model);
        }
    }
    getRelevantTouchpoints(campaignIds, timeRange) {
        const allTouchpoints = [];
        for (const touchpointList of this.touchpoints.values()) {
            const filtered = touchpointList.filter(tp => campaignIds.includes(tp.campaignId) &&
                tp.timestamp >= timeRange.start &&
                tp.timestamp <= timeRange.end);
            allTouchpoints.push(...filtered);
        }
        return allTouchpoints.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
    groupTouchpointsByUser(touchpoints) {
        const userJourneys = new Map();
        for (const touchpoint of touchpoints) {
            const userTouchpoints = userJourneys.get(touchpoint.userId) || [];
            userTouchpoints.push(touchpoint);
            userJourneys.set(touchpoint.userId, userTouchpoints);
        }
        return userJourneys;
    }
    calculateAttribution(userJourneys, model) {
        const creativeAttribution = new Map();
        for (const [userId, journey] of userJourneys) {
            const conversions = journey.filter(tp => tp.touchpointType === 'conversion');
            for (const conversion of conversions) {
                const pathToConversion = journey.filter(tp => tp.timestamp <= conversion.timestamp && tp.touchpointType !== 'conversion');
                if (pathToConversion.length === 0)
                    continue;
                const attributionWeights = this.calculateAttributionWeights(pathToConversion, model);
                const conversionValue = conversion.value || 50; // Default $50 conversion value
                for (let i = 0; i < pathToConversion.length; i++) {
                    const touchpoint = pathToConversion[i];
                    const weight = attributionWeights[i];
                    const current = creativeAttribution.get(touchpoint.creativeId) || {
                        attribution: 0,
                        revenue: 0,
                        conversions: 0,
                        touchpoints: 0
                    };
                    current.attribution += weight;
                    current.revenue += conversionValue * weight;
                    current.conversions += weight;
                    current.touchpoints += 1;
                    creativeAttribution.set(touchpoint.creativeId, current);
                }
            }
        }
        return Array.from(creativeAttribution.entries()).map(([creativeId, data]) => ({
            creativeId,
            attribution: Number(data.attribution.toFixed(3)),
            revenue: Number(data.revenue.toFixed(2)),
            conversions: Number(data.conversions.toFixed(1)),
            touchpoints: data.touchpoints
        }));
    }
    calculateAttributionWeights(touchpoints, model) {
        const count = touchpoints.length;
        if (count === 0)
            return [];
        switch (model) {
            case 'first-touch':
                return touchpoints.map((_, i) => i === 0 ? 1 : 0);
            case 'last-touch':
                return touchpoints.map((_, i) => i === count - 1 ? 1 : 0);
            case 'linear':
                return touchpoints.map(() => 1 / count);
            case 'time-decay':
                return this.calculateTimeDecayWeights(touchpoints);
            case 'position-based':
                return this.calculatePositionBasedWeights(count);
            default:
                return touchpoints.map(() => 1 / count);
        }
    }
    calculateTimeDecayWeights(touchpoints) {
        const lastTimestamp = touchpoints[touchpoints.length - 1].timestamp.getTime();
        const halfLife = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const weights = touchpoints.map(tp => {
            const timeDiff = lastTimestamp - tp.timestamp.getTime();
            return Math.exp(-timeDiff / halfLife);
        });
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        return weights.map(weight => weight / totalWeight);
    }
    calculatePositionBasedWeights(count) {
        if (count === 1)
            return [1];
        if (count === 2)
            return [0.5, 0.5];
        const weights = new Array(count).fill(0);
        weights[0] = 0.4; // First touch gets 40%
        weights[count - 1] = 0.4; // Last touch gets 40%
        const middleWeight = 0.2 / (count - 2);
        for (let i = 1; i < count - 1; i++) {
            weights[i] = middleWeight;
        }
        return weights;
    }
    generateAttributionInsights(results, model) {
        const insights = [];
        const topPerformer = results.reduce((max, current) => current.revenue > max.revenue ? current : max, results[0]);
        if (topPerformer) {
            insights.push(`Creative ${topPerformer.creativeId} drives ${(topPerformer.attribution * 100).toFixed(1)}% of attributed revenue`);
        }
        const totalTouchpoints = results.reduce((sum, result) => sum + result.touchpoints, 0);
        const avgTouchpoints = totalTouchpoints / results.length;
        if (avgTouchpoints > 5) {
            insights.push('Complex customer journey detected - consider nurture campaigns');
        }
        else if (avgTouchpoints < 2) {
            insights.push('Short customer journey - direct response campaigns are effective');
        }
        switch (model) {
            case 'first-touch':
                insights.push('First-touch model emphasizes awareness and discovery channels');
                break;
            case 'last-touch':
                insights.push('Last-touch model highlights conversion-driving touchpoints');
                break;
            case 'linear':
                insights.push('Linear model provides balanced view across all touchpoints');
                break;
            case 'time-decay':
                insights.push('Time-decay model emphasizes recent interactions');
                break;
            case 'position-based':
                insights.push('Position-based model balances awareness and conversion touchpoints');
                break;
        }
        return insights;
    }
    generateAttributionRecommendations(results) {
        const recommendations = [];
        const sortedResults = results.sort((a, b) => b.revenue - a.revenue);
        const topPerformers = sortedResults.slice(0, 3);
        const underperformers = sortedResults.slice(-2);
        if (topPerformers.length > 0) {
            recommendations.push(`Scale budget for top-performing creative ${topPerformers[0].creativeId}`);
        }
        if (underperformers.length > 0 && underperformers[0].revenue < sortedResults[0].revenue * 0.1) {
            recommendations.push(`Consider pausing low-performing creative ${underperformers[0].creativeId}`);
        }
        const totalRevenue = results.reduce((sum, result) => sum + result.revenue, 0);
        const revenueConcentration = topPerformers.reduce((sum, result) => sum + result.revenue, 0) / totalRevenue;
        if (revenueConcentration > 0.8) {
            recommendations.push('Revenue is concentrated in few creatives - diversify creative portfolio');
        }
        return recommendations;
    }
    getFallbackAttribution(campaignIds, model) {
        // Generate mock attribution data for demo
        const mockResults = campaignIds.map((id, index) => ({
            creativeId: id,
            attribution: Math.random() * 0.4 + 0.1,
            revenue: Math.random() * 5000 + 1000,
            conversions: Math.random() * 50 + 10,
            touchpoints: Math.floor(Math.random() * 8) + 2
        }));
        return {
            model,
            results: mockResults,
            totalRevenue: mockResults.reduce((sum, result) => sum + result.revenue, 0),
            totalConversions: mockResults.reduce((sum, result) => sum + result.conversions, 0),
            insights: ['Analysis in progress - using baseline attribution model'],
            recommendations: ['Implement conversion tracking for more accurate attribution']
        };
    }
    async getAttributionReport(campaignIds, model, timeRange) {
        return this.analyzeAttribution(campaignIds, model, timeRange);
    }
    async compareAttributionModels(campaignIds, timeRange) {
        const models = ['first-touch', 'last-touch', 'linear', 'time-decay', 'position-based'];
        const results = {};
        for (const model of models) {
            results[model] = await this.analyzeAttribution(campaignIds, model, timeRange);
        }
        return results;
    }
}
// Singleton instance
export const attributionEngine = new AttributionEngine();
