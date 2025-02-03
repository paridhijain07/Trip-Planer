const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');
dotenv.config();

// Function to generate a Refresh Token
const generateRefreshToken = (userId) => {
    try {
        const token = jwt.sign(
            { id: userId },
            process.env.SECRET_KEY_REFRESH_TOKEN,
            { expiresIn: "30d" }
        );
        // Update refresh token in the database
        User.updateOne
        (
            { _id: userId },
            { refresh_token: token }
        );
        return token;
    } 
    catch (error) {
        console.error("Error generating refresh token:", error);
        throw new Error("Failed to generate refresh token");
    }
};
module.exports = generateRefreshToken;
