const mpesaDeposits = require("../../../models/mpesaDeposits");
const Messages = require("../../../utils/messages");

const mpesaDepositHistory = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }

    const depositHistory = await mpesaDeposits.find({ phone });
    return res
      .status(200)
      .json({ message: Messages.requestSuccessful, payload: depositHistory });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = { mpesaDepositHistory };
