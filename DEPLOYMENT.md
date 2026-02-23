# Deployment Guide: Vercel (Frontend) + Render (Backend)

## 1. Deploy Backend to Render (do this first)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click **New** → **Web Service**
4. Connect your GitHub repo
5. Configure:
   - **Name:** `swap-remodeling-api` (or any name - update `js/api-config.js` to match)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
6. Add **Environment Variables**:
   - `EMAIL_USER` = sam@swap-remodeling.com
   - `EMAIL_PASSWORD` = your Gmail app password
7. Click **Create Web Service**
8. Copy your Render URL (e.g. `https://swap-remodeling-api.onrender.com`)

## 2. Update API Config

Edit `js/api-config.js` and replace the Render URL with your actual URL if you used a different app name:

```javascript
var API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'https://YOUR-ACTUAL-RENDER-URL.onrender.com';
```

## 3. Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **Add New** → **Project**
3. Import your GitHub repo
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** (leave empty)
   - **Output Directory:** ./
5. **Important:** Add these to "Include in Build" or ensure these are NOT ignored:
   - index.html, about.html, contact.html, service.html
   - css/, js/, img/, lib/, mail/
6. Click **Deploy**

## 4. Done!

- **Frontend:** Your Vercel URL (e.g. https://your-project.vercel.app)
- **Backend:** Your Render URL (e.g. https://swap-remodeling-api.onrender.com)

The contact forms will send to your Render backend, which emails to Sam@swap-remodeling.com.

### Note for Render Free Tier
Render free instances spin down after 15 minutes of inactivity. The first request after that may take 30-60 seconds to wake up.
