import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface RequestBody {
  prompt: string;
  context?: string;
  tone?: 'concise' | 'persuasive' | 'friendly' | 'formal';
  stream?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, context, tone = 'friendly', stream = true }: RequestBody = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const mockContent = generateDataAnalysis(prompt, tone, context)

    if (stream) {
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          const words = mockContent.split(' ')
          let wordIndex = 0
          
          const sendNextChunk = () => {
            if (wordIndex < words.length) {
              const chunk = words[wordIndex] + ' '
              controller.enqueue(encoder.encode(chunk))
              wordIndex++
              setTimeout(sendNextChunk, Math.random() * 100 + 50)
            } else {
              controller.close()
            }
          }
          
          sendNextChunk()
        }
      })

      return new Response(stream, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain',
          'Transfer-Encoding': 'chunked',
        }
      })
    } else {
      return new Response(mockContent, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain',
        }
      })
    }

  } catch (error) {
    console.error('Error in analyze-data function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function generateDataAnalysis(prompt: string, tone: string, context?: string): string {
  const examples = {
    concise: `Data Analysis Summary:

Key Metrics:
• Conversion Rate: 3.2% (↑ 0.8% vs last month)
• Customer Acquisition Cost: $45 (↓ $12 vs last month)
• Lifetime Value: $180 (↑ $25 vs last month)

Critical Insights:
1. Mobile traffic converts 40% better than desktop
2. Email campaigns outperform social by 3:1
3. Weekend purchases average 60% higher value

Action Items:
- Increase mobile optimization budget
- Reallocate 30% of social spend to email
- Launch weekend-specific promotions

ROI Impact: +23% revenue potential with these changes.`,

    persuasive: `🚀 YOUR DATA IS REVEALING MASSIVE OPPORTUNITIES!

📊 The Numbers Don't Lie:
Your current performance is STRONG, but we've identified 3 game-changing insights that could DOUBLE your results:

💥 Breakthrough #1: Hidden Revenue Channel
Your data shows an untapped segment generating 5x higher LTV. Most businesses miss this completely!

💥 Breakthrough #2: Conversion Goldmine  
There's a specific user behavior pattern that predicts 85% purchase probability. You're not targeting it yet!

💥 Breakthrough #3: Timing is Everything
Your data reveals a 3-hour window when conversions spike 300%. Your competitors don't know this!

🎯 The Million-Dollar Question:
How much revenue are you leaving on the table every day you don't act on these insights?

⚡ The Solution:
Implement these 3 data-driven strategies and watch your metrics explode within 30 days!`,

    formal: `Data Analysis Report

Executive Summary:
This analysis examines performance metrics and identifies optimization opportunities based on current data trends.

Methodology:
- Statistical analysis of user behavior patterns
- Conversion funnel assessment
- Comparative performance evaluation
- Predictive modeling for growth projections

Key Findings:

1. Performance Metrics Analysis
   • Current conversion rate: 3.2%
   • Industry benchmark: 2.8%
   • Performance gap analysis: +14% above average

2. User Behavior Insights
   • Primary traffic sources and conversion rates
   • User journey optimization opportunities
   • Seasonal performance variations

3. Revenue Optimization Opportunities
   • Customer segmentation analysis
   • Lifetime value projections
   • Cost-per-acquisition trends

Recommendations:
Based on this analysis, we recommend implementing a phased optimization strategy to maximize ROI and sustainable growth.`,

    friendly: `Hey! 📊 Let's dive into what your data is telling us!

🎯 First, the good news:
Your numbers are looking pretty solid! I can see some real strengths in your current performance that we can definitely build on.

🔍 Here's what caught my attention:
Your data is showing some really interesting patterns. There are a few areas where small tweaks could make a BIG difference in your results.

💡 My favorite insights:
1. Your customers are more engaged than you might think - the data shows they're spending more time exploring your content
2. There's a sweet spot in timing that you're not fully leveraging yet
3. Your retention numbers hint at some untapped potential

🚀 What this means for you:
The great thing is, these insights give us a clear roadmap for improvement. None of these require massive changes - just smart, data-driven adjustments.

Want me to break down any of these insights further? I'm excited to help you turn this data into actionable wins! 😊`
  }

  let baseContent = examples[tone as keyof typeof examples] || examples.friendly

  if (context) {
    baseContent += `\n\n📈 Context-Specific Analysis:\nBased on your specific situation (${context}), I've identified additional opportunities for optimization and growth. The data suggests focusing on these high-impact areas first.`
  }

  return baseContent
}