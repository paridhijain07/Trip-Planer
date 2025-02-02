const generateOtp=()=>{
    return Math.floor(Math.random()*900000)+100000 //generating 6 digit otp for verification
}
module.exports=generateOtp