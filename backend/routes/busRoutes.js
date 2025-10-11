import express from "express";
import Bus from "../models/Bus.js";
const router = express.Router();
import { addBus, searchBuses } from "../controllers/busController.js";

router.post("/add", addBus);

// 🔍 Search buses (case-insensitive)
router.post("/search", async (req, res) => {
  const { source, destination, date } = req.body;

  try {
    const buses = await Bus.find({
      source: { $regex: source, $options: "i" },        // case-insensitive
      destination: { $regex: destination, $options: "i" },
      date: date,
    });

    res.json(buses);
  } catch (err) {
    console.error("Error searching buses:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Get single bus by ID
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).send("Bus not found");
    res.json(bus);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add or update dummy buses
router.post("/add-dummy", async (req, res) => {
  try {
    // Add updated dummy buses
    const newBuses = [
      {
        name: "Yatra Express",
        source: "Gorakhpur",
        destination: "Lucknow",
        date: "2025-09-22",
        departureTime: "10:00 AM",
        arrivalTime: "4:00 PM",
        price: 500,
        seatsAvailable: 18,
        busType: "AC",
        seats: Array.from({ length: 18 }, (_, i) => ({
          number: i + 1,
          type: i % 4 === 0 || i % 4 === 3 ? "window" : "aisle",
          booked: false,
        })),
      },
      {
        name: "CityLine Travels",
        source: "Gorakhpur",
        destination: "Delhi",
        date: "2025-09-23",
        departureTime: "8:00 PM",
        arrivalTime: "8:00 AM",
        price: 1200,
        seatsAvailable: 20,
        busType: "Sleeper",
        seats: Array.from({ length: 20 }, (_, i) => ({
          number: i + 1,
          type: i % 4 === 0 || i % 4 === 3 ? "window" : "aisle",
          booked: false,
        })),
      },
      {
        name: "Royal Ride",
        source: "Lucknow",
        destination: "Varanasi",
        date: "2025-09-24",
        departureTime: "6:00 PM",
        arrivalTime: "11:00 PM",
        price: 700,
        seatsAvailable: 25,
        busType: "Non-AC",
        seats: Array.from({ length: 25 }, (_, i) => ({
          number: i + 1,
          type: i % 4 === 0 || i % 4 === 3 ? "window" : "aisle",
          booked: false,
        })),
      },
      {
        name: "Luxury Line",
        source: "Delhi",
        destination: "Jaipur",
        date: "2025-09-25",
        departureTime: "7:00 AM",
        arrivalTime: "1:00 PM",
        price: 900,
        seatsAvailable: 30,
        busType: "Semi-Sleeper",
        seats: Array.from({ length: 30 }, (_, i) => ({
          number: i + 1,
          type: i % 4 === 0 || i % 4 === 3 ? "window" : "aisle",
          booked: false,
        })),
      },
    ];

    await Bus.insertMany(newBuses);
    res.json({ message: "✅ New dummy buses added successfully!" });
  } catch (err) {
    console.error("❌ Error adding dummy buses:", err);
    res.status(500).json({ message: "Failed to add dummy buses" });
  }
});

export default router;