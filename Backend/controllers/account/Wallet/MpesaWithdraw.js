const MpesaWithdraw = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Input phone" });
    }
    if (!amount) {
      return res.status(400).json({ message: "Input amount" });
    }
    const min_withdrawal = 0;
    let int_amount = parseInt(amount);
    const id = res.locals.id;
    const get_user = await User.findOne({ userid: id });
    const get_balance = parseInt(get_user.balance);
    const username = get_user.username;
    const tax_amount = int_amount * 0.1;
    const total_amount = int_amount + tax_amount;
    const with_amount = int_amount - tax_amount;

    if (int_amount < min_withdrawal) {
      return res.status(400).json({
        message: `requested amount is less than minimum requirement(${min_withdrawal})`,
      });
    }

    if (int_amount > get_balance) {
      return res.status(400).json({
        message: `your balance of ${get_balance} is less than amount requested(${amount})`,
      });
    }
    if (get_balance < min_withdrawal) {
      return res.status(400).json({
        message: `your balance of ${get_balance} is less than minimum requirement(${min_withdrawal})`,
      });
    }

    if (get_balance - total_amount < 0) {
      res.status(400).json({
        message: `your balance of ${get_balance} is not enough to cover withdrawal amount(${amount}) + commission of ${tax_amount}`,
      });
    }
    const create_withdraw = await Withdraw.create({
      username,
      phone,
      amount: int_amount,
    });
    if (!create_withdraw) {
      return res.status(400).json({ message: "withdrawal failed" });
    }
    const update_user = await User.updateOne(
      { username },
      {
        $set: { balance: get_balance - total_amount },
      }
    );
    res.status(200).json({ message: "withdrawal successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed withdrawal" });
  }
};

module.exports = { MpesaWithdraw };
