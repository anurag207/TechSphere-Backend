const express=require('express');
const authRouter=express.Router();
const {registerUser, loginUser, logoutUser}=require('../controllers/authController.js')
// const {registerUser}=require('../controllers/authController.js')
authRouter.post('/signup',registerUser);
authRouter.post('/login',loginUser);
authRouter.post('/logout',logoutUser);
// authRouter.post('/signup',validateOTP);
module.exports={authRouter};