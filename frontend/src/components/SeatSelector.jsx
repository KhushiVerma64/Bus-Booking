import { useState, useEffect } from "react";

const SeatSelector = ({ seats = [], onSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Reset selection only when seats array length changes (i.e., new bus)
  useEffect(() => {
    setSelectedSeats([]);
    // Do NOT call onSelect here to avoid infinite loop
  }, [seats.length]);

  const toggleSeat = (seatNum) => {
    const seat = seats.find((s) => s.number === seatNum);
    if (seat?.booked) return; // prevent selecting booked seats

    let updatedSeats;
    if (selectedSeats.includes(seatNum)) {
      updatedSeats = selectedSeats.filter((s) => s !== seatNum);
    } else {
      updatedSeats = [...selectedSeats, seatNum];
    }
    setSelectedSeats(updatedSeats);
    onSelect(updatedSeats); // only call here on actual toggle
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
      {seats.length > 0
        ? seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat.number);
            const bgColor = seat.booked
              ? "#999"
              : isSelected
              ? "green"
              : seat.type === "window"
              ? "#f1c40f"
              : seat.type === "aisle"
              ? "#3498db"
              : "#ddd"; // middle seat

            return (
              <button
                key={seat.number}
                onClick={() => toggleSeat(seat.number)}
                disabled={seat.booked}
                style={{
                  padding: "10px",
                  background: bgColor,
                  border: "1px solid #333",
                  cursor: seat.booked ? "not-allowed" : "pointer",
                  color: seat.booked ? "#555" : "#000",
                }}
                title={`${seat.type} seat ${seat.booked ? "(Booked)" : ""}`}
              >
                {seat.number}
              </button>
            );
          })
        : [...Array(30)].map((_, i) => {
            const seatNum = i + 1;
            const isSelected = selectedSeats.includes(seatNum);
            return (
              <button
                key={seatNum}
                onClick={() => toggleSeat(seatNum)}
                style={{
                  padding: "10px",
                  background: isSelected ? "green" : "#ddd",
                  border: "1px solid #333",
                  cursor: "pointer",
                }}
              >
                {seatNum}
              </button>
            );
          })}
    </div>
  );
};

export default SeatSelector;