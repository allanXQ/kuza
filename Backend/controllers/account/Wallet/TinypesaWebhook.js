const TinypesaWebhook = async (req, res) => {
  const metadata = req.body.Body.stkCallback.CallbackMetadata;
  const stkcallback = req.body.Body.stkCallback;
  try {
    if (stkcallback.ResultCode == 0) {
      console.log(metadata);
      const amount = metadata.Item[0]["Value"];
      const mpesa_ref = metadata.Item[1]["Value"];
      const transaction_date = metadata.Item[2]["Value"];
      console.log(amount, mpesa_ref, transaction_date, "metadataaaaaaaaaaa");
      const phone = metadata.Item[3]["Value"];
      const PhoneString = phone.toString().slice(3);
      const create_deposit = await Deposit.create({
        phone: PhoneString,
        amount,
        mpesa_ref,
        created: transaction_date,
      });
      if (create_deposit) {
        console.log("createeeeeeeeeeeeeeeeee");
      }
      if (!create_deposit) {
        console.log(create_deposit);
        return res.status(400).json({ message: "deposit failed" });
      }
      const phone_number = PhoneString;
      const update_amount = metadata.Item[0]["Value"];
      const user = await User.findOne({ phone: phone_number });
      if (!user) {
        console.log("user not found");
        return res.status(400).json({ message: "deposit failed" });
      }
      console.log(user);
      const curr_balance = user.balance;
      const user_update = await User.updateOne(
        { phone: phone_number },
        {
          $set: { balance: curr_balance + update_amount },
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "deposit failed" });
  }
};

module.exports = { TinypesaWebhook };
