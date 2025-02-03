const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');
// const userModel = require("../models/userModel");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../config/sendEmail");
const forgotPasswordTemplate=require('../utils/forgotPasswordTemplate')
dotenv.config()

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json(
      { message: "Invalid email or password" });
      
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
const signUpUser = async function (req, res) {
    const { email, password, username, mobile } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
       

        // Create a new user
        const newUser = new User({
            email: email,
            password: hashPassword, 
            username: username,
            mobile: mobile,
        });

        // Save the user to MongoDB
        // const kartik = User.createOne({newUser})
        const kartik = await newUser.save();

        // Send success response
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
const verifyEmailController = async (req,res)=>{
  try {
    const {code}=req.params;
    const user=await User.findOne({_id:code},{verify_email:true});
    return res.json({
      message:'Email verification successfull',
      error:false,
      success:true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:error.message||'Internal Server Error',
      error:true,
      success:false
    })
  }
}
const forgotPasswordController=async (req,res)=>{
  try {
    const {email}=req.body;
    if(!email){
      return res.status(400).json({
        message:'Email is required',
        error:true,
        success:false
      })
    }
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({
        message:'Email not available',
        error:true,
        success:false
      })
    }
    const otp=generateOtp();
    const currentTime=new Date()
    const expireTime=new Date(currentTime.getTime()+(60*60*1000))//add 1 hr for expiration time
    await User.findByIdAndUpdate(user._id,{
      forgot_password_expiry:expireTime,
      forgot_password_otp:otp,
    })
    await sendEmail({
      sendTo: email,
      subject: "Forgot Password from tripGuide",
      html: forgotPasswordTemplate({
          name: user.username,
          otp,
      }),
  });
  return res.json({
    message: "Check your email for the OTP",
    error: false,
    success: true,
});
  } 
  catch (error) {
    return res.status(500).json({
      message:error.message,
      error:true,
      success:false,
    })
  }
}
const verifyForgotPasswordOtp=async (req, res)=> {
  try {
      const { email, otp } = req.body;

      if (!email || !otp) {
          return res.status(400).json({
              message: "Email and OTP are required",
              error: true,
              success: false,
          });
      }

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({
              message: "Email not available",
              error: true,
              success: false,
          });
      }

      // Get current time in IST
      const currentTime = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
      const currentIST = new Date(currentTime.getTime() + istOffset);
      // Convert stored expiry to IST for logging
      const expiryIST = new Date(user.forgot_password_expiry.getTime());
      
      console.log('Current time (IST):', currentIST.toLocaleString());
      console.log('Stored expiry (IST):', expiryIST.toLocaleString());
      console.log('Difference in minutes:', 
          (expiryIST - currentIST) / (1000 * 60));

      if (!user.forgot_password_expiry || currentIST > expiryIST) {
          return res.status(400).json({
              message: "OTP has expired",
              error: true,
              success: false,
          });
      }

      if (otp !== user.forgot_password_otp) {
          return res.status(400).json({
              message: "Invalid OTP",
              error: true,
              success: false,
          });
      }

      // Clear OTP afte verification
      await User.findByIdAndUpdate(user._id, {
          forgot_password_otp: null,
          forgot_password_expiry: null
      });

      return res.json({
          message: "OTP verified successfully",
          error: false,
          success: true,
      });
  } 
  catch (error) {
      return res.status(500).json({
          message: error.message || "An error occurred",
          error: true,
          success: false,
      });
  }
}
const logoutController=async (req,res)=>{
  try {
    const userid = req.userId; // Ensure this comes from middleware
    console.log("User ID for logout:", userid);

    // Clear cookies
    const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    };
    res.clearCookie("token", cookieOption);
    
    // Reset refresh token in database
    const user = await User.findByIdAndUpdate(userid, { token: "" });
    // console.log("Refresh token cleared for user:", user);

    return res.json({
        message: "Logout Successfully!",
        error: false,
        success: true,
    });
} 
catch (error) {
    console.error("Logout Error:", error.stack);
    return res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false,
    });
}
}

module.exports = {
  signUpUser,
  verifyEmailController,
  loginUser,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  logoutController,
};


