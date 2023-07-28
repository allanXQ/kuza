const MpesaDeposit = async (req, res) => {
  const { phone, amount } = req.body;
  if (!phone) {
    return res.status(400).json({ message: "Fill in all requires values" });
  }
  if (!amount) {
    return res.status(400).json({ message: "Fill in all requires values" });
  }

  const min_deposit = 100;
  const max_deposit = 500;
  if (parseInt(amount) < min_deposit) {
    return res.status(400).json({
      message: `minimum deposit is ${min_deposit}`,
    });
  }

  if (parseInt(amount) > max_deposit) {
    return res.status(400).json({
      message: `maximum deposit is ${max_deposit}`,
    });
  }
  const url = " https://tinypesa.com/api/v1/express/initialize";
  try {
    await axios({
      method: "post",
      url: url,
      data: {
        amount: amount,
        msisdn: phone,
      },
      headers: {
        Apikey: process.env.TINYPESA_KEY,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status == 200) {
        res.status(200).json({
          message: "STK push sent.Input pin to complete transaction",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Request failed. Try again" });
  }
};

module.exports = { MpesaDeposit };
