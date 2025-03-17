const axios = require("axios");
require("dotenv").config();

const GRAPHOPPER_BASE_URL = "https://graphhopper.com/api/1";
const API_KEY = process.env.GRAPHHOPPER_API_KEY;

if (!API_KEY) {
  throw new Error(" Missing GraphHopper API key in environment variables.");
}

/**
 * Get an optimized route between multiple locations.
 * @param {Array} locations - Array of [latitude, longitude] pairs
 * @returns {Object} - Route details or error
 */
const getOptimizedRoute = async (locations) => {
  try {
    const url = `${GRAPHOPPER_BASE_URL}/route?key=${API_KEY}`;
    const data = {
      points: locations,
      vehicle: "car",
      instructions: true,
      points_encoded: false, 
    };

    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("❌ GraphHopper API Error:", error.response?.data || error.message);
    return { error: "Failed to fetch optimized route." };
  }
};

/**
 * Convert an address to latitude/longitude using Geocode API.
 * @param {string} address - User input address
 * @returns {Object|null} - Geolocation details or error
 */
const getGeoCode = async (address) => {
  try {
    const url = `${GRAPHOPPER_BASE_URL}/geocode?q=${encodeURIComponent(address)}&limit=1&key=${API_KEY}`;
    const response = await axios.get(url);

    if (!response.data.hits.length) {
      console.warn(" No results found for address:", address);
      return { error: "No geocode results found." };
    }

    return response.data.hits[0];
  } catch (error) {
    console.error(" Error fetching geocode:", error.response?.data || error.message);
    return { error: "Failed to fetch geocode." };
  }
};

module.exports = { getOptimizedRoute, getGeoCode };
