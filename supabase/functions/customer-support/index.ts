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

    const mockContent = generateCustomerSupport(prompt, tone, context)

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
    console.error('Error in customer-support function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

function generateCustomerSupport(prompt: string, tone: string, context?: string): string {
  const examples = {
    concise: `Customer Support Response:

Issue: ${prompt}

Solution:
1. Immediate action: [Specific step]
2. Verification: Check for resolution
3. Follow-up: Confirm satisfaction

Timeline: 24-48 hours
Contact: support@company.com
Reference: #CS-2024-001

Additional resources:
- FAQ: [link]
- Knowledge base: [link]
- Video tutorial: [link]

Is there anything else I can help you with today?`,

    persuasive: `I completely understand your concern, and I'm here to make this right!

🎯 Here's exactly what we're going to do:
You deserve an exceptional experience, and I'm personally committed to ensuring you get the results you're looking for.

✅ Immediate Action Plan:
1. I'm prioritizing your case right now
2. Our team lead will review this within 2 hours
3. You'll have a complete resolution by end of business today

💪 Why This Matters to Us:
Your success is our success. We've helped thousands of customers overcome similar challenges, and we're going to do the same for you.

🚀 Beyond Solving This Issue:
Once we resolve this, I want to set you up with additional resources that will prevent this from happening again AND help you get even better results.

📞 Direct Line to Results:
I'm assigning you my direct contact for any future needs. No more waiting, no more hassle.

You made the right choice trusting us, and we're going to prove it!`,

    formal: `Dear Valued Customer,

Thank you for bringing this matter to our attention. We take all customer concerns seriously and are committed to providing a prompt resolution.

Issue Summary:
We have reviewed your inquiry regarding [specific issue] and understand the importance of addressing this matter expeditiously.

Resolution Process:
1. Case Assessment: Our technical team will conduct a thorough analysis
2. Solution Implementation: We will apply the appropriate corrective measures
3. Quality Assurance: Verification of resolution effectiveness
4. Follow-up Communication: Confirmation of customer satisfaction

Timeline:
- Initial response: Within 2 business hours
- Resolution target: 24-48 business hours
- Follow-up contact: 72 hours post-resolution

Reference Information:
Case ID: CS-2024-001
Assigned Representative: Customer Success Team
Priority Level: High

We appreciate your patience and continued business partnership.

Best regards,
Customer Support Team`,

    friendly: `Hi there! 👋

Thanks so much for reaching out - I'm really glad you did! I can totally understand how frustrating this must be, and I want to help make things right.

🤝 Here's what I'm going to do for you:
I've already started looking into this, and I have a few ideas that should get you back on track quickly. 

💡 Quick question first:
Just to make sure I'm addressing exactly what you need - can you confirm if [specific detail]? This will help me give you the most accurate solution.

⚡ In the meantime:
I've set up a priority case for you (reference #CS-2024-001) so our team knows this is important. You should hear back from me within a couple hours with either a complete solution or a detailed update on progress.

😊 The good news:
This is actually something we see occasionally, and we've gotten really good at fixing it! Most customers are amazed at how much better things work afterward.

I'm here to help every step of the way. Feel free to reply with any questions - I'll be monitoring this closely!

Thanks for giving us the chance to make this right! 🌟`
  }

  let baseContent = examples[tone as keyof typeof examples] || examples.friendly

  if (context) {
    baseContent += `\n\n📋 Additional Context Considered:\nBased on the specific details you provided (${context}), I've tailored this response to address your unique situation. Please let me know if you need any clarification or have additional questions.`
  }

  return baseContent
}