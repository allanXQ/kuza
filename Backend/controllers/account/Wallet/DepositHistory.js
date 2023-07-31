const MpesaDeposits = require("../../../models/MpesaDeposits");
const Messages = require("../../../utils/messages");

const MpesaDepositHistory = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: Messages.invalidRequest });
    }
    //const phone_ = '254'+phoneNumber
    const phone = parseInt(phoneNumber);
    await MpesaDeposits.find({ phone })
      .then((data) => {
        return res
          .status(200)
          .json({ message: Messages.requestSuccessful, payload: data });
      })
      .catch((error) => {
        return res.status(400).json({ message: "An error occured" });
      });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: Messages.serverError });
  }
};

module.exports = { MpesaDepositHistory };
