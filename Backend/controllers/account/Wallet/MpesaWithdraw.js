const MpesaWithdraw = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Input phone" });
    }
    if (!amount) {
      return res.status(400).json({ message: "Input amount" });
    }
    const minWithdrawal = 0;
    let intAmount = parseInt(amount);
    const id = res.locals.id;
    const getUser = await User.findOne({ userid: id });
    const getBalance = parseInt(getUser.balance);
    const username = getUser.username;
    const taxAmount = intAmount * 0.1;
    const totalAmount = intAmount + taxAmount;
    const withAmount = intAmount - taxAmount;

    if (intAmount < minWithdrawal) {
      return res.status(400).json({
        message: `requested amount is less than minimum requirement(${minWithdrawal})`,
      });
    }

    if (intAmount > getBalance) {
      return res.status(400).json({
        message: `your balance of ${getBalance} is less than amount requested(${amount})`,
      });
    }
    if (getBalance < minWithdrawal) {
      return res.status(400).json({
        message: `your balance of ${getBalance} is less than minimum requirement(${minWithdrawal})`,
      });
    }

    if (getBalance - totalAmount < 0) {
      res.status(400).json({
        message: `your balance of ${getBalance} is not enough to cover withdrawal amount(${amount}) + commission of ${taxAmount}`,
      });
    }
    const createWithdrawal = await Withdraw.create({
      username,
      phone,
      amount: intAmount,
    });
    if (!createWithdrawal) {
      return res.status(400).json({ message: "withdrawal failed" });
    }
    const updateUser = await User.updateOne(
      { username },
      {
        $set: { balance: getBalance - totalAmount },
      }
    );
    res.status(200).json({ message: "withdrawal successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed withdrawal" });
  }
};

module.exports = { MpesaWithdraw };
