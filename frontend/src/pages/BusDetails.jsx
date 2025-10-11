import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BusDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/buses/${id}`)
      .then((res) => setBus(res.data))
      .catch((err) => console.error("Error fetching bus details:", err));
  }, [id]);

  if (!bus) return <p className="text-center mt-5">No bus details found.</p>;

  const handleSeatToggle = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

   const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // 👇 Save current page path before redirecting to login
      navigate("/login", { state: { from: `/bus/${bus._id}`, bus } });
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate("/booking", { state: { seats: selectedSeats, bus } });
  };


  return (
    <div className="container mt-5 pt-5 search">
      <h2 className="mb-4 text-center">{bus.name}</h2>
      <div className="card p-4 shadow-sm">
        <p><strong>From:</strong> {bus.source}</p>
        <p><strong>To:</strong> {bus.destination}</p>
        <p><strong>Date:</strong> {bus.date}</p>
        <p>
          <strong>Departure:</strong> {bus.departureTime} →{" "}
          <strong>Arrival:</strong> {bus.arrivalTime}
        </p>
        <p><strong>Fare:</strong> ₹{bus.price}</p>
        <p><strong>Bus Type:</strong> {bus.busType}</p>

        <h4 className="mt-4">Select Your Seats</h4>

        {/* Legend */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
          {/* <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "20px", height: "20px", background: "#4caf50", border: "1px solid #333" }}></div>
            <span>Window</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "20px", height: "20px", background: "#2196f3", border: "1px solid #333" }}></div>
            <span>Aisle</span>
          </div> */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "20px", height: "20px", background: "#4A94A8", border: "1px solid #333" }}></div>
            <span>Available</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "20px", height: "20px", background: "#ccc", border: "1px solid #333" }}></div>
            <span>Booked</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "20px", height: "20px", background: "#f50057", border: "1px solid #333" }}></div>
            <span>Selected</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
          }}
        >
          {bus.seats.map((seat) => {
            let bgColor = "#ddd"; // default
            if (seat.type === "window") bgColor = "#4A94A8";
            else if (seat.type === "aisle") bgColor = "#4A94A8";
            else if (seat.type === "middle") bgColor = "#ff9800";

            if (seat.booked) bgColor = "#ccc";
            if (selectedSeats.includes(seat.number)) bgColor = "#f50057";

            return (
              <button
                key={seat.number}
                disabled={seat.booked}
                onClick={() => handleSeatToggle(seat.number)}
                style={{
                  padding: "10px",
                  background: bgColor,
                  border: "1px solid black",
                  cursor: seat.booked ? "not-allowed" : "pointer",
                }}
                title={`${seat.number} (${seat.type})`}
              >
                {seat.number} ({seat.type})
              </button>
            );
          })}
        </div>

        <button className="btn btn-danger mt-4" onClick={handleBooking}>
          Proceed to Booking
        </button>
      </div>
    </div>
  );
};

export default BusDetails;