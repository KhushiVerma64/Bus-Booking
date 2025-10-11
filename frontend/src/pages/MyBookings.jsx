import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this
import API from "../api/axiosInstance.js";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/booking/my");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container-fluid min-vh-100 book flex-column align-items-center pt-5"
      style={{
        // backgroundColor: "#F3EDC4", 
        color: "black",
       
      }}>
      <h3 className="mb-4 text-center">🚌 My Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-muted text-center">No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="card mb-3 shadow-sm"
            
          >
            <div className="card-body card1 d-flex justify-content-between align-items-center">
              <div>
                <h5>{booking.bus?.name}</h5>
                <p className="mb-1">
                  {booking.bus?.source} → {booking.bus?.destination}
                </p>
                <small>
                  {booking.bus?.departureTime} - {booking.bus?.arrivalTime}
                </small>
              </div>

              <div>
                <p className="mb-1">📅 {booking.date}</p>
                <p className="mb-1">💺 Seats: {booking.seats}</p>
                <p className="fw-bold">₹{booking.bus?.price}</p>

                {/* ✅ View Ticket Button */}
                <button
                  className="btn btn-sm mt-2" 
                  style={{border: "1px solid gold",  backgroundColor: "#041422", color: "white", }}
                  onClick={() => navigate(`/ticket/${booking._id}`)}
                >
                  🧾 View Ticket
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
