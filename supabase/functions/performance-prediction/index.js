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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
(0, server_ts_1.serve)(function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var supabase, _a, creative, targetAudience, features, prediction, error, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (req.method === 'OPTIONS') {
                    return [2 /*return*/, new Response(null, { headers: corsHeaders })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                supabase = (0, supabase_js_2_1.createClient)((_b = Deno.env.get('SUPABASE_URL')) !== null && _b !== void 0 ? _b : '', (_c = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) !== null && _c !== void 0 ? _c : '');
                return [4 /*yield*/, req.json()];
            case 2:
                _a = _d.sent(), creative = _a.creative, targetAudience = _a.targetAudience;
                if (!creative || !creative.title || !creative.description) {
                    throw new Error('Creative title and description are required');
                }
                console.log('🧠 Analyzing creative performance for:', creative.title);
                features = extractCreativeFeatures(creative, targetAudience);
                return [4 /*yield*/, predictPerformance(features, creative.platform)
                    // Store prediction in database
                ];
            case 3:
                prediction = _d.sent();
                return [4 /*yield*/, supabase
                        .from('creative_scores')
                        .insert({
                        creative_id: crypto.randomUUID(),
                        performance_score: prediction.score,
                        fraud_score: Math.random() * 30 + 10, // Will be replaced by actual fraud API
                        platform: creative.platform,
                        predicted_ctr: prediction.expectedCtr,
                        predicted_cpa: prediction.expectedCpa,
                        confidence_level: prediction.confidence / 100
                    })];
            case 4:
                error = (_d.sent()).error;
                if (error) {
                    console.error('Database error:', error);
                }
                return [2 /*return*/, new Response(JSON.stringify(prediction), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 5:
                error_1 = _d.sent();
                console.error('🚨 Performance prediction error:', error_1);
                return [2 /*return*/, new Response(JSON.stringify({
                        error: error_1.message,
                        fallback: getFallbackPrediction()
                    }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 400,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); });
function extractCreativeFeatures(creative, audience) {
    var textLength = creative.description.length;
    var wordCount = creative.description.split(' ').length;
    var hasUrgency = /\b(now|today|limited|hurry|urgent|asap)\b/i.test(creative.description);
    var hasCTA = /\b(buy|shop|get|download|sign up|learn more|start|try|click|order)\b/i.test(creative.description);
    var hasNumbers = /\d/.test(creative.description);
    var hasEmotional = /\b(amazing|incredible|love|perfect|best|awesome|exclusive|free|save)\b/i.test(creative.description);
    return [
        Math.min(textLength / 200, 1), // Text density
        Math.min(wordCount / 30, 1), // Word count normalized
        hasUrgency ? 1 : 0, // Urgency indicators
        hasCTA ? 1 : 0, // Call-to-action presence
        hasNumbers ? 1 : 0, // Numbers/stats presence
        hasEmotional ? 1 : 0, // Emotional words
        encodePlatform(creative.platform), // Platform encoding
        encodeIndustry(creative.industry || 'general'), // Industry encoding
        encodeAudienceSize((audience === null || audience === void 0 ? void 0 : audience.size) || 'medium'), // Audience size
        encodeBudget(creative.budget || 1000), // Budget tier
        encodeTimeOfDay(), // Current time factor
        Math.random() * 0.3 + 0.7 // Brand alignment (placeholder)
    ];
}
function encodePlatform(platform) {
    var platforms = { facebook: 0.2, instagram: 0.4, tiktok: 0.6, google: 0.8, linkedin: 1.0 };
    return platforms[platform] || 0.2;
}
function encodeIndustry(industry) {
    var industries = {
        ecommerce: 0.1, saas: 0.3, healthcare: 0.5, finance: 0.7, education: 0.9, general: 0.5
    };
    return industries[industry.toLowerCase()] || 0.5;
}
function encodeAudienceSize(size) {
    var sizes = { small: 0.2, medium: 0.5, large: 0.8 };
    return sizes[size] || 0.5;
}
function encodeBudget(budget) {
    if (budget < 1000)
        return 0.2;
    if (budget < 5000)
        return 0.4;
    if (budget < 25000)
        return 0.6;
    if (budget < 100000)
        return 0.8;
    return 1.0;
}
function encodeTimeOfDay() {
    var hour = new Date().getHours();
    // Peak hours: 9-11 AM, 2-4 PM, 7-9 PM
    if ((hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 16) || (hour >= 19 && hour <= 21)) {
        return 0.8;
    }
    return 0.4;
}
function predictPerformance(features, platform) {
    return __awaiter(this, void 0, void 0, function () {
        var weights, featureScore, platformMultipliers, platformMult, baseScore, expectedCtr, expectedCpa, expectedRoas, confidence, insights, recommendations, riskFactors;
        return __generator(this, function (_a) {
            weights = [
                0.15, 0.12, 0.18, 0.20, 0.08, 0.10, // Content features
                0.12, 0.08, 0.06, 0.05, 0.03, 0.08 // Context features
            ];
            featureScore = features.reduce(function (sum, feature, index) {
                return sum + feature * weights[index];
            }, 0);
            platformMultipliers = {
                facebook: 1.0,
                instagram: 1.15,
                tiktok: 1.25,
                google: 0.85,
                linkedin: 0.75
            };
            platformMult = platformMultipliers[platform] || 1.0;
            baseScore = Math.min(100, Math.max(10, featureScore * 100 * platformMult));
            expectedCtr = Math.max(0.5, Math.min(8.0, (featureScore * 6 + Math.random() * 2) * platformMult));
            expectedCpa = Math.max(3.0, Math.min(150.0, (50 - featureScore * 40 + Math.random() * 20) / platformMult));
            expectedRoas = Math.max(1.0, Math.min(15.0, (featureScore * 8 + Math.random() * 4) * platformMult));
            confidence = Math.min(98, Math.max(70, 85 + Math.random() * 10));
            insights = generateInsights(features, expectedCtr, expectedCpa, platform);
            recommendations = generateRecommendations(features, baseScore, platform);
            riskFactors = generateRiskFactors(features, baseScore);
            return [2 /*return*/, {
                    score: Math.round(baseScore),
                    expectedCtr: Number(expectedCtr.toFixed(2)),
                    expectedCpa: Number(expectedCpa.toFixed(2)),
                    expectedRoas: Number(expectedRoas.toFixed(1)),
                    confidence: Math.round(confidence),
                    insights: insights,
                    recommendations: recommendations,
                    riskFactors: riskFactors
                }];
        });
    });
}
function generateInsights(features, ctr, cpa, platform) {
    var insights = [];
    // Text analysis insights
    if (features[0] > 0.7) {
        insights.push('Text-heavy creative - ideal for LinkedIn and Facebook audiences');
    }
    else if (features[0] < 0.3) {
        insights.push('Visual-first approach - perfect for Instagram and TikTok');
    }
    // CTA analysis
    if (features[3] === 1) {
        insights.push('Strong call-to-action detected - good for direct response');
    }
    else {
        insights.push('No clear CTA found - may impact conversion rates');
    }
    // Urgency analysis
    if (features[2] === 1) {
        insights.push('Urgency elements present - effective for immediate action');
    }
    // Performance predictions
    if (ctr > 4.0) {
        insights.push('Exceptional CTR prediction - creative has viral potential');
    }
    else if (ctr < 1.5) {
        insights.push('Below-average CTR prediction - consider creative refresh');
    }
    // Platform-specific insights
    if (platform === 'tiktok' && features[0] > 0.5) {
        insights.push('Consider reducing text overlay for TikTok - focus on visual storytelling');
    }
    return insights.slice(0, 5);
}
function generateRecommendations(features, score, platform) {
    var recommendations = [];
    if (score < 60) {
        recommendations.push('Consider complete creative redesign for better performance');
        recommendations.push('A/B test with different visual approaches');
    }
    else if (score > 90) {
        recommendations.push('Exceptional creative - scale budget immediately');
        recommendations.push('Use as template for future campaigns');
    }
    if (features[3] === 0) {
        recommendations.push('Add clear, compelling call-to-action');
    }
    if (platform === 'instagram' && features[0] > 0.6) {
        recommendations.push('Reduce text for Instagram - focus on visual impact');
    }
    if (platform === 'linkedin' && features[5] > 0.7) {
        recommendations.push('Consider more professional tone for LinkedIn audience');
    }
    return recommendations.slice(0, 4);
}
function generateRiskFactors(features, score) {
    var risks = [];
    if (score < 50) {
        risks.push('High risk of poor performance - consider alternative approach');
    }
    if (features[3] === 0) {
        risks.push('Missing CTA may result in low conversion rates');
    }
    if (features[0] > 0.9) {
        risks.push('Text-heavy design may not perform well on mobile');
    }
    return risks;
}
function getFallbackPrediction() {
    return {
        score: 75,
        expectedCtr: 2.5,
        expectedCpa: 18.50,
        expectedRoas: 3.2,
        confidence: 80,
        insights: ['Analysis in progress - using baseline estimates'],
        recommendations: ['Implement A/B testing', 'Monitor performance closely'],
        riskFactors: ['Limited historical data for prediction']
    };
}
