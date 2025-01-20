const express = require("express");
const { loginUser } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup" , )
router.post("/login", loginUser);

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});

module.exports = router;
