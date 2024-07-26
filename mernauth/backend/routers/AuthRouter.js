const express = require('express');
const { signup, login } = require('../controllers/AuthController');
const {signupValidation,loginValidation}=require('../Middlewares/AuthValidation')
const router = express.Router();

router.post('/login',loginValidation,login);

router.post('/signup',signupValidation,signup);

module.exports = router;
