import React from "react";

export default function SeatMap({ seats, onToggleSeat }) {
  return (
    <div className="grid grid-cols-10 gap-2">
      {seats.map((seat) => (
        <button
          key={seat.id}
          disabled={!seat.available}
          onClick={() => onToggleSeat(seat.id)}
          className={`p-2 rounded ${
            seat.booked ? "bg-red-500 cursor-not-allowed" : seat.selected ? "bg-green-500" : "bg-gray-300"
          }`}
          title={`Seat ${seat.label} - ${seat.available ? "Available" : "Booked"}`}
        >
          {seat.label}
        </button>
      ))}
    </div>
  );
}
