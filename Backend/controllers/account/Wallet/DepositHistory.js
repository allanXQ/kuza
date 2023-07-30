const MpesaDeposits = require("../../../models/MpesaDeposits");

const MpesaDepositHistory = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    //const phone_ = '254'+phoneNumber
    const phone = parseInt(phoneNumber);
    const getDeposit = await MpesaDeposits.find({ phone });
    if (getDeposit) {
      return res.status(200).json({ getDeposit });
    } else {
      return res.status(400).json({ message: "An error occured" });
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "An error occured" });
  }
};

module.exports = { MpesaDepositHistory };
