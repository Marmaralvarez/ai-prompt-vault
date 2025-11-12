# Deployment Guide

Complete guide for deploying the AI Prompt Library to various platforms.

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass: `npm run validate`
- [ ] Build succeeds: `npm run build`
- [ ] No lint errors: `npm run lint`
- [ ] Health check passes: `npm run health-check`
- [ ] All prompts are set to "published" status
- [ ] Git is clean: `git status` shows no changes

## Local Development

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Available Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run validate     # Validate all prompts
npm run export:all   # Export to all formats
npm run health-check # Run system health check
npm run analytics    # Generate analytics report
npm test             # Run tests
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications.

#### Setup

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
# First deployment
vercel

# Subsequent deployments
vercel --prod
```

3. **Configure Environment:**
   - Set `NEXT_PUBLIC_SITE_URL` in Vercel dashboard
   - Add any custom environment variables

4. **Verify:**
   - Your site is live at `https://[project].vercel.app`
   - All pages load correctly
   - Search and exports work

### Option 2: Netlify

#### Setup

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Create `netlify.toml` in root:**
```toml
[build]
command = "npm run build"
publish = ".next"

[dev]
command = "npm run dev"
port = 3000

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

3. **Deploy:**
```bash
netlify deploy --prod
```

4. **Configure Environment:**
   - Set environment variables in Netlify dashboard
   - Configure build settings if needed

### Option 3: GitHub Pages

#### Setup

1. **Update `next.config.mjs`:**
```javascript
const nextConfig = {
  output: 'export',
  // ... other config
}
```

2. **Build and deploy:**
```bash
npm run build
npx gh-pages -d out
```

3. **Configure GitHub:**
   - Go to Settings → Pages
   - Select `gh-pages` branch as source

### Option 4: Self-Hosted (Docker)

#### Prerequisites

- Docker installed
- Docker Compose installed (optional)

#### Build Docker Image

```bash
# Build image
docker build -t ai-prompt-vault:latest .

# Run container
docker run -p 3000:3000 ai-prompt-vault:latest
```

#### Using Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_SITE_URL: http://localhost:3000
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

#### Using Docker with Nginx

Create `nginx.conf`:

```nginx
upstream app {
  server app:3000;
}

server {
  listen 80;
  server_name _;

  gzip on;
  gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;

  location / {
    proxy_pass http://app;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}
```

### Option 5: AWS

#### Using AWS Amplify

1. **Connect GitHub repository**
2. **Configure build settings:**
   - Build command: `npm run build`
   - Base directory: `.next`
3. **Deploy**

#### Using AWS Lambda + API Gateway

1. **Install Serverless Framework:**
```bash
npm install -g serverless
```

2. **Deploy:**
```bash
serverless deploy
```

### Option 6: Google Cloud Run

```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT-ID/ai-prompt-vault

# Deploy
gcloud run deploy ai-prompt-vault \
  --image gcr.io/PROJECT-ID/ai-prompt-vault \
  --platform managed \
  --region us-central1
```

### Option 7: Azure

1. **Create Azure App Service**
2. **Connect GitHub repository**
3. **Configure deployment settings:**
   - Runtime: Node.js 18
   - Build command: `npm run build`
   - Startup command: `npm start`

## Environment Variables

### Development (.env.local)

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Production (.env.production)

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

## Post-Deployment

### Verification Checklist

- [ ] Site is accessible at your domain
- [ ] All pages load without errors
- [ ] Search functionality works
- [ ] Exports can be downloaded
- [ ] Navigation works correctly
- [ ] Mobile layout looks good
- [ ] No console errors
- [ ] Analytics tracking works

### Performance Optimization

```bash
# Check build size
npm run build -- --analyze

# Monitor performance
npm run health-check
```

### Monitoring

#### Health Endpoint

```bash
curl https://your-domain.com/health
```

#### Check Logs

- **Vercel:** View in dashboard
- **Netlify:** View in dashboard
- **Docker:** `docker logs [container-id]`
- **Self-hosted:** Check application logs

## Updating After Deployment

### New Prompt Deployment

1. **Add/edit prompt files:**
```bash
git add docs/prompts/[type]/[name].md
```

2. **Commit:**
```bash
git commit -m "feat: Add new prompt"
```

3. **Push:**
```bash
git push origin main
```

4. **Automatic deployment:**
   - CI/CD runs validation
   - Build verifies
   - Deployment updates automatically

### Dependencies Update

```bash
# Update dependencies
npm update

# Install new dependencies
npm install [package]

# Commit
git add package.json package-lock.json
git commit -m "chore: Update dependencies"

# Push
git push origin main
```

## Troubleshooting

### Build Fails

**Error:** `Command 'npm run build' failed`

**Solution:**
1. Run locally: `npm run build`
2. Check errors in output
3. Fix issues
4. Commit and push

### Site Not Loading

**Error:** `502 Bad Gateway` or `Connection refused`

**Solution:**
1. Check deployment logs
2. Verify environment variables are set
3. Ensure build succeeded
4. Check application is running

### Exports Not Working

**Error:** Export files return 404

**Solution:**
1. Verify exports were generated: `npm run export:all`
2. Check file paths in configuration
3. Ensure data directory is accessible
4. Rebuild and redeploy

## Performance Optimization

### Caching

Enable browser caching for static assets:

```javascript
// next.config.mjs
headers: [
  {
    source: '/static/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
]
```

### Compression

Enable gzip compression (automatic in Next.js):

```javascript
compress: true
```

### Image Optimization

Use Next.js Image component for images.

## Security

### Headers

```javascript
// next.config.mjs
headers: [
  {
    source: '/:path*',
    headers: [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
    ],
  },
]
```

### HTTPS

Always use HTTPS in production:

- Vercel: Automatic
- Netlify: Automatic
- Self-hosted: Use Let's Encrypt or similar

### Environment Secrets

Never commit `.env.production.local`:

```bash
# Add to .gitignore
.env.production.local
```

Use platform-specific secret management.

## Monitoring & Maintenance

### Regular Tasks

**Daily:**
- Check error logs
- Verify site is accessible

**Weekly:**
- Review analytics
- Check performance metrics
- Update dependencies if needed

**Monthly:**
- Full security audit
- Backup data
- Update documentation

### Rollback Procedure

If something breaks:

```bash
# Check commit history
git log --oneline

# Revert to previous commit
git revert [commit-hash]

# Or reset to previous tag
git reset --hard v1.0.0

# Force push (use with caution)
git push origin main --force
```

## Cost Optimization

### Vercel
- Free tier for hobby projects
- $20/month Pro for production
- Auto-scaling included

### Netlify
- Free tier available
- $19/month Pro
- Good for static + serverless

### Docker/Self-Hosted
- Costs depend on hosting provider
- Linode: $5-40/month
- DigitalOcean: $4-24/month

## Migration Checklist

If migrating to a new platform:

1. [ ] Export all data
2. [ ] Set up new environment
3. [ ] Deploy to new platform
4. [ ] Verify all features work
5. [ ] Update DNS if needed
6. [ ] Monitor for 24 hours
7. [ ] Decommission old platform

---

**Deployment complete! 🚀**

For questions or issues, check the troubleshooting section or open an issue on GitHub.
