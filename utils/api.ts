import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user, room_type, nights } = await req.json();

  // Forward request to FastAPI backend
  const response = await fetch("http://127.0.0.1:8000/book_room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, room_type, nights }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
