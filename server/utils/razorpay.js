const dotenv = require("dotenv").config();

const Razorpay = require("razorpay");

const YOUR_RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

const YOUR_RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

exports.razorpay = new Razorpay({
  key_id: YOUR_RAZORPAY_KEY_ID,
  key_secret: YOUR_RAZORPAY_KEY_SECRET,
});

