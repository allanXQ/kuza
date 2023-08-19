const mongoose = require("mongoose");

const MpesaDeposits = new mongoose.Schema({
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  mpesaRef: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("MpesaDeposits", MpesaDeposits);

module.exports = model;
