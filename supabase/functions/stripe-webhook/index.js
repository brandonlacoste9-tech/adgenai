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
var npm_stripe_14_21_0_1 = require("npm:stripe@14.21.0");
var corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
(0, server_ts_1.serve)(function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var stripe, supabase, signature, body, webhookSecret, event_1, _a, session, userId, subscription, priceId, planType, error, subscription, userId, status_1, error, subscription, userId, error, invoice, subscriptionId, error, invoice, subscriptionId, error, error_1;
    var _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                if (req.method === 'OPTIONS') {
                    return [2 /*return*/, new Response(null, { headers: corsHeaders })];
                }
                _h.label = 1;
            case 1:
                _h.trys.push([1, 21, , 22]);
                stripe = new npm_stripe_14_21_0_1.default(Deno.env.get('STRIPE_SECRET_KEY') || '', {
                    apiVersion: '2023-10-16',
                });
                supabase = (0, supabase_js_2_1.createClient)((_b = Deno.env.get('SUPABASE_URL')) !== null && _b !== void 0 ? _b : '', (_c = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')) !== null && _c !== void 0 ? _c : '');
                signature = req.headers.get('stripe-signature');
                return [4 /*yield*/, req.text()];
            case 2:
                body = _h.sent();
                webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
                if (!signature || !webhookSecret) {
                    throw new Error('Missing signature or webhook secret');
                }
                event_1 = stripe.webhooks.constructEvent(body, signature, webhookSecret);
                console.log('Received webhook event:', event_1.type, event_1.id);
                _a = event_1.type;
                switch (_a) {
                    case 'checkout.session.completed': return [3 /*break*/, 3];
                    case 'customer.subscription.updated': return [3 /*break*/, 7];
                    case 'customer.subscription.deleted': return [3 /*break*/, 10];
                    case 'invoice.payment_failed': return [3 /*break*/, 13];
                    case 'invoice.payment_succeeded': return [3 /*break*/, 16];
                }
                return [3 /*break*/, 19];
            case 3:
                session = event_1.data.object;
                userId = (_d = session.metadata) === null || _d === void 0 ? void 0 : _d.userId;
                console.log('Processing checkout completion for user:', userId);
                if (!(userId && session.subscription)) return [3 /*break*/, 6];
                return [4 /*yield*/, stripe.subscriptions.retrieve(session.subscription)];
            case 4:
                subscription = _h.sent();
                priceId = (_e = subscription.items.data[0]) === null || _e === void 0 ? void 0 : _e.price.id;
                planType = 'free';
                if (priceId === 'price_1QdVJhP8mnDdBQuYhvQBQtY1')
                    planType = 'pro';
                if (priceId === 'price_1QdVJhP8mnDdBQuYhvQBQtY2')
                    planType = 'enterprise';
                console.log('Updating subscription for user:', userId, 'to plan:', planType);
                return [4 /*yield*/, supabase
                        .from('profiles')
                        .update({
                        subscription_status: 'active',
                        subscription_id: subscription.id,
                        plan_type: planType,
                        subscription_created_at: new Date().toISOString(),
                        subscription_updated_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                        .eq('id', userId)];
            case 5:
                error = (_h.sent()).error;
                if (error) {
                    console.error('Error updating user subscription:', error);
                    throw error;
                }
                else {
                    console.log('Successfully updated user subscription for:', userId);
                }
                _h.label = 6;
            case 6: return [3 /*break*/, 20];
            case 7:
                subscription = event_1.data.object;
                userId = (_f = subscription.metadata) === null || _f === void 0 ? void 0 : _f.userId;
                console.log('Processing subscription update for user:', userId);
                if (!userId) return [3 /*break*/, 9];
                status_1 = subscription.status === 'active' ? 'active' :
                    subscription.status === 'past_due' ? 'past_due' : 'cancelled';
                return [4 /*yield*/, supabase
                        .from('profiles')
                        .update({
                        subscription_status: status_1,
                        subscription_updated_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                        .eq('subscription_id', subscription.id)];
            case 8:
                error = (_h.sent()).error;
                if (error) {
                    console.error('Error updating subscription status:', error);
                    throw error;
                }
                else {
                    console.log('Successfully updated subscription status for:', userId);
                }
                _h.label = 9;
            case 9: return [3 /*break*/, 20];
            case 10:
                subscription = event_1.data.object;
                userId = (_g = subscription.metadata) === null || _g === void 0 ? void 0 : _g.userId;
                console.log('Processing subscription deletion for user:', userId);
                if (!userId) return [3 /*break*/, 12];
                return [4 /*yield*/, supabase
                        .from('profiles')
                        .update({
                        subscription_status: 'cancelled',
                        plan_type: 'free',
                        subscription_updated_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                        .eq('subscription_id', subscription.id)];
            case 11:
                error = (_h.sent()).error;
                if (error) {
                    console.error('Error updating subscription deletion:', error);
                    throw error;
                }
                else {
                    console.log('Successfully processed subscription deletion for:', userId);
                }
                _h.label = 12;
            case 12: return [3 /*break*/, 20];
            case 13:
                invoice = event_1.data.object;
                subscriptionId = invoice.subscription;
                console.log('Processing payment failure for subscription:', subscriptionId);
                if (!subscriptionId) return [3 /*break*/, 15];
                return [4 /*yield*/, supabase
                        .from('profiles')
                        .update({
                        subscription_status: 'past_due',
                        subscription_updated_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                        .eq('subscription_id', subscriptionId)];
            case 14:
                error = (_h.sent()).error;
                if (error) {
                    console.error('Error updating payment failed status:', error);
                    throw error;
                }
                else {
                    console.log('Successfully updated payment failed status for subscription:', subscriptionId);
                }
                _h.label = 15;
            case 15: return [3 /*break*/, 20];
            case 16:
                invoice = event_1.data.object;
                subscriptionId = invoice.subscription;
                console.log('Processing successful payment for subscription:', subscriptionId);
                if (!subscriptionId) return [3 /*break*/, 18];
                return [4 /*yield*/, supabase
                        .from('profiles')
                        .update({
                        subscription_status: 'active',
                        subscription_updated_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                        .eq('subscription_id', subscriptionId)];
            case 17:
                error = (_h.sent()).error;
                if (error) {
                    console.error('Error updating payment success status:', error);
                }
                else {
                    console.log('Successfully updated payment success status for subscription:', subscriptionId);
                }
                _h.label = 18;
            case 18: return [3 /*break*/, 20];
            case 19:
                console.log('Unhandled event type:', event_1.type);
                _h.label = 20;
            case 20: return [2 /*return*/, new Response(JSON.stringify({
                    received: true,
                    eventType: event_1.type,
                    eventId: event_1.id
                }), {
                    headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                    status: 200,
                })];
            case 21:
                error_1 = _h.sent();
                console.error('Webhook error:', error_1);
                return [2 /*return*/, new Response(JSON.stringify({
                        error: error_1.message,
                        success: false
                    }), {
                        headers: __assign(__assign({}, corsHeaders), { 'Content-Type': 'application/json' }),
                        status: 400,
                    })];
            case 22: return [2 /*return*/];
        }
    });
}); });
