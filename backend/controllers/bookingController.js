import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";

// ✅ Book seats
export const bookSeat = async (req, res) => {
  const { busId, seats, date } = req.body;

  if (!busId || !seats || seats.length === 0 || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const selectedSeats = seats.map(Number);

    // check if seats are already booked
    const unavailable = selectedSeats.some(
      (seatNo) => bus.seats.find((s) => s.number === seatNo && s.booked)
    );

    if (unavailable) return res.status(400).json({ message: "Some seats are already booked" });

    // mark seats as booked
    bus.seats.forEach((s) => {
      if (selectedSeats.includes(s.number)) s.booked = true;
    });

    bus.seatsAvailable -= selectedSeats.length;
    await bus.save();

    const booking = await Booking.create({
      user: req.user._id,
      bus: bus._id,
      seats: selectedSeats,
      date,
    });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

// ✅ Get my bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("bus");
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ✅ Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("bus");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};