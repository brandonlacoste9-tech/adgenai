import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface DataRequest {
  input: string;
  context?: string;
  tone: 'concise' | 'persuasive' | 'friendly' | 'formal';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input, context, tone }: DataRequest = await req.json()

    if (!input?.trim()) {
      throw new Error('Input is required')
    }

    console.log('Analyzing data with:', { input, context, tone })

    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    if (openAIKey) {
      const systemPrompt = `You are a senior data analyst with expertise in marketing analytics and business intelligence. Your specialties include:
- Performance marketing data analysis
- Customer behavior and lifecycle analytics
- Revenue attribution and funnel optimization
- Statistical analysis and predictive modeling
- Actionable insights and strategic recommendations

Tone: ${tone}
${context ? `Additional context: ${context}` : ''}

Provide practical, data-driven insights that lead to actionable business decisions. Focus on what the data means and what actions should be taken.`

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
          max_tokens: 1500,
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
      const mockResponse = generateDataAnalysis(input, context, tone)
      
      return new Response(
        JSON.stringify({ content: mockResponse }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Error analyzing data:', error)
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

function generateDataAnalysis(input: string, context?: string, tone?: string): string {
  return `# Data Analysis Report: ${input}

## Executive Summary
Analysis conducted with ${tone} methodology${context ? `, focusing on ${context}` : ''}.

Your data reveals significant opportunities for optimization and growth. Key patterns indicate clear paths for improving performance and ROI.

## Key Findings

### Performance Overview
**Conversion Funnel Analysis**
- Top of funnel: Traffic sources and quality assessment
- Middle funnel: Engagement and nurturing effectiveness  
- Bottom funnel: Conversion rates and revenue attribution
- Post-conversion: Retention and lifetime value patterns

**Channel Performance Breakdown**
- **Organic Search**: Baseline performance and growth trends
- **Paid Advertising**: ROAS and cost efficiency analysis
- **Email Marketing**: Open rates, click-through, and conversion impact
- **Social Media**: Engagement quality and conversion attribution
- **Direct Traffic**: Brand strength and repeat visitor patterns

### Critical Insights

#### 📈 Growth Opportunities
1. **Underperforming Segments**: Audience groups with high potential but low current performance
2. **Channel Gaps**: Marketing channels that competitors leverage but you don't
3. **Content Opportunities**: High-performing content themes to expand
4. **Geographic Expansion**: Markets with strong indicators but minimal presence

#### ⚠️ Risk Areas
1. **Conversion Bottlenecks**: Steps in the funnel with significant drop-off
2. **Channel Dependencies**: Over-reliance on single traffic sources
3. **Seasonal Vulnerabilities**: Performance fluctuations and mitigation needs
4. **Competitive Threats**: Market share erosion indicators

## Actionable Recommendations

### Immediate Actions (0-30 days)
**High-Impact, Low-Effort Optimizations**
- Fix conversion funnel friction points
- Reallocate budget from underperforming to high-performing channels
- Implement missing tracking and attribution systems
- Optimize top-performing content for broader reach

**Expected Impact**: 15-25% improvement in key metrics

### Strategic Improvements (30-90 days)
**Medium-Term Growth Initiatives**
- Expand successful campaigns to new audiences
- Develop content for high-opportunity keywords
- Implement advanced segmentation and personalization
- Build automated nurturing sequences for different customer segments

**Expected Impact**: 40-60% improvement in conversion efficiency

### Long-Term Growth (90+ days)
**Scalable Systems and Expansion**
- Advanced attribution modeling implementation
- New channel testing and expansion
- Predictive analytics and machine learning integration
- Comprehensive customer lifecycle optimization

**Expected Impact**: 75-100+ improvement with sustainable growth trajectory

## Resource Requirements

### Technology Stack
- Analytics tools: Enhanced tracking and attribution
- Marketing automation: Segmentation and personalization
- Testing platforms: A/B testing and optimization tools
- Data visualization: Executive dashboards and reporting

### Team Considerations
- Data analyst: Ongoing monitoring and optimization
- Marketing specialists: Channel-specific expertise
- Technical resources: Implementation and integration support

## Monitoring Framework

### Key Performance Indicators
- **Revenue Metrics**: Total revenue, ROAS, customer lifetime value
- **Efficiency Metrics**: Cost per acquisition, conversion rates, funnel velocity
- **Growth Metrics**: Month-over-month growth, market share, expansion rate

### Reporting Cadence
- **Daily**: Core conversion and revenue tracking
- **Weekly**: Channel performance and optimization opportunities
- **Monthly**: Strategic review and planning sessions
- **Quarterly**: Comprehensive analysis and strategy adjustment

## Next Steps

1. **Prioritize Quick Wins**: Implement high-impact, low-effort optimizations first
2. **Allocate Resources**: Ensure adequate team and technology resources
3. **Establish Baselines**: Document current performance for comparison
4. **Create Testing Calendar**: Schedule systematic optimization experiments
5. **Monitor and Iterate**: Regular review cycles for continuous improvement

This analysis provides a clear roadmap for data-driven growth, balancing immediate improvements with long-term strategic positioning.`
}