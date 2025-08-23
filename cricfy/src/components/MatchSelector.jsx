import React from 'react';

export default function MatchSelector({ matches, selectedMatchId, onSelect }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Select Match:</label>
      <select
        value={selectedMatchId}
        onChange={(e) => onSelect(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="">-- Select --</option>
        {matches.map((m) => (
          <option key={m.id} value={m.id}>
            {m.teamA} vs {m.teamB} - {new Date(m.date).toLocaleDateString()}
          </option>
        ))}
      </select>
    </div>
  );
}
