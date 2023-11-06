const nodemailer = require("nodemailer");
const mailer = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e54f91138b0863",
      pass: "8e9bb16a8779a2"
    }
  });

module.exports = mailer