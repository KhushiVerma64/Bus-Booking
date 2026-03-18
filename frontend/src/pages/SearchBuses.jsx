import { useState } from "react";
import API from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const SearchBuses = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
  });
  const [buses, setBuses] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // // Search buses
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await API.post("/buses/search", formData);
  //     setBuses(res.data.data);
  //     setMessage("");
  //   } catch (err) {
  //     console.error("Error fetching buses:", err);
  //     setMessage("Error fetching buses");
  //   }
  // };


  // Search buses
  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const res = await API.post("/buses/search", formData);

    // Safely get buses from response
    const busesData = res?.data?.data || [];

    setBuses(busesData);

    // Optional message
    if (busesData.length === 0) {
      setMessage("No exact buses found. Showing available buses.");
    } else {
      setMessage("");
    }

  } catch (err) {
    console.error("Error fetching buses:", err);
    setMessage("Unable to fetch buses. Please try again.");
  }
};


  // Seat selection
  const handleSeatSelect = (busId, seatNo) => {
    setSelectedSeats({ ...selectedSeats, [busId]: seatNo });
  };

  // Book ticket
  const handleBook = async (busId, busName) => {
    const seat = selectedSeats[busId] || 1;
    const confirmBooking = window.confirm(
      `Do you want to book seat ${seat} on ${busName}?`
    );
    if (!confirmBooking) return;

    try {
      const res = await API.post("/booking/book", {
        busId,
        seats: seat,
        date: formData.date,
      });

      alert(res.data.message); // show success

      // Wait 0.5s then navigate, or navigate with state to refresh MyBookings
      navigate("/bookings", { replace: true }); // ensures re-render

      handleSubmit({ preventDefault: () => { } }); // Refresh bus list
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div
      className="container mt-5 pt-5 search-box"
    >
      {/* Search Form */}
      <div className="row justify-content-center ">
        <div className="col-md-8 ">
          <div className="card shadow ">
            <div className="card-body">
              <h3 className="text-center mb-4">🔍 Search Buses</h3>
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">From</label>
                  <input
                    type="text"
                    name="source"
                    className="form-control"
                    placeholder="Enter source city"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">To</label>
                  <input
                    type="text"
                    name="destination"
                    className="form-control"
                    placeholder="Enter destination city"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Journey Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 text-center mt-3">
                  <button type="submit" className="btn btn-danger btn-lg px-5">
                    Search
                  </button>
                </div>
              </form>

              {message && (
                <div className="alert alert-info mt-3 text-center">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bus Results */}
      <div className="mt-5">
        <h4 style={{ color: "red" }}>Available Buses</h4>
        {buses.length === 0 ? (
          <p style={{ color: "white" }}>No buses found</p>
        ) : (
          buses.map((bus) => (
            <div key={bus._id} className="card mb-3 search">
              <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5>{bus.name}</h5>
                  <p className="mb-1">
                    {bus.source} → {bus.destination}
                  </p>
                  <small>
                    {bus.departureTime} - {bus.arrivalTime} | {bus.busType} Bus
                  </small>
                </div>
                <div>
                  <p className="mb-1">💺 {bus.seats.filter((s) => !s.booked).length} seats available</p>
                  <p className="fw-bold">₹{bus.price}</p>

                  {/* Seat selector */}
                  <select
                    className="form-select mb-2"
                    style={{ width: "100px" }}
                    value={selectedSeats[bus._id] || 1}
                    onChange={(e) =>
                      handleSeatSelect(bus._id, Number(e.target.value))
                    }
                  >
                    {/* {Array.from({ length: bus.seatsAvailable }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))} */}
                    {bus.seats
                      .filter((s) => !s.booked)
                      .map((seat) => (
                        <option key={seat.number} value={seat.number}>
                          {seat.number} ({seat.type})
                        </option>
                      ))}
                  </select>

                  {/* <button
                    className="btn btn-primary"
                    onClick={() => handleBook(bus._id, bus.name)}
                  >
                    Book
                  </button> */}

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/bus/${bus._id}`)}>
                    Bus Details
                  </button>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBuses;