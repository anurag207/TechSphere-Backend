const express=require('express');
const {getUserDashboard} =require('../controllers/dashboardController')
// const { createOTP } = require('../controllers/otpController');
const dashboardRouter=express.Router();
dashboardRouter.get('/:userId',getUserDashboard);
// authRouter.post('/signup',validateOTP);
module.exports={dashboardRouter};