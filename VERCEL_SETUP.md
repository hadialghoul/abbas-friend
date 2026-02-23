# Vercel Deployment (Frontend + API with SMTP)

Everything runs on Vercel - no need for Railway or Render.

## Deploy Steps

1. Push your code to GitHub.

2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import your repo.

3. **Environment Variables** – Add these in Vercel project settings:
   - `EMAIL_USER` = sam@swap-remodeling.com
   - `EMAIL_PASSWORD` = your Gmail app password

4. Click **Deploy**.

5. Your site will be live at `https://your-project.vercel.app`

## How It Works

- **Static files** (HTML, CSS, JS, images) are served from the root
- **API routes** in `/api/` folder handle contact and quote forms
- **SMTP** (Gmail) works on Vercel serverless – no blocking

## Local Development

**Option A – Express server (full app):**
```bash
npm start
```
Visit http://localhost:3000

**Option B – Vercel dev server:**
```bash
npx vercel dev
```
Visit http://localhost:3000 (simulates Vercel deployment)
