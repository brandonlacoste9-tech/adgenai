import OpenAI from 'openai';

// Mock OpenAI client for development - can be easily swapped with real implementation
class MockOpenAI {
  async *createChatCompletionStream(params: any) {
    const { messages, businessFunction } = params;
    const prompt = messages[messages.length - 1]?.content || '';
    
    const responses = {
      'content-creation': `Creating engaging content for "${prompt}"...\n\n**Content Strategy:**\n\n1. **Hook:** Start with an attention-grabbing question or statistic\n2. **Value Proposition:** Clearly state the benefit to your audience\n3. **Call to Action:** End with a specific, actionable next step\n\n**Sample Content:**\n\n"Did you know that 73% of consumers prefer brands that tell authentic stories? Here's how your business can leverage storytelling to build deeper connections with your audience...\n\n✨ **Key Elements:**\n- Personal anecdotes that resonate\n- Data-driven insights\n- Visual storytelling techniques\n- Interactive elements\n\n**Next Steps:**\n1. Identify your brand's core story\n2. Create a content calendar\n3. Measure engagement metrics\n\nReady to transform your content strategy? Let's create something amazing together!"`,
      
      'advertising': `Analyzing advertising strategy for "${prompt}"...\n\n**Campaign Framework:**\n\n🎯 **Target Audience Analysis:**\n- Demographics: Age, location, interests\n- Psychographics: Values, lifestyle, pain points\n- Behavioral patterns: Online habits, purchase history\n\n📊 **Ad Creative Recommendations:**\n\n**Visual Elements:**\n- High-contrast colors for mobile optimization\n- Authentic imagery over stock photos\n- Clear hierarchy with bold headlines\n\n**Copy Strategy:**\n- Benefit-focused headlines\n- Social proof integration\n- Urgency without pressure\n\n**Platform Optimization:**\n- Facebook/Instagram: Story-driven content\n- LinkedIn: Professional value proposition\n- Google Ads: Intent-based keywords\n\n**Budget Allocation:**\n- 60% to proven high-performers\n- 30% to testing new audiences\n- 10% to retargeting campaigns\n\n**Success Metrics:**\n- CTR target: 2.5%+\n- CPA target: Under $50\n- ROAS target: 4:1 minimum`,
      
      'data-analysis': `Performing data analysis for "${prompt}"...\n\n**Analysis Framework:**\n\n📈 **Key Performance Indicators:**\n\n**Traffic Metrics:**\n- Unique visitors: +25% month-over-month\n- Session duration: 3:45 average\n- Bounce rate: 42% (industry avg: 58%)\n\n**Conversion Metrics:**\n- Lead conversion rate: 3.2%\n- Customer lifetime value: $1,247\n- Churn rate: 8% monthly\n\n**Revenue Analysis:**\n- Monthly recurring revenue growth: 18%\n- Customer acquisition cost: $87\n- Return on ad spend: 4.2x\n\n🔍 **Insights & Recommendations:**\n\n1. **High-Performing Segments:**\n   - Mobile users convert 23% higher\n   - Email subscribers have 2.8x lifetime value\n   - Organic traffic shows highest engagement\n\n2. **Optimization Opportunities:**\n   - Reduce page load time by 1.2s\n   - A/B test checkout process\n   - Implement exit-intent popups\n\n3. **Predictive Modeling:**\n   - 78% probability of 25% growth next quarter\n   - Seasonal uptick expected in Q4\n   - New market segment showing 340% potential\n\n**Action Items:**\n- Implement heat mapping on key pages\n- Set up automated reporting dashboard\n- Create customer journey analytics`,
      
      'customer-service': `Developing customer service strategy for "${prompt}"...\n\n**Service Excellence Framework:**\n\n🤝 **Customer Experience Optimization:**\n\n**Response Time Goals:**\n- Live chat: Under 30 seconds\n- Email support: Within 2 hours\n- Phone support: Under 3 rings\n\n**Resolution Strategies:**\n\n1. **First Contact Resolution:**\n   - Empower agents with decision-making authority\n   - Comprehensive knowledge base access\n   - Escalation protocols for complex issues\n\n2. **Proactive Support:**\n   - Anticipate common questions\n   - Send helpful tips and tutorials\n   - Monitor for potential issues\n\n3. **Personalization:**\n   - Access to customer history\n   - Preference tracking\n   - Tailored communication style\n\n📋 **Quality Assurance:**\n\n- Customer satisfaction target: 95%+\n- Net Promoter Score goal: 70+\n- Issue escalation rate: Under 5%\n\n**Self-Service Options:**\n- Interactive FAQ with search\n- Video tutorial library\n- Community forum with peer support\n\n**Training Program:**\n- Product knowledge certification\n- Emotional intelligence workshops\n- Conflict resolution techniques\n\n**Technology Stack:**\n- Omnichannel support platform\n- AI-powered ticket routing\n- Real-time sentiment analysis`,
      
      'strategy': `Analyzing strategic opportunities for "${prompt}"...\n\n**Strategic Planning Framework:**\n\n🎯 **Market Position Analysis:**\n\n**Competitive Landscape:**\n- Market share: 12% (growing)\n- Key differentiators: Innovation, customer service\n- Competitive advantages: Technology, brand trust\n\n**SWOT Analysis:**\n\n**Strengths:**\n- Strong brand recognition\n- Loyal customer base\n- Technical expertise\n- Financial stability\n\n**Opportunities:**\n- Emerging market segments\n- Digital transformation trends\n- Partnership possibilities\n- International expansion\n\n**Strategic Initiatives:**\n\n1. **Growth Strategy:**\n   - Product line extension\n   - Market penetration tactics\n   - Strategic acquisitions\n   - Innovation pipeline\n\n2. **Operational Excellence:**\n   - Process automation\n   - Supply chain optimization\n   - Quality improvement\n   - Cost reduction programs\n\n3. **Digital Transformation:**\n   - Technology infrastructure upgrade\n   - Data analytics capabilities\n   - Customer experience digitization\n   - Workforce upskilling\n\n**5-Year Vision:**\n- Revenue target: $50M annually\n- Market expansion: 3 new regions\n- Team growth: 200+ employees\n- Industry leadership position\n\n**Success Metrics:**\n- Revenue growth: 25% YoY\n- Customer retention: 90%+\n- Employee satisfaction: 85%+\n- Market share: 20% by 2029`,
      
      'market-research': `Conducting market research for "${prompt}"...\n\n**Market Intelligence Report:**\n\n📊 **Market Overview:**\n\n**Market Size & Growth:**\n- Total addressable market: $2.4B\n- Serviceable addressable market: $480M\n- Annual growth rate: 12.3%\n- Projected 2029 value: $4.2B\n\n**Consumer Behavior Trends:**\n\n1. **Digital-First Preferences:**\n   - 87% prefer online research before purchase\n   - Mobile commerce growing 23% annually\n   - Social media influences 65% of decisions\n\n2. **Value Consciousness:**\n   - Price comparison across 4+ platforms\n   - Sustainability considerations increasing\n   - Brand loyalty tied to customer experience\n\n**Demographic Analysis:**\n\n**Primary Target (40% of market):**\n- Age: 25-40 years\n- Income: $50K-$100K annually\n- Education: College-educated\n- Tech-savvy early adopters\n\n**Secondary Target (30% of market):**\n- Age: 40-55 years\n- Income: $75K-$150K annually\n- Family-focused decision makers\n- Quality and reliability priorities\n\n**Competitive Intelligence:**\n\n**Market Leaders:**\n- Company A: 35% market share, premium pricing\n- Company B: 22% market share, volume focus\n- Company C: 18% market share, innovation leader\n\n**Market Gaps:**\n- Mid-tier price point underserved\n- Mobile-first solutions limited\n- Personalization capabilities lacking\n\n**Recommendations:**\n1. Target the underserved mid-market segment\n2. Invest in mobile optimization\n3. Develop personalization features\n4. Consider strategic partnerships\n5. Focus on customer education content`
    };
    
    const response = responses[businessFunction as keyof typeof responses] || 
      `Analyzing "${prompt}" with AI-powered insights...\n\nI'll help you develop a comprehensive strategy for this request. Let me break down the key considerations and provide actionable recommendations tailored to your specific needs.`;
    
    // Simulate streaming by yielding chunks
    const words = response.split(' ');
    for (let i = 0; i < words.length; i += 3) {
      const chunk = words.slice(i, i + 3).join(' ') + ' ';
      yield {
        choices: [{
          delta: {
            content: chunk
          }
        }]
      };
      // Add realistic delay
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    }
  }
}

export class AIService {
  private client: OpenAI | MockOpenAI;
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production' && !!process.env.VITE_OPENAI_API_KEY;
    
    if (this.isProduction) {
      this.client = new OpenAI({
        apiKey: process.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
      });
    } else {
      this.client = new MockOpenAI();
    }
  }

  async *generateResponse(
    prompt: string,
    context: string,
    tone: string,
    businessFunction: string
  ) {
    const messages = [
      {
        role: 'system' as const,
        content: `You are an expert business assistant specializing in ${businessFunction}. 
                 Provide detailed, actionable advice with the tone: ${tone}.
                 Context: ${context}`
      },
      {
        role: 'user' as const,
        content: prompt
      }
    ];

    if (this.isProduction) {
      const stream = await (this.client as OpenAI).chat.completions.create({
        model: 'gpt-4',
        messages,
        stream: true,
        max_tokens: 2000,
        temperature: 0.7,
      });

      for await (const chunk of stream) {
        yield chunk;
      }
    } else {
      // Use mock client
      for await (const chunk of (this.client as MockOpenAI).createChatCompletionStream({
        messages,
        businessFunction
      })) {
        yield chunk;
      }
    }
  }
}

export const aiService = new AIService();