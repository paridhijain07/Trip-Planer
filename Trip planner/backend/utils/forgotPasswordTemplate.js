const forgotPasswordTemplate=({name,otp})=>{
    return `
    <div>
    <p>Hi ${name}</p>
    <p>You have requested for password reset. Here is your OTP to reset your password</p>
    <p style="background:yellow;color:blue;padding:11px">${otp}</p>
    <p>OTP valid for 1 hour only.</p>
    <p>Thanks</p>
    <p>Team tripGuide</p>
    
    </div>
    `
}
module.exports=forgotPasswordTemplate;