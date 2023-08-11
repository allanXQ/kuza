const withdrawals = require("../../../models/withdrawals");
const Messages = require("../../../utils/messages");

const withdrawalHistory = async (req, res) => {
  try {
    const { userid } = req.body;
    const getWithdrawals = await withdrawals.find({ userid });

    return res
      .status(200)
      .json({ message: Messages.requestSuccessful, payload: getWithdrawals });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = { withdrawalHistory };
