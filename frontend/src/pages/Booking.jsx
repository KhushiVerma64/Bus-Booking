import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axiosInstance.js";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { seats = [], bus } = location.state || {};
  const [loading, setLoading] = useState(false);

  if (!bus || seats.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No booking data found.</h2>
        <button onClick={() => navigate("/search")}>Go Back</button>
      </div>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await API.post("/booking/book", {
        busId: bus._id,
        seats: seats.map(Number),
        date: bus.date,
      });

      alert(res.data.message || "Booking confirmed!");
      navigate("/bookings");
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed");
    }
    setLoading(false);
  };

  return (
    <div className="container  mt-5 text-center search ">
      <div className="mt-5 p-5 card">
      <h2>Booking Confirmation</h2>
      <p>Bus: {bus.name}</p>
      <p>From: {bus.source} → To: {bus.destination}</p>
      <p>Date: {bus.date}</p>
      <p>Selected Seats: {seats.join(", ")}</p>
      <p>Total Fare: ₹{seats.length * bus.price}</p>

      <button  className="btn-primary btn"
       onClick={handleConfirm} disabled={loading} style={{ marginTop: "20px", padding: "10px 15px" }}>
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
      </div>
    </div>
  );
};

export default Booking;