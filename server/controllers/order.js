const { Console } = require("console");
const Order = require("../models/order");
const Payment = require("../models/payment");
const { razorpay } = require("../utils/razorpay");

const crypto = require("crypto");

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log(amount);

    // Configure options for Razorpay order
    const options = {
      amount: amount*100,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);

    // console.log("Razorpay object:", razorpay);
    // console.log("Razorpay Orders:", razorpay.orders);

    // Create order in Razorpay
    const order = await razorpay.orders.create(options);

    // Save order to DB
    const newOrder = new Order({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: "created",
    });

    await newOrder.save();

    res.status(200).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Verify and capture payment
exports.verifyCapture = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Generate signature for verification
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    console.log("Expected signnnnnnnnnnnnn", expectedSign);
    console.log("RazorPay Signatureeeeeeeeeeee", razorpay_signature);

    const isAuth = razorpay_signature === expectedSign;

    // Verify the signature
    if (!isAuth) {
      return res.status(400).json({ message: "Invalid Signature" });
    }

    // Check payment status
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    if (paymentDetails.status === "captured") {
      // Save payment details to DB
      const newPayment = new Payment({
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        signature: razorpay_signature,
        status: "captured",
        amount: paymentDetails.amount,
        method: paymentDetails.method,
      });

      await newPayment.save();

      // Update order status to 'paid'
      await Order.findOneAndUpdate(
        { order_id: razorpay_order_id },
        { status: "paid" }
      );

      res.status(200).json({
        message: "Payment captured successfully",
        paymentDetails,
      });
    } else {
      res.status(400).json({ message: "Payment not captured" });
    }
  } catch (error) {
    console.error("Error in verification", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
