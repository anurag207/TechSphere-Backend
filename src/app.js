require("dotenv").config();
//change
const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
const cors = require("cors");
const { eventRouter } = require("../api/v1/router/eventRouter.js");
const { otpRouter } = require("../api/v1/router/otpRouter.js");
const { authRouter } = require("../api/v1/router/authRouter.js");
const { verifyToken } = require("../api/v1/middleware/jwtVerification.js");
require("../config/db.js");
require('../config/nodemailer.js');

const PORT = process.env.port || 1900;

app.get("/", (req, res) => {
  res.send("<h1>Server is running🎉</h1>");
});

app.use(express.json()); //req body parser middleware

app.use(cookieParser()); // req body cookie parser to read cookie from request


// app.use(cors({ origin: "*", credentials: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/api/v1/otp", otpRouter);

app.use('/api/v1/auth',authRouter); 

app.use("/api/v1/events", eventRouter);

app.use(verifyToken); // user authentication using jwt token

app.get("/api/v1/isAuthenticated", (req,res)=>{
  res.json({
      status: "success",
      isAuthenticated :true,
      user: {
          email: req.userInfo.email,
          // name: req.userInfo.name
      }
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}---------`);
});
