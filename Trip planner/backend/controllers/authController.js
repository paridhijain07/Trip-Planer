const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv')
dotenv.config()

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    //else login the user
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    })
  } 
  catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.signUpUser = async function (req, res) {
    const { email, password, username, mobile } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Hash the password
       

        // Create a new user
        const newUser = new User({
            email: email,
            password: password, // Store the hashed password
            username: username,
            mobile: mobile,
        });

        // Save the user to MongoDB
        const kartik = await User.create(newUser);

        // Send success response
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

