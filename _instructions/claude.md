# AI Prompt Library & Documentation Vault - Claude Code Project

**Project Objective:**
Build a self-hosted, documentation-first AI Prompt Library using Fumadocs that centralizes all AI prompts, instructions, and coding standards with version control, full-text search, and platform exports.

**Technology Stack:**
- Framework: Fumadocs (built on NextJS 14+)
- Runtime: Node.js 18+
- Metadata: YAML frontmatter + JSON registry
- Build: TypeScript, esbuild
- Search: Built-in Fumadocs static search
- Export: Multi-platform (Claude, ChatGPT, Raycast, CSV)

---

## Project Phases & Execution

### Phase 1: Foundation Setup (IMMEDIATE)
**Estimated Time: 2-3 hours**
**Deliverables:** Working Fumadocs instance with configuration

**Tasks:**
1. [ ] Initialize Fumadocs project with NextJS
2. [ ] Configure TypeScript and build system
3. [ ] Set up directory structure per ARCHITECTURE.md
4. [ ] Create root configuration files (fumadocs.config.ts, next.config.ts)
5. [ ] Set up Git repository with proper .gitignore
6. [ ] Create README.md with project overview

**Reference File:** `SETUP.md`
**Commands to Execute:**
```bash
npx create-fumadocs-app ai-prompt-vault
cd ai-prompt-vault
npm install zod @fumadocs/core @fumadocs/openapi
mkdir -p docs/{prompts/{agents,features,rules/coding-standards,rules/security,packs,system-instructions},libraries/{components,snippets},guides,api}
mkdir -p data/{exports,templates}
mkdir -p tools/{scripts,exporters}
```

---

### Phase 2: Configuration & Metadata Schema (HOURS 3-5)
**Estimated Time: 2-3 hours**
**Deliverables:** Complete configuration system with validation

**Tasks:**
1. [ ] Create fumadocs.config.ts with search configuration
2. [ ] Create next.config.ts with MDX support
3. [ ] Create sidebar navigation (_meta.ts files)
4. [ ] Define Zod schemas for prompt validation
5. [ ] Create YAML frontmatter template
6. [ ] Initialize master prompts.json registry

**Reference File:** `CONFIG.md`
**Files to Create:**
- `fumadocs.config.ts`
- `next.config.ts`
- `docs/prompts/_meta.ts`
- `tools/schemas/prompt-schema.ts`
- `data/prompts.json` (empty registry)

---

### Phase 3: Export Pipeline & Tooling (HOURS 6-9)
**Estimated Time: 3-4 hours**
**Deliverables:** Platform-agnostic export system with validators

**Tasks:**
1. [ ] Create Claude export formatter
2. [ ] Create ChatGPT export formatter
3. [ ] Create Raycast export formatter
4. [ ] Create CSV import export formatter
5. [ ] Create Markdown bundle exporter
6. [ ] Build validation pipeline with Zod
7. [ ] Create export orchestration script
8. [ ] Create export CI/CD workflow

**Reference File:** `SCRIPTS.md`
**Files to Create:**
- `tools/exporters/claude-export.ts`
- `tools/exporters/chatgpt-export.ts`
- `tools/exporters/raycast-export.ts`
- `tools/exporters/csv-export.ts`
- `tools/exporters/markdown-export.ts`
- `tools/exporters/index.ts` (orchestrator)
- `tools/scripts/validate-prompts.ts`
- `tools/scripts/migrate-prompts.ts`
- `.github/workflows/validate-prompts.yml`

---

### Phase 4: Content & Templates (HOURS 10-15)
**Estimated Time: 4-5 hours**
**Deliverables:** Template documentation and core prompt library

**Tasks:**
1. [ ] Create prompt template in docs/libraries/components/
2. [ ] Create comprehensive usage guides
3. [ ] Migrate 3-5 example prompts from document
4. [ ] Create guides for new prompt creation
5. [ ] Create best practices documentation
6. [ ] Create platform integration guide
7. [ ] Create tagging strategy documentation

**Reference File:** `TEMPLATES.md` and `IMPLEMENTATION.md`
**Files to Create:**
- `docs/libraries/components/prompt-template.mdx`
- `docs/guides/getting-started.md`
- `docs/guides/prompt-anatomy.md`
- `docs/guides/platform-integration.md`
- `docs/guides/tagging-strategy.md`
- `docs/guides/version-management.md`
- Example prompts (security-audit, angular-standards, etc.)

---

### Phase 5: Integration & Workflows (HOURS 16-20)
**Estimated Time: 3-4 hours**
**Deliverables:** Working export pipeline and maintenance workflows

**Tasks:**
1. [ ] Test export pipeline end-to-end
2. [ ] Verify all platform exports produce valid output
3. [ ] Create prompt submission workflow
4. [ ] Build analytics dashboard data structures
5. [ ] Create maintenance scripts
6. [ ] Document deployment options
7. [ ] Set up local development environment

**Reference File:** `DEPLOYMENT.md`
**Files to Create:**
- `tools/scripts/export-all.sh`
- `tools/scripts/check-health.ts`
- `tools/analytics/prompt-stats.ts`
- `docker-compose.yml` (optional)
- `Dockerfile` (optional)
- Deployment documentation

---

### Phase 6: Testing & Validation (HOURS 21-23)
**Estimated Time: 2 hours**
**Deliverables:** Comprehensive test suite and validation reports

**Tasks:**
1. [ ] Create unit tests for exporters
2. [ ] Create integration tests for full pipeline
3. [ ] Test all Markdown files for syntax errors
4. [ ] Validate JSON schemas
5. [ ] Run accessibility checks
6. [ ] Test local build and dev server
7. [ ] Generate test report

**Reference File:** `TESTING.md`
**Files to Create:**
- `tests/exporters.test.ts`
- `tests/validation.test.ts`
- `tests/integration.test.ts`
- `jest.config.js`

---

### Phase 7: Documentation & Launch (HOURS 24-26)
**Estimated Time: 2-3 hours**
**Deliverables:** Complete documentation and production-ready instance

**Tasks:**
1. [ ] Create comprehensive CONTRIBUTING.md
2. [ ] Create quick start guide
3. [ ] Document all npm scripts
4. [ ] Create troubleshooting guide
5. [ ] Build and test production bundle
6. [ ] Generate initial analytics
7. [ ] Create launch checklist

**Reference File:** All guides
**Files to Create:**
- `CONTRIBUTING.md`
- `QUICKSTART.md`
- `TROUBLESHOOTING.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `docs/index.mdx` (landing page)

---

## File Structure Reference

```
ai-prompt-vault/
├── docs/                          # Fumadocs content root
│   ├── prompts/
│   │   ├── _meta.ts
│   │   ├── agents/
│   │   │   ├── _meta.ts
│   │   │   ├── security-audit-comprehensive.md
│   │   │   └── code-review-agent.md
│   │   ├── features/
│   │   │   ├── _meta.ts
│   │   │   └── responsive-design.md
│   │   ├── rules/
│   │   │   ├── _meta.ts
│   │   │   ├── coding-standards/
│   │   │   │   ├── _meta.ts
│   │   │   │   ├── angular-19.md
│   │   │   │   └── typescript.md
│   │   │   └── security/
│   │   │       ├── _meta.ts
│   │   │       └── owasp-standards.md
│   │   ├── packs/
│   │   │   ├── _meta.ts
│   │   │   └── web-development.md
│   │   └── system-instructions/
│   │       ├── _meta.ts
│   │       └── marketing.md
│   ├── libraries/
│   │   ├── components/
│   │   │   ├── prompt-template.mdx
│   │   │   └── few-shot-example.mdx
│   │   └── snippets/
│   │       ├── objective-statements.md
│   │       └── output-formats.md
│   ├── guides/
│   │   ├── getting-started.md
│   │   ├── prompt-anatomy.md
│   │   ├── platform-integration.md
│   │   ├── tagging-strategy.md
│   │   └── version-management.md
│   ├── api/
│   │   ├── export-formats.md
│   │   └── integration-endpoints.md
│   ├── index.mdx
│   └── layout.tsx
├── data/
│   ├── prompts.json
│   ├── exports/
│   │   ├── prompts-claude.json
│   │   ├── prompts-chatgpt.json
│   │   ├── prompts-raycast.json
│   │   ├── prompts-import.csv
│   │   └── prompts-bundle.md
│   └── templates/
│       ├── prompt-template.md
│       └── rule-template.md
├── tools/
│   ├── scripts/
│   │   ├── validate-prompts.ts
│   │   ├── migrate-prompts.ts
│   │   ├── export-all.sh
│   │   └── check-health.ts
│   ├── exporters/
│   │   ├── index.ts
│   │   ├── claude-export.ts
│   │   ├── chatgpt-export.ts
│   │   ├── raycast-export.ts
│   │   ├── csv-export.ts
│   │   └── types.ts
│   ├── schemas/
│   │   └── prompt-schema.ts
│   └── analytics/
│       └── prompt-stats.ts
├── tests/
│   ├── exporters.test.ts
│   ├── validation.test.ts
│   └── integration.test.ts
├── .github/
│   └── workflows/
│       └── validate-prompts.yml
├── fumadocs.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── jest.config.js
├── .gitignore
├── README.md
├── CONTRIBUTING.md
├── QUICKSTART.md
├── TROUBLESHOOTING.md
└── LICENSE
```

---

## Critical Success Factors

### Must Have (Blockers)
- [ ] Fumadocs builds and serves locally without errors
- [ ] Frontmatter validation catches missing required fields
- [ ] Export to at least 2 platforms (Claude + Raycast)
- [ ] Search functionality works across all prompts
- [ ] Git integration for version tracking

### Should Have (High Priority)
- [ ] All exporters working (4+ formats)
- [ ] CI/CD pipeline validates on push
- [ ] Comprehensive documentation
- [ ] Migration tooling for existing prompts
- [ ] Analytics dashboard

### Nice to Have (Enhancement)
- [ ] Docker deployment options
- [ ] Advanced search filters
- [ ] Prompt composition features
- [ ] AI-assisted prompt generation
- [ ] Web-based prompt editor

---

## Execution Instructions for Claude Code

### For Each Phase:

1. **Read the corresponding reference file** (e.g., SETUP.md, CONFIG.md)
2. **Create files in order** listed in the reference
3. **Test each file** before moving to the next
4. **Run validation** commands provided
5. **Report status** with ✅ or ❌
6. **Stop and ask for clarification** if blocked
7. **Document any deviations** from the plan

### Testing Protocol:

After creating each group of files:
```bash
npm run lint              # Check TypeScript/formatting
npm run validate         # Run validation scripts
npm run build            # Test build process
npm run dev              # Start dev server (5 min test)
```

### Debugging Protocol:

If errors occur:
1. Capture full error message
2. Check the reference file for context
3. Review recently created files
4. Propose fix with explanation
5. Execute fix
6. Re-test

---

## Dependencies to Install

```bash
npm install --save-dev \
  fumadocs-mdx \
  fumadocs-core \
  fumadocs-openapi \
  @next/mdx \
  zod \
  typescript \
  ts-node \
  jest \
  @types/jest

npm install \
  react \
  react-dom \
  next \
  framer-motion
```

---

## Key Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
ENABLE_EXPERIMENTAL_FEATURES=false
```

---

## Communication Protocol

**Status Report Format (after each phase):**
```
## Phase X: [Name] - COMPLETE ✅

### Summary
- [X completed items]
- [Y total items]

### Files Created
- file1.ts
- file2.md

### Tests Passed
- ✅ Build successful
- ✅ No lint errors
- ✅ Schema validation passed

### Next Phase Readiness
Ready for Phase X+1 ✅
```

**If Blocked:**
```
## BLOCKED - Phase X

### Issue
[Specific error or question]

### Context
[What were you trying to do]

### Need Help With
[Specific clarification needed]
```

---

## Reference Files to Use

Start with these in order:
1. **SETUP.md** - Phase 1: Initial project setup
2. **CONFIG.md** - Phase 2: Configuration files
3. **SCRIPTS.md** - Phase 3: Exporter and validation tooling
4. **TEMPLATES.md** - Phase 4: Documentation templates
5. **IMPLEMENTATION.md** - Phase 4-5: Prompt migration and integration
6. **TESTING.md** - Phase 6: Testing and validation
7. **DEPLOYMENT.md** - Phase 7: Deployment and launch

---

## Success Metrics

Project is complete when:
- ✅ All 7 phases executed
- ✅ 100% of files created and tested
- ✅ Fumadocs instance runs locally on :3000
- ✅ All exporters produce valid output
- ✅ 5+ example prompts loaded
- ✅ CI/CD pipeline passing
- ✅ Comprehensive documentation written
- ✅ No blocking bugs or errors

---

## Project Constraints

- **No external APIs required** (self-contained)
- **No authentication layers** (add later if needed)
- **No database** (JSON-based, file system storage)
- **No deployment to production** (staging/local only)
- **No real-time features** (static exports)

---

## Start Here

1. Read this entire file
2. Go to SETUP.md
3. Execute Phase 1
4. Report status using format above
5. Proceed to next phase only when Phase N is ✅ COMPLETE

**Ready to begin? Confirm by:**
- Reading all reference files
- Running Phase 1 setup
- Reporting back with status

---

## Quick Reference: NPM Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "validate": "ts-node tools/scripts/validate-prompts.ts",
    "export:all": "bash tools/scripts/export-all.sh",
    "export:claude": "ts-node tools/exporters/claude-export.ts",
    "export:raycast": "ts-node tools/exporters/raycast-export.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "migrate": "ts-node tools/scripts/migrate-prompts.ts",
    "health-check": "ts-node tools/scripts/check-health.ts"
  }
}
```

---

## Final Checklist

- [ ] Read entire claude.md
- [ ] Read SETUP.md through DEPLOYMENT.md
- [ ] Understand project phases
- [ ] Know reference files
- [ ] Ready to execute Phase 1
- [ ] Understand status report format
- [ ] Know when to ask for help

**Let's build this! 🚀**
