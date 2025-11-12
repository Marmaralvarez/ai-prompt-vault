# Version Management

This guide explains how versioning works in the AI Prompt Library and best practices for managing prompt versions.

## Semantic Versioning

All prompts use semantic versioning in the format: **major.minor.patch**

```
X.Y.Z
│ │ │
│ │ └─ Patch: Bug fixes, minor improvements (1.0.0 → 1.0.1)
│ └─── Minor: New features, enhancements (1.0.0 → 1.1.0)
└───── Major: Breaking changes (1.0.0 → 2.0.0)
```

## Version Levels

### Patch Releases (1.0.0 → 1.0.1)

**Use patch version for:**
- Typo fixes
- Clarification of existing instructions
- Minor wording improvements
- Bug fixes in examples
- Grammar/punctuation corrections

**Examples:**
```
❌ 1.0.0: "ensure all code follows PEP8"
✅ 1.0.1: "ensure all code follows PEP 8"

❌ 1.0.0: "Review the following code..."
✅ 1.0.1: "Review the provided code..."
```

**When to use patch:**
- User finds a typo
- Examples have minor errors
- Instructions need clarification
- No change to core functionality

### Minor Releases (1.0.0 → 1.1.0)

**Use minor version for:**
- Adding new sections to the prompt
- Expanding examples
- Adding new output formats
- Improving quality/clarity
- Adding optional features
- Extending guidance

**Examples:**
```
❌ 1.0.0: Basic code review prompt
✅ 1.1.0: Code review + added security focus section

❌ 1.0.0: Three example test cases
✅ 1.1.0: Five example test cases with edge cases

❌ 1.0.0: Return as JSON
✅ 1.1.0: Return as JSON or Markdown (new option)
```

**When to use minor:**
- Adding guidance without breaking existing usage
- Expanding prompt capabilities
- New but backward-compatible features
- Improvements that don't change core behavior

### Major Releases (1.0.0 → 2.0.0)

**Use major version for:**
- Significant prompt restructuring
- Changing core instructions
- Breaking changes to output format
- Changing the prompt type
- Fundamental capability changes
- Removing sections or requirements

**Examples:**
```
❌ 1.x.x: Review for code quality, security, and performance
✅ 2.0.0: Review ONLY for security (removed quality/performance focus)

❌ 1.x.x: Return as plain text
✅ 2.0.0: Return as ONLY JSON (breaking format change)

❌ 1.x.x: For TypeScript code only
✅ 2.0.0: For any language (fundamental expansion)
```

**When to use major:**
- Changing what the prompt does
- Breaking backward compatibility
- Changing output format in incompatible way
- Restructuring prompt fundamentally

## Version History

Track version changes in your prompt files:

```yaml
---
title: "Code Review Expert"
version: "1.2.1"
created: "2024-01-15"
lastModified: "2024-01-20"
changelog:
  - version: "1.2.1"
    date: "2024-01-20"
    changes:
      - "Fixed typo in instructions section"
  - version: "1.2.0"
    date: "2024-01-18"
    changes:
      - "Added performance optimization section"
      - "Expanded examples with edge cases"
  - version: "1.1.0"
    date: "2024-01-15"
    changes:
      - "Added security focus area"
      - "New output format option"
  - version: "1.0.0"
    date: "2024-01-10"
    changes:
      - "Initial release"
---
```

## Version Management Workflow

### Step 1: Make Changes

Edit your prompt file with improvements or fixes.

```markdown
---
title: "Code Review Expert"
version: "1.0.0"  # Will update in next step
---

## Changes made
- Added new security section
- Improved examples
```

### Step 2: Determine Version Change

Ask yourself:
1. Is this a breaking change? → Use major (X.0.0)
2. Is this a new feature/enhancement? → Use minor (x.Y.0)
3. Is this a fix/clarification? → Use patch (x.y.Z)

### Step 3: Update Version Number

Update the `version` field and `lastModified` date:

```yaml
---
title: "Code Review Expert"
version: "1.1.0"  # Updated
lastModified: "2024-01-18"  # Updated
---
```

### Step 4: Document Changes

Add to changelog in the file:

```yaml
changelog:
  - version: "1.1.0"
    date: "2024-01-18"
    changes:
      - "Added security audit section"
      - "Expanded examples with real-world cases"
      - "Clarified output format requirements"
```

### Step 5: Test Changes

```bash
# Validate the prompt
npm run validate

# Test with AI model
# Ensure output quality hasn't decreased
```

### Step 6: Commit Changes

```bash
git add docs/prompts/agents/code-review-expert.md
git commit -m "feat(code-review): add security focus (v1.1.0)"
```

**Commit message format:**
```
type(scope): description (version)

type: feat|fix|docs|refactor
scope: prompt category (e.g., code-review, security-audit)
version: resulting version number
```

## Breaking Changes

### What Constitutes a Breaking Change?

**Breaking:**
- Output format changes (JSON → XML)
- Role changes fundamentally
- Removing required sections
- Changing input requirements
- Incompatible model requirements

**Not breaking:**
- Adding new optional sections
- Improving wording
- Adding clarifying examples
- Bug fixes in examples
- Adding output format options

### Communicating Breaking Changes

When making major version releases:

1. **Add migration guide:**
```markdown
## Migration from v1.x to v2.0

### Changes
- Output format changed from CSV to JSON
- Added "severity" field to all entries

### Migration Steps
1. Update JSON parsing in your code
2. Add handling for severity field
3. Test with v2.0 before deploying

### Old Format (v1.x)
[example]

### New Format (v2.0)
[example]
```

2. **Update documentation:**
- Mark old version as deprecated in docs
- Link to migration guide
- Show both formats if relevant

3. **Add deprecation notices:**
```yaml
status: "deprecated"  # In old version
deprecationNotice: "Use v2.0.0 or newer (breaking changes in output format)"
replacementPromptSlug: "code-review-expert"  # If truly replaced
```

## Pre-Release Versions

For testing significant changes before full release:

```yaml
version: "2.0.0-rc1"  # Release candidate
version: "2.0.0-beta1"  # Beta version
version: "2.0.0-alpha1"  # Alpha version
```

**When to use pre-releases:**
- Seeking feedback on major changes
- Testing incompatible API changes
- Community review period
- Gradual rollout of big features

## Managing Multiple Versions

### Keep Latest as Default

```yaml
version: "1.2.1"     # Current
status: "published"

version: "1.2.0"     # Previous
status: "deprecated"

version: "1.0.0"     # Old
status: "archived"
```

### Status Values

| Status | Meaning | Use Case |
|--------|---------|----------|
| `published` | Current, recommended version | Latest, stable version |
| `draft` | Work in progress | Not ready yet |
| `deprecated` | Old but still functional | Use newer version instead |
| `archived` | No longer supported | Historical reference only |

### Export Specific Versions

```bash
# Export only published versions (default)
npm run export:claude

# Export with specific versions (custom script)
npm run export:claude -- --include-deprecated

# Include all versions
npm run export:all -- --versions=all
```

## Version Dependencies

### When Prompts Depend on Other Prompts

```yaml
title: "Advanced Security Audit"
version: "1.0.0"
relatedPrompts:
  - "security-audit-basics:1.0.0"  # Specify version
  - "code-review-expert:^1.2.0"    # Accept minor updates
  - "vulnerability-testing:*"       # Accept any version
```

**Version selectors:**
- `security-audit:1.0.0` - Exact version
- `security-audit:^1.2.0` - ^1.2.0 (minor updates allowed)
- `security-audit:~1.2.0` - ~1.2.0 (patch updates allowed)
- `security-audit:*` - Any version

## Version Compatibility Matrix

Document what versions work together:

```markdown
# Compatibility Matrix

| Code Review | Security Audit | Performance | Status |
|-------------|----------------|-------------|--------|
| 1.x | 1.0.0-1.2.0 | 1.x | Compatible |
| 2.0.0+ | 2.0.0+ | 2.0.0+ | Recommended |
| 1.x | 2.0.0+ | 1.x | ⚠️ Partial |
```

## API Versioning

### For API Endpoints

If serving prompts via API, version them:

```typescript
// v1 endpoint (deprecated)
GET /api/v1/prompts/:slug
// Returns old format

// v2 endpoint (recommended)
GET /api/v2/prompts/:slug
// Returns new format
```

## Best Practices

### 1. Don't Skip Versions

❌ Jump from 1.0.0 → 3.0.0
✅ Go 1.0.0 → 1.1.0 → 2.0.0

Exception: Major milestone releases (e.g., 1.0.0 → 10.0.0) if intentional.

### 2. Update lastModified with Every Version

```yaml
lastModified: "2024-01-20"  # Update every time
version: "1.0.1"  # Even for patch changes
```

### 3. Meaningful Changelog Entries

❌ "Updated"
✅ "Added security audit section and clarified output format"

### 4. Test Before Releasing

```bash
npm run validate
npm run build
npm run test
# Then commit and tag
```

### 5. Tag Releases in Git

```bash
# Create git tag for each version
git tag -a v1.1.0 -m "Release: Code Review Expert v1.1.0"
git push origin v1.1.0
```

### 6. Document Breaking Changes

Always explain what's different and why.

### 7. Maintain Backward Compatibility When Possible

Plan upgrades to be non-breaking when possible (minor instead of major).

## Checking Version History

### View All Versions

```bash
# Show git history for specific prompt
git log --oneline docs/prompts/agents/code-review-expert.md

# Show all version tags
git tag -l
```

### Compare Versions

```bash
# See what changed between versions
git diff v1.0.0 v1.1.0 -- docs/prompts/agents/code-review-expert.md
```

## Version Recovery

### Revert to Previous Version

```bash
# Revert to specific commit
git checkout <commit-hash> -- docs/prompts/agents/code-review-expert.md

# Or use git revert for new commit
git revert <commit-hash>
```

### Restore Deleted Prompt

```bash
# Find in git history
git log --diff-filter=D -- docs/prompts/agents/old-prompt.md

# Restore
git checkout <commit-hash>^ -- docs/prompts/agents/old-prompt.md
```

## Release Management

### Release Checklist

```markdown
## Release Checklist v1.2.0

- [ ] All changes committed
- [ ] Changelog updated
- [ ] Version number updated
- [ ] `npm run validate` passes
- [ ] `npm run build` succeeds
- [ ] Tests pass (`npm run test`)
- [ ] PR reviewed and approved
- [ ] Merged to main branch
- [ ] Git tag created (v1.2.0)
- [ ] Exports generated (`npm run export:all`)
- [ ] Documentation updated
- [ ] Release notes prepared
```

### Create Release Notes

```markdown
# v1.2.0 Release Notes

**Release Date:** 2024-01-20

## What's New
- Security audit section added
- 3 new detailed examples
- Improved output format documentation

## Breaking Changes
None

## Upgrade Path
Update from v1.1.0 → v1.2.0 (non-breaking)

## Contributors
- Maria Martin (@mariamartin)

## Files Changed
- docs/prompts/agents/code-review-expert.md
```

## Summary

**Version format:** `major.minor.patch`
- **Patch** (1.0.Z): Fixes and clarifications
- **Minor** (1.Y.0): Features and enhancements
- **Major** (X.0.0): Breaking changes

**Always:**
- Update version in frontmatter
- Update lastModified date
- Document changes in changelog
- Test before committing
- Tag releases in git
