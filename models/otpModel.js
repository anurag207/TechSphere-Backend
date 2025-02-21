const {Schema,model}=require("mongoose");
const otpSchema=new Schema({
    otp:{
        type: String,
        required: true,
    },
     email:{
        type: String,
        required: true
     }

},{
    timestamps: true
});
// console.log(user);  
const OTP=model('otps',otpSchema);
module.exports={OTP};