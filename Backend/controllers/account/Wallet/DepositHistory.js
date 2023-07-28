const MpesaDeposits = require("../models/MpesaDeposits");

const MpesaDepositHistory = async (req, res) => {
  try {
    const { phone_number } = req.headers;
    console.log(phone_number);
    const id = res.locals.id;
    //const phone_ = '254'+phone_number
    const phone = parseInt(phone_number);
    const get_dep = await MpesaDeposits.find({ phone }).lean();
    if (get_dep) {
      return res.status(200).json({ get_dep });
    } else {
      return res.status(400).json({ message: "An error occured" });
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "An error occured" });
  }
};

module.exports = { MpesaDepositHistory };
