import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface SupportRequest {
  input: string;
  context?: string;
  tone: 'concise' | 'persuasive' | 'friendly' | 'formal';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { input, context, tone }: SupportRequest = await req.json()

    if (!input?.trim()) {
      throw new Error('Input is required')
    }

    console.log('Generating customer support response with:', { input, context, tone })

    const openAIKey = Deno.env.get('OPENAI_API_KEY')
    
    if (openAIKey) {
      const systemPrompt = `You are an empathetic Tier-2 customer support specialist with advanced problem-solving skills. Your expertise includes:
- De-escalating frustrated customers with genuine empathy
- Complex technical issue resolution
- Proactive customer success and retention
- Cross-selling and upselling opportunities
- Building long-term customer relationships

Tone: ${tone} but always empathetic and solution-focused
${context ? `Additional context: ${context}` : ''}

Provide responses that solve problems while building customer loyalty. Focus on understanding, validation, and clear resolution paths.`

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
          max_tokens: 1200,
          temperature: 0.5
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
      const mockResponse = generateSupportResponse(input, context, tone)
      
      return new Response(
        JSON.stringify({ content: mockResponse }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }
  } catch (error) {
    console.error('Error generating support response:', error)
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

function generateSupportResponse(input: string, context?: string, tone?: string): string {
  const toneStyles = {
    concise: 'clear and efficient',
    persuasive: 'solution-focused and reassuring',
    friendly: 'warm and understanding',
    formal: 'professional and thorough'
  }

  const style = toneStyles[tone as keyof typeof toneStyles] || 'empathetic and helpful'

  return `# Customer Support Response

## Issue Analysis: ${input}

Dear Valued Customer,

Thank you for reaching out to us regarding your concern. I want to personally ensure we resolve this situation for you quickly and effectively.

## Understanding Your Situation

Based on what you've shared${context ? ` and considering ${context}` : ''}, I can see that this issue is impacting your experience with our service. I completely understand your frustration, and I want you to know that resolving this is my top priority right now.

Here's what I understand about your situation:
- **The Issue**: [Specific problem identification]
- **Impact**: How this affects your workflow/experience
- **Urgency**: Your timeline and business needs

## Immediate Resolution Plan

I've reviewed your account and identified the exact steps we need to take to resolve this:

### Step 1: Immediate Action (Next 15 minutes)
I'm personally implementing the following fix right now:
- [Specific technical or account adjustment]
- [System update or configuration change]
- [Access restoration or permission adjustment]

### Step 2: Verification (Within 1 hour)
To ensure everything is working perfectly:
- I'll test the solution from your account perspective
- You'll receive a confirmation email with detailed instructions
- I'll provide you with direct contact information for any questions

### Step 3: Prevention (Ongoing)
To prevent this from happening again:
- [System improvement or process change]
- [Additional monitoring or alerts]
- [Proactive account optimization]

## Going Above and Beyond

Because of the inconvenience this has caused, I'm also including:

**Immediate Benefits**:
- [Account credit, service extension, or upgrade]
- Priority support for the next 30 days
- Direct escalation path if you need anything

**Long-term Value**:
- [Additional features or services]
- Exclusive access to new product features
- Dedicated account management consideration

## Your Direct Contact Path

**For This Issue**:
- My direct email: [support contact]
- Case number: [reference number]
- Expected resolution: [specific timeline]

**For Future Needs**:
- Priority support line: [phone number]
- Live chat with mention of this case
- Account manager introduction (if applicable)

## What Happens Next

Here's exactly what you can expect:

**Within 1 Hour**:
- Solution implementation completed
- Confirmation email with testing instructions
- Direct follow-up call (if requested)

**Within 24 Hours**:
- Comprehensive system check
- Account optimization review
- Satisfaction confirmation

**Within 1 Week**:
- Proactive account health check
- Additional optimization opportunities
- Long-term success planning

## Our Commitment

This experience doesn't reflect the standard of service we're committed to providing. We value your business and want to ensure you have the best possible experience with our platform.

I'll personally monitor your account over the next week to ensure everything continues working smoothly. If you have any questions or concerns, please don't hesitate to reach out to me directly.

Thank you for your patience and for giving us the opportunity to make this right. We're committed to not just resolving this issue, but ensuring your long-term success with our platform.

## Additional Resources

While I handle your specific case, you might find these resources helpful:
- [Link to relevant documentation]
- [Video tutorial for your use case]
- [Best practices guide]
- [Community forum for peer support]

I'll follow up with you personally within 2 hours to confirm everything is working perfectly.

Best regards,

[Support Specialist Name]
Senior Customer Success Specialist
Direct: [contact information]

*P.S. - I've also added a note to your account about your feedback. Our product team reviews these regularly to improve the platform for all users.*

---

**Case Reference**: [Number]
**Priority Level**: High
**Resolution Target**: 1 hour
**Follow-up Scheduled**: 2 hours`
}