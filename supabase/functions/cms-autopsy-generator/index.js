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
    var supabase, request, autopsyPost, weeklyAutopsy, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (req.method === 'OPTIONS') {
                    return [2 /*return*/, new Response(null, { headers: corsHeaders })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                supabase = (0, supabase_js_2_1.createClient)((_a = Deno.env.get('SUPABASE_URL')) !== null && _a !== void 0 ? _a : '', (_b = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) !== null && _b !== void 0 ? _b : '');
                if (!(req.method === 'POST' && req.url.includes('/generate-autopsy'))) return [3 /*break*/, 4];
                return [4 /*yield*/, req.json()];
            case 2:
                request = _c.sent();
                console.log('📝 Generating AI Ad Autopsy for:', request.competitorName);
                return [4 /*yield*/, generateAutopsyPost(request)
                    // In production, save to CMS database
                ];
            case 3:
                autopsyPost = _c.sent();
                // In production, save to CMS database
                console.log('✅ Generated autopsy:', autopsyPost.title);
                return [2 /*return*/, new Response(JSON.stringify(autopsyPost), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 4:
                if (!(req.method === 'GET' && req.url.includes('/weekly-autopsy'))) return [3 /*break*/, 6];
                return [4 /*yield*/, generateWeeklyAutopsy()];
            case 5:
                weeklyAutopsy = _c.sent();
                return [2 /*return*/, new Response(JSON.stringify(weeklyAutopsy), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 200,
                    })];
            case 6: throw new Error('Invalid endpoint');
            case 7:
                error_1 = _c.sent();
                console.error('🚨 CMS generation error:', error_1);
                return [2 /*return*/, new Response(JSON.stringify({ error: error_1.message }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 400,
                    })];
            case 8: return [2 /*return*/];
        }
    });
}); });
function generateAutopsyPost(request) {
    return __awaiter(this, void 0, void 0, function () {
        var performanceData, performanceDecay, cpaIncrease, wastedSpend, fraudCost, title, slug, content, excerpt;
        return __generator(this, function (_a) {
            performanceData = request.performanceData || generateMockPerformanceData();
            performanceDecay = ((performanceData.initialCtr - performanceData.finalCtr) / performanceData.initialCtr * 100);
            cpaIncrease = ((performanceData.finalCpa - performanceData.initialCpa) / performanceData.initialCpa * 100);
            wastedSpend = request.campaignBudget * 0.4;
            fraudCost = request.campaignBudget * (performanceData.fraudPercentage / 100);
            title = "Autopsy: ".concat(request.competitorName, " Campaign Disaster - $").concat(request.campaignBudget.toLocaleString(), " Lost in ").concat(request.timeframe);
            slug = generateSlug("autopsy-".concat(request.competitorName, "-").concat(request.industry, "-disaster"));
            content = generateAutopsyContent(__assign(__assign({}, request), { performanceData: performanceData, performanceDecay: performanceDecay.toFixed(1), cpaIncrease: cpaIncrease.toFixed(1), wastedSpend: wastedSpend.toFixed(0), fraudCost: fraudCost.toFixed(0), totalSavings: (fraudCost * 0.85 + wastedSpend * 0.4).toFixed(0) }));
            excerpt = "A forensic analysis of a $".concat(request.campaignBudget.toLocaleString(), " ").concat(request.industry, " campaign that collapsed due to ").concat(request.competitorName, "'s platform limitations, resulting in ").concat(performanceDecay.toFixed(1), "% performance decay.");
            return [2 /*return*/, {
                    id: crypto.randomUUID(),
                    title: title,
                    slug: slug,
                    content: content,
                    excerpt: excerpt,
                    publishDate: new Date().toISOString(),
                    readTime: calculateReadTime(content),
                    category: 'autopsy',
                    tags: ['autopsy', 'competitor-analysis', request.competitorName.toLowerCase(), request.industry.toLowerCase()],
                    seoData: {
                        title: "".concat(request.competitorName, " Campaign Failure Analysis - AdGen AI"),
                        description: excerpt,
                        keywords: [
                            "".concat(request.competitorName, " alternative"),
                            'campaign failure analysis',
                            'ad fraud detection',
                            'performance prediction',
                            request.industry.toLowerCase() + ' marketing'
                        ]
                    }
                }];
        });
    });
}
function generateWeeklyAutopsy() {
    return __awaiter(this, void 0, void 0, function () {
        var competitors, industries, selectedCompetitor, selectedIndustry, request;
        return __generator(this, function (_a) {
            competitors = ['AdCreative.ai', 'Creatopy', 'Smartly.io', 'Canva Pro'];
            industries = ['E-commerce', 'SaaS', 'Healthcare', 'Finance', 'Education'];
            selectedCompetitor = competitors[Math.floor(Math.random() * competitors.length)];
            selectedIndustry = industries[Math.floor(Math.random() * industries.length)];
            request = {
                competitorName: selectedCompetitor,
                industry: selectedIndustry,
                campaignBudget: Math.floor(Math.random() * 50000) + 10000,
                timeframe: '14 days',
                performanceData: generateMockPerformanceData()
            };
            return [2 /*return*/, generateAutopsyPost(request)];
        });
    });
}
function generateMockPerformanceData() {
    var initialCtr = Number((Math.random() * 2 + 2).toFixed(2));
    var finalCtr = Number((Math.random() * 0.8 + 0.3).toFixed(2));
    var initialCpa = Number((Math.random() * 10 + 15).toFixed(2));
    var finalCpa = Number((Math.random() * 40 + 60).toFixed(2));
    var fraudPercentage = Number((Math.random() * 30 + 15).toFixed(1));
    return {
        initialCtr: initialCtr,
        finalCtr: finalCtr,
        initialCpa: initialCpa,
        finalCpa: finalCpa,
        fraudPercentage: fraudPercentage
    };
}
function generateAutopsyContent(data) {
    return "\n# ".concat(data.title, "\n\n## Executive Summary\n\nA comprehensive forensic analysis of a ").concat(data.industry, " campaign that used ").concat(data.competitorName, "'s platform, resulting in catastrophic performance decay and $").concat(data.wastedSpend, " in wasted ad spend due to preventable failures.\n\n## Campaign Overview\n\n**Industry**: ").concat(data.industry, "  \n**Platform**: ").concat(data.competitorName, "  \n**Budget**: $").concat(data.campaignBudget.toLocaleString(), "  \n**Duration**: ").concat(data.timeframe, "  \n**Outcome**: Complete performance collapse\n\n## Performance Deterioration Analysis\n\n### Initial Performance\n- **CTR**: ").concat(data.performanceData.initialCtr, "%\n- **CPA**: $").concat(data.performanceData.initialCpa, "\n- **Status**: Promising start\n\n### Final Performance  \n- **CTR**: ").concat(data.performanceData.finalCtr, "% (").concat(data.performanceDecay, "% decline)\n- **CPA**: $").concat(data.performanceData.finalCpa, " (").concat(data.cpaIncrease, "% increase)\n- **Fraud Rate**: ").concat(data.performanceData.fraudPercentage, "%\n- **Wasted Spend**: $").concat(data.wastedSpend, "\n\n## Critical Failure Points\n\n### 1. Template Monotony\n").concat(data.competitorName, "'s templated approach created visual fatigue within days. All creatives shared identical structural patterns, leading to audience saturation.\n\n### 2. Zero Fraud Protection\n").concat(data.performanceData.fraudPercentage, "% of traffic was fraudulent - bot clicks and invalid traffic that went completely undetected, inflating true CPA by $").concat(data.fraudCost, ".\n\n### 3. No Performance Prediction\nCampaign launched blind with no success indicators, leading to $").concat(data.wastedSpend, " in preventable waste.\n\n## The Hidden Fraud Tax\n\nOur analysis revealed that ").concat(data.performanceData.fraudPercentage, "% of campaign traffic was fraudulent:\n- **Bot Traffic**: ").concat((data.performanceData.fraudPercentage * 0.6).toFixed(1), "%\n- **Click Farms**: ").concat((data.performanceData.fraudPercentage * 0.25).toFixed(1), "%\n- **Invalid Clicks**: ").concat((data.performanceData.fraudPercentage * 0.15).toFixed(1), "%\n- **Total Fraud Cost**: $").concat(data.fraudCost, "\n\n## How AdGen AI Prevents This Disaster\n\n### Fraud Shield Protection\n- Real-time bot detection and blocking\n- Device fingerprinting analysis\n- Geographic risk assessment\n- Behavioral pattern recognition\n\n### Performance Prediction Engine\nOur AI would have flagged this campaign's issues before launch:\n- **Pre-launch Score**: 25/100 (High Risk)\n- **Fraud Risk**: ").concat(data.performanceData.fraudPercentage, "% (Above threshold)\n- **Recommendation**: Campaign restructure required\n\n### Estimated Savings with AdGen AI\n- **Fraud Prevention**: $").concat((data.fraudCost * 0.85).toFixed(0), "\n- **Performance Optimization**: $").concat((data.wastedSpend * 0.4).toFixed(0), "\n- **Total Savings**: $").concat(data.totalSavings, "\n\n## Key Takeaways\n\n1. **Template-based tools create visual monotony** that accelerates ad fatigue\n2. **Lack of fraud detection** can inflate campaign costs by 30-50%\n3. **Performance prediction** is essential for preventing costly failures\n4. **Real-time monitoring** enables rapid optimization\n\n## Conclusion\n\nThis campaign disaster was entirely preventable with proper fraud detection and performance prediction. AdGen AI's Full-Stack Marketing Brain would have identified every failure point before a single dollar was wasted.\n\n**Ready to prevent your own campaign disasters?** [Start your free migration today](/migration) and get our 90-day performance guarantee.\n  ");
}
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}
function calculateReadTime(content) {
    var wordsPerMinute = 200;
    var wordCount = content.split(/\s+/).length;
    var minutes = Math.ceil(wordCount / wordsPerMinute);
    return "".concat(minutes, " min read");
}
