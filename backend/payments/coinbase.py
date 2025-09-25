from fastapi import APIRouter, Request, HTTPException, status
import os
import hmac
import hashlib
import httpx

router = APIRouter(prefix="/payments/coinbase", tags=["payments"])

CO_API_KEY = os.getenv("COINBASE_COMMERCE_API_KEY")
WEBHOOK_SECRET = os.getenv("COINBASE_WEBHOOK_SECRET")
WEBHOOK_PATH = os.getenv("COINBASE_WEBHOOK_PATH", "/api/payments/coinbase/webhook")
BASE_URL = os.getenv("WEBHOOK_BASE_URL", "")

HEADERS = {
    "X-CC-Api-Key": CO_API_KEY,
    "Content-Type": "application/json"
}

@router.post("/create-charge")
async def create_charge(payload: dict):
    # Expected payload: { amount, currency, metadata?, redirect_url?, cancel_url? }
    if "amount" not in payload or "currency" not in payload:
        raise HTTPException(status_code=400, detail="Missing amount or currency")
    body = {
        "pricing_type": "fixed_price",
        "local_price": {
            "amount": str(payload["amount"]),
            "currency": payload["currency"]
        },
        "metadata": payload.get("metadata", {}),
        "redirect_url": payload.get("redirect_url"),
        "cancel_url": payload.get("cancel_url")
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://api.commerce.coinbase.com/charges",
            headers=HEADERS,
            json=body
        )
    if resp.status_code != 201:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()

@router.post("/webhook")
async def webhook(request: Request):
    raw_body = await request.body()
    provided_sig = request.headers.get("X-CC-Webhook-Signature", "")
    computed = hmac.new(WEBHOOK_SECRET.encode(), raw_body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(computed, provided_sig):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid signature")

    event = await request.json()
    ev = event.get("event", {})
    ev_type = ev.get("type")
    charge = ev.get("data", {})
    charge_id = charge.get("id")

    # TODO: connect with your DB / internal order model
    if ev_type == "charge:confirmed":
        # mark as paid
        pass
    elif ev_type == "charge:failed":
        # mark as failed
        pass

    return {"status": "ok"}