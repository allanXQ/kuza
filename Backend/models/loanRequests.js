const mongoose = require("mongoose");

const Bids = new mongoose.Schema({
  bidId: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  interest: { type: Number, required: true },
  repaymentPeriod: { type: Date, required: true },
});

const loanRequests = new mongoose.Schema({
  requestId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  lenderId: { type: String },
  lenderName: { type: String },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  description: { type: String, required: true },
  interest: { type: Number, required: true }, //interest rate in percentage e.g 10% = 10 per month
  status: { type: String, default: "pending" },
  bids: [Bids],
  repaymentPeriod: { type: Date, required: true }, //in months
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("loanRequests", loanRequests);

module.exports = model;
