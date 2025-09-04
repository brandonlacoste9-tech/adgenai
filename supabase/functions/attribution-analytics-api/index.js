"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
var supabase_js_2_1 = require("npm:@supabase/supabase-js@2");
var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};
(0, server_ts_1.serve)(function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var supabase, url, touchpoint, _a, campaignIds, model, timeRange, userId, analysis, campaignIds, userId, comparison, error_1;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (req.method === 'OPTIONS') {
                    return [2 /*return*/, new Response(null, { headers: corsHeaders })];
                }
                _e.label = 1;
            case 1:
                _e.trys.push([1, 9, , 10]);
                supabase = (0, supabase_js_2_1.createClient)((_b = Deno.env.get('SUPABASE_URL')) !== null && _b !== void 0 ? _b : '', (_c = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) !== null && _c !== void 0 ? _c : '');
                url = new URL(req.url);
                if (!(req.method === 'POST' && url.pathname.includes('/record-touchpoint'))) return [3 /*break*/, 3];
                return [4 /*yield*/, req.json()];
            case 2:
                touchpoint = _e.sent();
                console.log('📊 Recording advanced touchpoint:', touchpoint.touchpointType, touchpoint.platform);
                // In production, store in high-performance analytics database (ClickHouse, BigQuery)
                // For now, simulate storage
                return [2 /*return*/, new Response(JSON.stringify({
                        success: true,
                        touchpointId: touchpoint.id,
                        timestamp: new Date().toISOString()
                    }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 3:
                if (!(req.method === 'POST' && url.pathname.includes('/analyze-attribution'))) return [3 /*break*/, 6];
                return [4 /*yield*/, req.json()];
            case 4:
                _a = _e.sent(), campaignIds = _a.campaignIds, model = _a.model, timeRange = _a.timeRange, userId = _a.userId;
                console.log('🎯 Advanced Attribution Analysis for campaigns:', campaignIds, 'using model:', model);
                return [4 /*yield*/, performAdvancedAttributionAnalysis(campaignIds, model, timeRange, userId)];
            case 5:
                analysis = _e.sent();
                return [2 /*return*/, new Response(JSON.stringify(analysis), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 6:
                if (!(req.method === 'GET' && url.pathname.includes('/compare-models'))) return [3 /*break*/, 8];
                campaignIds = ((_d = url.searchParams.get('campaigns')) === null || _d === void 0 ? void 0 : _d.split(',')) || [];
                userId = url.searchParams.get('userId') || '';
                return [4 /*yield*/, compareAttributionModels(campaignIds, userId)];
            case 7:
                comparison = _e.sent();
                return [2 /*return*/, new Response(JSON.stringify(comparison), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 8: throw new Error('Invalid endpoint or method');
            case 9:
                error_1 = _e.sent();
                console.error('🚨 Attribution analytics error:', error_1);
                return [2 /*return*/, new Response(JSON.stringify({
                        error: error_1.message,
                        fallback: getFallbackAttribution()
                    }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 400,
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); });
function performAdvancedAttributionAnalysis(campaignIds, model, timeRange, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var mockTouchpoints, userJourneys, attributionResults, totalRevenue, totalConversions, insights, recommendations, summary;
        return __generator(this, function (_a) {
            mockTouchpoints = generateAdvancedTouchpoints(campaignIds, timeRange);
            userJourneys = groupTouchpointsByUser(mockTouchpoints);
            attributionResults = calculateAdvancedAttribution(userJourneys, model);
            totalRevenue = attributionResults.reduce(function (sum, result) { return sum + result.revenue; }, 0);
            totalConversions = attributionResults.reduce(function (sum, result) { return sum + result.conversions; }, 0);
            insights = generateAdvancedInsights(attributionResults, model, userJourneys);
            recommendations = generateStrategicRecommendations(attributionResults);
            summary = generateAdvancedSummary(attributionResults);
            return [2 /*return*/, {
                    model: model,
                    results: attributionResults,
                    totalRevenue: totalRevenue,
                    totalConversions: totalConversions,
                    insights: insights,
                    recommendations: recommendations,
                    summary: summary
                }];
        });
    });
}
function generateAdvancedTouchpoints(campaignIds, timeRange) {
    var touchpoints = [];
    var platforms = ['facebook', 'instagram', 'google', 'tiktok', 'linkedin', 'email', 'organic'];
    // Generate realistic complex user journeys
    for (var userId = 1; userId <= 150; userId++) {
        var journeyLength = Math.floor(Math.random() * 8) + 2; // 2-9 touchpoints
        var startTime = new Date(timeRange.start).getTime();
        var endTime = new Date(timeRange.end).getTime();
        for (var i = 0; i < journeyLength; i++) {
            var timestamp = new Date(startTime + (endTime - startTime) * (i / journeyLength) + Math.random() * 86400000);
            var campaignId = campaignIds[Math.floor(Math.random() * campaignIds.length)];
            var platform = platforms[Math.floor(Math.random() * platforms.length)];
            var touchpointType = 'impression';
            if (i > 0 && Math.random() > 0.6)
                touchpointType = 'click';
            if (i === journeyLength - 1 && Math.random() > 0.75)
                touchpointType = 'conversion';
            touchpoints.push({
                id: crypto.randomUUID(),
                userId: "user_".concat(userId),
                creativeId: "creative_".concat(campaignId, "_").concat(platform),
                campaignId: campaignId,
                platform: platform,
                touchpointType: touchpointType,
                timestamp: timestamp.toISOString(),
                value: touchpointType === 'conversion' ? Math.random() * 200 + 25 : undefined,
                metadata: {
                    deviceType: Math.random() > 0.6 ? 'mobile' : 'desktop',
                    adPosition: Math.random() > 0.5 ? 'feed' : 'sidebar',
                    timeOnPage: Math.random() * 300 + 30
                }
            });
        }
    }
    return touchpoints.sort(function (a, b) { return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(); });
}
function groupTouchpointsByUser(touchpoints) {
    var userJourneys = new Map();
    for (var _i = 0, touchpoints_1 = touchpoints; _i < touchpoints_1.length; _i++) {
        var touchpoint = touchpoints_1[_i];
        var userTouchpoints = userJourneys.get(touchpoint.userId) || [];
        userTouchpoints.push(touchpoint);
        userJourneys.set(touchpoint.userId, userTouchpoints);
    }
    // Sort each user's journey by timestamp
    for (var _a = 0, userJourneys_1 = userJourneys; _a < userJourneys_1.length; _a++) {
        var _b = userJourneys_1[_a], userId = _b[0], journey = _b[1];
        journey.sort(function (a, b) { return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(); });
        userJourneys.set(userId, journey);
    }
    return userJourneys;
}
function calculateAdvancedAttribution(userJourneys, model) {
    var creativeAttribution = new Map();
    for (var _i = 0, userJourneys_2 = userJourneys; _i < userJourneys_2.length; _i++) {
        var _a = userJourneys_2[_i], userId = _a[0], journey = _a[1];
        var conversions = journey.filter(function (tp) { return tp.touchpointType === 'conversion'; });
        var _loop_1 = function (conversion) {
            var pathToConversion = journey.filter(function (tp) {
                return new Date(tp.timestamp) <= new Date(conversion.timestamp) && tp.touchpointType !== 'conversion';
            });
            if (pathToConversion.length === 0)
                return "continue";
            var attributionWeights = calculateAttributionWeights(pathToConversion, model);
            var conversionValue = conversion.value || 75;
            var timeToPurchase = (new Date(conversion.timestamp).getTime() - new Date(pathToConversion[0].timestamp).getTime()) / (1000 * 60 * 60); // hours
            for (var i = 0; i < pathToConversion.length; i++) {
                var touchpoint = pathToConversion[i];
                var weight = attributionWeights[i];
                var current = creativeAttribution.get(touchpoint.creativeId) || {
                    attribution: 0,
                    revenue: 0,
                    conversions: 0,
                    touchpoints: 0,
                    clicks: 0,
                    impressions: 0,
                    totalTimeToPurchase: 0,
                    journeyCount: 0,
                    platforms: new Set()
                };
                current.attribution += weight;
                current.revenue += conversionValue * weight;
                current.conversions += weight;
                current.touchpoints += 1;
                current.totalTimeToPurchase += timeToPurchase * weight;
                current.journeyCount += weight;
                current.platforms.add(touchpoint.platform);
                if (touchpoint.touchpointType === 'click')
                    current.clicks += 1;
                if (touchpoint.touchpointType === 'impression')
                    current.impressions += 1;
                creativeAttribution.set(touchpoint.creativeId, current);
            }
        };
        for (var _b = 0, conversions_1 = conversions; _b < conversions_1.length; _b++) {
            var conversion = conversions_1[_b];
            _loop_1(conversion);
        }
    }
    // Convert to advanced results format
    return Array.from(creativeAttribution.entries()).map(function (_a) {
        var creativeId = _a[0], data = _a[1];
        var avgTimeToPurchase = data.totalTimeToPurchase / Math.max(1, data.journeyCount);
        var avgTouchpoints = data.touchpoints / Math.max(1, data.journeyCount);
        return {
            creativeId: creativeId,
            attribution: Number(data.attribution.toFixed(3)),
            revenue: Number(data.revenue.toFixed(2)),
            conversions: Number(data.conversions.toFixed(1)),
            touchpoints: data.touchpoints,
            performance: {
                ctr: data.clicks > 0 ? Number(((data.clicks / Math.max(1, data.impressions)) * 100).toFixed(2)) : 0,
                conversionRate: data.clicks > 0 ? Number(((data.conversions / data.clicks) * 100).toFixed(2)) : 0,
                averageOrderValue: data.conversions > 0 ? Number((data.revenue / data.conversions).toFixed(2)) : 0,
                customerLifetimeValue: data.conversions > 0 ? Number((data.revenue * 2.5 / data.conversions).toFixed(2)) : 0
            },
            journey: {
                averageTouchpoints: Number(avgTouchpoints.toFixed(1)),
                averageTimeToPurchase: Number(avgTimeToPurchase.toFixed(1)),
                topChannels: Array.from(data.platforms).slice(0, 3)
            }
        };
    });
}
function calculateAttributionWeights(touchpoints, model) {
    var count = touchpoints.length;
    if (count === 0)
        return [];
    switch (model) {
        case 'first-touch':
            return touchpoints.map(function (_, i) { return i === 0 ? 1 : 0; });
        case 'last-touch':
            return touchpoints.map(function (_, i) { return i === count - 1 ? 1 : 0; });
        case 'linear':
            return touchpoints.map(function () { return 1 / count; });
        case 'time-decay':
            return calculateTimeDecayWeights(touchpoints);
        case 'position-based':
            return calculatePositionBasedWeights(count);
        default:
            return touchpoints.map(function () { return 1 / count; });
    }
}
function calculateTimeDecayWeights(touchpoints) {
    var lastTimestamp = new Date(touchpoints[touchpoints.length - 1].timestamp).getTime();
    var halfLife = 7 * 24 * 60 * 60 * 1000; // 7 days
    var weights = touchpoints.map(function (tp) {
        var timeDiff = lastTimestamp - new Date(tp.timestamp).getTime();
        return Math.exp(-timeDiff / halfLife);
    });
    var totalWeight = weights.reduce(function (sum, weight) { return sum + weight; }, 0);
    return weights.map(function (weight) { return weight / totalWeight; });
}
function calculatePositionBasedWeights(count) {
    if (count === 1)
        return [1];
    if (count === 2)
        return [0.5, 0.5];
    var weights = new Array(count).fill(0);
    weights[0] = 0.4; // First touch gets 40%
    weights[count - 1] = 0.4; // Last touch gets 40%
    var middleWeight = 0.2 / (count - 2);
    for (var i = 1; i < count - 1; i++) {
        weights[i] = middleWeight;
    }
    return weights;
}
function generateAdvancedInsights(results, model, userJourneys) {
    var insights = [];
    var topPerformer = results.reduce(function (max, current) {
        return current.revenue > max.revenue ? current : max;
    }, results[0]);
    if (topPerformer) {
        var revenueShare = (topPerformer.revenue / results.reduce(function (sum, r) { return sum + r.revenue; }, 0)) * 100;
        insights.push("Creative ".concat(topPerformer.creativeId, " drives ").concat(revenueShare.toFixed(1), "% of attributed revenue with ").concat(topPerformer.performance.ctr, "% CTR"));
    }
    // Journey complexity analysis
    var avgJourneyLength = Array.from(userJourneys.values())
        .reduce(function (sum, journey) { return sum + journey.length; }, 0) / userJourneys.size;
    if (avgJourneyLength > 6) {
        insights.push("Complex customer journey detected (".concat(avgJourneyLength.toFixed(1), " avg touchpoints) - implement nurture campaigns"));
    }
    else if (avgJourneyLength < 3) {
        insights.push("Short customer journey (".concat(avgJourneyLength.toFixed(1), " touchpoints) - direct response campaigns are highly effective"));
    }
    // Revenue concentration analysis
    var totalRevenue = results.reduce(function (sum, result) { return sum + result.revenue; }, 0);
    var topThreeRevenue = results.sort(function (a, b) { return b.revenue - a.revenue; })
        .slice(0, 3)
        .reduce(function (sum, result) { return sum + result.revenue; }, 0);
    var concentration = (topThreeRevenue / totalRevenue) * 100;
    if (concentration > 75) {
        insights.push("High revenue concentration (".concat(concentration.toFixed(1), "%) in top 3 creatives - diversification recommended"));
    }
    // Model-specific insights
    switch (model) {
        case 'first-touch':
            insights.push('First-touch attribution emphasizes awareness channels - optimize top-of-funnel investments');
            break;
        case 'last-touch':
            insights.push('Last-touch attribution highlights conversion drivers - focus on bottom-funnel optimization');
            break;
        case 'time-decay':
            insights.push('Time-decay model shows recent touchpoints drive most value - prioritize retargeting');
            break;
        case 'position-based':
            insights.push('Position-based model balances awareness and conversion - optimize both funnel ends');
            break;
        case 'linear':
            insights.push('Linear attribution provides balanced view - all touchpoints contribute equally');
            break;
    }
    // Performance insights
    var avgCLV = results.reduce(function (sum, result) { return sum + result.performance.customerLifetimeValue; }, 0) / results.length;
    if (avgCLV > 200) {
        insights.push("High customer lifetime value (".concat(avgCLV.toFixed(0), ") detected - increase acquisition budget"));
    }
    return insights.slice(0, 6);
}
function generateStrategicRecommendations(results) {
    var recommendations = [];
    var sortedResults = results.sort(function (a, b) { return b.revenue - a.revenue; });
    var topPerformers = sortedResults.slice(0, 3);
    var underperformers = sortedResults.slice(-2);
    if (topPerformers.length > 0) {
        recommendations.push("Immediately scale budget for creative ".concat(topPerformers[0].creativeId, " (").concat(topPerformers[0].performance.ctr, "% CTR, ").concat(topPerformers[0].performance.customerLifetimeValue.toFixed(0), " CLV)"));
    }
    if (underperformers.length > 0 && underperformers[0].revenue < sortedResults[0].revenue * 0.1) {
        recommendations.push("Pause underperforming creative ".concat(underperformers[0].creativeId, " and reallocate budget to top performers"));
    }
    var totalRevenue = results.reduce(function (sum, result) { return sum + result.revenue; }, 0);
    var revenueConcentration = topPerformers.reduce(function (sum, result) { return sum + result.revenue; }, 0) / totalRevenue;
    if (revenueConcentration > 0.8) {
        recommendations.push('Revenue highly concentrated - develop creative variations to reduce dependency risk');
    }
    // Journey optimization recommendations
    var avgTouchpoints = results.reduce(function (sum, result) { return sum + result.journey.averageTouchpoints; }, 0) / results.length;
    if (avgTouchpoints > 5) {
        recommendations.push('Long customer journey detected - implement retargeting sequences and nurture campaigns');
    }
    // Performance optimization
    var highCLVCreatives = results.filter(function (r) { return r.performance.customerLifetimeValue > 150; });
    if (highCLVCreatives.length > 0) {
        recommendations.push("Focus on high-CLV creatives: ".concat(highCLVCreatives.map(function (c) { return c.creativeId; }).join(', '), " for long-term value"));
    }
    return recommendations.slice(0, 5);
}
function generateAdvancedSummary(results) {
    var topPerformer = results.reduce(function (max, current) {
        return current.revenue > max.revenue ? current : max;
    }, results[0]);
    var avgTouchpoints = results.reduce(function (sum, result) { return sum + result.journey.averageTouchpoints; }, 0) / results.length;
    var totalRevenue = results.reduce(function (sum, result) { return sum + result.revenue; }, 0);
    var totalSpend = totalRevenue / 4.2; // Assume 4.2:1 ROAS baseline
    var topThreeRevenue = results.sort(function (a, b) { return b.revenue - a.revenue; })
        .slice(0, 3)
        .reduce(function (sum, result) { return sum + result.revenue; }, 0);
    var revenueConcentration = (topThreeRevenue / totalRevenue) * 100;
    return {
        topPerformer: (topPerformer === null || topPerformer === void 0 ? void 0 : topPerformer.creativeId) || 'N/A',
        avgTouchpoints: Number(avgTouchpoints.toFixed(1)),
        totalROI: Number((totalRevenue / totalSpend).toFixed(1)),
        revenueConcentration: Number(revenueConcentration.toFixed(1))
    };
}
function compareAttributionModels(campaignIds, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var models, timeRange, results, _i, models_1, model, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    models = ['first-touch', 'last-touch', 'linear', 'time-decay', 'position-based'];
                    timeRange = {
                        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                        end: new Date().toISOString()
                    };
                    results = {};
                    _i = 0, models_1 = models;
                    _c.label = 1;
                case 1:
                    if (!(_i < models_1.length)) return [3 /*break*/, 4];
                    model = models_1[_i];
                    _a = results;
                    _b = model;
                    return [4 /*yield*/, performAdvancedAttributionAnalysis(campaignIds, model, timeRange, userId)];
                case 2:
                    _a[_b] = _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
function getFallbackAttribution() {
    return {
        model: 'linear',
        results: [],
        totalRevenue: 0,
        totalConversions: 0,
        insights: ['Analysis in progress - implement touchpoint tracking for detailed insights'],
        recommendations: ['Set up conversion tracking', 'Implement comprehensive touchpoint recording'],
        summary: {
            topPerformer: 'N/A',
            avgTouchpoints: 0,
            totalROI: 0,
            revenueConcentration: 0
        }
    };
}
