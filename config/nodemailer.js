const nodemailer = require("nodemailer");

const gmailTransporter = nodemailer.createTransport({
    service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "shainakango251@gmail.com",
    pass: "qccgealcgydbrggk",
  },
});
module.exports={gmailTransporter};
