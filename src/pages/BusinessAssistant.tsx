import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  PenTool, 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp,
  Sparkles,
  Play,
  Settings
} from 'lucide-react';
import { useStreamingAPI } from '../hooks/useStreamingAPI';
import { StreamingResponse } from '../components/StreamingResponse';
import { CheckoutButton } from '../components/CheckoutButton';

type AssistantTab = 'content' | 'advertising' | 'analysis' | 'support' | 'strategy' | 'research';
type ToneOption = 'concise' | 'persuasive' | 'friendly' | 'formal';

const TABS = [
  { id: 'content' as AssistantTab, label: 'Content Creation', icon: PenTool, endpoint: 'generate-content' },
  { id: 'advertising' as AssistantTab, label: 'Advertising', icon: Target, endpoint: 'generate-content' },
  { id: 'analysis' as AssistantTab, label: 'Data Analysis', icon: BarChart3, endpoint: 'analyze-data' },
  { id: 'support' as AssistantTab, label: 'Customer Service', icon: Users, endpoint: 'customer-support' },
  { id: 'strategy' as AssistantTab, label: 'Strategy', icon: TrendingUp, endpoint: 'strategy' },
  { id: 'research' as AssistantTab, label: 'Market Research', icon: Brain, endpoint: 'strategy' },
];

const TONE_OPTIONS: { value: ToneOption; label: string; description: string }[] = [
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'formal', label: 'Formal', description: 'Professional and structured' },
  { value: 'persuasive', label: 'Persuasive', description: 'Compelling and action-oriented' },
  { value: 'concise', label: 'Concise', description: 'Direct and to the point' },
];

export const BusinessAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AssistantTab>('content');
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState<ToneOption>('friendly');
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  const { content, isStreaming, error, isComplete, startStreaming, stopStreaming, reset } = useStreamingAPI();

  const handleRunAssistant = async () => {
    if (!prompt.trim()) return;

    const activeTabData = TABS.find(tab => tab.id === activeTab);
    if (!activeTabData) return;

    await startStreaming({
      endpoint: activeTabData.endpoint,
      prompt: prompt.trim(),
      context: context.trim() || undefined,
      tone,
    });
  };

  const getTabDescription = (tabId: AssistantTab): string => {
    const descriptions = {
      content: 'Generate blog posts, social media content, newsletters, and marketing copy',
      advertising: 'Create ad campaigns, headlines, and promotional materials',
      analysis: 'Analyze data trends, performance metrics, and business insights',
      support: 'Draft customer service responses and support documentation',
      strategy: 'Develop business strategies, growth plans, and competitive analysis',
      research: 'Conduct market research, competitor analysis, and industry insights',
    };
    return descriptions[tabId];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Business Assistant</h1>
            <Sparkles className="w-8 h-8 text-yellow-500 ml-3 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your AI-powered assistant for content creation, advertising, data analysis, customer service, strategy, and market research.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    reset(); // Clear previous response when switching tabs
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Description */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6"
        >
          <p className="text-primary-800 text-center font-medium">
            {getTabDescription(activeTab)}
          </p>
        </motion.div>

        {/* Input Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="space-y-6">
            {/* Main Prompt Input */}
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like me to help you with? *
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe what you need for ${TABS.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                disabled={isStreaming}
              />
            </div>

            {/* Context Input */}
            <div>
              <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide any additional context, brand guidelines, target audience, or specific requirements..."
                className="w-full h-24 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                disabled={isStreaming}
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone & Style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TONE_OPTIONS.map((toneOption) => (
                  <button
                    key={toneOption.value}
                    onClick={() => setTone(toneOption.value)}
                    disabled={isStreaming}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      tone === toneOption.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{toneOption.label}</div>
                    <div className="text-xs opacity-75">{toneOption.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Run Button */}
            <div className="flex justify-center">
              <button
                onClick={handleRunAssistant}
                disabled={!prompt.trim() || isStreaming}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>{isStreaming ? 'Running Assistant...' : 'Run Assistant'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Streaming Response */}
        <StreamingResponse
          content={content}
          isStreaming={isStreaming}
          error={error}
          isComplete={isComplete}
          onStop={stopStreaming}
        />

        {/* Upgrade CTA */}
        {!showUpgrade && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-purple-600 to-primary-600 rounded-2xl p-6 text-white text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 mr-3" />
              <h3 className="text-2xl font-bold">Unlock Full AI Power</h3>
            </div>
            <p className="text-lg opacity-90 mb-6">
              Get unlimited AI assistant requests, advanced features, and priority support
            </p>
            <CheckoutButton
              priceId="price_1234567890" // This should be replaced with actual Stripe price ID
              planName="Pro"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Upgrade to Pro - $49/month
            </CheckoutButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};