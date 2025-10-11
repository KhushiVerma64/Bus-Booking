import Bus from "../models/Bus.js";

export const addBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchBuses = async (req, res) => {
  try {
    const { source, destination, date } = req.body;

    // Case-insensitive + partial matching
    const buses = await Bus.find({
      source: { $regex: source, $options: "i" },        // "i" = ignore case
      destination: { $regex: destination, $options: "i" },
      date: date,
    });

    res.json(buses);
  } catch (err) {
    console.error("Error in searchBuses:", err);
    res.status(500).json({ message: "Server error" });
  }
};
