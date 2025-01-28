"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function BookingForm() {
  const [user, setUser] = useState("");
  const [roomType, setRoomType] = useState("twin");
  const [nights, setNights] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await bookRoom(user, roomType, nights);
      if (response.booking_id) {
        setResult(`Booking confirmed! ID: ${response.booking_id}`);
      } else {
        setResult("Booking failed. Please try again.");
      }
    } catch (error) {
      setResult("Error processing booking.");
    }
    setLoading(false);
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Quick Room Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Guest Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="twin">Twin Room</SelectItem>
              <SelectItem value="single">Single Room</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Number of Nights"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Book Room"
            )}
          </Button>
        </form>

        {result && (
          <Alert className="mt-4">
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
