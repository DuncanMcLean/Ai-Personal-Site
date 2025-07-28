#!/bin/bash

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."

# Install wrangler if not already installed
npm install -g wrangler

# Login to Cloudflare (if not already logged in)
wrangler login

# Deploy to Pages
wrangler pages deploy . --project-name=personal-website

echo "Deployment complete!" 