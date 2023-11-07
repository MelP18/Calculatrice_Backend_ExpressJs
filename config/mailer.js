const nodemailer = require("nodemailer");
const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gsnmelp@gmail.com",
    pass: "jeokveuuaspcahwo",
  },
});

module.exports = mailer