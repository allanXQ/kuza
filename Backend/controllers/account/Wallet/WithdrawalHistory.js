const Withdrawals = require("../../../models/Withdrawals");

const WithdrawalHistory = async (req, res) => {
  try {
    const { username } = req.body;
    const getWithdrawals = await Withdrawals.find({ username });
    if (getWithdrawals) {
      return res.status(200).json({ with_data: getWithdrawals });
    } else {
      return res.status(400).json({ message: "An error occured" });
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "An error occured" });
  }
};

module.exports = { WithdrawalHistory };
