const mongoose = require("mongoose");
const role = require("../config/roles");

const isLocalAuth = function () {
  return this.authMethod === "local";
};

//add kyc
const users = mongoose.Schema({
  userid: { type: String },
  role: { type: String, default: role.user },
  firstname: { type: String },
  lastname: { type: String },
  googleName: { type: String, required: !isLocalAuth },
  username: { type: String, required: isLocalAuth, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: isLocalAuth, unique: true },
  balance: { type: Number, default: 50 },
  authMethod: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },
  status: { type: String, default: "inactive" },
  referrer: { type: String, default: "none" },
  refreshToken: { type: String },
  passwordResetToken: { type: String },
  password: { type: String, required: isLocalAuth },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("users", users);

module.exports = model;
