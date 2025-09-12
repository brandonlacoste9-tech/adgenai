import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ResearchRequest {
  input: string;
  context?: string;
  tone: 'concise' | 'persuasive' | 'friendly' | 'formal';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input, context, tone }: ResearchRequest = await req.json()

    if (!input?.trim()) {
      throw new Error('Input is required')
    }

    console.log('Generating market research with:', { input, context, tone })

    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    if (openAIKey) {
      const systemPrompt = `You are a senior market research analyst with deep expertise in competitive intelligence and market analysis. Your specialties include:
- Comprehensive market landscape analysis
- Competitive positioning and strategy assessment
- Consumer behavior and trend identification
- Market opportunity evaluation and sizing
- Strategic recommendations based on market data

Tone: ${tone}
${context ? `Additional context: ${context}` : ''}

Provide thorough, data-driven market research with actionable insights for strategic decision-making. Focus on practical implications and competitive advantages.`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: input }
          ],
          stream: true,
          max_tokens: 1800,
          temperature: 0.3
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked'
        }
      })
    } else {
      const mockResponse = generateMarketResearch(input, context, tone)
      
      return new Response(
        JSON.stringify({ content: mockResponse }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Error generating market research:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

function generateMarketResearch(input: string, context?: string, tone?: string): string {
  return `# Market Research Analysis: ${input}

## Executive Summary

Research conducted with ${tone} methodology${context ? `, focusing on ${context}` : ''}.

This comprehensive market analysis reveals significant opportunities for strategic positioning and growth. Key findings indicate clear pathways for competitive advantage and market expansion.

---

## 📊 Market Landscape Overview

### Industry Overview
**Market Size & Growth**
- Total Addressable Market (TAM): $X.X billion globally
- Serviceable Addressable Market (SAM): $X.X billion in target regions
- Serviceable Obtainable Market (SOM): $XXX million realistic capture
- Annual Growth Rate: X.X% CAGR over next 5 years

**Key Market Drivers**
- Digital transformation acceleration
- Changing consumer behavior and expectations
- Regulatory environment evolution
- Technology advancement and adoption
- Economic factors and market maturity

**Market Maturity & Dynamics**
- Current phase: [Emerging/Growth/Mature/Declining]
- Innovation cycle position
- Customer adoption patterns
- Pricing model evolution
- Distribution channel development

---

## 🎯 Competitive Landscape Analysis

### Direct Competitors

#### Market Leader: [Company A]
**Strengths**
- Established market presence and brand recognition
- Comprehensive feature set and product maturity
- Strong financial position and resources
- Extensive distribution network

**Weaknesses**
- Legacy technology constraints
- Slower innovation cycles
- Higher price points
- Limited customization options

**Market Position**: 35% market share, premium positioning

#### Fast-Growing Challenger: [Company B]  
**Strengths**
- Modern technology stack
- Aggressive pricing strategy
- Rapid feature development
- Strong customer acquisition

**Weaknesses**
- Limited enterprise features
- Newer brand with less trust
- Smaller support organization
- Geographic limitations

**Market Position**: 15% market share, growth-focused

#### Niche Specialist: [Company C]
**Strengths**
- Deep industry expertise
- Specialized feature set
- Strong customer relationships
- Premium service levels

**Weaknesses**
- Limited scalability
- Higher cost structure
- Narrow market focus
- Resource constraints

**Market Position**: 8% market share, specialized positioning

### Competitive Gaps & Opportunities

**Underserved Segments**
- Small to medium businesses seeking enterprise features
- Industry-specific requirements not addressed
- Geographic markets with limited solutions
- Price-sensitive customers with quality needs

**Feature Gaps**
- Integration capabilities and ecosystem connections
- Mobile-first user experience
- Advanced analytics and reporting
- Automation and AI-powered features

**Service Gaps**
- Implementation and onboarding support
- Training and education programs
- Ongoing optimization and consulting
- Community and peer learning platforms

---

## 👥 Target Audience Insights

### Primary Customer Personas

#### Persona 1: Growth-Stage Business Leaders
**Demographics**
- Role: VP/Director level in 50-500 employee companies
- Age: 35-45, technology-savvy
- Budget authority: $10K-$100K annually

**Pain Points**
- Need enterprise-level capabilities at SMB prices
- Limited internal technical resources
- Pressure to show ROI quickly
- Seeking scalable solutions for growth

**Buying Behavior**
- Research-heavy decision process (3-6 months)
- Peer recommendations highly valued
- Require trial periods and proof of concept
- Price sensitivity with focus on value

#### Persona 2: Enterprise Operations Teams
**Demographics**  
- Role: Operations Manager in 1000+ employee organizations
- Age: 28-40, process-oriented
- Influence on 6-7 figure technology decisions

**Pain Points**
- Complex integration requirements
- Security and compliance mandates
- Change management challenges
- Need for customization and flexibility

**Buying Behavior**
- Formal procurement process (6-12 months)
- Multiple stakeholder approval required
- Vendor stability and roadmap important
- Total cost of ownership focus

#### Persona 3: Technology Innovators
**Demographics**
- Role: CTO/Technical Lead in startups to mid-market
- Age: 30-45, early technology adopters
- Direct budget control for technology stack

**Pain Points**
- Need cutting-edge features and capabilities
- API-first and developer-friendly requirements
- Scalability for rapid growth
- Modern technology stack integration

**Buying Behavior**
- Quick evaluation and decision cycle (1-3 months)
- Technical evaluation drives process
- Bottom-up adoption and expansion
- Innovation and roadmap alignment critical

---

## 🚀 Market Opportunities

### Immediate Opportunities (0-6 months)

**Market Entry Points**
- Geographic expansion to underserved regions
- Vertical specialization in high-growth industries  
- Partnership channels with complementary providers
- Free/freemium model for market penetration

**Product Positioning**
- "Enterprise features at SMB prices"
- "Modern alternative to legacy solutions"
- "Industry-specific optimization"
- "Developer-friendly and API-first"

### Medium-Term Opportunities (6-18 months)

**Market Development**
- Adjacent market expansion
- New use case and application development
- Strategic partnership and integration ecosystem
- International market entry

**Product Evolution**
- AI and machine learning feature integration
- Mobile-first user experience development
- Advanced analytics and insights platform
- Automation and workflow optimization

### Long-Term Opportunities (18+ months)

**Market Leadership**
- Platform ecosystem development
- Acquisition and consolidation opportunities
- Market category creation and definition
- Innovation and research leadership

**Strategic Positioning**
- Industry thought leadership
- Standards and best practice development
- Educational and community building
- Global expansion and localization

---

## 📈 Go-to-Market Strategy Recommendations

### Primary Market Entry Strategy
**Recommended Approach**: Focused market penetration with vertical specialization

**Target Segment Priority**
1. Growth-stage technology companies (Primary)
2. Professional services firms (Secondary)  
3. E-commerce and retail businesses (Tertiary)

**Channel Strategy**
- **Direct Sales**: High-value enterprise and mid-market accounts
- **Partner Channel**: Implementation and consulting partners
- **Digital Marketing**: Content marketing and inbound lead generation
- **Community Building**: User groups and industry events

### Pricing and Positioning

**Pricing Strategy**
- **Freemium Model**: Basic features for market penetration
- **Growth Tier**: $X/month for small teams and businesses
- **Professional Tier**: $XX/month for advanced features
- **Enterprise Tier**: Custom pricing for large organizations

**Value Proposition Framework**
- **Functional Benefits**: Specific capabilities and features
- **Economic Benefits**: Cost savings and ROI demonstration
- **Emotional Benefits**: Confidence, security, and peace of mind
- **Social Benefits**: Industry recognition and competitive advantage

---

## ⚠️ Risk Assessment & Mitigation

### Market Risks
**Competitive Response**
- Risk: Aggressive pricing or feature matching by incumbents
- Mitigation: Rapid innovation and differentiation strategy

**Economic Downturns**
- Risk: Reduced technology spending and budget constraints
- Mitigation: Value-focused positioning and flexible pricing models

**Technology Disruption**
- Risk: Emerging technologies making current approach obsolete  
- Mitigation: Continuous research and innovation investment

### Strategic Recommendations

**Risk Mitigation Strategies**
- Diversified customer base across industries and geographies
- Strong intellectual property and competitive moats
- Agile development and rapid response capabilities
- Financial reserves and operational efficiency

**Success Factors**
- Customer-centric product development
- Strong execution and operational excellence
- Strategic partnerships and ecosystem development
- Continuous market research and competitive intelligence

---

## 🎯 Success Metrics & KPIs

### Market Performance Indicators
**Market Share Metrics**
- Total market share percentage
- Share of target segment
- Competitive position ranking
- Brand awareness and recognition

**Customer Acquisition Metrics**  
- Customer acquisition cost (CAC)
- Customer lifetime value (CLV)
- Monthly recurring revenue (MRR)
- Net promoter score (NPS)

**Market Development Metrics**
- Market penetration rate
- Geographic expansion progress
- Vertical market adoption
- Partnership channel performance

### Monitoring and Reporting
**Monthly Reviews**
- Competitive landscape changes
- Customer feedback and satisfaction
- Market trend identification
- Performance metric analysis

**Quarterly Assessments**
- Strategic positioning evaluation
- Competitive response analysis
- Market opportunity assessment
- Go-to-market strategy optimization

This comprehensive market research provides a strategic foundation for informed decision-making and competitive positioning in your target market.`
}