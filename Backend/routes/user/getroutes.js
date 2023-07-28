const {
  MpesaDepositHistory,
} = require("../../controllers/account/Wallet/DepositHistory");
const {
  WithdrawalHistory,
} = require("../../controllers/account/Wallet/WithdrawalHistory");
const verifyjwt = require("../../middleware/verifyjwt");

const router = require("express").Router();

router.get("/deposit_history", verifyjwt, MpesaDepositHistory);
router.get("/withdrawal_history", verifyjwt, WithdrawalHistory);

module.exports = router;
