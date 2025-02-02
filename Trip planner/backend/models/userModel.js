const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile:{
    type:Number,
    default:null,
  },  
  verify_email:{
    type:Boolean,
    default:false,
  },
  forgot_password_otp:{
  type:String,
  default:null
  },
  forgot_password_expiry:{
  type:Date,
  default:''
  },
  


});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model("User", userSchema);


