# Cloudflare Pages Deployment Guide

## Quick Deploy

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

2. **Deploy via Cloudflare Dashboard**:
   - Visit [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to "Pages" → "Create a project"
   - Choose "Connect to Git"
   - Select your repository
   - Build settings:
     - Framework preset: **None**
     - Build command: (leave empty)
     - Build output directory: (leave empty)
   - Click "Save and Deploy"

### Option 2: Wrangler CLI

1. **Install Wrangler**:
   ```bash
   npm install -g wrangler
   ```

2. **Login**:
   ```bash
   wrangler login
   ```

3. **Deploy**:
   ```bash
   wrangler pages deploy .
   ```

## Custom Domain

After deployment:
1. Go to your Pages project in Cloudflare Dashboard
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as instructed

## Environment Variables

No environment variables needed for this static site.

## File Structure for Deployment

```
├── index.html          # Main page
├── styles.css          # Styles
├── script.js           # JavaScript
├── me.jfif            # Profile image
├── _redirects          # Cloudflare routing
├── wrangler.toml       # Cloudflare config
└── package.json        # Project config
```

## Local Development

For local development, you can still use:
```bash
npm start
```

This will run the Express server locally on port 3000. 