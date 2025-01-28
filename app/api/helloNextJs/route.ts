import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user, room_type, nights } = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/book_room`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, room_type, nights }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
