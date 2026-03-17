# SRM Portal — Railway Deployment

Single Next.js app with Playwright browser automation for reliable login.

## Project Structure
```
srm-portal/
├── components/
│   └── App.js          ← Frontend (login + dashboard)
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   └── api/
│       └── login.js    ← API route (runs Playwright)
├── lib/
│   └── scraper.js      ← Playwright scraper logic
├── package.json
├── next.config.js
└── railway.toml
```

## Local Development
```bash
npm install
# Install Chromium browser
npx playwright install chromium
npm run dev
```

## Deploy to Railway

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "SRM Portal"
gh repo create srm-portal --private --push
# or: git remote add origin <your-repo-url> && git push -u origin main
```

### Step 2: Deploy on Railway
1. Go to https://railway.app
2. Sign up / log in with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repo
5. Railway auto-detects Next.js and deploys ✅

### Step 3: Set environment (optional)
In Railway dashboard → Variables:
```
NODE_ENV=production
```

Railway automatically sets `$PORT` — our `npm start` uses it.

## How It Works
1. User enters SRM email + password
2. Next.js API route (`/api/login`) launches headless Chromium via Playwright
3. Playwright navigates to `academia.srmist.edu.in`, fills the login form inside the iframe
4. After login, scrapes attendance, marks, timetable from Zoho Creator reports
5. Returns JSON to frontend
6. Dashboard renders the data

## Why Playwright?
Academia uses Zoho IAM which sets critical CSRF tokens via JavaScript.
Simple HTTP fetch cannot execute JS, so Playwright (real browser) is required.
