const axios = require("axios");
const dotenv=require('dotenv')
dotenv.config();

const GRAPHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY;
const BASE_URL = "https://graphhopper.com/api/1/route";


const getRoute = async (start, end, profile = "car") => {
  try {
    const url = `${BASE_URL}?point=${start.lat},${start.lon}&point=${end.lat},${end.lon}&profile=${profile}&locale=en&calc_points=true&key=${GRAPHOPPER_API_KEY}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching route:", error);
    throw new Error("Failed to fetch route");
  }
};

module.exports =  getRoute ;
