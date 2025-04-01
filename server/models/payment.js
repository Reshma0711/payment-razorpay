const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true },
  signature: { type: String, required: true },
  status: { type: String, enum: ['captured', 'failed', 'refunded'], required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});



const Payment= mongoose.model('Payment', paymentSchema);

module.exports=Payment