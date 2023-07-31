require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/user/postroutes"));
app.use("/api", require("./routes/user/getroutes"));

const DBconn = async () => {
  return await mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to database");
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

DBconn();
