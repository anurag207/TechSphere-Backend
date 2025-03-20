const { OTP } = require("../../../models/otpModel");
const { User } = require("../../../models/userModel");
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, otp: userOtp } = req.body; //change name of otp while destructing, now use it as userOtp
    if (!email || !password || !userOtp) {
      res.status(400).json({
        status: "fail",
        message: "Either name,email,password or OTP is missing!",
      });
    }
    const result = await OTP.findOne({ email, createdAt: {$gte: Date.now()-10*60*1000}}).sort("-createdAt");
    const {otp: dbOtp}= result || {};

    if(!dbOtp)
    {
        res.status(401).json({
            status: "fail",
            message: "OTP is expired. Please try Resend!",
        });
        return;
    }

    const isOTPCorrect= await bcrypt.compare(userOtp,dbOtp);
    // console.log(userOtp,"userotp");    
    // console.log(dbOtp,"dbOtp");    
    // console.log(isOTPCorrect);    
    if (!isOTPCorrect) {
      res.status(401).json({
        status: "fail",
        message: "Invalid Email or OTP",
      });
      return;
    }
    //hashing
    const salt=await bcrypt.genSalt(12);
    const hashedPassword=await bcrypt.hash(password,salt);

    await User.create({
      email,
      password : hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "User Registered! Please Login",
    });
  } catch (err) {
    if(err.code==11000){ //mongoose duplicate key error
        res.status(409).json({
            status: 'fail',
            message: 'Duplicate key error on: '+Object.keys(err.keyValue).join(','),
        })
        return;
    }
    res.status(500);
    res.json({
      status: "fail",
      message: "Internal Server Error",
    });
    console.log(err.message);
  }
};

const loginUser= async(req,res)=>{
  // console.log(Object.keys(req));
  // console.log(req.body);
  // console.log(req.userInfo);
    const {email,password: userPassword}=req.body;

    const user=await User.findOne({email}).select("name email password _id"); //check email from database after login to get the user document
    //selct so that only gets name email pass from db not whole object
    if(!user)
    {
        res.status(400).json({
            status: "fail",
            message: "Email is not registered. Please sign up."
        });
        return;
    }

    //password match
    const {password: hashedPassword}=user;
    const isPasswordCorrect= await bcrypt.compare(userPassword,hashedPassword);

    if(!isPasswordCorrect)
    {
        res.status(401).json({
            status: "fail",
            message: "Email or password is incorrect"
        });
        return;
    }
    const {_id:userId, name}=user;
    // console.log(id);


    const token= jwt.sign({ email,name,userId }, process.env.JWT_SECRET_KEY, { expiresIn: 10 * 60 }); //10 minutes token expiry
    
    res.cookie("token",token,{
      maxAge: 900000, //cookie expires in 15 minutes
      httpOnly: true,
      //secure:true
    });//set cookie form backend in frontend
    // convention: "authorisation": "Bearer <token>"
    res.status(200).json({
        status: "login success",
        message: "done",
        userData: {email,userId
        },
    }); 
}

const logoutUser=async(req,res)=>{
  try{
  res.clearCookie("token",{
    httpOnly: true
  });
  res.status(200).json({
    status: "logout success",
    message: "done",
}); 
  }
  catch(err)
  {
    res.status(500);
    res.json({
      status: "fail",
      message: "Internal Server Error",
    });
    console.log(err.message);
  }
}
module.exports={registerUser,loginUser,logoutUser};
// module.exports={registerUser};
