const mongoose = require("mongoose");
const crypto = require("crypto");
const id = crypto.randomBytes(6).toString("hex");
const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
today = year + ":" + month + ":" + day;
//add withdrawal mode etc
const Withdrawals = new mongoose.Schema({
  userid: { type: String },
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  created: { type: String, default: today },
});

const model = mongoose.model("Withdrawals", Withdrawals);

module.exports = model;
