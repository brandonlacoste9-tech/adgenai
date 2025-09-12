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

    // Build the AI prompt based on tone and context
    let systemPrompt = `You are an expert content creation assistant. Create high-quality, engaging content based on the user's request.`
    
    switch (tone) {
      case 'concise':
        systemPrompt += ` Write in a direct, concise style. Get straight to the point without unnecessary elaboration.`
        break
      case 'persuasive':
        systemPrompt += ` Write in a compelling, persuasive style that motivates action. Use strong calls-to-action and benefits-focused language.`
        break
      case 'formal':
        systemPrompt += ` Write in a professional, formal business tone. Use proper business language and structured formatting.`
        break
      case 'friendly':
      default:
        systemPrompt += ` Write in a warm, friendly, and approachable tone. Be conversational but professional.`
        break
    }

    if (context) {
      systemPrompt += `\n\nAdditional context: ${context}`
    }

    const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}\n\nPlease provide a comprehensive response:`

    // For now, we'll return a simulated streaming response
    // In a real implementation, this would call OpenAI or another AI service
    const mockContent = generateMockContent(prompt, tone, context)

    if (stream) {
      // Return streaming response
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
              
              // Simulate typing delay
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
      // Return complete response
      return new Response(mockContent, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain',
        }
      })
    }

  } catch (error) {
    console.error('Error in generate-content function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function generateMockContent(prompt: string, tone: string, context?: string): string {
  // This is a mock response - in production, this would call a real AI service
  const examples = {
    concise: `Here's a direct approach to your request:

• Key Point 1: Focus on the core message
• Key Point 2: Eliminate unnecessary details  
• Key Point 3: Drive toward action

Quick implementation:
1. Define your objective
2. Execute with precision
3. Measure results

Bottom line: ${prompt.includes('marketing') ? 'Effective marketing drives measurable results' : 'Clear communication achieves goals faster'}.`,

    persuasive: `Transform Your Approach Today!

🚀 Why This Matters:
Your current approach might be costing you opportunities. Here's how to change that:

✅ Immediate Benefits:
- Increased engagement and response rates
- Better ROI on your efforts
- Competitive advantage in your market

💪 The Power Move:
Stop settling for mediocre results. This strategy has helped businesses achieve 200%+ improvements in just 30 days.

🎯 Your Next Step:
Don't wait. Every day you delay is money left on the table. Start implementing this today and see results by next week.

Ready to dominate your market? The time is NOW!`,

    formal: `Executive Summary

Objective: Address the requirements outlined in your content development request.

Analysis:
Based on current market conditions and industry best practices, the following approach is recommended:

1. Strategic Framework
   - Comprehensive content strategy development
   - Target audience analysis and segmentation
   - Competitive positioning assessment

2. Implementation Methodology
   - Phase 1: Research and planning (Week 1-2)
   - Phase 2: Content development (Week 3-4)
   - Phase 3: Review and optimization (Week 5)

3. Expected Outcomes
   - Enhanced brand positioning
   - Improved customer engagement metrics
   - Measurable ROI improvement

Recommendation:
Proceed with immediate implementation to capitalize on current market opportunities.`,

    friendly: `Hey there! 👋

I'd love to help you with this! Here's what I'm thinking:

🌟 First, let's talk about what makes this special:
Your idea has real potential, and I can see why you're excited about it. The key is to approach it in a way that feels authentic and connects with your audience.

💡 Here's my suggested approach:
• Start with what your audience truly cares about
• Share your unique perspective (that's what makes you stand out!)
• Keep it conversational and genuine
• Don't be afraid to show personality

🎯 The fun part:
This is where you get to be creative! Think about what would make YOU stop scrolling and pay attention. That's exactly what you want to create.

What do you think? I'm excited to see where you take this! Let me know if you want to dive deeper into any part of this strategy. 😊`
  }

  let baseContent = examples[tone as keyof typeof examples] || examples.friendly

  if (context) {
    baseContent += `\n\n📝 Considering your specific context (${context}), here are some tailored recommendations:\n\n• Adapt the messaging to align with your brand voice\n• Consider your audience's current awareness level\n• Leverage any existing assets or relationships\n• Test and iterate based on initial response`
  }

  return baseContent
}