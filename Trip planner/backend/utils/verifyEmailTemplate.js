const verifyEmailTemplate=({name,url})=>{
    return `
    <p>Dear ${name}</p>
    <p>Thank you for registering with tripGuide!</p>
    <a href=${url} style="color:white background:black">Verify Email</a>
    ` 
}
module.exports=verifyEmailTemplate;