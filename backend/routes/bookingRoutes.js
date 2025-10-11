import express from "express";
import { bookSeat, getMyBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import { getBookingById } from "../controllers/bookingController.js";

const router = express.Router();

// Protected booking routes
router.post("/book", protect, bookSeat);
router.get("/my", protect, getMyBookings);
router.get("/:id", protect, getBookingById);
router.get("/ticket/:id", protect, getBookingById);

export default router;
