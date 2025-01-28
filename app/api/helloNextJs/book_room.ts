export const bookRoom = async (
  user: string,
  roomType: string,
  nights: number
) => {
  const response = await fetch("/api/book_room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, room_type: roomType, nights }),
  });

  if (!response.ok) {
    throw new Error(`Failed to book room: ${response.statusText}`);
  }

  return response.json();
};
