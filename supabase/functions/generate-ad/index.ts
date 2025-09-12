import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface AdRequest {
  input: string;
  context?: string;
  tone: 'concise' | 'persuasive' | 'friendly' | 'formal';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input, context, tone }: AdRequest = await req.json()

    if (!input?.trim()) {
      throw new Error('Input is required')
    }

    console.log('Generating ad content with:', { input, context, tone })

    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    if (openAIKey) {
      const systemPrompt = `You are a performance marketing expert specializing in high-converting ad campaigns. Your expertise includes:
- Facebook, Google, LinkedIn, and TikTok advertising
- Conversion-focused copywriting and creative strategy
- Audience targeting and customer psychology
- A/B testing and campaign optimization
- ROAS maximization and funnel optimization

Tone: ${tone}
${context ? `Additional context: ${context}` : ''}

Create ad campaigns that drive measurable results. Focus on clear value propositions, strong CTAs, and conversion optimization.`

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
          temperature: 0.7
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
      const mockResponse = generateAdResponse(input, context, tone)
      
      return new Response(
        JSON.stringify({ content: mockResponse }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Error generating ad content:', error)
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

function generateAdResponse(input: string, context?: string, tone?: string): string {
  return `# Ad Campaign Strategy: ${input}

## Campaign Overview
Campaign developed with ${tone} messaging${context ? `, considering ${context}` : ''}:

**Objective**: Drive qualified leads and maximize ROAS
**Recommended Budget**: $50-100/day for initial testing
**Campaign Type**: Conversion-focused with retargeting components

## Creative Strategy

### Primary Headlines (A/B Test These)
1. "Finally, A Solution That Actually Works"
2. "Join 10,000+ Others Who've Transformed Their [Industry]"  
3. "The #1 Mistake Most People Make With [Topic]"
4. "Why [Industry] Leaders Choose [Your Solution]"
5. "Get Results in 30 Days or Your Money Back"

### Ad Copy Framework
**Problem-Focused Opening**
Start with the specific pain point your audience experiences daily.

**Agitation**
Help them feel the cost of not taking action now.

**Solution Presentation**
Position your offer as the bridge to their desired outcome.

**Social Proof**
Include testimonials, case studies, or user counts.

**Clear CTA**
Benefit-driven action that reduces friction.

## Platform-Specific Recommendations

### Facebook/Instagram Ads
- **Creative**: UGC-style videos and carousel showcases
- **Targeting**: Lookalike audiences based on customer data
- **Placement**: Feed, Stories, and Reels for maximum reach
- **Budget Split**: 60% prospecting, 40% retargeting

### Google Ads
- **Keywords**: High-intent search terms with commercial intent
- **Ad Extensions**: Sitelinks, callouts, and structured snippets
- **Landing Pages**: Dedicated pages matching ad messaging
- **Quality Score**: Focus on relevance and page experience

### LinkedIn Ads (B2B)
- **Format**: Single image ads and document ads
- **Targeting**: Job titles, company size, and industry
- **Messaging**: Professional, value-focused approach
- **Lead Gen**: Use LinkedIn Lead Gen Forms for easy conversion

### TikTok Ads (if applicable)
- **Creative**: Native, authentic-feeling content
- **Targeting**: Interest and behavior-based audiences
- **Format**: In-feed ads with strong hooks in first 3 seconds

## Conversion Optimization

### Landing Page Elements
- Headline that matches ad messaging
- Clear value proposition above the fold
- Social proof and trust indicators
- Simple, friction-free form
- Mobile optimization essential

### Testing Strategy
- Test 3-5 different headlines
- Vary creative formats and styles
- A/B test landing page elements
- Monitor and optimize based on conversion data

## Performance Expectations
- **CTR Target**: 2-3% for Facebook, 3-5% for Google
- **Conversion Rate**: 5-15% depending on offer and traffic quality
- **Expected ROAS**: 3-5x with proper optimization
- **Optimization Period**: 7-14 days for sufficient data

## Budget Allocation
- 70% to proven performers
- 20% to new creative testing
- 10% to audience expansion

This strategy balances aggressive growth with sustainable performance, ensuring your ad spend generates measurable ROI while building long-term customer acquisition channels.`
}