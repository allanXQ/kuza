const loanRequests = require("../../../models/loanRequests");
const crypto = require("crypto");
const Messages = require("../../../utils/messages");

const requestLoan = async (req, res) => {
  const {
    userId,
    userName,
    amount,
    purpose,
    description,
    interest,
    repaymentPeriod,
  } = req.body;
  const requestId = crypto.randomBytes(6).toString("hex");
  const loan = await loanRequests
    .create({
      requestId,
      userId,
      userName,
      amount,
      purpose,
      description,
      interest,
      repaymentPeriod,
    })
    .then((result) => {
      res.status(200).json({ message: Messages.requestSuccessful, result });
    })
    .catch((error) => {
      res.status(500).json({ message: Messages.serverError });
    });
};

module.exports = requestLoan;
