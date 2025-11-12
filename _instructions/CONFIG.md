# Phase 2: Configuration & Metadata Schema - Detailed Instructions

**Duration:** 2-3 hours  
**Objective:** Configure Fumadocs, Next.js, validation schemas, and metadata  
**Success Criteria:** `npm run build` succeeds, no TypeScript errors, all configs valid

---

## Step 1: Fumadocs Configuration

### 1.1 Create/Update fumadocs.config.ts

**File: `fumadocs.config.ts`**

```typescript
import { defineConfig } from 'fumadocs-mdx/config'
import { remarkDocGen } from 'fumadocs-docgen'

export default defineConfig({
  // Last modified time from git
  lastModifiedTime: 'git',
  
  // Documentation source directory
  docs: {
    dir: 'docs',
  },

  // MDX configuration
  mdx: {
    remarkPlugins: [
      [
        remarkDocGen,
        {
          generators: [
            {
              name: 'openapi',
              output: './data/openapi.json',
              config: {},
            },
          ],
        },
      ],
    ],
  },

  // Search configuration
  search: {
    provider: 'static',
    options: {
      type: 'static',
    },
  },

  // OpenAPI integration (optional, for API docs)
  openapi: [
    {
      input: './data/openapi.json',
      output: './docs/api/reference',
    },
  ],
})
```

**Verification:**
```bash
# Check file exists and valid TypeScript
npx tsc --noEmit fumadocs.config.ts

# Expected: No errors
```

---

## Step 2: Next.js Configuration

### 2.1 Update next.config.ts

**File: `next.config.ts`**

```typescript
import { withFumadocs } from 'fumadocs-core/next-plugin'
import withMDX from '@next/mdx'

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    jsx: true,
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // Image optimization
  images: {
    unoptimized: false,
  },

  // Headers for security
  async headers() {
    return [
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
  },

  // Redirects for legacy URLs
  async redirects() {
    return []
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
}

export default withFumadocs(withMDXConfig(nextConfig))
```

**Verification:**
```bash
# Validate Next.js config
npx next config

# Expected: Shows merged configuration
```

---

## Step 3: Sidebar Navigation Structure

### 3.1 Create docs/prompts/_meta.ts

**File: `docs/prompts/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Prompts',
    description: 'Complete AI prompt library',
    icon: '📚',
  },
  {
    title: 'Agents',
    icon: '🤖',
  },
  {
    title: 'Features',
    icon: '✨',
  },
  {
    title: 'Rules & Standards',
    icon: '📋',
  },
  {
    title: 'Packs',
    icon: '📦',
  },
  {
    title: 'System Instructions',
    icon: '⚙️',
  },
]
```

### 3.2 Create docs/prompts/agents/_meta.ts

**File: `docs/prompts/agents/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Agents',
    description: 'Autonomous AI agents for complex tasks',
  },
]
```

### 3.3 Create docs/prompts/features/_meta.ts

**File: `docs/prompts/features/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Features',
    description: 'Feature implementation and enhancement prompts',
  },
]
```

### 3.4 Create docs/prompts/rules/_meta.ts

**File: `docs/prompts/rules/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Rules & Standards',
    description: 'Coding standards, best practices, and guidelines',
  },
  {
    title: 'Coding Standards',
    icon: '💻',
  },
  {
    title: 'Security',
    icon: '🔐',
  },
]
```

### 3.5 Create docs/prompts/rules/coding-standards/_meta.ts

**File: `docs/prompts/rules/coding-standards/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Coding Standards',
    description: 'Framework-specific coding guidelines and conventions',
  },
]
```

### 3.6 Create docs/prompts/rules/security/_meta.ts

**File: `docs/prompts/rules/security/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Security',
    description: 'Security standards, compliance, and audit checklists',
  },
]
```

### 3.7 Create docs/prompts/packs/_meta.ts

**File: `docs/prompts/packs/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Prompt Packs',
    description: 'Curated collections of related prompts',
  },
]
```

### 3.8 Create docs/prompts/system-instructions/_meta.ts

**File: `docs/prompts/system-instructions/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'System Instructions',
    description: 'System-level instructions and behavioral directives',
  },
]
```

### 3.9 Create docs/guides/_meta.ts

**File: `docs/guides/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Guides',
    description: 'Documentation and usage guides',
  },
]
```

### 3.10 Create docs/libraries/_meta.ts

**File: `docs/libraries/_meta.ts`**

```typescript
import type { Meta } from 'fumadocs-core/source'

export const meta: Meta[] = [
  {
    title: 'Component Library',
    description: 'Reusable prompt components and snippets',
  },
  {
    title: 'Components',
    icon: '🧩',
  },
  {
    title: 'Snippets',
    icon: '✂️',
  },
]
```

**Verification:**
```bash
# Check all _meta.ts files created
find docs -name "_meta.ts" -type f | wc -l

# Expected: 10 files
```

---

## Step 4: Zod Validation Schemas

### 4.1 Create tools/schemas/prompt-schema.ts

**File: `tools/schemas/prompt-schema.ts`**

```typescript
import { z } from 'zod'

/**
 * Zod schema for validating prompt frontmatter and structure
 */

export const AuthorSchema = z.object({
  name: z.string().min(2, 'Author name required'),
  email: z.string().email().optional(),
  url: z.string().url().optional(),
  avatar: z.string().url().optional(),
})

export const TechStackSchema = z.object({
  framework: z.string().optional(),
  database: z.string().optional(),
  service: z.string().optional(),
  language: z.string().optional(),
})

export const PromptMetadataSchema = z.object({
  // Required fields
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(250, 'Description must be less than 250 characters'),

  type: z.enum(['agent', 'feature', 'pack', 'prompt', 'rule'], {
    errorMap: () => ({ message: 'Invalid prompt type' }),
  }),

  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case'),

  // Status and versioning
  status: z.enum(['published', 'draft', 'deprecated', 'archived']).default('draft'),

  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'Version must be semantic (e.g., 1.0.0)'),

  // Timestamps
  created: z.string().datetime().optional(),
  last_updated: z.string().datetime().optional(),

  // Author information
  author: AuthorSchema,

  // Classification
  tags: z
    .array(z.string().min(2).max(50))
    .min(2, 'At least 2 tags required')
    .max(10, 'Maximum 10 tags allowed'),

  categories: z
    .array(z.string())
    .min(1, 'At least one category required')
    .optional(),

  // Usage information
  use_cases: z
    .array(z.string())
    .min(1, 'At least one use case required')
    .optional(),

  // Technical details
  model_compatibility: z
    .array(z.string())
    .optional()
    .default(['claude-opus-4.1', 'claude-sonnet-4.5']),

  tech_stack: TechStackSchema.optional(),

  // Relations
  related_prompts: z
    .array(z.string())
    .optional(),

  // Difficulty and cost
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  
  estimated_tokens: z
    .number()
    .int()
    .positive('Token count must be positive')
    .optional(),

  cost_tier: z.enum(['low', 'medium', 'high']).optional(),
})

/**
 * Schema for prompt content validation
 */
export const PromptContentSchema = z.object({
  frontmatter: PromptMetadataSchema,
  body: z.string().min(50, 'Content must be at least 50 characters'),
})

/**
 * Schema for the master prompts registry
 */
export const PromptRegistryEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: z.enum(['agent', 'feature', 'pack', 'prompt', 'rule']),
  path: z.string(),
  status: z.enum(['published', 'draft', 'deprecated', 'archived']),
  tags: z.array(z.string()),
  platforms: z.array(z.string()).optional(),
  version: z.string(),
  created: z.string(),
  lastModified: z.string(),
  author: z.string(),
  estimatedTokens: z.number().optional(),
  relatedPrompts: z.array(z.string()).optional(),
})

export const PromptRegistrySchema = z.object({
  version: z.string(),
  lastUpdated: z.string(),
  prompts: z.array(PromptRegistryEntrySchema),
})

/**
 * Helper functions for validation
 */
export function validatePromptMetadata(data: unknown) {
  const result = PromptMetadataSchema.safeParse(data)
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      valid: false,
      errors,
    }
  }
  return {
    valid: true,
    data: result.data,
  }
}

export function validatePromptContent(data: unknown) {
  return PromptContentSchema.safeParse(data)
}

export function validateRegistry(data: unknown) {
  return PromptRegistrySchema.safeParse(data)
}

// Type exports for use in other modules
export type Author = z.infer<typeof AuthorSchema>
export type TechStack = z.infer<typeof TechStackSchema>
export type PromptMetadata = z.infer<typeof PromptMetadataSchema>
export type PromptContent = z.infer<typeof PromptContentSchema>
export type PromptRegistryEntry = z.infer<typeof PromptRegistryEntrySchema>
export type PromptRegistry = z.infer<typeof PromptRegistrySchema>
```

**Verification:**
```bash
# Test the schema
npx ts-node -e "
import { validatePromptMetadata } from './tools/schemas/prompt-schema'
const result = validatePromptMetadata({
  title: 'Test Prompt',
  description: 'This is a test description',
  type: 'agent',
  slug: 'test-prompt',
  version: '1.0.0',
  author: { name: 'Test' },
  tags: ['test', 'demo']
})
console.log(result)
"

# Expected: valid: true
```

---

## Step 5: Frontmatter Template

### 5.1 Create Frontmatter Documentation

**File: `data/templates/frontmatter-template.yaml`**

```yaml
# REQUIRED FIELDS
title: "Your Prompt Title (5-100 characters)"
description: "Brief description of what this prompt does (10-250 characters)"
type: "agent"  # Options: agent, feature, pack, prompt, rule
slug: "your-prompt-slug"  # Kebab-case, matches filename
version: "1.0.0"  # Semantic versioning

# AUTHOR INFORMATION
author:
  name: "Your Name or Team Name"
  email: "email@example.com"  # Optional
  url: "https://your-site.com"  # Optional
  avatar: "https://url-to-avatar"  # Optional

# CLASSIFICATION
tags:
  - "primary-category"  # e.g., security
  - "secondary-category"  # e.g., auditing
  - "specific-detail"  # e.g., owasp-top-10
  # Minimum 2, maximum 10 tags

# OPTIONAL FIELDS
status: "published"  # Options: published, draft, deprecated, archived
created: "2025-01-11T00:00:00Z"  # ISO 8601 format
last_updated: "2025-01-11T12:00:00Z"  # ISO 8601 format

# CATEGORIZATION
categories:
  - "Security & Compliance"
  - "Infrastructure"

use_cases:
  - "Pre-deployment security review"
  - "Compliance audit (SOC2, ISO27001)"
  - "Risk assessment"

# TECHNICAL DETAILS
model_compatibility:
  - "claude-opus-4.1"
  - "claude-sonnet-4.5"

tech_stack:
  framework: "react-19"
  database: "postgresql"
  service: "aws"

# RELATIONSHIPS
related_prompts:
  - "security-audit-web"
  - "compliance-mapping"

# ADDITIONAL METADATA
difficulty: "advanced"  # Options: beginner, intermediate, advanced
estimated_tokens: 2500  # Approximate token count
cost_tier: "high"  # Options: low, medium, high
platforms:
  - "claude"
  - "chatgpt"
```

---

## Step 6: Master Prompts Registry

### 6.1 Create data/prompts.json

**File: `data/prompts.json`**

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-01-11T00:00:00Z",
  "description": "Master registry of all prompts in the library",
  "prompts": []
}
```

### 6.2 Create Registry Update Script

**File: `tools/scripts/update-registry.ts`**

```typescript
import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import matter from 'gray-matter'
import { PromptMetadataSchema, PromptRegistrySchema } from '../schemas/prompt-schema'

/**
 * Scan all prompt files and update the master registry
 */
export async function updateRegistry(docsDir: string = 'docs') {
  const registry = {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    prompts: [] as any[],
  }

  // Find all markdown files in prompts directory
  const promptsDir = path.join(docsDir, 'prompts')
  
  async function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        await scanDirectory(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const { data, content: body } = matter(content)
        
        // Validate frontmatter
        const validation = PromptMetadataSchema.safeParse(data)
        
        if (!validation.success) {
          console.error(`Invalid frontmatter in ${fullPath}:`, validation.error.flatten())
          continue
        }
        
        const metadata = validation.data
        
        registry.prompts.push({
          id: metadata.slug,
          title: metadata.title,
          slug: metadata.slug,
          type: metadata.type,
          path: path.relative(docsDir, fullPath),
          status: metadata.status,
          tags: metadata.tags,
          version: metadata.version,
          created: metadata.created || new Date().toISOString(),
          lastModified: metadata.last_updated || new Date().toISOString(),
          author: metadata.author.name,
          estimatedTokens: metadata.estimated_tokens,
          relatedPrompts: metadata.related_prompts,
        })
      }
    }
  }
  
  await scanDirectory(promptsDir)
  
  // Validate registry
  const registryValidation = PromptRegistrySchema.safeParse(registry)
  if (!registryValidation.success) {
    console.error('Registry validation failed:', registryValidation.error)
    process.exit(1)
  }
  
  // Write registry
  fs.writeFileSync(
    path.join(docsDir, '..', 'data', 'prompts.json'),
    JSON.stringify(registry, null, 2)
  )
  
  console.log(`✅ Updated registry with ${registry.prompts.length} prompts`)
  return registry
}

// Run if executed directly
if (require.main === module) {
  updateRegistry().catch(console.error)
}

export default updateRegistry
```

**Add to package.json scripts:**
```json
{
  "scripts": {
    "registry:update": "ts-node tools/scripts/update-registry.ts"
  }
}
```

---

## Step 7: Environment Configuration

### 7.1 Create .env.local

**File: `.env.local`**

```bash
# Fumadocs and Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Features
ENABLE_EXPERIMENTAL_FEATURES=false
ENABLE_SEARCH=true
ENABLE_ANALYTICS=false

# Build
NEXT_PUBLIC_BUILD_TIME=true
```

### 7.2 Create .env.production

**File: `.env.production`**

```bash
# Production Environment
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production

ENABLE_EXPERIMENTAL_FEATURES=false
ENABLE_SEARCH=true
ENABLE_ANALYTICS=true
```

---

## Step 8: TypeScript Paths Configuration

### 8.1 Update tsconfig.json Paths

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/tools/*": ["tools/*"],
      "@/data/*": ["data/*"],
      "@/schemas/*": ["tools/schemas/*"],
      "@/exporters/*": ["tools/exporters/*"],
      "@/scripts/*": ["tools/scripts/*"]
    }
  }
}
```

---

## Step 9: Build and Test Configuration

### 9.1 Create build test script

**File: `tools/scripts/test-config.ts`**

```typescript
import fs from 'fs'
import path from 'path'

/**
 * Test all configuration files are properly set up
 */
export function testConfiguration(): boolean {
  const checks = {
    'fumadocs.config.ts': () => fs.existsSync('fumadocs.config.ts'),
    'next.config.ts': () => fs.existsSync('next.config.ts'),
    'tsconfig.json': () => fs.existsSync('tsconfig.json'),
    'jest.config.js': () => fs.existsSync('jest.config.js'),
    '.env.local': () => fs.existsSync('.env.local'),
    'data/prompts.json': () => fs.existsSync('data/prompts.json'),
    'tools/schemas/prompt-schema.ts': () => fs.existsSync('tools/schemas/prompt-schema.ts'),
    'docs/prompts/_meta.ts': () => fs.existsSync('docs/prompts/_meta.ts'),
  }

  let allPass = true
  
  console.log('\n📋 Configuration Check:\n')
  
  for (const [file, check] of Object.entries(checks)) {
    const exists = check()
    console.log(`${exists ? '✅' : '❌'} ${file}`)
    if (!exists) allPass = false
  }
  
  console.log()
  
  // Test imports
  console.log('📦 Import Tests:\n')
  
  try {
    require('zod')
    console.log('✅ zod')
  } catch {
    console.log('❌ zod')
    allPass = false
  }

  try {
    require('fumadocs-core')
    console.log('✅ fumadocs-core')
  } catch {
    console.log('❌ fumadocs-core')
    allPass = false
  }

  console.log()
  return allPass
}

if (require.main === module) {
  const passed = testConfiguration()
  process.exit(passed ? 0 : 1)
}
```

**Add to package.json:**
```json
{
  "scripts": {
    "config:test": "ts-node tools/scripts/test-config.ts"
  }
}
```

---

## Step 10: Verification and Testing

### 10.1 Run Configuration Tests

```bash
# Test configuration
npm run config:test

# Expected output:
# ✅ fumadocs.config.ts
# ✅ next.config.ts
# ✅ tsconfig.json
# etc.
```

### 10.2 Build Test

```bash
# Build with new configuration
npm run build

# Expected:
# ✓ Compiled successfully
# ✓ Linted successfully
```

### 10.3 Type Check

```bash
# Run TypeScript type check
npx tsc --noEmit

# Expected: No errors
```

### 10.4 Development Server Test

```bash
# Start dev server with new config
npm run dev

# Visit http://localhost:3000
# Navigate around to test sidebar
# Check browser console for errors
```

---

## Step 11: Commit Phase 2

```bash
# Stage all config files
git add fumadocs.config.ts next.config.ts tsconfig.json .env.* 
git add docs/**/_meta.ts
git add tools/schemas/
git add data/prompts.json
git add data/templates/

# Commit
git commit -m "feat: Complete Phase 2 - Configure Fumadocs and validation schemas

- Configure Fumadocs with static search
- Update Next.js configuration for MDX support
- Create sidebar navigation structure (_meta.ts files)
- Define Zod schemas for prompt validation
- Create frontmatter template documentation
- Initialize master prompts registry
- Set up environment configurations
- Create configuration test script"

# Verify
git log --oneline -5
```

---

## Phase 2 Completion Checklist

- [ ] fumadocs.config.ts created and valid
- [ ] next.config.ts configured properly
- [ ] All _meta.ts files created (10 files)
- [ ] Zod schemas defined in tools/schemas/prompt-schema.ts
- [ ] Frontmatter template documented
- [ ] Master prompts.json registry initialized
- [ ] Environment files (.env.local, .env.production) created
- [ ] TypeScript paths configured
- [ ] Configuration test script created
- [ ] npm run config:test passes all checks
- [ ] npm run build succeeds
- [ ] npm run dev works without errors
- [ ] Git commits made
- [ ] No TypeScript errors or warnings

---

## Success Criteria

✅ **Phase 2 Complete when:**

```bash
# Configuration tests pass
npm run config:test
# Shows all ✅ checks

# Build succeeds
npm run build
# Shows "Compiled successfully"

# Dev server works
npm run dev
# Opens on :3000 without errors

# Git tracking
git log --oneline | head -5
# Shows configuration commits
```

---

## Next Steps

When Phase 2 is complete:

1. ✅ Run `npm run config:test`
2. ✅ Run `npm run build`
3. ✅ Test `npm run dev`
4. ✅ Verify all _meta.ts files exist
5. ✅ Report completion status
6. ✅ Proceed to **SCRIPTS.md** for Phase 3

---

## Reference Documentation

- [Fumadocs Configuration](https://fumadocs.dev/docs/headless-cms)
- [Next.js MDX Configuration](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [Zod Documentation](https://zod.dev)
- [YAML Frontmatter Specification](https://jekyllrb.com/docs/front-matter)

**Ready for Phase 2? Follow the steps and report status! 🎯**
