const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  auth: { user: "u", pass: "p" },
});
async function sendWelcomeEmail(to) {
  return transporter.sendMail({
    from: "no-reply@example.com",
    to,
    subject: "Welcome!",
    text: "Your account is active.",
  });
}
module.exports = { sendWelcomeEmail };
