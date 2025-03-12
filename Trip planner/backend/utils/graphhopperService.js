// const axios = require("axios");
// const dotenv=require('dotenv')
// dotenv.config();

// const GRAPHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY;
// const BASE_URL = "https://graphhopper.com/api/1/route";


// const getRoute = async (start, end, profile = "car") => {
//   try {
//     const url = `${BASE_URL}?point=${start.lat},${start.lon}&point=${end.lat},${end.lon}&profile=${profile}&locale=en&calc_points=true&key=${GRAPHOPPER_API_KEY}`;

//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching route:", error);
//     throw new Error("Failed to fetch route");
//   }
// };

// module.exports =  getRoute ;

const axios = require("axios");
require("dotenv").config();

const GRAPHOPPER_BASE_URL = "https://graphhopper.com/api/1";
const API_KEY = process.env.GRAPHHOPPER_API_KEY;

/**
 * Get route details between multiple locations.
 * @param {Array} locations - Array of [latitude, longitude] pairs
 * @returns {Object} - Route details
 */
const getOptimizedRoute = async (locations) => {
    try {
        const url = `${GRAPHOPPER_BASE_URL}/route?key=${API_KEY}`;

        const data = {
            points: locations, // Array of [latitude, longitude]
            vehicle: "car", // Can be bike, foot, etc.
            instructions: true,
            optimize: true
        };

        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching route:", error.message);
        return null;
    }
};

/**
 * Get Geocoding details from an address.
 * @param {string} address - User input address
 * @returns {Object} - Geolocation details
 */
const getGeoCode = async (address) => {
    try {
        const url = `${GRAPHOPPER_BASE_URL}/geocode?q=${encodeURIComponent(address)}&limit=1&key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data.hits[0]; // Return first matched location
    } catch (error) {
        console.error("Error fetching geocode:", error.message);
        return null;
    }
};

module.exports = { getOptimizedRoute, getGeoCode };

