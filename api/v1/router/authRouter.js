const express=require('express');
const authRouter=express.Router();
const {registerUser, loginUser, logoutUser}=require('../controllers/authController.js')
const {forgotPassword, updatePassword}=require('../controllers/resetPasswordController.js');
const { resetPasswordVerifyToken } = require("../middleware/resetPasswordToken.js");
// const {registerUser}=require('../controllers/authController.js')
authRouter.post('/signup',registerUser);
authRouter.post('/login',loginUser);
authRouter.post('/logout',logoutUser);
authRouter.post('/forgotPassword',forgotPassword);
authRouter.post('/updatePassword',resetPasswordVerifyToken,updatePassword);
// authRouter.post('/signup',validateOTP);
module.exports={authRouter};