<<<<<<< HEAD
// import mongoose from 'mongoose'
// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,'provide name']
//     },
//     email:{
//         type:String,
//         required:[true,'provide email']   
//     },
//     password:{
//         type:String,
//         required:[true,'provide password']
=======
// const mongoose = require("mongoose");

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true, 
//     },
//     password:{
//         type:String,
//         required:true,
>>>>>>> 3e66cdccac87f51dfa3cdbfd5be9e02baa969fd3
//     },
//     forgot_password_otp:{
//         type:String,
//         default:null
//     },
//     forgot_password_expiry:{
//         type:Date,
//         default:''
//     },
//     mobile:{
//         type:Number,
//         default:null,
//     },
//     last_login_date:{
//         type:String,
//         default:''
//     },
//     refresh_token:{
//         type:String,
//         default:''
//     },
//     verify_email:{
//         type:Boolean,
//         default:false
//     },
//     access_token:{
//         type:String,
//         default:'',
//     },
//     wishlist:{
//         type:mongoose.Schema.ObjectId,
//         ref:'wishlist'
//     }
// },{
//     timestamps:true,
// })
<<<<<<< HEAD
// const userModel=mongoose.model('User',userSchema)
// export default userModel;
=======
// module.exports = mongoose.model("User", userSchema);
>>>>>>> 3e66cdccac87f51dfa3cdbfd5be9e02baa969fd3
