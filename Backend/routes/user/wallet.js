const router = require("express").Router();

const {
  MpesaWithdraw,
} = require("../../controllers/account/wallet/mpesaWithdrawal");
const {
  TinypesaWebhook,
} = require("../../controllers/account/wallet/TinypesaWebhook");
const {
  MpesaDeposit,
} = require("../../controllers/account/wallet/mpesaDeposit");
const {
  MpesaDepositHistory,
} = require("../../controllers/account/wallet/depositHistory");
const {
  WithdrawalHistory,
} = require("../../controllers/account/wallet/withdrawalHistory");
const { verifyjwt } = require("../../middleware/verifyjwt");
const formValidate = require("../../middleware/validate");
const { depositSchema, withdrawalSchema } = require("../../yupSchemas");

// router.post(
//   "/mpesa/deposit",
//   verifyjwt,
//   formValidate(depositSchema),
//   MpesaDeposit
// );
router.post("/tinypesa/webhook", TinypesaWebhook);
router.post(
  "/withdraw",
  verifyjwt,
  formValidate(withdrawalSchema),
  MpesaWithdraw
);

// router.get("/deposit-history", verifyjwt, MpesaDepositHistory);
// router.get("/withdrawal-history", verifyjwt, WithdrawalHistory);

module.exports = router;
