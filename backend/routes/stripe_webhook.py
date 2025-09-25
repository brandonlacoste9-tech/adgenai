import os
import stripe
from fastapi import APIRouter, Request, HTTPException

router = APIRouter()

# Set Stripe API key globally (optional, can be scoped per call)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid Stripe signature")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Handle specific Stripe events
    if event["type"] == "invoice.payment_succeeded":
        print("✅ Payment succeeded!")
        # Add metering or entitlement logic here

    elif event["type"] == "customer.subscription.created":
        print("🆕 Subscription created")

    elif event["type"] == "customer.subscription.deleted":
        print("❌ Subscription canceled")

    return {"status": "received"}