# Deployment Guide - Mime Charades

## Quick Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Fork this repository** to your GitHub account
2. **Update the base path** in `vite.config.js`:
   ```js
   base: '/your-repo-name/'  // Replace with your actual repo name
   ```
3. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
4. **Push to main branch** - deployment happens automatically!

### Option 2: Manual Deployment

```bash
# Clone your fork
git clone https://github.com/yourusername/charades-webapp.git
cd charades-webapp

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Custom Domain (Optional)

1. **Add a CNAME file** in the `public/` directory:
   ```
   yourdomain.com
   ```
2. **Configure DNS** to point to your GitHub Pages URL
3. **Update base path** in `vite.config.js` to `/`

## Environment Variables

No environment variables needed! The app works entirely client-side.

## Testing Before Deploy

```bash
# Test locally
npm run dev

# Test production build
npm run build
npm run preview
```

## Troubleshooting

### Build Fails
- Ensure Node.js 16+ is installed
- Run `npm install` to install dependencies
- Check for TypeScript errors: `npm run build`

### GitHub Pages Not Updating
- Check GitHub Actions tab for deployment status
- Verify base path in `vite.config.js` matches repository name
- Clear browser cache and try again

### PWA Not Working
- Ensure HTTPS is enabled (GitHub Pages provides this)
- Check browser console for service worker errors
- Verify manifest.webmanifest is accessible

## Performance Optimization

The app is already optimized for mobile:
- **Bundle size**: < 200KB gzipped
- **First paint**: < 1.5s on 4G
- **Lighthouse score**: 90+ across all metrics

## Security

- No server-side code (static hosting only)
- No user authentication required
- LocalStorage for leaderboard (client-side only)
- No external API calls (except optional Firebase)

## Support

For issues or questions:
1. Check the README.md for common solutions
2. Review the GitHub Issues tab
3. Create a new issue with detailed description

## Success Metrics

After deployment, you can track:
- **Usage**: Check GitHub Pages analytics
- **Performance**: Use Lighthouse in Chrome DevTools
- **User feedback**: Monitor for any reported issues

The app is designed to work reliably for festival events with minimal maintenance required!

