require('dotenv').config();
const axios = require('axios');
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
    const { name, phone, email, message, 'g-recaptcha-response': captcha } = req.body;

    // Verify reCAPTCHA
    if (!captcha) {
        return res.status(400).json({ message: 'Please complete the reCAPTCHA' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format.');
    }


    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY, // Your secret key
                    response: captcha,
                },
            }
        );

        if (!response.data.success) {
            return res.status(400).json({ message: 'reCAPTCHA verification failed' });
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
