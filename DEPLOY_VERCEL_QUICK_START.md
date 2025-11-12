# Vercel Deployment - Quick Start (5 Minutes)

**Want to deploy to production right now? Follow this quick start guide.**

## Prerequisites Check (1 minute)

```bash
# Verify local setup
npm install          # ✅ Dependencies installed
npm test            # ✅ All tests pass
npm run validate    # ✅ All prompts valid
npm run build       # ✅ Build succeeds
```

**All green? Let's deploy! ⚡**

## Deploy in 3 Steps (4 minutes)

### Step 1: Sign Up (1 minute)

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel
5. ✅ Done - you're in!

### Step 2: Import Project (2 minutes)

1. Click **"New Project"**
2. Click **"Select a Git Repository"**
3. Search for **"ai-prompt-vault"**
4. Click **"Import"**

**Configure environment variables:**

Add these in the "Environment Variables" section:

```
NEXT_PUBLIC_SITE_URL=https://ai-prompt-vault.vercel.app
NODE_ENV=production
ENABLE_SEARCH=true
ENABLE_ANALYTICS=true
```

5. Click **"Deploy"**
6. ✅ Deploying...

### Step 3: Verify (1 minute)

Wait for the green checkmark "✓ Domains Ready"

Click your production URL and verify:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ No console errors
- ✅ Search bar visible

**🎉 You're live in production!**

---

## Your Production URLs

```
Production: https://ai-prompt-vault.vercel.app
(or whatever project name you chose)
```

## Update Your Code

From now on, updating is automatic:

```bash
# Make changes
git add .
git commit -m "feat: Add new prompt"
git push origin main

# Vercel automatically:
# 1. Runs tests
# 2. Builds the app
# 3. Deploys to production
# 🚀 Done!
```

## Add a Custom Domain (Optional)

1. Go to Vercel Dashboard → **Settings**
2. Click **"Domains"**
3. Add your domain (e.g., `prompts.example.com`)
4. Follow DNS instructions
5. Update environment variable if needed

## What's Next?

- ✅ Share your production URL
- ✅ Add to your website
- ✅ Start adding more prompts
- ✅ Monitor in Vercel dashboard

## Troubleshooting

**Deployment failed?**
- Check build logs in Vercel dashboard
- Run `npm run build` locally to see error
- Fix and push again - auto-redeploy happens

**Environment variables not working?**
- Verify in Project Settings → Environment Variables
- Redeploy after changing variables

**Need help?**
- Read full guide: [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)
- Check [vercel.com/docs](https://vercel.com/docs)

---

**That's it! Your AI Prompt Library is now live on Vercel! 🚀**

Learn more in [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)
