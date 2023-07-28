const Withdrawals = require("../../../models/Withdrawals");

const WithdrawalHistory = async (req, res) => {
  try {
    const { username } = req.headers;
    const id = res.locals.id;
    const get_with = await Withdrawals.find({ username }).lean();
    if (get_with) {
      return res.status(200).json({ with_data: get_with });
    } else {
      return res.status(400).json({ message: "An error occured" });
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "An error occured" });
  }
};

module.exports = { WithdrawalHistory };
