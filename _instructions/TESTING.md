# Phase 6: Testing & Validation - Detailed Instructions

**Duration:** 2 hours  
**Objective:** Comprehensive testing of all systems  
**Success Criteria:** 100% test pass rate, no critical issues

---

## Step 1: Unit Tests for Schemas

### 1.1 Create tests/schemas.test.ts

```typescript
import { validatePromptMetadata, validateRegistry } from '../tools/schemas/prompt-schema'

describe('Prompt Schema Validation', () => {
  describe('validatePromptMetadata', () => {
    it('should validate correct metadata', () => {
      const valid = {
        title: 'Test Prompt',
        description: 'This is a test description that is long enough',
        type: 'agent',
        slug: 'test-prompt',
        version: '1.0.0',
        author: { name: 'Test Author' },
        tags: ['test', 'demo'],
      }
      
      const result = validatePromptMetadata(valid)
      expect(result.valid).toBe(true)
    })

    it('should reject missing title', () => {
      const invalid = {
        description: 'Description',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }
      
      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject invalid type', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'invalid-type',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }
      
      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject non-semver version', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0',  // Invalid
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }
      
      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject kebab-case slug', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'Test_Slug',  // Not kebab-case
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }
      
      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should require minimum 2 tags', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test'],  // Only 1 tag
      }
      
      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject more than 10 tags', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: Array(11).fill('tag'),  // 11 tags
      }
      
      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })
  })
})
```

### 1.2 Run Unit Tests

```bash
npm run test -- tests/schemas.test.ts

# Expected output:
# PASS  tests/schemas.test.ts
# ✓ All 8 tests passing
```

---

## Step 2: Export Pipeline Tests

### 2.1 Create tests/exporters.test.ts

```typescript
import { exportToClaude, exportToClaudeProjects } from '../tools/exporters/claude-export'
import { exportToChatGPT } from '../tools/exporters/chatgpt-export'
import { exportToRaycast } from '../tools/exporters/raycast-export'
import { exportToCSV } from '../tools/exporters/csv-export'
import { exportToMarkdown } from '../tools/exporters/markdown-export'
import { PromptData } from '../tools/exporters/types'

const mockPrompt: PromptData = {
  id: 'test-1',
  title: 'Test Prompt',
  slug: 'test-prompt',
  type: 'agent',
  description: 'Test description',
  content: 'Test content for the prompt',
  frontmatter: { difficulty: 'beginner', platforms: ['claude'] },
  status: 'published',
  tags: ['test', 'demo'],
  version: '1.0.0',
  author: { name: 'Test' },
  created: '2025-01-11T00:00:00Z',
  lastModified: '2025-01-11T00:00:00Z',
  estimatedTokens: 100,
}

describe('Export Pipeline', () => {
  describe('Claude Exporter', () => {
    it('should export to Claude format', () => {
      const result = exportToClaude([mockPrompt])
      
      expect(result.success).toBe(true)
      expect(result.format).toBe('claude-json')
      expect(result.promptCount).toBe(1)
      expect(result.content).toContain('test-prompt')
    })

    it('should produce valid JSON', () => {
      const result = exportToClaude([mockPrompt])
      
      expect(() => {
        JSON.parse(result.content)
      }).not.toThrow()
    })
  })

  describe('ChatGPT Exporter', () => {
    it('should export to ChatGPT format', () => {
      const result = exportToChatGPT([mockPrompt])
      
      expect(result.success).toBe(true)
      expect(result.format).toBe('chatgpt')
      expect(result.promptCount).toBe(1)
    })
  })

  describe('Raycast Exporter', () => {
    it('should export to Raycast format', () => {
      const result = exportToRaycast([mockPrompt])
      
      expect(result.success).toBe(true)
      expect(result.format).toBe('raycast')
      expect(result.promptCount).toBe(1)
    })

    it('should truncate content for Raycast', () => {
      const longPrompt = {
        ...mockPrompt,
        content: 'A'.repeat(3000),  // 3000 chars
      }
      
      const result = exportToRaycast([longPrompt])
      const data = JSON.parse(result.content)
      
      expect(data[0].prompt.length).toBeLessThan(3000)
    })
  })

  describe('CSV Exporter', () => {
    it('should export to CSV format', () => {
      const result = exportToCSV([mockPrompt])
      
      expect(result.success).toBe(true)
      expect(result.format).toBe('csv')
      expect(result.content).toContain('Test Prompt')
    })

    it('should properly escape CSV special characters', () => {
      const specialPrompt = {
        ...mockPrompt,
        title: 'Test, "Prompt"',
      }
      
      const result = exportToCSV([specialPrompt])
      
      expect(result.content).toContain('"Test, \\"Prompt\\""')
    })
  })

  describe('Markdown Exporter', () => {
    it('should export to Markdown format', () => {
      const result = exportToMarkdown([mockPrompt])
      
      expect(result.success).toBe(true)
      expect(result.format).toBe('markdown')
      expect(result.content).toContain('Test Prompt')
    })

    it('should include headers and structure', () => {
      const result = exportToMarkdown([mockPrompt])
      
      expect(result.content).toContain('# AI Prompt Library')
      expect(result.content).toContain('## Agents')
    })
  })

  describe('Filter Options', () => {
    it('should filter out draft prompts', () => {
      const draftPrompt = { ...mockPrompt, status: 'draft' }
      
      const result = exportToClaude([mockPrompt, draftPrompt], {
        includeDraft: false,
      })
      
      expect(result.promptCount).toBe(1)
    })

    it('should respect custom filters', () => {
      const result = exportToClaude([mockPrompt, mockPrompt], {
        filter: (p) => p.type === 'agent',
      })
      
      expect(result.promptCount).toBe(2)
    })
  })
})
```

### 2.2 Run Export Tests

```bash
npm run test -- tests/exporters.test.ts

# Expected output:
# PASS  tests/exporters.test.ts
# ✓ All exporter tests passing
```

---

## Step 3: Integration Tests

### 3.1 Create tests/integration.test.ts

```typescript
import fs from 'fs'
import path from 'path'
import { PromptExporter } from '../tools/exporters'

describe('Integration Tests', () => {
  const exporter = new PromptExporter('docs')
  
  it('should load prompts from filesystem', async () => {
    const prompts = await exporter.loadPrompts()
    
    expect(Array.isArray(prompts)).toBe(true)
    expect(prompts.length).toBeGreaterThan(0)
  })

  it('should load prompts with valid structure', async () => {
    const prompts = await exporter.loadPrompts()
    
    prompts.forEach(prompt => {
      expect(prompt.id).toBeDefined()
      expect(prompt.title).toBeDefined()
      expect(prompt.slug).toBeDefined()
      expect(prompt.type).toBeDefined()
      expect(prompt.content).toBeDefined()
    })
  })

  it('should export to all formats without errors', async () => {
    const outputDir = './tests/output'
    fs.mkdirSync(outputDir, { recursive: true })
    
    const results = await exporter.exportAll(outputDir)
    
    expect(results.claude.success).toBe(true)
    expect(results.chatgpt.success).toBe(true)
    expect(results.raycast.success).toBe(true)
    expect(results.csv.success).toBe(true)
    expect(results.markdown.success).toBe(true)
  })

  it('should generate valid JSON in exports', async () => {
    const outputDir = './tests/output'
    const results = await exporter.exportAll(outputDir)
    
    // Verify Claude export
    const claudeFile = path.join(outputDir, 'prompts-claude.json')
    const claudeContent = fs.readFileSync(claudeFile, 'utf-8')
    expect(() => JSON.parse(claudeContent)).not.toThrow()
  })

  it('should create all expected export files', async () => {
    const outputDir = './tests/output'
    await exporter.exportAll(outputDir)
    
    const expectedFiles = [
      'prompts-claude.json',
      'prompts-chatgpt.json',
      'prompts-raycast.json',
      'prompts-import.csv',
      'prompts-bundle.md',
    ]
    
    for (const file of expectedFiles) {
      const filepath = path.join(outputDir, file)
      expect(fs.existsSync(filepath)).toBe(true)
    }
  })

  afterAll(() => {
    // Cleanup
    if (fs.existsSync('./tests/output')) {
      fs.rmSync('./tests/output', { recursive: true })
    }
  })
})
```

### 3.2 Run Integration Tests

```bash
npm run test -- tests/integration.test.ts

# Expected output:
# PASS  tests/integration.test.ts
# ✓ All integration tests passing
```

---

## Step 4: Markdown Linting

### 4.1 Setup Markdown Linting

```bash
npm install --save-dev markdownlint markdownlint-cli

# Add to package.json scripts
{
  "scripts": {
    "lint:md": "markdownlint '**/*.md' --ignore node_modules"
  }
}
```

### 4.2 Create .markdownlintignore

**File: `.markdownlintignore`**

```
node_modules/
.next/
out/
```

### 4.3 Run Markdown Linting

```bash
npm run lint:md

# Expected: No linting errors for docs/ prompts
```

---

## Step 5: Build Verification

### 5.1 Full Build Test

```bash
# Clean build
rm -rf .next out node_modules/.cache

# Run build
npm run build

# Expected output:
# ▲ Next.js 14.x.x
# ✓ Compiled successfully
# ✓ Linted successfully  
# ✓ Created optimized production build
```

### 5.2 Type Checking

```bash
# Run TypeScript compiler
npx tsc --noEmit

# Expected: No errors (exit code 0)
```

### 5.3 Linting

```bash
# Run ESLint
npm run lint

# Expected: No linting errors
```

---

## Step 6: Manual Testing

### 6.1 Start Development Server

```bash
npm run dev

# Navigate to http://localhost:3000

# Verify:
# ✅ Homepage loads
# ✅ Navigation bar visible
# ✅ Search bar functional
# ✅ Sidebar expands/collapses
# ✅ No console errors
```

### 6.2 Test Navigation

```
Test checklist:
✅ Click "Agents" link → Loads agent prompts
✅ Click "Features" link → Loads features
✅ Click "Rules" submenu → Shows coding standards
✅ Click back button → Navigation works
✅ Search functionality → Returns results
✅ Click prompt → Shows full content
```

### 6.3 Test Search

```bash
# In browser console or dev tools

# Test searches:
✅ Search "security" → Shows security prompts
✅ Search "coding" → Shows coding standards
✅ Search "react" → Shows React prompts
✅ Search "nonexistent" → Shows 0 results
```

### 6.4 Test Export Functions

```bash
# Validate each export works
npm run export:claude > /tmp/test.json
cat /tmp/test.json | jq . > /dev/null && echo "✅ Claude export valid"

npm run export:chatgpt > /tmp/test.json
cat /tmp/test.json | jq . > /dev/null && echo "✅ ChatGPT export valid"

npm run export:raycast > /tmp/test.json
cat /tmp/test.json | jq . > /dev/null && echo "✅ Raycast export valid"

npm run export:csv > /tmp/test.csv
wc -l /tmp/test.csv && echo "✅ CSV export created"
```

---

## Step 7: Validation Report

### 7.1 Run Validation

```bash
npm run validate

# Expected:
# 📋 Validating prompts...
# Total: 5+
# Valid: 5+ ✅
# Invalid: 0 ❌
# ✨ All prompts valid!
```

### 7.2 Performance Check

```bash
# Measure build performance
npm run build -- --profile

# Check file sizes
ls -lah .next/static/chunks/

# Expected: Reasonable bundle sizes
```

### 7.3 Generate Test Report

**Create file: `TEST_REPORT.md`**

```markdown
# Test Report - [DATE]

## Summary
- Build Status: ✅ PASS
- Test Coverage: 100%
- No Critical Issues

## Unit Tests
- Schemas: 8/8 ✅
- Exporters: 12/12 ✅
- Utils: N/A

## Integration Tests
- Load Prompts: ✅
- Export All: ✅
- File Generation: ✅

## Manual Tests
- Navigation: ✅
- Search: ✅
- Exports: ✅

## Performance
- Build Time: ~30s
- Bundle Size: <500KB
- Lighthouse Score: 95+

## Issues Found
- None

## Sign-Off
- Date: [TODAY]
- Tested By: Claude Code
- Status: Ready for Production
```

---

## Step 8: Pre-Launch Checklist

```bash
# Run all tests
npm run test                    # ✅ All tests pass
npm run validate               # ✅ All prompts valid
npm run build                  # ✅ Build succeeds
npx tsc --noEmit              # ✅ No TypeScript errors
npm run lint                   # ✅ No lint errors
npm run lint:md               # ✅ Markdown valid

# Manual verification
npm run dev
# ✅ Navigate all sections
# ✅ Test search
# ✅ Check console for errors
# Ctrl+C to exit

# Export verification
npm run export:all
# ✅ All exports succeed
# ✅ All files valid JSON/CSV
```

---

## Step 9: Commit Testing Phase

```bash
# Add test files
git add tests/
git add TEST_REPORT.md

# Commit
git commit -m "feat: Complete Phase 6 - Testing and validation

- Add unit tests for schemas
- Add integration tests for exporters
- Add markdown linting
- Add build verification
- Create test report
- Verify all systems working
- Prepare for production deployment"

# Verify
git log --oneline -5
```

---

## Phase 6 Completion Checklist

- [ ] Unit tests created and passing (8+ tests)
- [ ] Integration tests created and passing (5+ tests)
- [ ] Markdown linting configured and passing
- [ ] Build succeeds without errors
- [ ] TypeScript type checking passes
- [ ] ESLint passes
- [ ] Development server runs without errors
- [ ] Navigation tested and working
- [ ] Search functionality tested
- [ ] All exports produce valid output
- [ ] Validation passes for all prompts
- [ ] Test report generated
- [ ] Pre-launch checklist completed
- [ ] Git commits made

---

## Success Criteria

✅ **Phase 6 Complete when:**

```bash
# All tests pass
npm run test
# PASS All tests

# No build errors
npm run build
# ✓ Compiled successfully

# No validation errors
npm run validate
# ✨ All prompts valid!

# Manual verification
npm run dev
# Visit http://localhost:3000
# All features working ✅
```

---

## Next Steps

When Phase 6 is complete:

1. ✅ Run all test commands
2. ✅ Generate test report
3. ✅ Manual verification complete
4. ✅ Report completion status
5. ✅ Proceed to **DEPLOYMENT.md** for Phase 7

---

**Ready for Phase 6? Ensure quality through testing! ✅**
