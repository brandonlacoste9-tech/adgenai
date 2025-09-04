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
    var supabase, touchpoint, _a, campaignIds, model, timeRange, analysis, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (req.method === 'OPTIONS') {
                    return [2 /*return*/, new Response(null, { headers: corsHeaders })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 7, , 8]);
                supabase = (0, supabase_js_2_1.createClient)((_b = Deno.env.get('SUPABASE_URL')) !== null && _b !== void 0 ? _b : '', (_c = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) !== null && _c !== void 0 ? _c : '');
                if (!(req.method === 'POST' && req.url.includes('/record-touchpoint'))) return [3 /*break*/, 3];
                return [4 /*yield*/, req.json()
                    // In production, store in high-performance analytics database
                ];
            case 2:
                touchpoint = _d.sent();
                // In production, store in high-performance analytics database
                console.log('📊 Recording touchpoint:', touchpoint.touchpointType, touchpoint.platform);
                return [2 /*return*/, new Response(JSON.stringify({ success: true, touchpointId: touchpoint.id }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 3:
                if (!(req.method === 'POST' && req.url.includes('/analyze'))) return [3 /*break*/, 6];
                return [4 /*yield*/, req.json()];
            case 4:
                _a = _d.sent(), campaignIds = _a.campaignIds, model = _a.model, timeRange = _a.timeRange;
                console.log('🎯 Analyzing attribution for campaigns:', campaignIds, 'using model:', model);
                return [4 /*yield*/, performAttributionAnalysis(campaignIds, model, timeRange)];
            case 5:
                analysis = _d.sent();
                return [2 /*return*/, new Response(JSON.stringify(analysis), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 6: throw new Error('Invalid endpoint or method');
            case 7:
                error_1 = _d.sent();
                console.error('🚨 Attribution analysis error:', error_1);
                return [2 /*return*/, new Response(JSON.stringify({
                        error: error_1.message,
                        fallback: getFallbackAttribution()
                    }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 400,
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); });
function performAttributionAnalysis(campaignIds, model, timeRange) {
    return __awaiter(this, void 0, void 0, function () {
        var mockTouchpoints, userJourneys, attributionResults, totalRevenue, totalConversions, insights, recommendations;
        return __generator(this, function (_a) {
            mockTouchpoints = generateMockTouchpoints(campaignIds, timeRange);
            userJourneys = groupTouchpointsByUser(mockTouchpoints);
            attributionResults = calculateAttribution(userJourneys, model);
            totalRevenue = attributionResults.reduce(function (sum, result) { return sum + result.revenue; }, 0);
            totalConversions = attributionResults.reduce(function (sum, result) { return sum + result.conversions; }, 0);
            insights = generateAttributionInsights(attributionResults, model);
            recommendations = generateAttributionRecommendations(attributionResults);
            return [2 /*return*/, {
                    model: model,
                    results: attributionResults,
                    totalRevenue: totalRevenue,
                    totalConversions: totalConversions,
                    insights: insights,
                    recommendations: recommendations
                }];
        });
    });
}
function generateMockTouchpoints(campaignIds, timeRange) {
    var touchpoints = [];
    var platforms = ['facebook', 'instagram', 'google', 'tiktok'];
    // Generate realistic user journeys
    for (var userId = 1; userId <= 100; userId++) {
        var journeyLength = Math.floor(Math.random() * 6) + 2; // 2-7 touchpoints
        var startTime = new Date(timeRange.start).getTime();
        var endTime = new Date(timeRange.end).getTime();
        for (var i = 0; i < journeyLength; i++) {
            var timestamp = new Date(startTime + (endTime - startTime) * (i / journeyLength));
            var campaignId = campaignIds[Math.floor(Math.random() * campaignIds.length)];
            var platform = platforms[Math.floor(Math.random() * platforms.length)];
            var touchpointType = 'impression';
            if (i > 0 && Math.random() > 0.7)
                touchpointType = 'click';
            if (i === journeyLength - 1 && Math.random() > 0.8)
                touchpointType = 'conversion';
            touchpoints.push({
                id: crypto.randomUUID(),
                userId: "user_".concat(userId),
                creativeId: "creative_".concat(campaignId, "_").concat(platform),
                campaignId: campaignId,
                platform: platform,
                touchpointType: touchpointType,
                timestamp: timestamp.toISOString(),
                value: touchpointType === 'conversion' ? Math.random() * 100 + 25 : undefined
            });
        }
    }
    return touchpoints;
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
function calculateAttribution(userJourneys, model) {
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
            var conversionValue = conversion.value || 50;
            for (var i = 0; i < pathToConversion.length; i++) {
                var touchpoint = pathToConversion[i];
                var weight = attributionWeights[i];
                var current = creativeAttribution.get(touchpoint.creativeId) || {
                    attribution: 0,
                    revenue: 0,
                    conversions: 0,
                    touchpoints: 0,
                    clicks: 0,
                    impressions: 0
                };
                current.attribution += weight;
                current.revenue += conversionValue * weight;
                current.conversions += weight;
                current.touchpoints += 1;
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
    // Convert to results format
    return Array.from(creativeAttribution.entries()).map(function (_a) {
        var creativeId = _a[0], data = _a[1];
        return ({
            creativeId: creativeId,
            attribution: Number(data.attribution.toFixed(3)),
            revenue: Number(data.revenue.toFixed(2)),
            conversions: Number(data.conversions.toFixed(1)),
            touchpoints: data.touchpoints,
            performance: {
                ctr: data.clicks > 0 ? Number(((data.clicks / Math.max(1, data.impressions)) * 100).toFixed(2)) : 0,
                conversionRate: data.clicks > 0 ? Number(((data.conversions / data.clicks) * 100).toFixed(2)) : 0,
                averageOrderValue: data.conversions > 0 ? Number((data.revenue / data.conversions).toFixed(2)) : 0
            }
        });
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
    weights[0] = 0.4; // First touch
    weights[count - 1] = 0.4; // Last touch
    var middleWeight = 0.2 / (count - 2);
    for (var i = 1; i < count - 1; i++) {
        weights[i] = middleWeight;
    }
    return weights;
}
function generateAttributionInsights(results, model) {
    var insights = [];
    var topPerformer = results.reduce(function (max, current) {
        return current.revenue > max.revenue ? current : max;
    }, results[0]);
    if (topPerformer) {
        var revenueShare = (topPerformer.revenue / results.reduce(function (sum, r) { return sum + r.revenue; }, 0)) * 100;
        insights.push("Creative ".concat(topPerformer.creativeId, " drives ").concat(revenueShare.toFixed(1), "% of attributed revenue"));
    }
    var avgTouchpoints = results.reduce(function (sum, result) { return sum + result.touchpoints; }, 0) / results.length;
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
        case 'time-decay':
            insights.push('Time-decay model emphasizes recent interactions');
            break;
    }
    return insights;
}
function generateAttributionRecommendations(results) {
    var recommendations = [];
    var sortedResults = results.sort(function (a, b) { return b.revenue - a.revenue; });
    var topPerformers = sortedResults.slice(0, 3);
    if (topPerformers.length > 0) {
        recommendations.push("Scale budget for top-performing creative ".concat(topPerformers[0].creativeId));
    }
    var totalRevenue = results.reduce(function (sum, result) { return sum + result.revenue; }, 0);
    var revenueConcentration = topPerformers.reduce(function (sum, result) { return sum + result.revenue; }, 0) / totalRevenue;
    if (revenueConcentration > 0.8) {
        recommendations.push('Revenue concentrated in few creatives - diversify portfolio');
    }
    recommendations.push('Implement conversion tracking for more accurate attribution');
    recommendations.push('Test different attribution models for optimization insights');
    return recommendations;
}
function getFallbackAttribution() {
    return {
        model: 'linear',
        results: [],
        totalRevenue: 0,
        totalConversions: 0,
        insights: ['Analysis in progress - implement tracking for detailed insights'],
        recommendations: ['Set up conversion tracking', 'Implement touchpoint recording']
    };
}
