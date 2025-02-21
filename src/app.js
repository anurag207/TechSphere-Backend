require("dotenv").config();
//change
const express = require("express");
const app = express();
const cors = require("cors");
const { eventcardRouter } = require("../api/v1/router/eventcardRouter.js");
const { otpRouter } = require("../api/v1/router/otpRouter.js");
require("../config/db.js");

const PORT = process.env.port || 1900;

app.get("/", (req, res) => {
  res.send("<h1>Server is running🎉</h1>");
});

app.use(express.json()); //req body parser middleware

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/api/v1/otp", otpRouter);

app.use("/api/v1/eventcard", eventcardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}---------`);
});
