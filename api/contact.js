const nodemailer = require('nodemailer');

const RECIPIENT_EMAIL = 'sam@swap-remodeling.com';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, address, email, phone, message } = req.body;

  if (!name || !address || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Missing EMAIL_USER or EMAIL_PASSWORD');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Service Request - ${name}`,
      text: `You have received a new service request from your website.\n\n` +
            `Full Name: ${name}\n` +
            `Address: ${address}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n\n` +
            `Job Description:\n${message}`
    });

    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
