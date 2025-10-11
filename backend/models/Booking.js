import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seats: { type: [Number], required: true }, // 👈 array of numbers
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
