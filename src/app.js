require("dotenv").config();
//change
const express = require("express");
const app = express();
const cors = require("cors");
const { eventcardRouter } = require("../api/v1/router/eventcardRouter.js");
require("../config/db.js");
// const {todoRouter}=require('../api/v1/router/todoRouter.js');
// console.log(Todo);

const PORT = process.env.port || 1900;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // body parser middleware

// it handles request related to TODOs
app.use("/api/v1/eventcard", eventcardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}---------`);
});
