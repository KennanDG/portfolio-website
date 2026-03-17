require('dotenv').config();
const axios = require('axios');
const nodemailer = require('nodemailer');


// Export as a serverless function
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, phone, email, message, 'g-recaptcha-response': captcha } = req.body;

        // Validate reCAPTCHA
        if (!captcha) {
            return res.status(400).json({ message: 'Please complete the reCAPTCHA' });
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        try {
            // Verify reCAPTCHA
            const response = await axios.post(
                `https://www.google.com/recaptcha/api/siteverify`,
                null,
                {
                    params: {
                        secret: process.env.RECAPTCHA_SECRET_KEY, 
                        response: captcha,
                    },
                }
            );

            if (!response.data.success) {
                return res.status(400).json({ message: 'reCAPTCHA verification failed.' });
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
            res.status(200).json({ message: 'Email Sent!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending message. Please try again.' });
        }
    } else {
        // Handle non-POST requests
        res.status(405).json({ message: 'Method not allowed.' });
    }
};


