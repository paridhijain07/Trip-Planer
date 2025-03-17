const express = require("express");
const { getOptimizedRoute, getGeoCode } = require("../utils/graphhopperService");

const tripRouter = express.Router();

/**
 * Route to get an optimized route for a trip
 * Example Request: POST /api/trip/route
 */
tripRouter.post("/route", async (req, res) => {
  const { locations } = req.body; // Expecting [{ lat, lng }, { lat, lng }, ...]

  if (!locations || locations.length < 2) {
    return res.status(400).json({ error: "At least two locations are required" });
  }

  const coords = locations.map((loc) => [loc.lat, loc.lng]);
  const routeData = await getOptimizedRoute(coords);

  console.log("✅ GraphHopper Response:", JSON.stringify(routeData, null, 2)); // Debugging

  if (!routeData || !routeData.paths || !routeData.paths.length) {
    return res.status(500).json({ error: "Failed to fetch route" });
  }

  res.json(routeData.paths[0]);
});

/**
 * Route to convert an address to latitude/longitude
 * Example Request: GET /api/trip/geocode?address=New Delhi
 */
tripRouter.get("/geocode", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  const locationData = await getGeoCode(address);

  if (!locationData) {
    return res.status(500).json({ error: "Failed to fetch geocode" });
  }

  res.json(locationData);
});

module.exports = tripRouter;
