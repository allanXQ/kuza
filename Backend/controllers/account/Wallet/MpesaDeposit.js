const MpesaDeposit = async (req, res) => {
  const { phone, amount } = req.body;
  if (!phone) {
    return res.status(400).json({ message: "Fill in all requires values" });
  }
  if (!amount) {
    return res.status(400).json({ message: "Fill in all requires values" });
  }

  const minDeposit = 100;
  const maxDeposit = 500;
  if (parseInt(amount) < minDeposit) {
    return res.status(400).json({
      message: `minimum deposit is ${minDeposit}`,
    });
  }

  if (parseInt(amount) > maxDeposit) {
    return res.status(400).json({
      message: `maximum deposit is ${maxDeposit}`,
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
