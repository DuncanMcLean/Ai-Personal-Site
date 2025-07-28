# DigitalOcean Deployment Guide

This guide will walk you through deploying your personal website to DigitalOcean using different methods.

## Prerequisites

- A DigitalOcean account (sign up at [digitalocean.com](https://digitalocean.com))
- Your website files ready for deployment
- Basic knowledge of command line (for some methods)

## Method 1: DigitalOcean App Platform (Recommended)

This is the easiest method and perfect for static websites with a simple backend.

### Step 1: Prepare Your Files

1. Make sure all your files are in the project directory:
   ```
   personal-website/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── server.js
   ├── package.json
   ├── README.md
   └── env.example
   ```

2. Customize your website content (see README.md for details)

### Step 2: Deploy to DigitalOcean App Platform

1. **Login to DigitalOcean Dashboard**
   - Go to [cloud.digitalocean.com](https://cloud.digitalocean.com)
   - Sign in to your account

2. **Create a New App**
   - Click "Create" in the top right
   - Select "Apps"
   - Choose "Create App"

3. **Connect Your Source Code**
   - **Option A: GitHub Repository**
     - Click "GitHub" tab
     - Connect your GitHub account if not already connected
     - Select your repository
     - Choose the branch (usually `main` or `master`)
   
   - **Option B: Upload Files**
     - Click "Upload Files" tab
     - Drag and drop your project folder or zip file

4. **Configure Your App**
   - **App Name**: Choose a name for your app (e.g., "my-personal-website")
   - **Region**: Select the closest region to your target audience
   - **Branch**: Select your main branch
   - **Build Command**: Leave empty (for static sites)
   - **Run Command**: `npm start`
   - **HTTP Port**: `3000`

5. **Environment Variables** (Optional)
   - Click "Environment Variables"
   - Add any variables from your `env.example` file
   - For email functionality, add:
     - `EMAIL_USER`: your-email@gmail.com
     - `EMAIL_PASS`: your-app-password

6. **Deploy**
   - Click "Create Resources"
   - Wait for deployment to complete (usually 2-5 minutes)

7. **Access Your Website**
   - Your site will be available at: `https://your-app-name.ondigitalocean.app`
   - You can also add a custom domain later

### Step 3: Custom Domain (Optional)

1. **Add Domain**
   - Go to your app settings
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Configure DNS**
   - Go to your domain registrar
   - Add a CNAME record:
     - Name: `@` or `www`
     - Value: `your-app-name.ondigitalocean.app`

## Method 2: DigitalOcean Droplet

This method gives you full control over your server.

### Step 1: Create a Droplet

1. **Create Droplet**
   - Go to DigitalOcean Dashboard
   - Click "Create" → "Droplets"
   - Choose "Ubuntu 20.04 LTS"
   - Select your preferred plan (Basic $5/month is sufficient)
   - Choose a datacenter region
   - Add your SSH key (recommended) or use password
   - Click "Create Droplet"

2. **Wait for Creation**
   - Droplet creation takes 1-2 minutes
   - Note down your droplet's IP address

### Step 2: Connect to Your Droplet

```bash
# Connect via SSH
ssh root@your-droplet-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

### Step 3: Install Node.js

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 4: Install Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 5: Upload Your Website

```bash
# Create directory for your website
sudo mkdir -p /var/www/personal-website
sudo chown $USER:$USER /var/www/personal-website

# Upload files (from your local machine)
scp -r ./* root@your-droplet-ip:/var/www/personal-website/
```

### Step 6: Install Dependencies and Start Server

```bash
# Navigate to website directory
cd /var/www/personal-website

# Install dependencies
npm install

# Create environment file
cp env.example .env
nano .env  # Edit with your settings

# Install PM2 for process management
sudo npm install -g pm2

# Start the application
pm2 start server.js --name "personal-website"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Step 7: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/personal-website
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com your-droplet-ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/personal-website /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Step 9: SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add this line: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Method 3: Using DigitalOcean Spaces (Static Only)

If you only need the frontend (no contact form backend):

1. **Create a Space**
   - Go to DigitalOcean Dashboard
   - Click "Create" → "Spaces"
   - Choose a region and name

2. **Upload Files**
   - Upload `index.html`, `styles.css`, and `script.js`
   - Set `index.html` as the default document

3. **Access Your Site**
   - Your site will be available at: `https://your-space-name.region.digitalocean.com`

## Troubleshooting

### Common Issues

1. **App Platform Deployment Fails**
   - Check your `package.json` has correct scripts
   - Ensure all dependencies are listed
   - Check environment variables are set correctly

2. **Droplet Connection Issues**
   - Verify your SSH key is added to DigitalOcean
   - Check firewall settings
   - Ensure the droplet is running

3. **Website Not Loading**
   - Check if the server is running: `pm2 status`
   - Check Nginx status: `sudo systemctl status nginx`
   - Check logs: `pm2 logs personal-website`

4. **Contact Form Not Working**
   - Verify the backend is running
   - Check browser console for errors
   - Ensure environment variables are set

### Useful Commands

```bash
# Check server status
pm2 status
pm2 logs personal-website

# Restart services
pm2 restart personal-website
sudo systemctl restart nginx

# Check Nginx configuration
sudo nginx -t

# View logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Cost Estimation

- **App Platform**: $5-12/month (depending on resources)
- **Droplet**: $5-12/month (Basic plan)
- **Spaces**: $5/month for 250GB storage

## Next Steps

1. **Customize Content**: Update the website with your information
2. **Add Analytics**: Integrate Google Analytics or similar
3. **SEO Optimization**: Add meta tags and optimize for search engines
4. **Backup Strategy**: Set up regular backups of your data
5. **Monitoring**: Set up uptime monitoring

## Support

- DigitalOcean Documentation: [docs.digitalocean.com](https://docs.digitalocean.com)
- DigitalOcean Community: [digitalocean.com/community](https://digitalocean.com/community)
- GitHub Issues: For code-related problems

---

**Your website is now live! 🎉** 