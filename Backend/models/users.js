const mongoose = require("mongoose");
const uuid = require("uuid");
const id = uuid.v4();
const role = require("../config/roles");
userrole = role.user;

const isLocalAuth = function () {
  return this.authMethod === "local";
};

//add kyc
const users = mongoose.Schema({
  userid: { type: String },
  role: { type: String, default: userrole },
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, required: isLocalAuth, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: isLocalAuth, unique: true },
  balance: { type: Number, default: 50 },
  status: { type: String, default: "inactive" },
  referrer: { type: String, default: "none" },
  refreshToken: { type: String },
  passwordResetToken: { type: String },
  password: { type: String, required: isLocalAuth },
  created: { type: String, default: today },
});

const model = mongoose.model("users", users);

module.exports = model;
