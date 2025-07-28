# Personal Website

A modern, minimalistic personal website built with HTML, CSS, and JavaScript. Perfect for showcasing your professional portfolio, experience, and projects.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Contact Form**: Functional contact form that collects user information
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Interactive Elements**: Hover effects, animations, and visual feedback
- **SEO Friendly**: Proper HTML structure and meta tags

## Sections Included

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About**: Personal information and skills showcase
3. **Experience**: Professional timeline with work history
4. **Projects**: Portfolio of featured projects
5. **Contact**: Contact form and personal information
6. **Footer**: Copyright and additional links

## Customization Guide

### 1. Personal Information

Edit the following in `index.html`:

- **Name**: Replace "Your Name" throughout the file
- **Title**: Update the hero subtitle and page title
- **Description**: Modify the hero description and about section
- **Contact Details**: Update email, phone, and location in the contact section
- **Social Links**: Add your actual social media URLs

### 2. Skills & Technologies

In the About section, update the skill tags to match your expertise:

```html
<div class="skill-tags">
    <span class="skill-tag">Your Skill 1</span>
    <span class="skill-tag">Your Skill 2</span>
    <!-- Add more skills -->
</div>
```

### 3. Experience

Replace the timeline items with your actual work experience:

```html
<div class="timeline-item">
    <div class="timeline-content">
        <h3>Your Job Title</h3>
        <p class="company">Your Company</p>
        <p class="period">Start Date - End Date</p>
        <p>Your job description and achievements</p>
    </div>
</div>
```

### 4. Projects

Update the project cards with your actual projects:

```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-code"></i> <!-- Change icon as needed -->
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Project description</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
        </div>
        <div class="project-links">
            <a href="your-demo-link" class="project-link">Live Demo</a>
            <a href="your-github-link" class="project-link">GitHub</a>
        </div>
    </div>
</div>
```

### 5. Colors & Styling

Modify the color scheme in `styles.css`:

- **Primary Color**: Change `#007bff` to your preferred color
- **Gradient**: Update the hero background gradient
- **Fonts**: Change the Google Fonts import link

### 6. Contact Form

The contact form currently logs data to the console. For production:

1. **Backend Integration**: Connect to a server-side solution (Node.js, PHP, etc.)
2. **Email Service**: Use services like SendGrid, Mailgun, or AWS SES
3. **Form Validation**: Enhanced validation is already included

## Deployment to DigitalOcean

### Option 1: DigitalOcean App Platform (Recommended)

1. **Create a DigitalOcean Account**: Sign up at [digitalocean.com](https://digitalocean.com)

2. **Install DigitalOcean CLI** (optional):
   ```bash
   # For Windows (using Chocolatey)
   choco install doctl
   
   # Or download from: https://github.com/digitalocean/doctl/releases
   ```

3. **Deploy via App Platform**:
   - Go to DigitalOcean Dashboard
   - Click "Create" → "Apps"
   - Connect your GitHub repository or upload files
   - Select "Static Site" as the app type
   - Configure your domain (optional)
   - Deploy

### Option 2: DigitalOcean Droplet

1. **Create a Droplet**:
   - Choose Ubuntu 20.04 LTS
   - Select your preferred plan
   - Add your SSH key

2. **Connect to Your Droplet**:
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

4. **Upload Your Files**:
   ```bash
   # Using SCP
   scp -r ./* root@your-droplet-ip:/var/www/html/
   
   # Or using SFTP client like FileZilla
   ```

5. **Configure Nginx**:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   Replace the content with:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

6. **Enable the Site**:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option 3: Using GitHub Pages (Free Alternative)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "GitHub Pages" section
   - Select "main" branch as source
   - Your site will be available at `https://yourusername.github.io/your-repo`

## File Structure

```
personal-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Optimize Images**: Use WebP format and compress images
2. **Minify CSS/JS**: Use tools like UglifyJS and CSSNano
3. **Enable Gzip**: Configure your server for compression
4. **Use CDN**: Consider using CDN for external resources

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Form Validation**: Server-side validation is essential
3. **CSP Headers**: Implement Content Security Policy
4. **Regular Updates**: Keep dependencies updated

## Support

For issues or questions:
1. Check the browser console for JavaScript errors
2. Validate your HTML at [validator.w3.org](https://validator.w3.org)
3. Test responsiveness using browser dev tools

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🚀** 