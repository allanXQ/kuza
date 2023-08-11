const requestLoan = require("../../controllers/account/loans/requestLoan");
const formValidate = require("../../middleware/validate");
const { verifyjwt } = require("../../middleware/verifyjwt");
const { loanRequestSchema } = require("../../yupSchemas");

const router = require("express").Router();

router.post(
  "/loan/request-loan",
  verifyjwt,
  formValidate(loanRequestSchema),
  requestLoan
);
router.post(
  "/loan/cancel-loan-request",
  verifyjwt,
  formValidate(cancelLoanRequestSchema),
  repayLoan
);
router.post(
  "/loan/repay-loan",
  verifyjwt,
  formValidate(repayLoanSchema),
  repayLoan
);
router.post("/loan/bid", verifyjwt, formValidate(bidSchema), bid);
router.post(
  "/loan/cancel-bid",
  verifyjwt,
  formValidate(cancelBidRequestSchema),
  cancelBid
);
router.post(
  "/loan/raise-dispute",
  verifyjwt,
  formValidate(raiseDisputeSchema),
  raiseDispute
);

router.get("/loan/requests", verifyjwt, getLoanRequests);
router.get("/loan/get-bids/:requestId", verifyjwt, getBids);
