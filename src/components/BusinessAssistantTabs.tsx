import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Target, 
  BarChart3, 
  MessageCircle, 
  TrendingUp, 
  Search,
  Send,
  Loader2,
  Brain,
  Sparkles,
  Wand2
} from 'lucide-react';

interface TabConfig {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  apiEndpoint: string;
  placeholder: string;
  contextPlaceholder: string;
}

const tabs: TabConfig[] = [
  {
    id: 'content',
    name: 'Content Creation',
    icon: FileText,
    description: 'Generate high-converting content with senior strategist insights',
    apiEndpoint: '/api/generate-content',
    placeholder: 'Describe the content you need (blog post, social media, email, etc.)',
    contextPlaceholder: 'Target audience, brand guidelines, specific requirements...'
  },
  {
    id: 'advertising',
    name: 'Advertising',
    icon: Target,
    description: 'Create optimized ad campaigns and copy',
    apiEndpoint: '/api/generate-ad',
    placeholder: 'Describe your advertising campaign needs',
    contextPlaceholder: 'Product details, target market, campaign goals...'
  },
  {
    id: 'analysis',
    name: 'Data Analysis',
    icon: BarChart3,
    description: 'Get practical insights from your marketing data',
    apiEndpoint: '/api/analyze-data',
    placeholder: 'What data would you like analyzed? (performance metrics, trends, etc.)',
    contextPlaceholder: 'Data source, timeframe, specific metrics to focus on...'
  },
  {
    id: 'support',
    name: 'Customer Service',
    icon: MessageCircle,
    description: 'Generate empathetic Tier-2 support responses',
    apiEndpoint: '/api/customer-support',
    placeholder: 'Describe the customer issue or inquiry',
    contextPlaceholder: 'Customer history, product context, urgency level...'
  },
  {
    id: 'strategy',
    name: 'Strategy',
    icon: TrendingUp,
    description: 'Create actionable 30/60/90 day business plans',
    apiEndpoint: '/api/strategy',
    placeholder: 'What strategic area needs planning? (growth, marketing, product, etc.)',
    contextPlaceholder: 'Current situation, resources, business goals...'
  },
  {
    id: 'research',
    name: 'Market Research',
    icon: Search,
    description: 'Comprehensive market and competitor analysis',
    apiEndpoint: '/api/market-research',
    placeholder: 'What market research do you need? (competitor analysis, trends, etc.)',
    contextPlaceholder: 'Industry, geographic focus, specific competitors...'
  }
];

const toneOptions = [
  { value: 'concise', label: 'Concise', description: 'Direct and to-the-point' },
  { value: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'formal', label: 'Formal', description: 'Professional and structured' }
];

export const BusinessAssistantTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('content');
  const [input, setInput] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [tone, setTone] = useState<string>('persuasive');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [streamingText, setStreamingText] = useState<string>('');

  const activeTabConfig = tabs.find(tab => tab.id === activeTab)!;

  // Simulated typing effect for streaming
  useEffect(() => {
    if (result && result !== streamingText) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < result.length) {
          setStreamingText(result.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20); // Typing speed

      return () => clearInterval(interval);
    }
  }, [result]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setResult('');
    setStreamingText('');

    try {
      const response = await fetch(activeTabConfig.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input.trim(),
          context: context.trim(),
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if the response supports streaming
      if (response.headers.get('content-type')?.includes('text/plain')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            fullText += chunk;
            setStreamingText(fullText);
          }
          setResult(fullText);
        }
      } else {
        // Fallback for non-streaming responses
        const data = await response.json();
        const generatedText = data.content || data.message || 'Generated content will appear here.';
        setResult(generatedText);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      // Fallback with mock content for development
      const mockContent = generateMockContent(activeTab, input, context, tone);
      setResult(mockContent);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockContent = (tabId: string, input: string, context: string, tone: string): string => {
    const baseMock = {
      content: `# Content Strategy for: ${input}

Based on your request with a ${tone} tone and considering ${context || 'general best practices'}, here's your content strategy:

## Key Message
Your content should focus on addressing the core pain points of your audience while establishing your authority in the space.

## Content Structure
1. **Hook**: Start with a compelling question or statistic
2. **Value Proposition**: Clearly state what's in it for the reader
3. **Evidence**: Support with data, testimonials, or case studies
4. **Call to Action**: Direct, specific next step

## Recommended Content Pieces
- Blog post: "The Complete Guide to [Your Topic]"
- Social media series: 5-part educational thread
- Email sequence: 3-email nurture campaign
- Video content: Behind-the-scenes or how-to format

This strategy balances engagement with conversion optimization, ensuring your content serves both awareness and revenue goals.`,

      advertising: `# Ad Campaign Strategy for: ${input}

Campaign developed with ${tone} messaging, considering ${context || 'standard targeting parameters'}:

## Campaign Overview
**Objective**: Drive qualified leads and conversions
**Target Audience**: Based on your context and product fit
**Budget Recommendation**: Start with $50-100/day for testing

## Ad Creative Strategy
### Headlines (A/B Test These):
1. "Finally, A Solution That Actually Works"
2. "Join 10,000+ Others Who've Already Transformed Their [Industry]"
3. "The #1 Mistake Most People Make With [Topic]"

### Ad Copy Framework:
- Problem: Address the specific pain point
- Agitate: Make them feel the cost of inaction
- Solution: Present your offer as the bridge
- Proof: Include social proof or guarantees
- CTA: Clear, benefit-driven action

## Platform Recommendations
- **Facebook/Instagram**: Visual storytelling, lookalike audiences
- **Google Ads**: High-intent search terms
- **LinkedIn**: B2B decision-makers
- **TikTok**: Authentic, native-feeling content

Expected ROAS: 3-5x with proper optimization.`,

      analysis: `# Data Analysis Report: ${input}

Analysis conducted with ${tone} presentation style, focusing on ${context || 'key performance indicators'}:

## Executive Summary
Your data reveals significant opportunities for optimization and growth. The analysis shows clear patterns that can inform strategic decisions.

## Key Findings
### Performance Metrics
- **Conversion Rate**: Current baseline and improvement opportunities
- **Customer Acquisition Cost**: Trends and optimization potential
- **Lifetime Value**: Segmentation insights
- **Channel Performance**: Top performers and underperformers

### Insights & Recommendations
1. **Immediate Actions** (0-30 days)
   - Optimize top-performing channels
   - Address critical conversion bottlenecks
   - Implement tracking improvements

2. **Strategic Improvements** (30-90 days)
   - Expand successful campaigns
   - Test new audience segments
   - Develop retention programs

3. **Long-term Growth** (90+ days)
   - Scale proven strategies
   - Explore new channels
   - Advanced automation implementation

## Data-Driven Next Steps
Prioritize high-impact, low-effort optimizations first, then scale successful initiatives.`,

      support: `# Customer Support Response: ${input}

Response crafted with ${tone} approach, considering ${context || 'standard customer service best practices'}:

## Immediate Response

Dear Valued Customer,

Thank you for reaching out to us about [specific issue]. I completely understand your concern, and I want to personally ensure we resolve this for you quickly and effectively.

## Understanding Your Situation
Based on what you've shared, I can see that [acknowledge the specific problem]. This is definitely something we can help you with, and I appreciate your patience as we work through this together.

## Solution Path
Here's exactly what we're going to do:

1. **Immediate Action**: [Specific step 1]
2. **Follow-up**: [Specific step 2 with timeline]
3. **Prevention**: [How we'll prevent this in the future]

## Additional Support
To ensure you have the best possible experience:
- Direct line to reach me: [contact method]
- Expected resolution time: [realistic timeframe]
- Compensation/gesture of goodwill: [if appropriate]

## What Happens Next
I'll personally monitor this case and follow up with you within [timeframe] to ensure everything is working perfectly.

Thank you for your patience and for being a valued customer. We're committed to making this right.

Best regards,
[Support Representative]`,

      strategy: `# Strategic Plan: ${input}

Strategic roadmap developed with ${tone} approach, incorporating ${context || 'industry best practices'}:

## 30-Day Sprint (Quick Wins)
### Week 1-2: Foundation
- Audit current state and identify low-hanging fruit
- Set up measurement systems and KPIs
- Quick optimization of existing processes

### Week 3-4: Implementation
- Launch pilot programs
- Begin data collection
- Initial testing and feedback loops

**Expected Outcomes**: 15-25% improvement in key metrics

## 60-Day Build (Scale & Optimize)
### Month 2 Focus Areas:
- **Operations**: Streamline successful processes
- **Team**: Expand capacity where needed
- **Technology**: Implement automation tools
- **Marketing**: Scale proven channels

### Key Milestones:
- Double pilot program results
- Establish repeatable systems
- Build feedback mechanisms

**Expected Outcomes**: 40-60% improvement from baseline

## 90-Day Growth (Expansion)
### Quarter 1 Objectives:
- **Market Expansion**: New segments or geography
- **Product Development**: Feature enhancements
- **Partnership**: Strategic alliances
- **Innovation**: Next-generation initiatives

### Success Metrics:
- Revenue growth targets
- Market share gains
- Customer satisfaction scores
- Operational efficiency

**Expected Outcomes**: 75-100% improvement, sustainable growth trajectory

## Resource Requirements
- Budget allocation across phases
- Team skill development needs
- Technology stack requirements
- External partnership considerations

This plan balances ambitious growth with practical execution, ensuring sustainable progress toward your strategic objectives.`,

      research: `# Market Research Analysis: ${input}

Research conducted with ${tone} methodology, focusing on ${context || 'comprehensive market landscape'}:

## Market Overview
### Industry Landscape
- Market size: $XX billion globally
- Growth rate: X% annually
- Key trends driving expansion
- Regulatory environment impact

### Competitive Analysis
#### Direct Competitors
1. **Company A**: Market leader, strong in [area]
2. **Company B**: Fast growth, focused on [niche]
3. **Company C**: Established player, known for [strength]

#### Competitive Gaps
- Underserved customer segments
- Feature/service gaps
- Pricing opportunities
- Geographic expansion potential

## Target Audience Insights
### Primary Personas
**Persona 1**: [Demographics, pain points, buying behavior]
**Persona 2**: [Demographics, pain points, buying behavior]
**Persona 3**: [Demographics, pain points, buying behavior]

### Market Opportunities
1. **Immediate** (0-6 months)
   - Quick market entry points
   - Low-competition niches
   - Partnership opportunities

2. **Medium-term** (6-18 months)
   - Product development focus
   - Market education needs
   - Channel development

3. **Long-term** (18+ months)
   - Market leadership positioning
   - Innovation requirements
   - Scale considerations

## Strategic Recommendations
### Go-to-Market Strategy
- **Primary Channel**: [Most effective approach]
- **Messaging**: [Key value propositions]
- **Pricing**: [Competitive positioning]
- **Timeline**: [Phased rollout plan]

### Risk Mitigation
- Competitive response scenarios
- Market volatility factors
- Technology disruption potential
- Regulatory change impacts

This research provides a comprehensive foundation for strategic decision-making and market entry planning.`
    };

    return baseMock[tabId as keyof typeof baseMock] || 'Generated content will appear here.';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-8 h-8 text-purple-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">NeuroSphere Business Assistant</h1>
          <Sparkles className="w-8 h-8 text-purple-600 ml-3" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Harness the power of AI across all your business functions. From content creation to strategic planning, 
          get expert-level insights that drive real results.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 mr-2 mb-2 rounded-t-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              <span className="font-medium">{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Tab Description */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeTabConfig.name}</h2>
            <p className="text-gray-600">{activeTabConfig.description}</p>
          </div>

          {/* Input Form */}
          <div className="space-y-6">
            {/* Main Input */}
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
                What do you need help with?
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={activeTabConfig.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            {/* Context Field */}
            <div>
              <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={activeTabConfig.contextPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Tone & Style</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {toneOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTone(option.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                      tone === option.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-70">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className={`inline-flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isGenerating || !input.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Run Assistant
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {(streamingText || result) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gray-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Output</h3>
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {streamingText}
                  {isGenerating && <span className="animate-pulse">▌</span>}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};