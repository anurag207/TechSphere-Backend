const mongoose = require("mongoose");
const uri = process.env.DB_MONGO_URL;
const connectionUri = uri.replace(
  "<db_password>",
  process.env.DB_MONGO_PASSWORD
);

mongoose
  .connect(connectionUri, {
    dbName: process.env.MONGO_DB_DATABASE_NAME,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error\n", err);
  });
