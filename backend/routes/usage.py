from fastapi import APIRouter, HTTPException
from redis import Redis
from rq import Queue
import os

router = APIRouter()
redis_conn = Redis(host="localhost", port=6379)  # Use Render env if deploying
q = Queue("usage", connection=redis_conn)

@router.post("/usage/enqueue")
def enqueue_usage(user_id: str, gb_used: float, subscription_item_id: str):
    if gb_used <= 0:
        raise HTTPException(status_code=400, detail="Invalid usage amount")
    
    job = q.enqueue("workers.usage_worker.process_usage", user_id, gb_used, subscription_item_id)
    return {"job_id": job.get_id(), "status": "queued"}