import { Router } from "express";
const router = Router();

import nodemailer from "nodemailer";

// CONTACT
router.post("/contact", async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.eu",
        port: 465,
        secure: true, 
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.APP_PASSWORD
        },
    });
  
    // mail options
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `Contact form message from ${firstName} ${lastName}`,
      text: message,
    };

      // sending mail
  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

export default router;