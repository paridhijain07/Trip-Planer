// const mongoose = require("mongoose");

// const TripSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   destinations: [{ latitude: Number, longitude: Number, name: String }],
//   timeline: { type: Number, required: true }, // Total duration in hours
//   optimizedRoute: Object, // Store GraphHopper result
// });

// module.exports = mongoose.model("Trip", TripSchema);
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // List of destination names (can store coordinates too if needed later)
  destinations: [{
    name: String,               // e.g., "Eiffel Tower"
    latitude: Number,          // optional, for route calculation
    longitude: Number          // optional
  }],

  totalTimeline: {
    startDate: Date,
    endDate: Date
  },

  budget: {
    total: Number,
    spent: Number,
    categories: [{
      name: String,         // e.g., "Food", "Transport"
      amount: Number,
      spent: Number
    }]
  },

  routeInfo: {
    totalDistance: Number,     // in meters or km
    totalTime: Number,         // in seconds or minutes
    optimizedOrder: [Number],  // index order of destinations after optimization
    polyline: String           // for drawing the path on map if needed
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);

