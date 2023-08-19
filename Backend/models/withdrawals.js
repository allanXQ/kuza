const mongoose = require("mongoose");

//add withdrawal mode etc
const Withdrawals = new mongoose.Schema({
  userid: { type: String },
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("Withdrawals", Withdrawals);

module.exports = model;
