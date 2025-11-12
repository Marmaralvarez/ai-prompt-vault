# Deploying to Vercel

Complete step-by-step guide for deploying the AI Prompt Library to Vercel.

## Why Vercel?

- ✅ Zero-config Next.js deployment
- ✅ Automatic deployments on git push
- ✅ Global edge network
- ✅ Free tier for hobby projects
- ✅ Built-in analytics and monitoring
- ✅ Automatic SSL/TLS certificates
- ✅ Environment management
- ✅ Git integration (GitHub, GitLab, Bitbucket)

## Prerequisites

- GitHub account with the repository
- Vercel account (free)
- Node.js 18+ installed locally
- All tests passing locally

## Step 1: Verify Local Setup

Before deploying, ensure everything works locally:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Validate prompts
npm run validate

# Build for production
npm run build

# Start production server
npm start
```

All commands should complete without errors.

## Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (recommended)
4. Authorize Vercel to access your GitHub account
5. Verify email if prompted

## Step 3: Connect GitHub Repository

### Option A: Connect During Signup (Recommended)

1. After signing up, Vercel may ask to connect a repository
2. Click "Select a Git Repository"
3. Choose your GitHub organization or personal account
4. Find and select `ai-prompt-vault`
5. Click "Import"

### Option B: Connect From Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Click "Select a Git Repository"
4. Search for `ai-prompt-vault`
5. Click "Import"

## Step 4: Configure Project Settings

### Project Name

- **Name:** `ai-prompt-vault` (or your preferred name)
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./` (default)

### Environment Variables

Add production environment variables:

1. In the Vercel import dialog, expand "Environment Variables"
2. Add the following variables:

```
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NODE_ENV=production
ENABLE_EXPERIMENTAL_FEATURES=false
ENABLE_SEARCH=true
ENABLE_ANALYTICS=true
NEXT_PUBLIC_CSP_ENABLED=true
```

**Note:** Replace `your-project` with your actual Vercel project name.

#### Setting Environment Variables in Vercel Dashboard

If you've already imported the project:

1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable with corresponding value
4. Click "Add"
5. Redeploy to apply changes

#### Environment Variable Reference

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | Your production domain |
| `NODE_ENV` | `production` | Production environment |
| `ENABLE_EXPERIMENTAL_FEATURES` | `false` | Disable experimental features |
| `ENABLE_SEARCH` | `true` | Enable search functionality |
| `ENABLE_ANALYTICS` | `true` | Enable analytics tracking |
| `NEXT_PUBLIC_CSP_ENABLED` | `true` | Enable security headers |

### Build Settings

Vercel automatically detects Next.js and configures:

- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm ci`

These are correct and don't need modification.

## Step 5: Deploy

### Automatic Deployment

Once configured, Vercel will automatically deploy:

1. Click "Deploy"
2. Wait for deployment (typically 1-2 minutes)
3. Vercel will show deployment progress
4. Deployment complete when you see "✓ Domains Ready"

### Monitor Deployment

During deployment:
- Build logs visible in real-time
- Any build errors will be shown
- Deployment status updates automatically

### Deployment URL

After successful deployment, Vercel provides:
- **Production URL:** `https://your-project.vercel.app`
- **Preview URL:** Unique URL for this deployment
- **Git commit link:** Link to GitHub commit

## Step 6: Verify Deployment

### Initial Checks

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Verify the site loads completely
3. Check for console errors (open DevTools: F12)
4. Navigate between pages
5. Test search functionality

### Functional Testing

```bash
# Check homepage
curl -I https://your-project.vercel.app
# Should return: HTTP/1.1 200 OK

# Check specific page
curl https://your-project.vercel.app/guides/getting-started
# Should contain page content
```

### Feature Verification

- [ ] Homepage loads
- [ ] Navigation works
- [ ] All pages load correctly
- [ ] Search bar appears
- [ ] No console errors
- [ ] Images load properly
- [ ] Mobile layout responsive

## Step 7: Configure Custom Domain (Optional)

### Add Your Custom Domain

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Click "Add"
5. Enter your custom domain (e.g., `prompts.example.com`)
6. Follow DNS configuration instructions

### DNS Configuration

Vercel will show you DNS records to add:

**For Nameserver Change (Simplest):**
1. Go to your domain registrar
2. Update nameservers to Vercel's
3. Wait 24-48 hours for propagation

**For CNAME Record:**
1. Go to your domain registrar's DNS settings
2. Add CNAME record pointing to Vercel URL
3. Wait for DNS propagation

### Update Environment Variable

Once custom domain is set up:

1. Go to Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
3. Save
4. Wait for automatic redeployment

## Step 8: Enable Analytics (Optional)

### Vercel Analytics

1. Go to Project Settings
2. Click "Analytics"
3. Enable "Web Analytics"
4. Create analytics token if needed

### Third-Party Analytics (Optional)

You can also add:
- Google Analytics
- Plausible Analytics
- Mixpanel
- Other analytics services

Add these via environment variables or code.

## Step 9: Set Up Monitoring

### Vercel Monitoring

Vercel provides built-in monitoring:

1. Go to Project → "Monitoring"
2. View real-time metrics:
   - Requests
   - Response time
   - Error rate
   - CPU/Memory usage

### Configure Alerts

1. Go to Project Settings
2. Click "Alerts"
3. Set up alerts for:
   - Build failures
   - Deployment errors
   - High error rates
   - Performance issues

### Email Notifications

Vercel sends automatic emails for:
- Deployment success/failure
- Error rate thresholds
- Performance issues

## Step 10: Automate Future Deployments

### Git Push Auto-Deploy

Once connected to GitHub, deployments happen automatically:

```bash
# Make changes
git add .
git commit -m "feat: Add new prompt"
git push origin main
```

**What happens next:**
1. GitHub webhook notifies Vercel
2. Vercel pulls latest code
3. Vercel runs build command
4. Vercel deploys automatically
5. You receive notification

### Deployment Preview (Pull Requests)

For every pull request:
1. Vercel automatically creates preview deployment
2. Unique preview URL generated
3. Preview URL posted as comment on PR
4. Test changes before merging

To preview PR changes:
1. Open PR on GitHub
2. Find Vercel comment
3. Click "Visit Preview"
4. Test the changes

## Workflow: Making Updates

### Standard Update Process

```bash
# 1. Create feature branch
git checkout -b feat/my-changes

# 2. Make changes locally
# - Edit prompts
# - Update documentation
# - Add new features

# 3. Test locally
npm test
npm run validate
npm run build

# 4. Commit and push
git add .
git commit -m "feat: Describe your changes"
git push origin feat/my-changes

# 5. Create Pull Request on GitHub
# - Vercel creates preview deployment
# - Test preview URL
# - Get review approval

# 6. Merge to main
# - Vercel automatically deploys to production
# - Production URL updated
# - Changes live immediately
```

### Adding New Prompts

```bash
# Create prompt file
cat > docs/prompts/[type]/new-prompt.md << 'EOF'
---
title: "New Prompt"
description: "Description"
type: "agent|feature|rule|pack|prompt"
slug: "new-prompt"
status: "draft"
version: "1.0.0"
author:
  name: "Your Name"
tags:
  - tag1
  - tag2
created: "2025-01-15"
lastModified: "2025-01-15"
---

# Content here
EOF

# Validate locally
npm run validate

# Commit and push
git add docs/prompts/[type]/new-prompt.md
git commit -m "feat: Add new prompt - new-prompt"
git push origin feat/new-prompt-name

# Create PR, get approval, merge
# Production deployment happens automatically!
```

## Troubleshooting

### Build Fails on Vercel

**Error:** "Command 'npm run build' failed"

**Solutions:**
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to reproduce
3. Fix issues locally
4. Push fixes to trigger new build

### Environment Variables Not Working

**Issue:** App doesn't use environment variables

**Solutions:**
1. Verify variables in Project Settings
2. Ensure variable names match code
3. Check for typos (case-sensitive)
4. Redeploy after changing variables
5. For `NEXT_PUBLIC_*` variables, rebuild is required

### Performance Issues

**Slow page loads:**

```bash
# Check locally
npm run build
npm start

# If slow locally, optimize code
# If fast locally but slow on Vercel, check:
# 1. Network conditions (DevTools)
# 2. Image optimization
# 3. Bundle size
```

### Deployment Stuck

**If deployment seems stuck:**

1. Check deployment logs
2. Look for errors or warnings
3. Cancel stuck deployment:
   - Go to Deployments
   - Click the stuck deployment
   - Click "Cancel Deployment"
4. Manually trigger new deployment:
   - Go to Deployments
   - Click "Redeploy"

### SSL Certificate Issues

**HTTPS not working:**

1. Vercel auto-generates SSL certificates
2. Wait up to 30 minutes for certificate generation
3. Check "Domains" section in Settings
4. Certificate status should show "Valid"

If issues persist:
1. Remove and re-add domain
2. Clear Vercel cache
3. Contact Vercel support

## Advanced Configuration

### Customize Build Process

Edit `vercel.json` if you need to customize:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci"
}
```

### Configure Routes

For advanced routing, add to `vercel.json`:

```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### Set Node.js Version

Specify Node.js version in `vercel.json`:

```json
{
  "engines": {
    "node": "18.x"
  }
}
```

## Monitoring Production

### Weekly Checks

```bash
# Monitor via Vercel Dashboard
# 1. Check deployments tab
# 2. Review error rate
# 3. Check response times
# 4. Monitor build success rate
```

### Health Checks

```bash
# Check site is accessible
curl -I https://your-project.vercel.app
# Should return 200 OK

# Check specific pages
curl https://your-project.vercel.app/guides/getting-started
```

### View Logs

1. Go to Project → Deployments
2. Click latest deployment
3. View build and function logs
4. Check for warnings or errors

## Cost Considerations

### Free Tier Includes

- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Global edge network
- ✅ Automatic scaling
- ✅ 100 GB bandwidth/month
- ✅ Basic analytics

### When to Upgrade

Consider Pro plan ($20/month) if:
- You need multiple team members
- You need advanced monitoring
- You exceed bandwidth limits
- You need priority support

### Bandwidth Management

For your use case (documentation + prompts):
- Typical usage: 1-10 GB/month
- Free tier covers: 100 GB/month
- No upgrade needed unless popular

## Rollback to Previous Deployment

If something goes wrong:

1. Go to Project → Deployments
2. Find the deployment before the problematic one
3. Click the three dots (⋮)
4. Click "Promote to Production"
5. Vercel redeploys the previous version

**Note:** This doesn't change your code, just production pointer.

## Disconnect from Vercel

If you need to disconnect:

1. Go to Project Settings
2. Scroll to bottom
3. Click "Disconnect Project"
4. Confirm

Your code remains on GitHub, just won't auto-deploy to Vercel anymore.

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images. For best results:
- Use Next.js Image component
- Use modern formats (WebP, AVIF)
- Specify image dimensions

### Code Splitting

Next.js automatically code-splits. Check bundle:

```bash
npm run build
# Check ".next/static/chunks" for bundle breakdown
```

### Caching Strategy

Vercel automatically caches:
- Static files (permanent)
- API responses (configurable)
- Images (30 days by default)

## Security Best Practices

### Protect Sensitive Data

✅ **DO:**
- Store secrets in Environment Variables
- Use `NEXT_PUBLIC_*` only for non-sensitive data
- Rotate API keys regularly
- Use HTTPS only

❌ **DON'T:**
- Commit secrets to GitHub
- Use hardcoded API keys
- Share environment variable files
- Use HTTP in production

### Update Dependencies Regularly

```bash
# Check for updates
npm outdated

# Update securely
npm update
npm audit fix

# Test before deploying
npm test
npm run build
```

## Support and Resources

### Vercel Documentation
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

### Getting Help

1. Check Vercel documentation
2. Review deployment logs
3. Search Vercel community
4. Contact [Vercel Support](https://vercel.com/support)

## Maintenance Schedule

### Daily
- Monitor Vercel dashboard
- Check error rates

### Weekly
- Review deployments
- Check performance metrics
- Monitor bandwidth

### Monthly
- Update dependencies
- Run full test suite
- Backup prompt data
- Review analytics

## Quick Reference

### Common URLs

```
Production: https://your-project.vercel.app
Preview: https://your-project-[branch].vercel.app
Settings: https://vercel.com/projects/your-project/settings
Deployments: https://vercel.com/projects/your-project/deployments
```

### Common Commands

```bash
# Deploy latest from main
git push origin main

# Preview pull request
# Vercel auto-creates preview on PR

# Rollback
# Use Vercel dashboard Deployments tab

# Clear cache
# Go to Deployments → current → Redeploy
```

### Important Files

```
vercel.json              # Vercel configuration
.env.production          # Production environment variables
.env.local               # Local environment variables (git ignored)
next.config.mjs          # Next.js configuration
```

## Success Checklist

- [ ] GitHub account with repository
- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Production URL working
- [ ] All features verified
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)
- [ ] Monitoring alerts set up (optional)

---

**🚀 You're ready to deploy to Vercel!**

The AI Prompt Library will be live in minutes with zero-downtime deployments, automatic scaling, and global edge network coverage.

For questions, check [vercel.com/docs](https://vercel.com/docs) or [Vercel Support](https://vercel.com/support).
