// const express = require("express");
// const { getOptimizedRoute, getGeoCode } = require("../utils/graphhopperService");

// const tripRouter = express.Router();

// /**
//  * Route to get an optimized route for a trip
//  * Example Request: POST /api/trip/route
//  */
// tripRouter.post("/route", async (req, res) => {
//   const { locations } = req.body; // Expecting [{ lat, lng }, { lat, lng }, ...]

//   if (!locations || locations.length < 2) {
//     return res.status(400).json({ error: "At least two locations are required" });
//   }

//   const coords = locations.map((loc) => [loc.lat, loc.lng]);
//   const routeData = await getOptimizedRoute(coords);

//   console.log("✅ GraphHopper Response:", JSON.stringify(routeData, null, 2)); // Debugging

//   if (!routeData || !routeData.paths || !routeData.paths.length) {
//     return res.status(500).json({ error: "Failed to fetch route" });
//   }

//   res.json(routeData.paths[0]);
// });

// /**
//  * Route to convert an address to latitude/longitude
//  * Example Request: GET /api/trip/geocode?address=New Delhi
//  */
// tripRouter.get("/geocode", async (req, res) => {
//   const { address } = req.query;

//   if (!address) {
//     return res.status(400).json({ error: "Address is required" });
//   }

//   const locationData = await getGeoCode(address);

//   if (!locationData) {
//     return res.status(500).json({ error: "Failed to fetch geocode" });
//   }

//   res.json(locationData);
// });

// module.exports = tripRouter;
const express = require('express');
const tripRouter = express.Router();
const Trip = require('../models/trip.model')
const authMiddleware = require('../middleware/authMiddleware'); // assumes JWT auth

// ✅ Create new trip
tripRouter.post('/', authMiddleware, async (req, res) => {
  const { destinations, startDate, endDate } = req.body;

  try {
    console.log('Received trip data:', { destinations, startDate, endDate });
    console.log('User ID from auth:', req.user?.id);

    const newTrip = new Trip({
      userId: req.userId,
      destinations,
      startDate,
      endDate
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.error('Error creating trip:', err);  
    res.status(500).json({ error: 'Server error while creating trip' });
  }
});


// ✅ Get trip by ID
tripRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.userId });

    if (!trip) {  
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching trip' });
  }
});

// ✅ Update trip
tripRouter.put('/:id', authMiddleware, async (req, res) => {
  const { destinations, startDate, endDate } = req.body;

  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { destinations, startDate, endDate },
      { new: true }
    );

    res.json(updatedTrip);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating trip' });
  }
});

module.exports = tripRouter;
