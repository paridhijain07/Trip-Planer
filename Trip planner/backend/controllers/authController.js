const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

   
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
//pehle ise banwa lena
// exports.signupuser = async function (req, res) {

//     const { email, password , username } = req.body;
//     const kartik  = User.insertOne({email,password,username});

// }
