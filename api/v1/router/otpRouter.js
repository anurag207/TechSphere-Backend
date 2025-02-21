const express=require('express');
const { createOTP } = require('../controllers/otpController');
const otpRouter=express.Router();
otpRouter.post('/',createOTP);
// authRouter.post('/signup',validateOTP);
module.exports={otpRouter};