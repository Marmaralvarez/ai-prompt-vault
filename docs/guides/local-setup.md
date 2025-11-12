# Local Development Environment Setup

Complete guide for setting up your development environment.

## System Requirements

### Minimum
- **OS:** macOS, Linux, Windows (WSL2)
- **Node.js:** 18.0.0 or later
- **npm:** 9.0.0 or later
- **Git:** 2.30.0 or later
- **RAM:** 2GB minimum
- **Disk Space:** 2GB for node_modules

### Recommended
- **Node.js:** 20.0.0 or later
- **npm:** 10.0.0 or later
- **RAM:** 4GB or more
- **CPU:** Multi-core processor
- **Editor:** VS Code with extensions

## Installation Steps

### Step 1: Install Node.js

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Windows
1. Download from [nodejs.org](https://nodejs.org)
2. Run the installer
3. Follow the installation wizard
4. Restart your terminal

### Step 2: Verify Installation

```bash
node --version  # Should be v18.0.0 or later
npm --version   # Should be 9.0.0 or later
git --version   # Should be 2.30.0 or later
```

### Step 3: Clone the Repository

```bash
# Clone using HTTPS
git clone https://github.com/your-username/ai-prompt-vault.git
cd ai-prompt-vault

# Or clone using SSH
git clone git@github.com:your-username/ai-prompt-vault.git
cd ai-prompt-vault
```

### Step 4: Install Dependencies

```bash
npm install

# If you encounter peer dependency issues
npm install --legacy-peer-deps
```

### Step 5: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env.local

# Or create manually
echo 'NEXT_PUBLIC_SITE_URL=http://localhost:3000' > .env.local
```

### Step 6: Verify Setup

```bash
# Run health check
npm run health-check

# Should show: Status: ✅ HEALTHY
```

## Development Workflow

### Start Development Server

```bash
npm run dev

# Output will show:
# ▲ Next.js 14.2.33
# - Local: http://localhost:3000
# - Press 'q' to quit

# Open http://localhost:3000 in your browser
```

### Create a New Prompt

```bash
# Create file in appropriate directory
cat > docs/prompts/[type]/my-prompt.md << 'EOF'
---
title: "My Prompt"
description: "What this prompt does"
type: "prompt"
slug: "my-prompt"
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

# My Prompt

## Role
Describe the role...

## Task
Describe the task...
EOF

# Validate
npm run validate
```

### Edit a Prompt

1. Open the `.md` file in your editor
2. Make changes
3. Save the file
4. Dev server auto-reloads
5. Check browser to see changes

### Test Your Changes

```bash
# Validate all prompts
npm run validate

# Run linter
npm run lint

# Build for production
npm run build

# Run tests
npm test
```

## IDE Setup

### VS Code (Recommended)

#### Extensions to Install

1. **Markdown All in One**
   - Better markdown support
   - ID: `yzhang.markdown-all-in-one`

2. **YAML**
   - YAML support for frontmatter
   - ID: `redhat.vscode-yaml`

3. **TypeScript Vue Plugin**
   - TypeScript support
   - ID: `vue.vscode-typescript-vue-plugin`

4. **Prettier**
   - Code formatting
   - ID: `esbenp.prettier-vscode`

5. **ESLint**
   - Linting
   - ID: `dbaeumer.vscode-eslint`

#### Configuration (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "node_modules": true,
    ".next": true,
    "out": true
  }
}
```

## Common Tasks

### Validate All Prompts

```bash
npm run validate

# Output:
# ✅ prompt1.md
# ✅ prompt2.md
# ✨ Valid: 2
# ❌ Invalid: 0
```

### Export to All Formats

```bash
npm run export:all

# Creates files in data/exports/:
# - prompts-claude.json
# - prompts-chatgpt.json
# - prompts-raycast.json
# - prompts-import.csv
# - prompts-bundle.md
```

### Generate Analytics

```bash
npm run analytics

# Shows:
# - Total prompts count
# - Breakdown by type, status, difficulty
# - Tag frequency
# - Token statistics
# - Coverage metrics
```

### Check Health

```bash
npm run health-check

# Verifies:
# - Dependencies installed
# - Build output exists
# - Source files present
# - Configuration files present
# - Prompts found
# - Exports available
# - Git repository
# - Build script configured
```

## Debugging

### Enable Debug Mode

```bash
# Node.js debugging
NODE_OPTIONS='--inspect' npm run dev

# Or in VS Code, use built-in debugger
```

### Check Build Issues

```bash
# Verbose build output
npm run build -- --debug

# Check bundle size
npm run build -- --analyze
```

### View Error Logs

```bash
# Check Next.js logs
npm run dev 2>&1 | grep -i error

# Check validation logs
npm run validate 2>&1
```

### TypeScript Errors

```bash
# Run TypeScript compiler
npx tsc --noEmit

# Find all TS errors
npm run lint
```

## Git Workflow

### Create Feature Branch

```bash
git checkout -b feat/my-feature
```

### Make Changes

```bash
# Edit files
# Test with: npm run validate

git add .
git commit -m "feat: Add my feature"
```

### Push to GitHub

```bash
git push origin feat/my-feature
```

### Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Add description
5. Submit

### Merge When Ready

```bash
# Update main
git checkout main
git pull origin main

# Merge feature
git merge feat/my-feature

# Push
git push origin main
```

## Troubleshooting

### npm install Fails

**Error:** `ERESOLVE unable to resolve dependency tree`

**Solution:**
```bash
npm install --legacy-peer-deps
# OR
npm install --force
```

### Port 3000 Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Node Modules Corrupted

**Error:** `Module not found` or similar errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes Not Showing

**Error:** Dev server doesn't reflect changes

**Solution:**
```bash
# Restart dev server
# Ctrl+C to stop
# npm run dev to restart

# Or clear cache
rm -rf .next
npm run dev
```

### Build Fails

**Error:** `Failed to compile` or TypeScript errors

**Solution:**
```bash
# Check for errors
npm run lint

# Fix formatting issues
npx prettier --write .

# Try building again
npm run build
```

## Performance Tips

### Faster npm Install

```bash
# Use npm ci for exact versions
npm ci

# Or clean install
npm install --omit=dev
```

### Speed Up Build

```bash
# Skip source maps in development
SKIP_SOURCE_MAPS=true npm run build
```

### Optimize Search

- Keep prompt descriptions concise
- Use relevant tags
- Ensure prompts are published

## VS Code Debugging

### Setup

1. Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Next.js Debug",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 9229,
      "console": "integratedTerminal"
    }
  ]
}
```

2. Press F5 to start debugging
3. Set breakpoints and inspect

## Environment Variables

### Development (.env.local)

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
SKIP_ENV_VALIDATION=true
```

### Testing (.env.test)

```bash
NODE_ENV=test
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Git Documentation](https://git-scm.com/doc)

## Getting Help

- Check existing GitHub issues
- Open a new issue with details
- Join discussions
- Contact maintainers

---

**Ready to develop? Start with `npm run dev`! 🚀**
