# Phase 1: Foundation Setup - Detailed Instructions

**Duration:** 2-3 hours  
**Objective:** Get a working Fumadocs instance with proper project structure  
**Success Criteria:** `npm run dev` starts server on http://localhost:3000

---

## Step 1: Initialize Fumadocs Project

### 1.1 Create Project Directory

```bash
# Create and navigate to project
mkdir ai-prompt-vault
cd ai-prompt-vault
```

### 1.2 Initialize Fumadocs with Create App

```bash
# Use the official Fumadocs starter
npx create-fumadocs-app .

# When prompted, select:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind CSS: Yes
# - Dark mode: Yes
```

**Expected Output:**
```
✔ Created project successfully
✔ Installed dependencies
✔ Ready to start developing
```

### 1.3 Verify Initial Installation

```bash
# Test that dev server works
npm run dev

# Expected: 
# ▲ Next.js 14.x.x
# - Local: http://localhost:3000
```

**Exit dev server:** `Ctrl+C`

---

## Step 2: Create Directory Structure

### 2.1 Create Main Directories

```bash
# Create docs subdirectories
mkdir -p docs/prompts/{agents,features,rules/{coding-standards,security},packs,system-instructions}
mkdir -p docs/{libraries/{components,snippets},guides,api}

# Create data directories
mkdir -p data/{exports,templates}

# Create tools directories
mkdir -p tools/{scripts,exporters,schemas,analytics}

# Create tests directory
mkdir -p tests

# Create GitHub workflows
mkdir -p .github/workflows
```

### 2.2 Create .gitignore

**Create file: `.gitignore`**

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
.next/
out/
build/
dist/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.env.local
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Generated files
*.tsbuildinfo
.turbo/
.eslintcache

# Exports (generated)
data/exports/

# Testing
coverage/
.jest-cache/

# Misc
*.bak
*.tmp
```

---

## Step 3: Initialize Git Repository

```bash
# Initialize git
git init

# Create initial commit
git add .
git commit -m "feat: Initialize Fumadocs project for AI Prompt Library"

# (Optional) Add remote
# git remote add origin https://github.com/your-username/ai-prompt-vault.git
# git branch -M main
# git push -u origin main
```

---

## Step 4: Install Additional Dependencies

### 4.1 Install Required Packages

```bash
npm install --save-dev \
  zod \
  ts-node \
  @types/node \
  jest \
  @types/jest \
  ts-jest \
  typescript

npm install \
  framer-motion
```

### 4.2 Verify Installation

```bash
npm list | grep -E "zod|ts-node|jest" # Should show all packages
```

---

## Step 5: Create Base Configuration Files

### 5.1 Check Existing Configuration

```bash
# List existing config files
ls -la | grep -E "tsconfig|package.json|next"

# Expected files:
# - tsconfig.json (auto-generated)
# - package.json (auto-generated)
# - next.config.ts (auto-generated)
# - fumadocs.config.ts (might need adjustment)
```

### 5.2 Update tsconfig.json

Check that your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5.3 Create jest.config.js

**Create file: `jest.config.js`**

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  collectCoverageFrom: [
    'tools/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

### 5.4 Create jest.setup.js

**Create file: `jest.setup.js`**

```javascript
// Add custom jest matchers
import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
```

---

## Step 6: Create Essential Metadata Files

### 6.1 Create .env.local

**Create file: `.env.local`**

```bash
# Environment Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
ENABLE_EXPERIMENTAL_FEATURES=false
```

### 6.2 Verify Environment

```bash
# Check environment file
cat .env.local

# Should output:
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
# NODE_ENV=development
# ...
```

---

## Step 7: Create README Structure

### 7.1 Create Project README

**Create file: `README.md`**

```markdown
# AI Prompt Library & Documentation Vault

A self-hosted, documentation-first AI Prompt Library built with Fumadocs.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit http://localhost:3000

## Project Structure

- **docs/prompts/** - Prompt library entries
- **data/** - Structured prompt data and exports
- **tools/** - Build scripts, exporters, validators
- **docs/guides/** - Usage documentation

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run validate\` - Validate all prompts
- \`npm run export:all\` - Export to all platforms

## Documentation

See [docs/guides/getting-started.md](docs/guides/getting-started.md) for full documentation.

## License

MIT
```

---

## Step 8: Create Placeholder Pages

### 8.1 Verify app/layout.tsx exists

```bash
# Check if layout file exists
ls -la app/layout.tsx

# If not, check:
ls -la app/
```

### 8.2 Create docs/index.mdx (Landing Page)

**Create file: `docs/index.mdx`**

```mdx
---
title: "AI Prompt Library & Documentation Vault"
description: "Centralized repository for AI prompts, instructions, and coding standards"
---

# AI Prompt Library & Documentation Vault

Welcome to your self-hosted prompt library. Browse, search, and export AI prompts across all your tools.

## Quick Navigation

- **[Prompts](/docs/prompts)** - Browse the complete prompt library
- **[Guides](/docs/guides)** - Learn how to use the library
- **[API](/docs/api)** - Integration and export documentation

## Latest Additions

Check back soon for featured prompts and recent updates.

## Getting Started

1. Browse the [Prompts section](/docs/prompts)
2. Read the [Prompt Anatomy guide](/docs/guides/prompt-anatomy)
3. Learn about [Platform Integration](/docs/guides/platform-integration)

---

*Centralize. Organize. Export. Repeat.*
```

---

## Step 9: Verification & Testing

### 9.1 Full Build Test

```bash
# Clean build
npm run build

# Expected output:
# ▲ Next.js 14.x.x
# ✓ Compiled successfully
# ✓ Linted successfully
# ✓ Created optimized production build
```

### 9.2 Development Server Test

```bash
npm run dev

# Navigate to http://localhost:3000
# Check:
# - Homepage loads ✓
# - Navigation works ✓
# - No console errors ✓
# - Tailwind CSS applied ✓

# Exit: Ctrl+C
```

### 9.3 Check Directory Structure

```bash
# Verify all directories created
find . -type d -name "prompts" -o -name "exporters" -o -name "schemas"

# Should list:
# ./docs/prompts
# ./tools/exporters
# ./tools/schemas
```

---

## Step 10: Commit Initial Setup

```bash
# Stage all new files
git add .

# Commit
git commit -m "feat: Complete Phase 1 - Foundation setup with Fumadocs

- Initialize Fumadocs project with NextJS 14
- Create complete directory structure
- Add TypeScript configuration
- Install core dependencies
- Set up Git repository
- Create README and initial documentation"

# Verify
git log --oneline -5
```

---

## Troubleshooting Phase 1

### Issue: npm install fails

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Dev server won't start

```bash
# Check port 3000 is available
lsof -i :3000

# If something using it, kill the process:
kill -9 <PID>

# Or use different port:
npm run dev -- -p 3001
```

### Issue: TypeScript errors in tsconfig

```bash
# Regenerate tsconfig
npx tsc --init --strict

# Or restore from defaults
rm tsconfig.json
npm run dev # This will regenerate it
```

### Issue: Fumadocs config not found

```bash
# Verify file exists
ls -la fumadocs.config.ts

# If missing, it will be auto-generated.
# If errors, check Fumadocs documentation at https://fumadocs.dev
```

---

## Phase 1 Completion Checklist

- [ ] Fumadocs project initialized
- [ ] All directories created per structure
- [ ] .gitignore configured
- [ ] Git repository initialized
- [ ] Dependencies installed (zod, ts-node, jest, etc.)
- [ ] Environment variables set (.env.local)
- [ ] TypeScript configured
- [ ] Jest configured
- [ ] README created
- [ ] Landing page (docs/index.mdx) created
- [ ] Build completes without errors
- [ ] Dev server runs on :3000
- [ ] Initial commit made to Git
- [ ] No TypeScript errors or warnings

---

## Success Criteria

✅ **Phase 1 Complete when:**

```bash
# Development server works
npm run dev
# Opens http://localhost:3000 ✓

# Build succeeds
npm run build
# Shows "Compiled successfully" ✓

# Git tracking
git log --oneline
# Shows initial commits ✓

# Directory structure
tree -L 2 docs/
# Shows all subdirectories ✓
```

---

## Next Steps

When Phase 1 is complete:

1. ✅ Report completion status
2. ✅ Take git log screenshot
3. ✅ Verify `npm run dev` works one final time
4. ✅ Proceed to **CONFIG.md** for Phase 2

---

## Reference

- [Fumadocs Docs](https://fumadocs.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

**Ready for Phase 1? Execute the commands in order and report back! 🚀**
