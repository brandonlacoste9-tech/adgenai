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
    var supabase, trackingEvent, analyticsData, url, timeRange, summary, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (req.method === 'OPTIONS') {
                    return [2 /*return*/, new Response(null, { headers: corsHeaders })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 8, , 9]);
                supabase = (0, supabase_js_2_1.createClient)((_a = Deno.env.get('SUPABASE_URL')) !== null && _a !== void 0 ? _a : '', (_b = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) !== null && _b !== void 0 ? _b : '');
                if (!(req.method === 'POST')) return [3 /*break*/, 5];
                return [4 /*yield*/, req.json()];
            case 2:
                trackingEvent = _c.sent();
                console.log('📊 Tracking event:', trackingEvent.event, trackingEvent.properties);
                analyticsData = {
                    sessionId: trackingEvent.properties.sessionId || crypto.randomUUID(),
                    userId: trackingEvent.userId,
                    event: trackingEvent.event,
                    properties: trackingEvent.properties,
                    url: trackingEvent.properties.url || '',
                    referrer: trackingEvent.properties.referrer,
                    userAgent: trackingEvent.properties.userAgent || '',
                    timestamp: trackingEvent.timestamp,
                    ip: req.headers.get('x-forwarded-for') || 'unknown'
                };
                // Store in analytics table (you could also send to external analytics service)
                return [4 /*yield*/, storeAnalyticsEvent(supabase, analyticsData)
                    // Process specific event types
                ];
            case 3:
                // Store in analytics table (you could also send to external analytics service)
                _c.sent();
                // Process specific event types
                return [4 /*yield*/, processEventType(supabase, analyticsData)];
            case 4:
                // Process specific event types
                _c.sent();
                return [2 /*return*/, new Response(JSON.stringify({ success: true, eventId: crypto.randomUUID() }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 5:
                if (!(req.method === 'GET' && req.url.includes('/analytics-summary'))) return [3 /*break*/, 7];
                url = new URL(req.url);
                timeRange = url.searchParams.get('range') || '7d';
                return [4 /*yield*/, getAnalyticsSummary(supabase, timeRange)];
            case 6:
                summary = _c.sent();
                return [2 /*return*/, new Response(JSON.stringify(summary), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 7: throw new Error('Invalid endpoint');
            case 8:
                error_1 = _c.sent();
                console.error('🚨 Analytics tracking error:', error_1);
                return [2 /*return*/, new Response(JSON.stringify({ error: error_1.message }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 400,
                    })];
            case 9: return [2 /*return*/];
        }
    });
}); });
function storeAnalyticsEvent(supabase, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // In production, store in high-performance analytics database
            console.log('💾 Storing analytics event:', data.event);
            return [2 /*return*/];
        });
    });
}
function processEventType(supabase, data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = data.event;
                    switch (_a) {
                        case 'comparison_view': return [3 /*break*/, 1];
                        case 'cta_click': return [3 /*break*/, 3];
                        case 'conversion': return [3 /*break*/, 5];
                        case 'feature_interaction': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1: return [4 /*yield*/, processComparisonView(supabase, data)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 3: return [4 /*yield*/, processCTAClick(supabase, data)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 5: return [4 /*yield*/, processConversion(supabase, data)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 7: return [4 /*yield*/, processFeatureInteraction(supabase, data)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    console.log('📈 General event tracked:', data.event);
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
function processComparisonView(supabase, data) {
    return __awaiter(this, void 0, void 0, function () {
        var competitor;
        return __generator(this, function (_a) {
            competitor = data.properties.competitor;
            console.log("\uD83D\uDC40 Comparison view: ".concat(competitor));
            return [2 /*return*/];
        });
    });
}
function processCTAClick(supabase, data) {
    return __awaiter(this, void 0, void 0, function () {
        var ctaType, competitor;
        return __generator(this, function (_a) {
            ctaType = data.properties.type;
            competitor = data.properties.competitor;
            console.log("\uD83C\uDFAF CTA clicked: ".concat(ctaType, " from ").concat(competitor, " comparison"));
            return [2 /*return*/];
        });
    });
}
function processConversion(supabase, data) {
    return __awaiter(this, void 0, void 0, function () {
        var conversionType, competitor;
        return __generator(this, function (_a) {
            conversionType = data.properties.type;
            competitor = data.properties.competitor;
            console.log("\uD83C\uDF89 Conversion: ".concat(conversionType, " from ").concat(competitor));
            return [2 /*return*/];
        });
    });
}
function processFeatureInteraction(supabase, data) {
    return __awaiter(this, void 0, void 0, function () {
        var feature, action;
        return __generator(this, function (_a) {
            feature = data.properties.feature;
            action = data.properties.action;
            console.log("\u26A1 Feature interaction: ".concat(feature, " - ").concat(action));
            return [2 /*return*/];
        });
    });
}
function getAnalyticsSummary(supabase, timeRange) {
    return __awaiter(this, void 0, void 0, function () {
        var summary;
        return __generator(this, function (_a) {
            summary = {
                totalViews: Math.floor(Math.random() * 10000) + 5000,
                comparisonViews: {
                    'AdCreative.ai': Math.floor(Math.random() * 3000) + 1500,
                    'Creatopy': Math.floor(Math.random() * 2000) + 800,
                    'Smartly.io': Math.floor(Math.random() * 1500) + 600
                },
                conversionRate: Number((Math.random() * 0.05 + 0.03).toFixed(3)),
                topReferrers: [
                    'google.com',
                    'linkedin.com',
                    'twitter.com',
                    'direct'
                ],
                timeRange: timeRange
            };
            return [2 /*return*/, summary];
        });
    });
}
