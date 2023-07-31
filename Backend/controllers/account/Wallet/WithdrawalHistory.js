const Withdrawals = require("../../../models/Withdrawals");
const Messages = require("../../../utils/messages");

const WithdrawalHistory = async (req, res) => {
  try {
    const { userid } = req.body;
    const getWithdrawals = await Withdrawals.find({ userid });
    if (getWithdrawals) {
      return res.status(400).json({ message: Messages.requestFailed });
    }
    return res.status(200).json({ payload: getWithdrawals });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = { WithdrawalHistory };
