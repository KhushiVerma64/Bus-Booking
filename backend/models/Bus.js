import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  number: Number, // Seat number
  type: { type: String, enum: ["window", "aisle", "middle"], default: "window" },
  booked: { type: Boolean, default: false }, // true if seat is already booked
});

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, default: 30 }, // keep for backward compatibility
  seats: [seatSchema], // array of seat objects
  busType: { type: String, enum: ["AC", "Non-AC", "Sleeper", "Semi-Sleeper"], default: "Non-AC" },
});

export default mongoose.model("Bus", busSchema);