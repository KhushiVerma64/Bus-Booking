import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bus-booking-teal.vercel.app",
  "https://bus-booking-git-main-khushi-vermas-projects-0649901b.vercel.app",
  "https://bus-booking-f5raaiz2d-khushi-vermas-projects-0649901b.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman or curl requests
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error("CORS Policy: Access Denied"), false);
    }
    return callback(null, true);
  },
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
connectDB();

app.get("/", (req, res) => {
  res.send("Bus Booking Backend is running ");
});

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
