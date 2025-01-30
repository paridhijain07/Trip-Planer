const express = require("express");
const User = require("./models/userModel");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const authRoutes = require("./routes/authRoutes");
const userRouter=require('./routes/user.routes')

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    // Use create() to add a new user
    User.create({
      username: "kartik123",
      email: "kartikpal@gmail.com",
      password: "9650536044",  // Consider hashing the password before storing
    })
      .then(() => console.log("User added"))
      .catch((err) => console.log("Error adding user:", err));
  })
  .catch((err) => console.log("Database connection error:", err));

// Set up routes
// app.use("/api/auth", authRoutes);

app.use('/api/user',userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
