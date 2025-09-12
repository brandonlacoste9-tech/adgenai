import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface StrategyRequest {
  input: string;
  context?: string;
  tone: 'concise' | 'persuasive' | 'friendly' | 'formal';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input, context, tone }: StrategyRequest = await req.json()

    if (!input?.trim()) {
      throw new Error('Input is required')
    }

    console.log('Generating strategy with:', { input, context, tone })

    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    if (openAIKey) {
      const systemPrompt = `You are a senior business strategist with 20+ years of experience in scaling companies. Your expertise includes:
- Strategic planning and execution frameworks
- 30/60/90 day planning methodologies
- Resource allocation and prioritization
- Market positioning and competitive strategy
- Growth strategy and operational excellence

Tone: ${tone}
${context ? `Additional context: ${context}` : ''}

Create actionable strategic plans with clear milestones, resource requirements, and success metrics. Focus on practical implementation over theory.`

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
          temperature: 0.4
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
      const mockResponse = generateStrategyPlan(input, context, tone)
      
      return new Response(
        JSON.stringify({ content: mockResponse }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Error generating strategy:', error)
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

function generateStrategyPlan(input: string, context?: string, tone?: string): string {
  return `# Strategic Plan: ${input}

## Executive Overview

Strategic roadmap developed with ${tone} approach${context ? `, incorporating ${context}` : ''}.

This 30/60/90 day plan balances ambitious growth targets with practical execution, ensuring sustainable progress toward your strategic objectives while maintaining operational excellence.

---

## 🎯 30-Day Sprint: Foundation & Quick Wins

### Week 1-2: Assessment & Setup
**Strategic Foundation**
- [ ] Comprehensive current state audit
- [ ] Competitive landscape analysis  
- [ ] Resource inventory and capability assessment
- [ ] Stakeholder alignment and buy-in sessions
- [ ] KPI framework establishment

**Quick Implementation**
- [ ] Low-hanging fruit identification and execution
- [ ] Critical process optimization
- [ ] Team role clarification and responsibility mapping
- [ ] Communication rhythm establishment

### Week 3-4: Pilot Launch
**Execution Phase**
- [ ] Pilot program launch with limited scope
- [ ] Real-time feedback collection and analysis
- [ ] Initial performance data gathering
- [ ] Rapid iteration based on early results
- [ ] Stakeholder communication and progress reporting

**Success Metrics (30 Days)**
- 15-25% improvement in primary KPIs
- 100% team alignment on strategic direction
- 3-5 validated quick wins implemented
- Baseline performance measurement established

**Resource Requirements**
- **Budget**: [Allocation for tools, testing, initial investments]
- **Team**: [Key personnel and time commitments]
- **Technology**: [Systems, software, and infrastructure needs]

---

## 🚀 60-Day Build: Scale & Optimize

### Month 2 Focus Areas

**Operational Scaling**
- [ ] Successful pilot expansion to broader scope
- [ ] Process automation and efficiency improvements
- [ ] Team capacity building and skill development
- [ ] Technology stack optimization and integration
- [ ] Quality assurance and control systems

**Market Expansion**
- [ ] Customer segment expansion strategy
- [ ] Channel diversification and optimization
- [ ] Partnership development and activation
- [ ] Brand positioning and messaging refinement
- [ ] Content strategy and thought leadership

**Performance Optimization**
- [ ] Advanced analytics implementation
- [ ] A/B testing framework for key initiatives
- [ ] Customer feedback integration systems
- [ ] Competitive response strategy development
- [ ] Resource allocation optimization

**Success Metrics (60 Days)**
- 40-60% improvement from baseline
- 2-3 new revenue/growth channels established
- 90%+ customer satisfaction maintenance
- Scalable systems and processes operational

**Key Milestones**
- Week 5-6: Expanded pilot results validation
- Week 7-8: Full-scale implementation planning
- Month 2 End: Sustainable growth trajectory established

---

## 🏆 90-Day Growth: Expansion & Innovation

### Quarter 1 Objectives

**Strategic Expansion**
- [ ] Geographic or demographic market expansion
- [ ] Product/service line extension or enhancement
- [ ] Strategic partnership and alliance development
- [ ] Acquisition or merger opportunity evaluation
- [ ] Innovation pipeline and R&D investment

**Organizational Excellence**
- [ ] Leadership development and succession planning
- [ ] Culture enhancement and employee engagement
- [ ] Advanced training and certification programs
- [ ] Performance management system optimization
- [ ] Knowledge management and documentation

**Market Leadership**
- [ ] Industry thought leadership positioning
- [ ] Competitive advantage reinforcement
- [ ] Customer loyalty and retention programs
- [ ] Innovation showcase and product launches
- [ ] Strategic communication and PR initiatives

**Success Metrics (90 Days)**
- 75-100% improvement from baseline
- Market leadership position in key metrics
- Sustainable competitive advantage established
- Innovation pipeline and future growth secured

---

## 📊 Resource Planning & Investment

### Financial Requirements
**30-Day Investment**: [Budget allocation for quick wins and foundation]
**60-Day Investment**: [Scaling and optimization budget needs]
**90-Day Investment**: [Growth and expansion capital requirements]

**Expected ROI Timeline**
- Month 1: 1.5-2x return on investment
- Month 2: 2.5-3x return on investment  
- Month 3: 3.5-5x return on investment

### Human Resources
**Team Development Plan**
- Current team optimization and training
- Strategic hiring for capability gaps
- Leadership development and mentoring
- Performance management and incentive alignment

**External Resources**
- Consultant and advisor engagement
- Vendor and supplier partnerships
- Technology and service provider selection
- Professional development and certification

---

## 🎯 Risk Management & Contingency

### Potential Challenges
1. **Resource Constraints**: Budget, time, or personnel limitations
2. **Market Changes**: Competitive responses or economic shifts
3. **Execution Risks**: Implementation delays or quality issues
4. **Technology Risks**: System failures or integration problems

### Mitigation Strategies
- **Phased Implementation**: Gradual rollout with validation gates
- **Flexible Planning**: Agile adaptation to changing conditions
- **Diversified Approach**: Multiple pathways to success
- **Strong Communication**: Regular stakeholder updates and feedback

---

## 📈 Monitoring & Success Framework

### Key Performance Indicators
**Financial Metrics**
- Revenue growth and profitability
- Cost efficiency and margin improvement
- Return on investment and cash flow

**Operational Metrics**
- Process efficiency and quality scores
- Customer satisfaction and retention rates
- Team productivity and engagement levels

**Strategic Metrics**
- Market share and competitive position
- Innovation pipeline and development progress
- Brand strength and market perception

### Reporting Cadence
- **Weekly**: Operational metrics and immediate course correction
- **Monthly**: Strategic progress and milestone assessment
- **Quarterly**: Comprehensive review and strategy refinement

---

## 🎉 Expected Outcomes

By the end of this 90-day strategic implementation:

**Quantitative Results**
- 75-100% improvement in primary business metrics
- Sustainable growth trajectory established
- Strong competitive positioning achieved
- Clear path to continued expansion

**Qualitative Benefits**
- Enhanced organizational capability and confidence
- Improved market perception and brand strength
- Stronger team alignment and engagement
- Robust foundation for future growth

This strategic plan provides a comprehensive roadmap for achieving ambitious yet attainable goals while building sustainable competitive advantages for long-term success.`
}