require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the root-level public directory
app.use(express.static(path.join(__dirname, '../../public')));

// Serve static files from the contact-form-specific public directory
// app.use('/contact-form', express.static(path.join(__dirname, './public')));

// Handle the root route ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/contact.html'));
});

// Contact Form Route
app.post('/features/contact-form/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Email Transporter Configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email Options
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Message from ${name}`,
    text: `You have a new message from:
    Name: ${name}
    Email: ${email}
    Message: ${message}
    
    (This email was sent from your portfolio contact form.)`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


console.log('Current working directory:', process.cwd());
console.log('EMAIL:', process.env.EMAIL);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

/* Website_Portfolio/features/contact-form/server.js */