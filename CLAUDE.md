# CLAUDE.md - AI Assistant Guide

**Last Updated:** 2025-11-24
**Repository:** AI Prompt Vault
**Purpose:** Self-hosted, documentation-first AI Prompt Library

---

## Project Overview

This is a **self-hosted AI Prompt Library** built with Fumadocs (Next.js-based documentation framework). It centralizes AI prompts, instructions, and coding standards with full-text search, version control, and multi-platform export capabilities.

**Key Features:**
- 📚 Documentation-first architecture using Fumadocs
- 🔍 Built-in full-text search across all prompts
- 📦 Multi-platform exports (Claude, ChatGPT, Raycast, CSV, Markdown)
- ✅ Zod-based validation for prompt metadata
- 🔄 Version control for prompts
- 🏷️ Comprehensive tagging and categorization
- 📊 Analytics and health monitoring

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Next.js | 15.3.0 |
| Docs Engine | Fumadocs | 15.x |
| Runtime | Node.js | 18+ |
| Language | TypeScript | 5.5.0 |
| React | React | 19.0.0 |
| Validation | Zod | 3.22.4 |
| Styling | Tailwind CSS | 3.3.0 |
| Testing | Jest | 29.7.0 |
| Metadata | YAML frontmatter | - |
| Content | MDX | 3.x |

---

## Codebase Structure

```
ai-prompt-vault/
├── app/                          # Next.js 15 App Router
│   ├── docs/                     # Documentation routes
│   │   ├── [[...slug]]/         # Dynamic docs pages
│   │   │   └── page.tsx         # Doc page renderer
│   │   └── layout.tsx           # Docs layout with navigation
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── docs/                         # Content directory (Fumadocs source)
│   ├── index.mdx                # Docs homepage
│   ├── guides/                  # Usage guides
│   │   ├── getting-started.md
│   │   ├── prompt-anatomy.md
│   │   ├── platform-integration.md
│   │   ├── tagging-strategy.md
│   │   ├── version-management.md
│   │   ├── prompt-submission.md
│   │   └── deployment.md
│   ├── prompts/                 # Prompt library (main content)
│   │   ├── agents/              # Complex multi-step AI personas
│   │   ├── features/            # Specific capabilities/instructions
│   │   ├── rules/               # Guidelines, standards, constraints
│   │   ├── prompts/             # General-purpose prompts
│   │   └── packs/               # Collections of related prompts
│   └── libraries/               # Reusable components
│       ├── components/          # MDX components, templates
│       └── snippets/            # Reusable prompt fragments
│
├── data/                         # Generated data and exports
│   ├── prompts.json             # Master prompt registry
│   ├── analytics.json           # Usage analytics
│   ├── docs-validation.json     # Validation results
│   └── templates/               # Frontmatter templates
│       └── frontmatter-template.yaml
│
├── tools/                        # Build tools and scripts
│   ├── schemas/                 # Zod validation schemas
│   │   └── prompt-schema.ts    # Prompt metadata schema
│   ├── exporters/               # Platform export modules
│   │   ├── index.ts            # Exporter orchestrator
│   │   ├── types.ts            # Type definitions
│   │   ├── claude-export.ts    # Claude.ai format
│   │   ├── chatgpt-export.ts   # ChatGPT format
│   │   ├── raycast-export.ts   # Raycast AI format
│   │   ├── csv-export.ts       # CSV format
│   │   └── markdown-export.ts  # Markdown bundle
│   └── scripts/                 # Utility scripts
│       ├── validate-prompts.ts  # Validate all prompts
│       ├── validate-docs.ts     # Validate docs structure
│       ├── export-all.ts        # Run all exporters
│       ├── analytics.ts         # Generate analytics
│       ├── health-check.ts      # System health check
│       ├── update-registry.ts   # Update prompts.json
│       └── test-config.ts       # Test configuration
│
├── tests/                        # Test files
│   ├── exporters.test.ts        # Exporter tests
│   ├── schemas.test.ts          # Schema validation tests
│   └── integration.test.ts      # Integration tests
│
├── lib/                          # Library code
│   └── source.ts                # Fumadocs source config
│
├── .source/                      # Generated Fumadocs source
│   └── index.ts                 # Auto-generated source index
│
├── _instructions/                # Project documentation
│   ├── INDEX.md
│   ├── SETUP.md
│   ├── CONFIG.md
│   ├── SCRIPTS.md
│   ├── TEMPLATES.md
│   ├── TESTING.md
│   ├── DEPLOYMENT.md
│   ├── PROJECT_SUMMARY.md
│   └── claude.md               # Original project plan
│
├── .github/                      # GitHub configuration
│   └── workflows/
│       └── validate-prompts.yml # CI/CD validation
│
├── Configuration Files
├── source.config.ts             # Fumadocs MDX config
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind config
├── jest.config.js               # Jest test config
├── jest.setup.js                # Jest setup
├── fumadocs.config.ts           # Fumadocs config
├── package.json                 # Dependencies & scripts
└── .eslintrc.json              # ESLint config
```

---

## Key Concepts

### 1. Prompt Types

This library categorizes prompts into five types:

- **`agent`** - Complex, multi-step AI personas with specific roles (e.g., Code Review Expert, Security Auditor)
- **`feature`** - Specific capabilities or instructions (e.g., API Documentation Generator, Responsive Design)
- **`rule`** - Guidelines, standards, or constraints (e.g., TypeScript Standards, Security Checklist)
- **`pack`** - Collections of related prompts bundled together
- **`prompt`** - General-purpose prompts that don't fit other categories

### 2. Prompt Metadata Schema

All prompts use YAML frontmatter validated by Zod. See `tools/schemas/prompt-schema.ts:21-97`.

**Required Fields:**
```yaml
---
title: "5-100 characters"
description: "10-250 characters"
type: "agent|feature|pack|prompt|rule"
slug: "kebab-case-slug"
status: "published|draft|deprecated|archived"
version: "1.0.0"  # Semantic versioning
author:
  name: "Author Name"
  email: "optional@email.com"  # Optional
tags:
  - tag1
  - tag2  # Minimum 2, maximum 10
created: "2025-01-15"
lastModified: "2025-01-15"
---
```

**Optional Fields:**
- `difficulty`: "beginner|intermediate|advanced"
- `estimated_tokens`: Number of tokens
- `cost_tier`: "low|medium|high"
- `model_compatibility`: Array of model names
- `use_cases`: Array of use case descriptions
- `related_prompts`: Array of related prompt slugs
- `categories`: Array of category names
- `tech_stack`: Object with framework, database, service, language

### 3. Export System

The export system supports multiple platforms with format-specific transformers:

| Platform | Format | Exporter File | Output Location |
|----------|--------|---------------|-----------------|
| Claude.ai | JSON | `claude-export.ts` | Custom project format |
| ChatGPT | JSON | `chatgpt-export.ts` | Custom GPT format |
| Raycast AI | JSON | `raycast-export.ts` | Raycast snippets |
| CSV | CSV | `csv-export.ts` | Universal import format |
| Markdown | MD | `markdown-export.ts` | Bundled documentation |

See `tools/exporters/types.ts:47-94` for format specifications.

---

## Development Workflow

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd ai-prompt-vault

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Adding a New Prompt

1. **Choose the appropriate category directory:**
   - `docs/prompts/agents/` - For AI agent personas
   - `docs/prompts/features/` - For specific features
   - `docs/prompts/rules/` - For coding standards/guidelines
   - `docs/prompts/prompts/` - For general prompts
   - `docs/prompts/packs/` - For prompt collections

2. **Create a new `.md` file:**
   ```bash
   # Example: docs/prompts/features/your-feature-name.md
   ```

3. **Use the standard frontmatter template:**
   See `data/templates/frontmatter-template.yaml` or existing prompts for reference.

4. **Validate your prompt:**
   ```bash
   npm run validate
   ```

5. **Test in development:**
   ```bash
   npm run dev
   # Navigate to your prompt in the browser
   ```

6. **Generate exports:**
   ```bash
   npm run export:all
   ```

### Making Changes to Exporters

1. **Edit exporter file** in `tools/exporters/`
2. **Update types** if needed in `tools/exporters/types.ts`
3. **Run tests:**
   ```bash
   npm test
   ```
4. **Test export:**
   ```bash
   npm run export:all
   ```

### Updating Schemas

1. **Edit schema** in `tools/schemas/prompt-schema.ts`
2. **Run validation** to check existing prompts:
   ```bash
   npm run validate
   ```
3. **Update template** in `data/templates/frontmatter-template.yaml`
4. **Update documentation** in relevant guide files

---

## NPM Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start development server on port 3000 |
| `build` | `next build` | Build production bundle |
| `start` | `next start` | Start production server |
| `lint` | `next lint` | Run ESLint checks |
| `validate` | `ts-node validate-prompts.ts` | Validate all prompt frontmatter |
| `validate:docs` | `ts-node validate-docs.ts` | Validate documentation structure |
| `export:all` | `ts-node export-all.ts` | Export to all platforms |
| `analytics` | `ts-node analytics.ts` | Generate usage analytics |
| `health-check` | `ts-node health-check.ts` | Run system health checks |
| `test` | `jest` | Run all tests |
| `test:watch` | `jest --watch` | Run tests in watch mode |

**Common Workflows:**
```bash
# Before committing changes
npm run validate && npm run build

# Full validation suite
npm run validate && npm run validate:docs && npm test && npm run build

# Generate all exports and analytics
npm run export:all && npm run analytics

# Development cycle
npm run dev  # In one terminal
npm run test:watch  # In another terminal
```

---

## File Conventions

### Naming Conventions

- **Prompt files:** `kebab-case-slug.md`
- **Slugs:** Must match filename without extension
- **TypeScript files:** `kebab-case.ts` or `kebab-case.tsx`
- **Component files:** `PascalCase.tsx` (if applicable)
- **Test files:** `*.test.ts`
- **Config files:** `*.config.ts` or `*.config.mjs`

### Directory Organization

```
docs/prompts/[type]/[slug].md
             ^^^^   ^^^^
             |      └── Filename must be kebab-case
             └── Type must be: agents, features, rules, prompts, or packs
```

### Frontmatter Validation

All frontmatter is validated against Zod schemas in `tools/schemas/prompt-schema.ts`.

**Validation runs:**
- Locally via `npm run validate`
- In CI/CD on push to main/develop
- Before production builds

---

## Testing

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Specific test file
npm test exporters.test.ts

# Coverage report
npm test -- --coverage
```

### Test Files

- `tests/exporters.test.ts` - Tests all exporter modules
- `tests/schemas.test.ts` - Tests Zod validation schemas
- `tests/integration.test.ts` - End-to-end integration tests

### Adding Tests

1. Create `tests/your-feature.test.ts`
2. Import testing utilities from `@testing-library/jest-dom`
3. Follow existing test patterns
4. Run `npm test` to verify

---

## Common Operations

### Validating Prompts

```bash
# Validate all prompts
npm run validate

# The validator checks:
# - Required frontmatter fields exist
# - Field types and formats are correct
# - Slugs are unique and valid
# - Tags are present (2-10 tags)
# - Dates are properly formatted
# - Semantic versioning is valid
```

### Generating Exports

```bash
# Export to all platforms
npm run export:all

# Outputs are typically saved to data/ or logged to console
# Check individual exporter files for output locations
```

### Running Health Checks

```bash
npm run health-check

# Checks:
# - All required files exist
# - Prompts validate successfully
# - Exports can be generated
# - Build completes successfully
# - No TypeScript errors
```

### Updating the Registry

```bash
npm run validate

# This automatically updates data/prompts.json with:
# - All published prompts
# - Metadata index
# - Cross-references
```

---

## Key Files to Understand

### Core Configuration

1. **`source.config.ts`** - Fumadocs source configuration
   - Defines docs directory
   - Configures last modified time from git

2. **`lib/source.ts`** - Fumadocs loader
   - Loads documentation from `.source`
   - Configures base URL for docs

3. **`next.config.mjs`** - Next.js configuration
   - MDX integration via Fumadocs
   - Security headers
   - Image optimization
   - Environment variables

4. **`tsconfig.json`** - TypeScript configuration
   - Path aliases (`@/*`, `@/tools/*`, etc.)
   - Strict type checking enabled
   - Module resolution: bundler

### Schema & Validation

5. **`tools/schemas/prompt-schema.ts`** - Central validation schema
   - **Critical:** This defines the contract for all prompts
   - All frontmatter must conform to `PromptMetadataSchema`
   - Export type definitions are used throughout codebase

### Exporters

6. **`tools/exporters/index.ts`** - Exporter orchestrator
   - Coordinates all export operations
   - Handles filtering (published vs draft)
   - Manages export pipeline

7. **`tools/exporters/types.ts`** - Type definitions
   - Platform-specific export formats
   - Shared interfaces for exporters

### Layout & UI

8. **`app/docs/layout.tsx`** - Docs layout component
   - Fumadocs UI integration
   - Navigation tree
   - Page structure

9. **`app/docs/[[...slug]]/page.tsx`** - Dynamic doc page renderer
   - Renders MDX content
   - Handles all /docs/* routes

---

## AI Assistant Guidelines

When working with this codebase as an AI assistant, follow these conventions:

### 1. Adding New Prompts

✅ **DO:**
- Validate frontmatter against the schema before creating files
- Use kebab-case for slugs and filenames
- Include all required frontmatter fields
- Run `npm run validate` after creation
- Set `status: "draft"` initially, change to `"published"` when ready
- Add meaningful tags (2-10 tags)
- Reference related prompts by their slugs

❌ **DON'T:**
- Create prompts without proper frontmatter
- Skip validation steps
- Use spaces or special characters in slugs
- Forget to update `lastModified` date when editing
- Create duplicate slugs

### 2. Modifying Schemas

✅ **DO:**
- Update `tools/schemas/prompt-schema.ts` for schema changes
- Run validation on all existing prompts after changes
- Update type definitions if interfaces change
- Document breaking changes
- Update templates in `data/templates/`

❌ **DON'T:**
- Make breaking schema changes without migration plan
- Remove required fields without considering existing prompts
- Change field types without validation

### 3. Working with Exporters

✅ **DO:**
- Test exports after changes: `npm run export:all`
- Follow existing exporter patterns in `tools/exporters/`
- Update types in `types.ts` when adding new export formats
- Handle edge cases (missing fields, deprecated prompts)
- Add tests for new exporters

❌ **DON'T:**
- Hard-code platform-specific values
- Skip error handling
- Forget to update the orchestrator in `index.ts`

### 4. Code Style

✅ **DO:**
- Use TypeScript strictly (no `any` types unless necessary)
- Follow existing code patterns
- Use path aliases (`@/tools/*`, `@/data/*`)
- Add JSDoc comments for complex functions
- Keep functions focused and single-purpose

❌ **DON'T:**
- Disable TypeScript strict mode
- Use `require()` instead of ES6 imports
- Skip type annotations
- Create circular dependencies

### 5. Testing

✅ **DO:**
- Add tests for new features
- Run full test suite before committing
- Test edge cases (empty arrays, missing optionals)
- Verify builds complete successfully

❌ **DON'T:**
- Skip test coverage for critical paths
- Commit failing tests
- Ignore TypeScript compilation errors

### 6. Documentation

✅ **DO:**
- Update relevant guide files when adding features
- Keep CLAUDE.md synchronized with major changes
- Document breaking changes clearly
- Provide examples in guides

❌ **DON'T:**
- Assume changes are self-documenting
- Leave outdated documentation
- Skip updating CONTRIBUTING.md when workflows change

### 7. Git Workflow

✅ **DO:**
- Create feature branches: `feat/`, `fix/`, `docs/`
- Write descriptive commit messages
- Run validation before committing
- Keep commits focused and atomic

❌ **DON'T:**
- Commit directly to main
- Mix unrelated changes in one commit
- Skip CI/CD validation checks

### 8. Common Pitfalls to Avoid

1. **Frontmatter validation failures**
   - Always validate against schema
   - Check date formats (YYYY-MM-DD)
   - Ensure semantic versioning (X.Y.Z)

2. **Build failures**
   - Run `npm run build` before pushing
   - Fix TypeScript errors immediately
   - Check MDX syntax in prompt files

3. **Export issues**
   - Test exports with `npm run export:all`
   - Verify output formats match platform requirements
   - Handle missing optional fields gracefully

4. **Path resolution problems**
   - Use TypeScript path aliases consistently
   - Check `tsconfig.json` for alias definitions
   - Use absolute imports from project root

---

## Debugging Guide

### Common Issues

#### 1. Validation Fails

```bash
npm run validate
# Check error output for specific field violations
# Common issues:
# - Missing required fields
# - Invalid date format
# - Slug not kebab-case
# - Tag count outside 2-10 range
```

#### 2. Build Fails

```bash
npm run build
# Check for:
# - TypeScript compilation errors
# - MDX syntax errors
# - Missing dependencies
# - Invalid configuration
```

#### 3. Exports Don't Include Prompt

**Reasons:**
- Status is `"draft"` (only `"published"` prompts are exported)
- Validation fails for that prompt
- File not in correct directory structure
- Frontmatter parsing errors

**Solution:**
```bash
npm run validate  # Check validation
# Set status: "published" in frontmatter
# Ensure file is in docs/prompts/[type]/
npm run export:all  # Re-run exports
```

#### 4. Dev Server Not Showing Changes

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

#### 5. TypeScript Errors

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Common fixes:
# - Update imports to use path aliases
# - Add missing type definitions
# - Check for circular dependencies
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/validate-prompts.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop`
- Changes to `docs/prompts/**` or `tools/schemas/**`

**Steps:**
1. Checkout code
2. Setup Node.js 18
3. Install dependencies with `npm ci --legacy-peer-deps`
4. Run `npm run validate`
5. Run `npm run build`
6. Run `npx tsc --noEmit` for type checking

**Success Criteria:**
- ✅ All prompts validate successfully
- ✅ Production build completes
- ✅ No TypeScript errors

---

## Production Deployment

### Vercel Deployment

See `DEPLOY_VERCEL.md` and `DEPLOY_VERCEL_QUICK_START.md` for detailed instructions.

**Quick Setup:**
1. Connect repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install --legacy-peer-deps`
3. Set environment variables (if needed)
4. Deploy

### Docker Deployment

See `Dockerfile` and `docker-compose.yml` for containerized deployment.

```bash
docker-compose up -d
```

---

## Performance Considerations

1. **MDX Compilation**
   - Fumadocs pre-compiles MDX at build time
   - No runtime MDX processing overhead
   - Fast page loads

2. **Search**
   - Static search index generated at build time
   - No external search service required
   - Client-side search is fast

3. **Exports**
   - Run exports on-demand or in CI/CD
   - Cache export results
   - Consider incremental exports for large libraries

---

## Project Status

**Current State:** Production-ready

**Completed:**
- ✅ Fumadocs integration
- ✅ Zod validation schemas
- ✅ Multi-platform exporters
- ✅ CI/CD pipeline
- ✅ Documentation and guides
- ✅ Testing infrastructure
- ✅ Health monitoring
- ✅ Analytics generation

**Maintenance:**
- Regular dependency updates
- Prompt library expansion
- Export format updates as platforms evolve
- Performance monitoring

---

## Additional Resources

### Documentation
- `/docs/guides/getting-started.md` - Getting started guide
- `/docs/guides/prompt-anatomy.md` - Prompt structure guide
- `/docs/guides/platform-integration.md` - Export platform guide
- `/docs/guides/tagging-strategy.md` - Tagging best practices
- `CONTRIBUTING.md` - Contribution guidelines
- `_instructions/` - Detailed project documentation

### External Links
- [Fumadocs Documentation](https://fumadocs.vercel.app)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zod Documentation](https://zod.dev)

---

## Quick Reference

### File an Issue
- Validation errors? Check schema in `tools/schemas/prompt-schema.ts`
- Build errors? Run `npm run build` and check output
- Export errors? Run `npm run export:all` and check logs

### Need Help?
1. Check this CLAUDE.md
2. Read `CONTRIBUTING.md`
3. Review existing prompts for examples
4. Check `_instructions/` directory
5. Run `npm run health-check`

---

## Version History

- **v1.0.0** (2025-11-24) - Comprehensive CLAUDE.md created
  - Full codebase documentation
  - AI assistant guidelines
  - Development workflows
  - Production deployment guides

---

**This document should be updated whenever:**
- Major architectural changes occur
- New export platforms are added
- Schema definitions change significantly
- Development workflows are modified
- New AI assistant patterns emerge

**Maintained by:** Project contributors
**Questions?** See CONTRIBUTING.md or project documentation in `_instructions/`
