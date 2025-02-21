const { OTP } = require("../../../models/otpModel");
const { sendMailUtility } = require("../utils/mailUtils");
const bcrypt=require("bcrypt");


const createOTP= async (req,res)=>{
    try {
    const {body}=req;
    // console.log(body);
    const {email,isResend=false}=body.values;
    // console.log(email);
    if(!email){
        res.status(400).json({status:'fail',message:'Email is required'})
        return;
    }

    //alreaedy registered user
    //check if OTP is already sent--> expiry
        const oldOTP= await OTP.findOne({email: email,
            createdAt: {$gte: Date.now()-10*60*1000}// only compare with those otp sent in last one minute
        });// returns NULL or obj
    if(!isResend && oldOTP)
    {
        res.status(403).json({
            status: "fail",
            message: "OTP is already sent to this mail! Try resend!"
        })
        return;
    }
    const OTPValue= Math.floor((Math.random()*8999)+1000);
    const [isMailSent,errorMessage]= await sendMailUtility({
        email: email,
        subject: "OTP for verification @TECHSPHERE",
        text: `Your 4-digit OTP is ${OTPValue} `,
        html: `
            <html>
            <head>
            <style>
                h2{background-color:yellow; color:blue;}
            </style>
            </head>
            <body>
                <h2>Your 4-digit OTP is ${OTPValue}</h2> 
            </body>
            </html>
        `
    });

    if(!isMailSent){
        res.status(500).json({
            status:"fail",
            message: errorMessage,
        });
        return;
    }

        //hashing
        const salt=await bcrypt.genSalt(12);
        const hashedOTP=await bcrypt.hash(""+ OTPValue,salt);

    await OTP.create({
        otp: hashedOTP,
        email, //ES6 syntax key value pair same
    })
    res.status(201).json({
        status:"success",
        message: "OTP Sent",
    })
    // console.log("message",errorMessage);
}
catch(err){
    res.status(500);
    res.json({
        status: "fail",
        message: "Internal Server Error"
    })
    console.log(err.message);
}
    
};
module.exports={createOTP};