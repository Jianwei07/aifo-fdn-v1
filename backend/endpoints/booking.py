from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.database.db import conn, cursor

router = APIRouter()

# Define a Pydantic model for request validation
class BookingRequest(BaseModel):
    user: str
    room_type: str
    nights: int

@router.post("/book_room")
async def book_room(request: BookingRequest):
    from backend.ai.nlu import NLU
    nlu = NLU()

    # Extract data from request
    user = request.user
    room_type = request.room_type
    nights = request.nights

    # Check availability
    cursor.execute("SELECT id FROM rooms WHERE type = ? AND available = 1", (room_type,))
    room_id = cursor.fetchone()
    if not room_id:
        raise HTTPException(status_code=400, detail="No available rooms.")

    # Book the room
    cursor.execute("INSERT INTO bookings (room_id, user, nights) VALUES (?, ?, ?)", (room_id[0], user, nights))
    cursor.execute("UPDATE rooms SET available = 0 WHERE id = ?", (room_id[0],))
    conn.commit()

    return {"status": "success", "booking_id": room_id[0]}
