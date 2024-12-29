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


// Handle the root route ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/contact.html'));
});

// Contact Form Route
app.post('/features/contact-form/contact', async (req, res) => {
    const { name, phone, email, message } = req.body;

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format.');
    }
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
        Phone: ${phone}
        Email: ${email}
        Message: ${message}
        
        (This email was sent from your portfolio contact form.)`,
        replyTo: email,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: 'Email Sent!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error sending message. Please try again'});
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
