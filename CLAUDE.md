# CLAUDE.md - AI Assistant Guide for ai-prompt-vault

**Last Updated:** 2025-12-04
**Version:** 1.0.0
**Repository:** AI Prompt Library & Documentation Vault

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Codebase Structure](#codebase-structure)
4. [Development Workflows](#development-workflows)
5. [Key Conventions](#key-conventions)
6. [Common Tasks](#common-tasks)
7. [Validation & Testing](#validation--testing)
8. [Export System](#export-system)
9. [Git Workflow](#git-workflow)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Purpose

This is a self-hosted, documentation-first AI Prompt Library built with Fumadocs. It centralizes AI prompts, instructions, and coding standards with:
- Version control integration
- Full-text search capabilities
- Multi-platform export (Claude, ChatGPT, Raycast, CSV, Markdown)
- Zod-based validation system
- Static site generation via Next.js

### Core Objectives

- **Single Source of Truth:** All AI prompts are stored as Markdown files with YAML frontmatter
- **Platform Agnostic:** Export to multiple AI platforms using format-specific exporters
- **Type-Safe:** Strict TypeScript with Zod validation schemas
- **Developer-Friendly:** Local development with hot reload, comprehensive tooling
- **CI/CD Ready:** GitHub Actions for validation on every commit

---

## Architecture & Technology Stack

### Framework & Build Tools

- **Framework:** Fumadocs v15+ (built on Next.js 15.3.0)
- **Runtime:** Node.js 18+
- **Language:** TypeScript 5.5+ (strict mode enabled)
- **Build:** Next.js build system with esbuild
- **Package Manager:** npm with --legacy-peer-deps flag

### Core Dependencies

```json
{
  "fumadocs-core": "^15.0.0",
  "fumadocs-mdx": "^13.0.0",
  "fumadocs-ui": "^15.8.5",
  "next": "^15.3.0",
  "react": "^19.0.0",
  "zod": "^3.22.4",
  "gray-matter": "^4.0.3"
}
```

### Development Tools

- **Validation:** Zod schemas for frontmatter and content
- **Testing:** Jest with ts-jest, jsdom environment
- **Linting:** ESLint with Next.js config
- **Type Checking:** TypeScript compiler (strict mode)
- **CI/CD:** GitHub Actions for validation and builds

---

## Codebase Structure

```
ai-prompt-vault/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   └── docs/                    # Documentation routes
│       ├── layout.tsx           # Docs layout with Fumadocs UI
│       └── [[...slug]]/         # Dynamic catch-all route
│           └── page.tsx         # Renders MDX content
│
├── docs/                         # Content root (MDX files)
│   ├── prompts/                 # Prompt library
│   │   ├── agents/              # Complex multi-step AI personas
│   │   ├── features/            # Specific capabilities
│   │   ├── rules/               # Guidelines and standards
│   │   ├── packs/               # Collections of related prompts
│   │   └── prompts/             # General-purpose prompts
│   ├── guides/                  # Usage documentation
│   │   ├── getting-started.md
│   │   ├── prompt-anatomy.md
│   │   ├── platform-integration.md
│   │   └── version-management.md
│   └── libraries/               # Reusable components
│       ├── components/          # Template examples
│       └── snippets/            # Reusable prompt snippets
│
├── lib/                          # Application utilities
│   └── source.ts                # Fumadocs source configuration
│
├── tools/                        # Build & utility scripts
│   ├── schemas/                 # Zod validation schemas
│   │   └── prompt-schema.ts    # Core validation logic
│   ├── exporters/               # Platform-specific exporters
│   │   ├── types.ts            # Shared TypeScript types
│   │   ├── claude-export.ts    # Claude format
│   │   ├── chatgpt-export.ts   # ChatGPT format
│   │   ├── raycast-export.ts   # Raycast format
│   │   ├── csv-export.ts       # CSV format
│   │   ├── markdown-export.ts  # Markdown bundle
│   │   └── index.ts            # Orchestration
│   └── scripts/                 # Maintenance scripts
│       ├── validate-prompts.ts  # Validate all prompts
│       ├── validate-docs.ts     # Validate documentation
│       ├── export-all.ts        # Export to all formats
│       ├── analytics.ts         # Generate analytics
│       ├── health-check.ts      # System health check
│       └── update-registry.ts   # Update prompts.json
│
├── data/                         # Data files
│   ├── prompts.json             # Master registry
│   ├── analytics.json           # Analytics data
│   ├── docs-validation.json     # Validation results
│   └── templates/               # Template files
│
├── tests/                        # Test suite
│   └── *.test.ts                # Jest tests
│
├── .source/                      # Generated by Fumadocs
│   └── source.config.mjs        # Build-time config
│
├── .github/workflows/            # CI/CD pipelines
│   └── validate-prompts.yml     # Validation workflow
│
├── _instructions/                # Project documentation
│   ├── claude.md                # Original project orchestration
│   ├── PROJECT_SUMMARY.md       # Phase-based implementation guide
│   ├── SETUP.md                 # Setup instructions
│   ├── CONFIG.md                # Configuration guide
│   ├── SCRIPTS.md               # Scripts documentation
│   └── TEMPLATES.md             # Template reference
│
├── source.config.ts              # Fumadocs MDX config
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind CSS config
├── package.json                  # Dependencies & scripts
├── jest.config.js                # Jest configuration
├── CONTRIBUTING.md               # Contribution guide
└── CLAUDE.md                     # This file
```

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

```typescript
{
  "@/*": ["./*"],
  "@/tools/*": ["tools/*"],
  "@/data/*": ["data/*"],
  "@/schemas/*": ["tools/schemas/*"],
  "@/exporters/*": ["tools/exporters/*"],
  "@/scripts/*": ["tools/scripts/*"]
}
```

---

## Development Workflows

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd ai-prompt-vault

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Daily Development

1. **Start dev server:** `npm run dev`
2. **Make changes** to Markdown files in `docs/`
3. **Hot reload** automatically updates the browser
4. **Validate changes:** `npm run validate`
5. **Test exports:** `npm run export:all`
6. **Run tests:** `npm test`

### Pre-Commit Checklist

```bash
# 1. Validate all prompts
npm run validate

# 2. Check TypeScript types
npx tsc --noEmit

# 3. Run linter
npm run lint

# 4. Run tests
npm test

# 5. Build for production
npm run build

# 6. Commit changes
git add .
git commit -m "feat: descriptive message"
```

---

## Key Conventions

### Prompt File Structure

Every prompt file MUST follow this structure:

```markdown
---
title: "Prompt Title (5-100 chars)"
description: "Brief description (10-250 chars)"
type: "agent|feature|rule|pack|prompt"
slug: "kebab-case-slug"
status: "published|draft|deprecated|archived"
version: "X.Y.Z"  # Semantic versioning
difficulty: "beginner|intermediate|advanced"
estimatedTokens: 500
author:
  name: "Author Name"
  email: "email@example.com"
  url: "https://website.com"
tags:
  - tag1
  - tag2
  - tag3  # Min 2, max 10 tags
created: "YYYY-MM-DD"
lastModified: "YYYY-MM-DD"
relatedPrompts:
  - "slug-of-related-prompt"
---

# Prompt Title

## Role
Describe the persona or role.

## Task
Describe what the AI should do.

## Instructions
Step-by-step instructions.

## Output Format
Specify expected output structure.

## Constraints
List limitations or requirements.
```

### Naming Conventions

- **Files:** `kebab-case.md` (lowercase, hyphen-separated)
- **Slugs:** Must match filename (without .md extension)
- **Types:** Lowercase, no spaces
- **Tags:** Lowercase, hyphen-separated for multi-word tags
- **Versions:** Semantic versioning (MAJOR.MINOR.PATCH)

### Prompt Types

| Type | Description | Location |
|------|-------------|----------|
| `agent` | Complex, multi-step AI personas | `docs/prompts/agents/` |
| `feature` | Specific capabilities or instructions | `docs/prompts/features/` |
| `rule` | Guidelines, standards, constraints | `docs/prompts/rules/` |
| `pack` | Collections of related prompts | `docs/prompts/packs/` |
| `prompt` | General-purpose prompts | `docs/prompts/prompts/` |

### Status Levels

- **`published`**: Production-ready, included in exports
- **`draft`**: Work in progress, excluded from exports
- **`deprecated`**: Legacy, replaced by newer version
- **`archived`**: Historical reference only

### Difficulty Levels

- **`beginner`**: Basic prompts, minimal complexity
- **`intermediate`**: Moderate complexity, some context needed
- **`advanced`**: Complex, requires deep understanding

---

## Common Tasks

### Adding a New Prompt

```bash
# 1. Create file in appropriate category
touch docs/prompts/features/my-new-prompt.md

# 2. Add frontmatter and content (see template above)

# 3. Validate
npm run validate

# 4. Test locally
npm run dev

# 5. Verify exports
npm run export:all

# 6. Commit
git add docs/prompts/features/my-new-prompt.md
git commit -m "feat: add feature prompt - my new prompt"
```

### Updating an Existing Prompt

```bash
# 1. Edit the file
# 2. Update version (increment patch/minor/major)
# 3. Update lastModified date
# 4. Validate
npm run validate

# 5. Commit with descriptive message
git commit -m "fix: update prompt - description of changes"
```

### Creating a New Exporter

```typescript
// tools/exporters/my-platform-export.ts
import { PromptData, ExportResult } from './types'

export async function exportToMyPlatform(
  prompts: PromptData[]
): Promise<ExportResult> {
  const formatted = prompts.map(prompt => ({
    // Transform to platform format
    name: prompt.title,
    content: prompt.content,
    // ... other fields
  }))

  return {
    success: true,
    format: 'my-platform',
    content: JSON.stringify(formatted, null, 2),
    promptCount: prompts.length,
    timestamp: new Date().toISOString()
  }
}
```

### Running Health Checks

```bash
# Full system health check
npm run health-check

# Validate prompts only
npm run validate

# Validate documentation
npm run validate:docs

# Generate analytics
npm run analytics
```

---

## Validation & Testing

### Validation Schema

The project uses Zod for runtime validation. Key schemas in `tools/schemas/prompt-schema.ts`:

- **`PromptMetadataSchema`**: Validates frontmatter fields
- **`PromptContentSchema`**: Validates full prompt structure
- **`PromptRegistrySchema`**: Validates prompts.json registry

### Validation Rules

**Required Fields:**
- `title`, `description`, `type`, `slug`, `status`, `version`
- `author` (with `name`)
- `tags` (minimum 2)
- `created`, `lastModified`

**Constraints:**
- Title: 5-100 characters
- Description: 10-250 characters
- Slug: kebab-case, 3+ characters
- Version: semantic (X.Y.Z)
- Tags: 2-10 tags, each 2-50 characters
- Email: valid format (if provided)
- URLs: valid format (if provided)

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Specific test file
npm test schemas.test.ts
```

### Manual Validation

```bash
# Validate all prompts
npm run validate

# Example output:
# ✅ Validated 5 prompts
# ❌ 2 validation errors found:
#   - docs/prompts/agents/example.md: Missing required field 'tags'
#   - docs/prompts/features/test.md: Invalid slug format
```

---

## Export System

### Available Formats

The system supports 5 export formats:

1. **Claude** (`claude-export.ts`): Claude AI format with system prompts
2. **ChatGPT** (`chatgpt-export.ts`): OpenAI ChatGPT format
3. **Raycast** (`raycast-export.ts`): Raycast AI commands format
4. **CSV** (`csv-export.ts`): Spreadsheet-compatible format
5. **Markdown** (`markdown-export.ts`): Single bundled Markdown file

### Export Commands

```bash
# Export to all formats
npm run export:all

# Individual exports (if scripts exist)
npm run export:claude
npm run export:raycast
npm run export:chatgpt
npm run export:csv
npm run export:markdown
```

### Export Filtering

Exports automatically filter prompts:
- Only `status: "published"` prompts are included
- `draft`, `deprecated`, and `archived` are excluded by default
- Validation errors prevent export

### Export Output

All exports are saved to `data/exports/`:
```
data/exports/
├── prompts-claude.json
├── prompts-chatgpt.json
├── prompts-raycast.json
├── prompts-import.csv
└── prompts-bundle.md
```

### Export Types

Reference `tools/exporters/types.ts` for TypeScript interfaces:

```typescript
interface ClaudeExport {
  name: string
  description: string
  type: string
  content: string
  tags: string[]
  system_prompt?: string
}

interface RaycastExport {
  name: string
  prompt: string
  icon?: string
  model?: string
  creativity?: 'low' | 'medium' | 'high'
}
```

---

## Git Workflow

### Branch Strategy

- **`main`**: Production-ready code
- **`develop`**: Integration branch (if used)
- **`feat/feature-name`**: Feature branches
- **`fix/bug-name`**: Bug fix branches
- **`docs/topic-name`**: Documentation updates

### Commit Message Format

```
<type>: <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature or prompt
- `fix`: Bug fix or correction
- `docs`: Documentation updates
- `refactor`: Code restructuring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add security audit agent prompt"
git commit -m "fix: correct validation schema for tags field"
git commit -m "docs: update CLAUDE.md with export system details"
```

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/validate-prompts.yml`):

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main` or `develop`
- Changes to `docs/prompts/**` or `tools/schemas/**`

**Steps:**
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (`npm ci --legacy-peer-deps`)
4. Run validation (`npm run validate`)
5. Build project (`npm run build`)
6. Type check (`npx tsc --noEmit`)

**Status:** All checks must pass before merge

---

## Troubleshooting

### Common Issues

#### Port 3000 Already in Use

```bash
# Option 1: Use different port
PORT=3001 npm run dev

# Option 2: Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# Linux alternative
fuser -k 3000/tcp
```

#### Build Fails with Type Errors

```bash
# Check all type errors
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next
npm run build

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### Validation Fails

```bash
# Run validation with verbose output
npm run validate

# Check specific file
npx ts-node -O '{"module":"commonjs"}' tools/scripts/validate-prompts.ts

# Common fixes:
# - Ensure all required frontmatter fields present
# - Verify YAML syntax (indentation, quotes)
# - Check slug matches filename
# - Ensure tags array has 2+ items
```

#### Exports Not Including New Prompt

**Checklist:**
- [ ] Status is `"published"` (not `"draft"`)
- [ ] Validation passes (`npm run validate`)
- [ ] File is in correct directory (`docs/prompts/`)
- [ ] Frontmatter is valid YAML
- [ ] All required fields present

#### Hot Reload Not Working

```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev

# If still not working, clear cache
rm -rf .next
npm run dev
```

#### Legacy Peer Deps Warning

**Expected behavior:** This project requires `--legacy-peer-deps` flag due to React 19 compatibility.

**Always use:**
```bash
npm install --legacy-peer-deps
```

### Debug Mode

Enable verbose logging:

```bash
# Next.js debug mode
DEBUG=* npm run dev

# Node debug mode
NODE_OPTIONS='--inspect' npm run dev
```

### Getting Help

1. **Check documentation:** `docs/guides/`
2. **Review examples:** `docs/prompts/*/`
3. **Read contribution guide:** `CONTRIBUTING.md`
4. **Check issues:** GitHub Issues
5. **Review reference files:** `_instructions/`

---

## Development Best Practices

### When Adding New Features

1. **Read existing code first** - Understand patterns before adding new code
2. **Follow established conventions** - Match existing file structure and naming
3. **Update tests** - Add tests for new functionality
4. **Update documentation** - Keep CLAUDE.md and guides in sync
5. **Validate before committing** - Run full validation suite

### When Modifying Prompts

1. **Increment version** - Follow semantic versioning
2. **Update lastModified** - Set to current date
3. **Test exports** - Verify all export formats work
4. **Check related prompts** - Update cross-references if needed
5. **Document breaking changes** - Note incompatibilities

### When Refactoring

1. **Run tests before and after** - Ensure no regressions
2. **Update type definitions** - Keep TypeScript types current
3. **Check all exporters** - Verify formats still work
4. **Update documentation** - Reflect architectural changes
5. **Test in production mode** - Run `npm run build && npm start`

### Code Quality Standards

- **TypeScript:** Strict mode enabled, no implicit any
- **Validation:** All data must pass Zod schema validation
- **Error Handling:** Use try-catch for async operations
- **Naming:** Descriptive, self-documenting variable names
- **Comments:** Explain "why" not "what"
- **Testing:** Aim for >80% coverage on critical paths

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build
npm start                # Start production server

# Validation & Testing
npm run validate         # Validate all prompts
npm run validate:docs    # Validate documentation
npm test                 # Run test suite
npm run lint             # Run ESLint

# Exports
npm run export:all       # Export to all formats

# Utilities
npm run analytics        # Generate analytics
npm run health-check     # System health check
npx tsc --noEmit        # Type check without compilation
```

### File Locations

| What | Where |
|------|-------|
| Prompts | `docs/prompts/[type]/[slug].md` |
| Guides | `docs/guides/[topic].md` |
| Schemas | `tools/schemas/prompt-schema.ts` |
| Exporters | `tools/exporters/[platform]-export.ts` |
| Scripts | `tools/scripts/[task].ts` |
| Tests | `tests/[module].test.ts` |
| Config | Root directory (`*.config.*`) |
| Data | `data/[file].json` |

### Important Files

- **`source.config.ts`**: Fumadocs MDX configuration
- **`lib/source.ts`**: Fumadocs content loader
- **`app/docs/[[...slug]]/page.tsx`**: Dynamic route handler
- **`tools/schemas/prompt-schema.ts`**: Core validation logic
- **`package.json`**: Scripts and dependencies
- **`tsconfig.json`**: TypeScript configuration

---

## Advanced Topics

### Extending the Export System

To add a new platform exporter:

1. Create `tools/exporters/platform-export.ts`
2. Implement `exportToPlatform()` function
3. Add to `tools/exporters/index.ts`
4. Add script to `package.json`
5. Update `CLAUDE.md` documentation
6. Add tests in `tests/`

### Custom Validation Rules

To add custom validation:

1. Edit `tools/schemas/prompt-schema.ts`
2. Add new Zod validation rules
3. Update TypeScript types
4. Update documentation templates
5. Add test cases

### Analytics System

The analytics system (`tools/scripts/analytics.ts`) generates:
- Prompt count by type
- Tag frequency analysis
- Author contribution stats
- Version distribution
- Status breakdown

Output saved to `data/analytics.json`

### Master Registry

The `data/prompts.json` file serves as a master registry:
- Auto-generated by validation scripts
- Used for cross-referencing
- Enables quick lookups
- Powers search functionality

Update with: `npm run validate` (auto-updates registry)

---

## Fumadocs Integration

### Content Source

Content is loaded via `lib/source.ts`:

```typescript
import { loader } from 'fumadocs-core/source'
import { docs } from '@/.source'

export const source = loader({
  baseUrl: '/docs',
  source: (docs as any).toFumadocsSource(),
})
```

### MDX Configuration

MDX processing configured in `source.config.ts`:

```typescript
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

export const { docs, meta } = defineDocs({
  dir: 'docs',
})

export default defineConfig({
  lastModifiedTime: 'git',
})
```

### Search Functionality

Fumadocs provides built-in static search:
- Indexes all MDX content at build time
- Full-text search across titles and content
- Tag-based filtering
- No external search service required

### UI Components

The project uses Fumadocs UI components:
- Pre-built documentation layouts
- Search interface
- Navigation sidebar
- Table of contents
- Code syntax highlighting

---

## Deployment

### Local Production Build

```bash
npm run build
npm start
# Visit http://localhost:3000
```

### Vercel Deployment

Optimized for Vercel (see `DEPLOY_VERCEL.md`):
- Auto-deploys from `main` branch
- Environment variables in Vercel dashboard
- Build command: `npm run build`
- Output directory: `.next`

### Docker Deployment

Docker support can be added:
1. Create `Dockerfile`
2. Use Node.js 18 base image
3. Copy files and install dependencies
4. Expose port 3000
5. Run `npm start`

### Static Export

For static hosting:
```bash
# Edit next.config.mjs
# Add: output: 'export'
npm run build
# Deploy .next/out/ directory
```

---

## Project Status & Roadmap

### Current State (v1.0.0)

- ✅ Fumadocs integration complete
- ✅ Validation system operational
- ✅ Export pipeline functional
- ✅ CI/CD workflow active
- ✅ Documentation comprehensive
- ✅ Example prompts included

### Future Enhancements

- [ ] Web-based prompt editor UI
- [ ] Advanced search filters
- [ ] Prompt composition features
- [ ] AI-assisted prompt generation
- [ ] Real-time collaboration
- [ ] Prompt versioning system
- [ ] Usage analytics tracking
- [ ] API endpoints for integration

---

## Summary for AI Assistants

When working on this codebase:

1. **Always validate first:** Run `npm run validate` before committing
2. **Follow conventions:** Match existing patterns for file structure, naming, and formatting
3. **Test exports:** Verify `npm run export:all` works after changes
4. **Update docs:** Keep CLAUDE.md and guides synchronized
5. **Use path aliases:** Import from `@/` paths defined in tsconfig
6. **Check types:** Run `npx tsc --noEmit` for type errors
7. **Read examples:** Study existing prompts before creating new ones
8. **Respect statuses:** Only `published` prompts appear in exports
9. **Version properly:** Increment versions using semantic versioning
10. **Document changes:** Update CLAUDE.md when adding features

### Quick Start for New Tasks

1. Read this CLAUDE.md file completely
2. Review relevant files in `_instructions/`
3. Check existing examples in `docs/prompts/`
4. Understand validation schema in `tools/schemas/`
5. Run the project locally: `npm run dev`
6. Make changes following conventions
7. Validate: `npm run validate`
8. Test: `npm test`
9. Build: `npm run build`
10. Commit with descriptive message

---

**For questions or clarifications, refer to:**
- `CONTRIBUTING.md` - Contribution guidelines
- `_instructions/` - Detailed implementation guides
- `docs/guides/` - User-facing documentation
- Existing code - Follow established patterns

**This file should be updated whenever:**
- New features are added
- Workflows change
- Conventions are modified
- New tools are integrated
- Architecture evolves

---

**End of CLAUDE.md**
