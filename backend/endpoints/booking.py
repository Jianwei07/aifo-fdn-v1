from fastapi import APIRouter, HTTPException
from backend.ai.nlu import NLU
from backend.database.db import conn, cursor

router = APIRouter()
nlu = NLU()

@router.post("/book_room")
async def book_room(user: str, room_type: str, nights: int):
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