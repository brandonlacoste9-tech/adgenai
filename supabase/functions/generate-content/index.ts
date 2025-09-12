import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContentRequest {
  input: string;
  context?: string;
  tone: 'concise' | 'persuasive' | 'friendly' | 'formal';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input, context, tone }: ContentRequest = await req.json()

    if (!input?.trim()) {
      throw new Error('Input is required')
    }

    console.log('Generating content with:', { input, context, tone })

    // Check if OpenAI API key is available for streaming
    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    if (openAIKey) {
      // Use OpenAI streaming
      const systemPrompt = `You are a senior content strategist with 15+ years of experience. Your expertise includes:
- Creating high-converting content across all channels
- Understanding audience psychology and motivation  
- Brand voice development and consistency
- SEO optimization and content strategy
- Performance marketing integration

Tone: ${tone}
${context ? `Additional context: ${context}` : ''}

Provide actionable, specific advice that drives real business results. Focus on practical implementation rather than theory.`

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

      // Return streaming response
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked'
        }
      })
    } else {
      // Fallback to generated response
      const mockResponse = generateContentResponse(input, context, tone)
      
      return new Response(
        JSON.stringify({ content: mockResponse }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Error generating content:', error)
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

function generateContentResponse(input: string, context?: string, tone?: string): string {
  const toneAdjectives = {
    concise: 'clear and direct',
    persuasive: 'compelling and action-oriented',
    friendly: 'warm and conversational',
    formal: 'professional and authoritative'
  }

  const adjective = toneAdjectives[tone as keyof typeof toneAdjectives] || 'engaging'

  return `# Content Strategy for: ${input}

## Overview
Based on your request for ${adjective} content${context ? ` with the context of ${context}` : ''}, here's a comprehensive content strategy that balances engagement with conversion optimization.

## Core Message Framework
Your content should follow the proven AIDA structure while addressing specific audience pain points:

### Attention
- Start with a compelling hook that speaks directly to your audience's challenges
- Use data-driven insights or surprising statistics when possible
- Create an emotional connection from the first sentence

### Interest  
- Present your unique value proposition clearly
- Use storytelling to make abstract concepts relatable
- Include social proof and credibility indicators

### Desire
- Paint a picture of the transformation your solution provides
- Address objections before they arise
- Use scarcity or urgency when appropriate and authentic

### Action
- Provide a clear, specific next step
- Remove friction from the conversion process
- Offer multiple ways to engage based on readiness level

## Content Recommendations

### Primary Content Piece
**Format**: Long-form blog post or guide
**Title**: "The Complete Guide to [Your Topic]: What Industry Leaders Don't Want You to Know"
**Length**: 2,500-3,500 words
**Structure**: Problem → Solution → Implementation → Results

### Supporting Content
1. **Social Media Series**: 5-part educational thread breaking down key concepts
2. **Email Sequence**: 3-email nurture campaign for lead qualification  
3. **Video Content**: Behind-the-scenes or case study format
4. **Downloadable Resource**: Checklist or template to capture leads

## Distribution Strategy
- **Owned Channels**: Your website, email list, social profiles
- **Earned Media**: Guest posting, podcast appearances, PR outreach
- **Paid Amplification**: Targeted social ads, Google Ads for high-intent keywords

## Performance Optimization
- A/B test headlines and opening paragraphs
- Monitor engagement metrics and conversion rates
- Iterate based on audience feedback and performance data
- Repurpose high-performing content across multiple formats

## Expected Outcomes
With proper execution and promotion, this content strategy should:
- Increase organic traffic by 25-40%
- Generate 15-30 qualified leads per month
- Establish thought leadership in your space
- Create evergreen assets that continue driving results

This approach ensures your content serves both awareness and revenue generation goals while building long-term brand authority.`
}