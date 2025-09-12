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

    const mockContent = generateStrategy(prompt, tone, context)

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
    console.error('Error in strategy function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function generateStrategy(prompt: string, tone: string, context?: string): string {
  const examples = {
    concise: `Strategic Plan:

Objective: ${prompt}

Core Strategy:
1. Market positioning: Define unique value proposition
2. Resource allocation: Focus on high-ROI activities  
3. Execution timeline: 90-day sprint cycles

Key Metrics:
• Revenue growth: 25% target
• Market share: 15% increase
• Customer retention: 90%+

Critical Actions:
Week 1-2: Market analysis & competitor research
Week 3-4: Strategy refinement & resource planning
Week 5-8: Initial execution & testing
Week 9-12: Scale and optimize

Success Factors:
- Strong leadership alignment
- Data-driven decision making
- Agile implementation approach

ROI Projection: 300% within 12 months`,

    persuasive: `🚀 BREAKTHROUGH STRATEGY THAT WILL DOMINATE YOUR MARKET!

🎯 The Opportunity:
While your competitors are playing it safe, there's a MASSIVE window to capture market leadership. This strategy has generated 10x growth for similar businesses.

💥 The 3-Pillar Domination Strategy:

Pillar 1: MARKET DISRUPTION
- Identify the #1 pain point your competitors ignore
- Position yourself as the ONLY solution
- Create unstoppable momentum

Pillar 2: CUSTOMER MAGNETISM  
- Build an irresistible value proposition
- Turn customers into raving fans and advocates
- Create viral growth through word-of-mouth

Pillar 3: OPERATIONAL EXCELLENCE
- Scale faster than anyone expects
- Maintain quality while growing rapidly
- Build systems that work without you

🔥 The Execution Advantage:
Most strategies fail because of poor execution. This plan includes step-by-step blueprints, timelines, and success metrics that guarantee results.

⚡ Why Now is Critical:
Market conditions will NEVER be better than they are right now. Every day you wait, competitors get stronger and opportunities disappear.

💰 The Bottom Line:
This isn't just a strategy - it's your path to market leadership and financial freedom!`,

    formal: `Strategic Business Plan

Executive Summary:
This comprehensive strategy addresses the objectives outlined in your business development request through a systematic, data-driven approach.

Strategic Framework:

1. Situational Analysis
   • Market assessment and competitive landscape
   • Internal capabilities and resource evaluation
   • SWOT analysis and risk assessment
   • Stakeholder requirements and constraints

2. Strategic Objectives
   • Primary goal definition and success metrics
   • Secondary objectives and supporting initiatives
   • Timeline and milestone establishment
   • Resource allocation and budget requirements

3. Implementation Methodology
   Phase I: Foundation (Months 1-3)
   - Strategic planning and team alignment
   - Process development and system implementation
   - Initial market positioning and brand development

   Phase II: Growth (Months 4-9)
   - Market expansion and customer acquisition
   - Product/service optimization and refinement
   - Partnership development and strategic alliances

   Phase III: Scale (Months 10-12)
   - Operational optimization and efficiency gains
   - Market leadership consolidation
   - Sustainable growth model establishment

4. Risk Mitigation
   • Identified risk factors and probability assessment
   • Contingency planning and alternative strategies
   • Monitoring protocols and adjustment mechanisms

Expected Outcomes:
Implementation of this strategy is projected to achieve significant market position improvement and sustainable competitive advantage.`,

    friendly: `Hey! 🌟 I'm so excited to help you build an amazing strategy!

💡 Let's start with the big picture:
What you're trying to achieve is totally doable, and I love that you're thinking strategically about it. That's already putting you ahead of most businesses!

🎯 Here's my approach for you:

**Phase 1: Get Crystal Clear (Week 1-2)**
- Define exactly what success looks like for you
- Figure out what makes you special (your secret sauce!)
- Understand your ideal customers inside and out

**Phase 2: Build Your Foundation (Week 3-6)**  
- Create systems that will support your growth
- Develop your unique brand voice and positioning
- Start building relationships with key people

**Phase 3: Launch and Learn (Week 7-12)**
- Roll out your strategy in manageable chunks
- Test, measure, and adjust as you go
- Celebrate wins and learn from what doesn't work

🚀 What I love about this plan:
It's designed to be flexible and fun! You're not locked into anything that isn't working, and you can adapt as you learn more about what your market wants.

💫 The best part:
You already have everything you need to get started. We're just going to organize it in a way that creates momentum and gets you excited results!

Ready to dive in? I'm here to support you every step of the way! 😊`
  }

  let baseContent = examples[tone as keyof typeof examples] || examples.friendly

  if (context) {
    baseContent += `\n\n🎯 Strategy Customization:\nBased on your specific context (${context}), I've tailored these recommendations to align with your unique situation, resources, and market position. This ensures maximum relevance and achievability for your specific goals.`
  }

  return baseContent
}