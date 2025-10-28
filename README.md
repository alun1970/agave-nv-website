# Agave NV - Coming Soon Website

A modern, responsive "Coming Soon" website for Agave NV, designed to be deployed on Azure Static Web Apps.

## Features

- 🎨 Modern, gradient-based design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast loading with optimized assets
- 🎭 Smooth animations and transitions
- 🔧 Easy to customize and deploy

## Local Development

1. Clone this repository
2. Open `index.html` in your web browser
3. Or serve locally using a simple HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## Azure Deployment

This project is configured for deployment to Azure Static Web Apps using GitHub Actions.

### Prerequisites

1. Azure account with Static Web Apps resource
2. GitHub repository with this code
3. Azure Static Web Apps API token

### Deployment Steps

1. **Create Azure Static Web App:**
   - Go to Azure Portal
   - Create a new Static Web App resource
   - Choose "GitHub" as the source
   - Select your repository and branch (main)

2. **Configure GitHub Secrets:**
   - In your GitHub repository, go to Settings > Secrets and variables > Actions
   - Add a new secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Use the deployment token from your Azure Static Web App

3. **Deploy:**
   - Push changes to the main branch
   - GitHub Actions will automatically build and deploy your site
   - Your site will be available at the provided Azure URL

### Manual Deployment (Alternative)

If you prefer manual deployment:

1. Install Azure CLI
2. Login to Azure: `az login`
3. Deploy: `az staticwebapp deploy --name <your-app-name> --source .`

## Customization

### Logo
The logo is an inline SVG in `index.html`. You can replace it with your own logo by:
- Modifying the SVG code in the `.logo` element
- Or replacing with an image file and updating the CSS

### Colors and Styling
Edit `styles.css` to customize:
- Color scheme (gradients, text colors)
- Typography (fonts, sizes)
- Layout and spacing
- Animations

### Content
Update `index.html` to change:
- Company name
- Coming soon message
- Contact information
- Additional content

## File Structure

```
agave-nv/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── staticwebapp.config.json # Azure Static Web Apps config
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml # GitHub Actions workflow
└── README.md               # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.
# agave-nv-website
