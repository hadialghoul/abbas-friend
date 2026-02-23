const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Recipient email - all form submissions go here
const RECIPIENT_EMAIL = 'sam@swap-remodeling.com';

// From email - use onboarding@resend.dev for testing, or your verified domain
const FROM_EMAIL = process.env.FROM_EMAIL || 'Swap Remodeling <onboarding@resend.dev>';

// Validate Resend API key
if (!process.env.RESEND_API_KEY) {
  console.error('ERROR: Set RESEND_API_KEY in environment variables');
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Contact form endpoint (from contact.html)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, address, email, phone, message } = req.body;

    if (!name || !address || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
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

    if (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Quote form endpoint (from index.html)
app.post('/api/quote', async (req, res) => {
  try {
    const { name, address, email, phone, message } = req.body;

    if (!name || !address || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Get A Quote Request - ${name}`,
      text: `New quote request from your website.\n\n` +
            `Full Name: ${name}\n` +
            `Address: ${address}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n\n` +
            `Job Description:\n${message}`
    });

    if (error) {
      console.error('Quote form error:', error);
      return res.status(500).json({ error: 'Failed to send quote request' });
    }

    res.json({ success: true, message: 'Quote request sent successfully' });
  } catch (error) {
    console.error('Quote form error:', error);
    res.status(500).json({ error: 'Failed to send quote request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Contact form: POST http://localhost:${PORT}/api/contact`);
  console.log(`Quote form: POST http://localhost:${PORT}/api/quote`);
  console.log('Email: Resend ready');
});
