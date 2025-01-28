from fastapi import FastAPI
from backend.endpoints.booking import router as booking_router

app = FastAPI()

app.include_router(booking_router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
