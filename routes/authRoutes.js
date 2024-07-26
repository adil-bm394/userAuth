const express=require('express');
const { registerController, loginController, sendOtpController } = require('../controllers/authController');


const router= express.Router();

//Send OTP to user 
router.post('/send-otp',sendOtpController)

//Register 
router.post('/register',registerController);

//Login 
router.get('/login',loginController);

module.exports=router;