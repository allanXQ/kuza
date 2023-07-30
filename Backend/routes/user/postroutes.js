const router = require("express").Router();

const {
  MpesaWithdraw,
} = require("../../controllers/account/Wallet/MpesaWithdraw");
const {
  TinypesaWebhook,
} = require("../../controllers/account/Wallet/TinypesaWebhook");
const {
  MpesaDeposit,
} = require("../../controllers/account/Wallet/MpesaDeposit");
const { UpdatePassword } = require("../../controllers/account/updatepassword");
const { Login } = require("../../controllers/auth/login");
const { Register } = require("../../controllers/auth/register");
const { ResetPassword } = require("../../controllers/auth/reset-password");
const { verifyjwt } = require("../../middleware/verifyjwt");
const { ForgotPassword } = require("../../controllers/auth/forgot-password");
const { RefreshToken } = require("../../controllers/auth/refreshjwt");
const { Logout } = require("../../controllers/auth/logout");
const formValidate = require("../../middleware/validate");
const { regSchema, loginSchema } = require("../../yupschemas");

router.post("/auth/register", formValidate(regSchema), Register);
router.post("/auth/login", formValidate(loginSchema), Login);
router.post("/auth/reset_password/:id/:token", ResetPassword);
router.post("/auth/refresh_token", RefreshToken);
router.post("/auth/logout", Logout);

router.post("/auth/forgot_password", ForgotPassword);
router.post("/change_password", verifyjwt, UpdatePassword);

router.post("/mpesa/deposit", verifyjwt, MpesaDeposit);
router.post("/tinypesa/webhook", TinypesaWebhook);
router.post("/withdraw", verifyjwt, MpesaWithdraw);

module.exports = router;
