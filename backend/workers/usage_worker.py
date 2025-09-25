import os
import stripe
import time
from datetime import datetime

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def process_usage(user_id: str, gb_used: float, subscription_item_id: str):
    timestamp = int(time.time())

    try:
        stripe.UsageRecord.create(
            subscription_item=subscription_item_id,
            quantity=int(gb_used * 1000),  # convert to MB if needed
            timestamp=timestamp,
            action="increment"
        )
        print(f"✅ Usage recorded for {user_id}: {gb_used} GB at {timestamp}")
    except Exception as e:
        print(f"❌ Failed to record usage: {e}")