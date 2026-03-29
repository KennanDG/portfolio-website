import nodemailer from 'nodemailer'; 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

type ContactRequestBody = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  captchaToken?: string;
};

dotenv.config();

// console.log(process.env.RECAPTCHA_SECRET_KEY);
// console.log(process.env.EMAIL_PASSWORD);
// console.log(process.env.EMAIL);


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());



app.post('/api/contact', async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  try {
    const { name, phone, email, message, captchaToken }: ContactRequestBody = req.body ?? {};

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Require captcha in production, allow bypass locally while fixing setup
    if (process.env.NODE_ENV === 'production' && !captchaToken) {
      return res.status(400).json({ message: 'Missing reCAPTCHA token.' });
    }

    if (captchaToken) {
      const params = new URLSearchParams();
      params.append('secret', process.env.RECAPTCHA_SECRET_KEY || '');
      params.append('response', captchaToken);

      const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        return res.status(400).json({
          message: 'reCAPTCHA verification failed.',
          errors: verifyResult['error-codes'] ?? [],
        });
      }
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Portfolio Contact Form: ${name}`,
      replyTo: email,
      text: `
You have a new portfolio message.

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}
      `.trim(),
    });

    return res.status(200).json({ message: 'Email sent successfully.' });

  } catch (error) {
    console.error('contact-form error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});