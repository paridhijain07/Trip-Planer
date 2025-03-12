const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destinations: [{ latitude: Number, longitude: Number, name: String }],
  timeline: { type: Number, required: true }, // Total duration in hours
  optimizedRoute: Object, // Store GraphHopper result
});

module.exports = mongoose.model("Trip", TripSchema);
