# Tagging Strategy

Tags are crucial for discovering, organizing, and filtering prompts in the library. This guide explains the tagging system and best practices.

## Overview

**Why tags matter:**
- Enables full-text search across prompts
- Organizes prompts into discoverable categories
- Filters results by skill, domain, or use case
- Helps users find related prompts
- Improves library navigation

**Tag requirements:**
- Minimum 2 tags per prompt
- Maximum 10 tags per prompt
- Lowercase only
- Hyphens for multi-word tags (e.g., `code-review`)
- No special characters or spaces

## Core Tag Categories

### 1. Skill/Domain Tags

Describe the primary skill or domain the prompt focuses on:

**Development Skills:**
- `code-review`
- `testing`
- `debugging`
- `performance-optimization`
- `refactoring`
- `documentation`
- `api-design`

**Security:**
- `security`
- `vulnerability-testing`
- `penetration-testing`
- `compliance`
- `encryption`
- `authentication`
- `authorization`

**UI/UX:**
- `ux-design`
- `ui-design`
- `accessibility`
- `responsive-design`
- `user-research`
- `usability-testing`

**DevOps/Infrastructure:**
- `devops`
- `deployment`
- `ci-cd`
- `docker`
- `kubernetes`
- `monitoring`
- `infrastructure-as-code`

### 2. Technology/Framework Tags

Specify technologies this prompt works with:

**Languages:**
- `javascript`
- `typescript`
- `python`
- `go`
- `rust`
- `java`
- `csharp`

**Frameworks:**
- `react`
- `angular`
- `vue`
- `nextjs`
- `express`
- `fastapi`
- `django`

**Tools:**
- `git`
- `docker`
- `kubernetes`
- `terraform`
- `webpack`
- `vite`

### 3. Difficulty Tags

Indicate the skill level required:

- `beginner` - No specialized knowledge needed
- `intermediate` - Some domain experience required
- `advanced` - Expert-level knowledge needed

**Only use ONE difficulty tag per prompt.**

### 4. Use Case Tags

Describe what the prompt is for:

**Common use cases:**
- `code-quality`
- `security-audit`
- `performance-tuning`
- `team-standards`
- `onboarding`
- `training`
- `interview-prep`
- `project-planning`
- `documentation`
- `bug-fixing`

### 5. Platform Tags

Specify which platforms this prompt works well on:

- `claude`
- `chatgpt`
- `raycast`
- `generic` (works on all platforms)

**Note:** Platform tags should match the `platforms` field in YAML frontmatter.

### 6. Industry/Domain Tags

For industry-specific prompts:

**Web Development:**
- `web-development`
- `frontend`
- `backend`
- `fullstack`

**Mobile Development:**
- `mobile-development`
- `ios`
- `android`
- `react-native`

**Data:**
- `data-analysis`
- `machine-learning`
- `data-visualization`
- `database-design`

**Other Industries:**
- `healthcare`
- `finance`
- `ecommerce`
- `saas`
- `enterprise`

## Tag Examples by Prompt Type

### Example 1: Code Review Agent

**Prompt:** Security-focused code review for Node.js APIs

```yaml
tags:
  - code-review
  - security
  - nodejs
  - api-design
  - advanced
  - code-quality
```

**Why these tags:**
- `code-review` - Primary skill
- `security` - Focus area
- `nodejs` - Technology
- `api-design` - Related skill
- `advanced` - Difficulty level
- `code-quality` - Use case

### Example 2: Getting Started with React

**Prompt:** Tutorial-style prompt for learning React

```yaml
tags:
  - react
  - javascript
  - tutorial
  - beginner
  - web-development
  - frontend
```

### Example 3: Angular Coding Standards

**Prompt:** Organization-wide Angular standards

```yaml
tags:
  - angular
  - typescript
  - coding-standards
  - team-standards
  - intermediate
  - web-development
```

### Example 4: OWASP Compliance

**Prompt:** Security compliance checklist

```yaml
tags:
  - security
  - compliance
  - owasp
  - vulnerability-testing
  - advanced
  - security-audit
```

### Example 5: Accessibility Audit

**Prompt:** Web accessibility review

```yaml
tags:
  - accessibility
  - wcag
  - ux-design
  - web-development
  - intermediate
  - compliance
```

## Tag Combinations

**Effective tag combinations:**
- Skill + Technology + Difficulty
- Domain + Use Case + Platform
- Framework + Coding Standards + Team Standards

**Example:**
```yaml
tags:
  - react           # Technology
  - typescript      # Language
  - testing         # Skill
  - intermediate    # Difficulty
  - code-quality    # Use case
```

**Poor combinations (too generic):**
```yaml
tags:
  - help            # Too vague
  - stuff           # Too vague
  - thing           # Not searchable
```

## Searchability Best Practices

### Think Like a User

When creating tags, ask:
- "What would someone search for to find this?"
- "What problem does this solve?"
- "What technology does it use?"
- "What's the difficulty level?"

### Include Variations

Help users find prompts even if they search differently:

**Multiple tags for same concept:**
```yaml
tags:
  - code-review     # Primary
  - peer-review     # Alternative search
  - code-quality    # Related concept
```

### Use Hyphenated Phrases

Multi-word tags should use hyphens:

✅ `machine-learning`
✅ `penetration-testing`
✅ `api-design`

❌ `machine learning`
❌ `penetrationtesting`
❌ `apidesign`

### Match Industry Terminology

Use terms your users would search for:

✅ `refactoring` (common term)
❌ `code-reorganization` (less common)

✅ `ci-cd` (industry standard)
❌ `continuous-integration-deployment` (too long)

## Common Mistakes

### ❌ Too Many Tags (>10)

```yaml
tags:
  - code
  - review
  - quality
  - best-practices
  - standards
  - security
  - performance
  - testing
  - documentation
  - advanced
  - expert
  - professional  # Exceeds limit
```

**Fix:** Choose the 8-10 most relevant tags.

### ❌ Too Few Tags (<2)

```yaml
tags:
  - coding  # Not enough tags to discover
```

**Fix:** Add skill, technology, difficulty, and use case tags.

### ❌ Inconsistent Formatting

```yaml
tags:
  - CodeReview      # Should be lowercase
  - code review     # Should use hyphens
  - code_review     # Should use hyphens
  - code-review     # Correct
```

### ❌ Overly Specific Tags

```yaml
tags:
  - react-18-2-0    # Too specific
  - mac-only        # Too platform-specific
```

**Better:**
```yaml
tags:
  - react
  - typescript
  - web-development
```

### ❌ Personal or Irrelevant Tags

```yaml
tags:
  - my-favorite     # Personal opinion
  - cool           # Not descriptive
  - random-prompt  # Not meaningful
```

## Tag Maintenance

### Keep Tags Consistent

**Regular tag audits:**
1. Review all tags across prompts
2. Identify duplicates or variations
3. Standardize to single version
4. Update prompts with standard tags

**Example standardization:**
- Consolidate: `code-review`, `code_review`, `codereview` → `code-review`
- Consolidate: `typescript`, `ts` → `typescript`

### Add New Tags Carefully

Before adding a new tag:
1. Check if existing tag covers the concept
2. Consider if it would be useful for multiple prompts
3. Ensure consistency with existing tags
4. Update documentation

### Deprecate Old Tags

When a tag is no longer needed:
1. Identify all prompts using it
2. Update with replacement tag
3. Remove from library gradually
4. Document the change

## Tag Reference

### Quick Lookup Table

| Category | Examples |
|----------|----------|
| **Skills** | code-review, testing, documentation, security |
| **Languages** | javascript, typescript, python, go, rust |
| **Frameworks** | react, angular, vue, nextjs, express |
| **Difficulty** | beginner, intermediate, advanced |
| **Use Cases** | code-quality, team-standards, onboarding |
| **Platforms** | claude, chatgpt, raycast, generic |
| **Industries** | web-development, mobile, data, healthcare |

## Tag Search Examples

**Find code review prompts:**
- Search: `tags:code-review`
- Shows: All prompts tagged with code-review

**Find beginner-friendly prompts:**
- Search: `tags:beginner`
- Shows: All beginner prompts

**Find React prompts:**
- Search: `tags:react`
- Shows: All React-related prompts

**Combine searches:**
- Search: `tags:react tags:beginner`
- Shows: Beginner-friendly React prompts

## Creating a Tag Guidelines Document

For your team, create a shared document:

```markdown
# Team Tag Guidelines

## Required Tags (Always Include)
- One difficulty tag (beginner, intermediate, advanced)
- At least one skill tag
- At least one technology tag (if applicable)

## Optional Tags
- Use case tags
- Platform tags (if prompt optimized for specific platform)
- Industry tags (if industry-specific)

## Standardized Tags for Our Team
[List your team's standard tags]

## Examples
[Show 3-5 good examples]

## Review Process
[Who reviews tags, when, how]
```

## Tools and Automation

### Validating Tags

The schema validation ensures:
- Minimum 2 tags ✓
- Maximum 10 tags ✓
- Lowercase only ✓
- Valid format ✓

```typescript
// From tools/schemas/prompt-schema.ts
tags: z.array(z.string()).min(2).max(10)
```

### Searching Tags

```bash
# Search for prompts by tag
grep -r "tags:" docs/prompts/ | grep "code-review"

# Generate tag report
npm run tag:report  # (custom script)
```

## Next Steps

- Review existing prompts' tags for consistency
- Create team tag guidelines document
- Audit tags in your prompts
- Update prompts with improved tags
- Monitor tag usage over time
