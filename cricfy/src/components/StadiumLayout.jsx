import React from "react";

export default function StadiumLayout({ stands, onSelectStand }) {
  return (
    <div className="flex space-x-4 overflow-x-auto mb-6">
      {stands.map((stand) => (
        <div
          key={stand.id}
          className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
          onClick={() => onSelectStand(stand.id)}
        >
          <h3 className="font-bold">{stand.name}</h3>
          <p>{stand.category} - ₹{stand.price}</p>
          <p>Seats: {stand.seatCount}</p>
        </div>
      ))}
    </div>
  );
}
