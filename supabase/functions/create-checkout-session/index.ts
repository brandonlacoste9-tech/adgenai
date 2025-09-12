import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'npm:stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CheckoutRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  userId?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const { priceId, successUrl, cancelUrl, customerEmail, userId }: CheckoutRequest = await req.json()

    if (!priceId) {
      throw new Error('Price ID is required')
    }

    // Get host from headers for brand-aware URLs
    const host = req.headers.get('host') || req.headers.get('x-forwarded-host') || 'localhost:3000'
    const proto = req.headers.get('x-forwarded-proto') || 'https'
    const baseUrl = `${proto}://${host}`

    // Use provided URLs or generate default brand-aware ones
    const finalSuccessUrl = successUrl || `${baseUrl}/?upgraded=1`
    const finalCancelUrl = cancelUrl || `${baseUrl}/?canceled=1`

    console.log('Creating checkout session for:', { priceId, userId, customerEmail, host })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      customer_email: customerEmail,
      metadata: {
        userId: userId || '',
        host: host,
      },
      subscription_data: {
        metadata: {
          userId: userId || '',
          host: host,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      tax_id_collection: {
        enabled: true,
      },
      custom_text: {
        submit: {
          message: 'Start your 90-day performance guarantee today!'
        }
      }
    })

    console.log('Checkout session created:', session.id)

    return new Response(
      JSON.stringify({ 
        sessionId: session.id, 
        url: session.url,
        success: true 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
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