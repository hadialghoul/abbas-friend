# Contact Form Backend (Node.js)

Emails from both the **Contact** page and **Get A Quote** form on the home page are sent to **Sam@swap-remodeling.com**.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure email:**
   - Copy `.env.example` to `.env`
   - Add your SMTP credentials (Gmail example below)

   **Gmail:**
   - Enable 2-Factor Authentication on your Google account
   - Create an [App Password](https://myaccount.google.com/apppasswords)
   - Use that App Password in `EMAIL_PASSWORD`

   ```env
   PORT=3000
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

3. **Run the server:**
   ```bash
   npm start
   ```

4. **Open the site:** http://localhost:3000

## API Endpoints

- `POST /api/contact` – Contact form (contact.html)
- `POST /api/quote` – Quote form (index.html)

## Deployment

For production, deploy the Node.js app to a service like:
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

Set `EMAIL_USER` and `EMAIL_PASSWORD` as environment variables in your hosting dashboard.
