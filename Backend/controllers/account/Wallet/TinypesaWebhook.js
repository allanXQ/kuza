const User = require("../../../models/Users");

const TinypesaWebhook = async (req, res) => {
  const metadata = req.body.Body.stkCallback.CallbackMetadata;
  const stkCallback = req.body.Body.stkCallback;
  try {
    if (stkCallback.ResultCode == 0) {
      console.log(metadata);
      const amount = metadata.Item[0]["Value"];
      const mpesaRef = metadata.Item[1]["Value"];
      const transactionDate = metadata.Item[2]["Value"];
      console.log(amount, mpesaRef, transactionDate, "metadataaaaaaaaaaa");
      const phone = metadata.Item[3]["Value"];
      const PhoneString = phone.toString().slice(3);
      const createDeposit = await Deposit.create({
        phone: PhoneString,
        amount,
        mpesaRef,
        created: transactionDate,
      });
      if (createDeposit) {
        console.log("createeeeeeeeeeeeeeeeee");
      }
      if (!createDeposit) {
        console.log(createDeposit);
        return res.status(400).json({ message: "deposit failed" });
      }
      const phoneNumber = PhoneString;
      const updateAmount = metadata.Item[0]["Value"];
      const user = await User.findOne({ phone: phoneNumber });
      if (!user) {
        console.log("user not found");
        return res.status(400).json({ message: "deposit failed" });
      }
      const currentBalance = user.balance;
      const userUpdate = await User.updateOne(
        { phone: phoneNumber },
        {
          $set: { balance: currentBalance + updateAmount },
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "deposit failed" });
  }
};

module.exports = { TinypesaWebhook };
