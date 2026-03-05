const nodemailer = require("nodemailer");
const mailer_host = process.env.host;
const mailer_port = process.env.port;
const mailer_secure = process.env.secure;
const mailer_user = process.env.user;
const mailer_pass = process.env.pass;

const mailer = nodemailer.createTransport({
  host: mailer_host,
  port: mailer_port,
  secure: mailer_secure,
  auth: {
    user: mailer_user,
    pass: mailer_pass,
  },
});

module.exports = mailer