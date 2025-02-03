const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // const token = req.cookies?.token ||req.headers.authorization?.split(" ")[1];
  // if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   req.userId = decoded.id; 
  //   console.log("Decoded User:", req.userId);

  //   req.user = decoded; 
  //   console.log("Decoded User:", decoded);
  //   next();
  // } catch (error) {
  //   res.status(403).json({ message: "Invalid or Expired Token" });
  // }
  try {
    
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({
            message: "Token not provided",
            error: true,
            success: false,
        });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    // Attach the user ID to the request object
    req.userId = decoded.id;

    // Proceed to the next middleware
    next();
} 
catch (error) {
    // Handle token verification errors
    return res.status(401).json({
        message: error.message || "Unauthorized access",
        error: true,
        success: false,
    });
}
};
module.exports = authenticateToken;
