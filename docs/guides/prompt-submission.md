# Prompt Submission Workflow

A comprehensive guide for contributing new prompts to the AI Prompt Library.

## Overview

This workflow ensures all prompts maintain consistent quality, structure, and compliance with our standards. The process involves validation, testing, and approval before prompts are published.

## Prerequisites

- Git installed and configured
- Node.js 18+ installed
- Access to the repository
- Basic understanding of YAML and Markdown

## Step-by-Step Submission Process

### Step 1: Prepare Your Environment

```bash
# Clone the repository
git clone <repository-url>
cd ai-prompt-vault

# Create a new branch for your prompt(s)
git checkout -b feat/my-new-prompt

# Verify your environment
npm install
npm run validate
```

### Step 2: Create Your Prompt File

Create a new Markdown file in the appropriate category directory:

- **Agents:** `docs/prompts/agents/your-agent-name.md`
- **Features:** `docs/prompts/features/your-feature-name.md`
- **Rules:** `docs/prompts/rules/your-rule-name.md`
- **Packs:** `docs/prompts/packs/your-pack-name.md`
- **Prompts:** `docs/prompts/prompts/your-prompt-name.md`

### Step 3: Use the Template Structure

Use the prompt template as a starting point. Every prompt must include:

```markdown
---
title: "Your Prompt Title"
description: "One-line description of what this prompt does"
type: "agent|feature|rule|pack|prompt"
slug: "your-prompt-slug"
status: "draft|published"
version: "1.0.0"
difficulty: "beginner|intermediate|advanced"
author:
  name: "Your Name"
  email: "your.email@example.com"
  url: "https://your-website.com"
tags:
  - tag1
  - tag2
  - tag3
created: "2025-01-15"
lastModified: "2025-01-15"
estimated_tokens: 500
related_prompts:
  - "slug-of-related-prompt"
---

# Your Prompt Title

## Role
Describe the persona/role this prompt assumes.

## Task
Describe what the prompt is asking the AI to do.

## Instructions
Provide step-by-step instructions...

## Output Format
Specify the format of the expected output.

## Constraints
List any constraints or limitations.
```

### Step 4: Validate Your Prompt Locally

```bash
# Validate all prompts (including your new one)
npm run validate

# You should see:
# ✅ your-prompt-name.md
# ✅ Valid: 1
# ❌ Invalid: 0
```

### Step 5: Test in Development

```bash
# Start the development server
npm run dev

# Visit http://localhost:3000
# Navigate to your prompt and verify:
# - Content displays correctly
# - Formatting is proper
# - Links work
# - No console errors
```

### Step 6: Export Testing (Optional)

```bash
# Test exports with your new prompt
npm run export:all

# Check data/exports/ to verify your prompt is included
# in all export formats (Claude, ChatGPT, Raycast, CSV, Markdown)
```

### Step 7: Commit Your Changes

```bash
# Stage your files
git add docs/prompts/[category]/your-prompt.md

# Commit with a descriptive message
git commit -m "feat: Add new [type] prompt - your prompt name

Description of what the prompt does and its purpose.

- Category: [agents/features/rules/etc]
- Type: [agent/feature/rule/pack/prompt]
- Difficulty: [beginner/intermediate/advanced]
- Estimated Tokens: [number]"

# Push to your branch
git push origin feat/my-new-prompt
```

### Step 8: Create a Pull Request

1. Go to GitHub and create a Pull Request
2. Use this template for your PR description:

```markdown
## Description
Brief description of the prompt(s) being added.

## Type
- [ ] Agent
- [ ] Feature
- [ ] Rule
- [ ] Pack
- [ ] Prompt

## Difficulty
- [ ] Beginner
- [ ] Intermediate
- [ ] Advanced

## Testing Done
- [ ] Validation passed (`npm run validate`)
- [ ] Dev server tested (`npm run dev`)
- [ ] Exports verified (`npm run export:all`)
- [ ] Build successful (`npm run build`)

## Checklist
- [ ] Prompt follows template structure
- [ ] All required frontmatter fields present
- [ ] Slug is kebab-case
- [ ] Version follows semver
- [ ] Content is clear and well-structured
- [ ] No sensitive information included
- [ ] Related prompts are referenced correctly
- [ ] Estimated tokens are reasonable

## Related Issues
Closes #[issue number] (if applicable)
```

### Step 9: Address Review Feedback

When reviewers provide feedback:

1. Make the requested changes
2. Run validation again
3. Commit with message: `fix: Address review feedback on [prompt name]`
4. Push updates (the PR updates automatically)
5. Wait for approval

### Step 10: Merge and Publish

Once approved:

1. Your PR will be merged to main
2. GitHub Actions workflow runs automatically
3. Build verification and validation occurs
4. Prompt is published when status changes to "published"

## Best Practices

### Prompt Content

- **Be Clear:** Use simple, unambiguous language
- **Be Specific:** Provide concrete examples and expected outcomes
- **Be Comprehensive:** Include edge cases and error handling
- **Be Testable:** Make it easy to verify the prompt works

### Formatting

- Use consistent heading hierarchy
- Break long sections into smaller parts
- Use code blocks for examples
- Use lists for step-by-step instructions
- Bold important terms

### Metadata

- **Slug:** Use kebab-case, match your filename
- **Version:** Start at 1.0.0, follow semver for updates
- **Tags:** Use 2-10 relevant tags
- **Estimated Tokens:** Be realistic about context window usage
- **Difficulty:** Consider target audience

### Related Prompts

Link to related prompts using slug names:

```yaml
related_prompts:
  - "code-review-comprehensive"
  - "api-documentation-generator"
  - "refactor-for-performance"
```

## Common Issues & Solutions

### Validation Fails

**Issue:** `Validation failed - missing required fields`

**Solution:** Check that all required fields are present in frontmatter:
- title, description, type, slug, status, version, author, tags, created, lastModified

### Build Fails

**Issue:** `Build failed - TypeScript errors`

**Solution:** Run `npm run lint` to identify issues, typically:
- Invalid YAML in frontmatter
- Missing closing triple backticks in code blocks
- Invalid date format

### Exports Empty

**Issue:** Prompt doesn't appear in exports

**Solution:** Check that:
- Status is "published" (not "draft")
- Validation passes locally
- File is in correct directory
- Run `npm run export:all` manually

## Troubleshooting

### I can't run npm commands

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear cache
npm cache clean --force
npm install
```

### My prompt doesn't show up locally

```bash
# Restart dev server
npm run dev

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Validation says my prompt is invalid

```bash
# Check the specific error
npm run validate

# Common issues:
# - Date format should be YYYY-MM-DD
# - Version must be semantic (X.Y.Z)
# - Slug must be kebab-case with no spaces
# - Tags must have 2-10 items
# - Status must be draft, published, deprecated, or archived
```

## Review Criteria

Reviewers will check:

✅ **Structure**
- [ ] Proper frontmatter format
- [ ] All required fields present
- [ ] Valid YAML syntax

✅ **Content Quality**
- [ ] Clear and helpful
- [ ] Well-organized
- [ ] Practical examples
- [ ] No sensitive information

✅ **Metadata**
- [ ] Appropriate type classification
- [ ] Reasonable difficulty level
- [ ] Realistic token estimate
- [ ] Relevant tags

✅ **Technical**
- [ ] Validation passes
- [ ] Exports work correctly
- [ ] No build errors
- [ ] Links work properly

## Publishing Your Prompt

Once your PR is merged:

1. Prompt exists in repository with status "draft" or "published"
2. If status is "published":
   - Appears on the website immediately
   - Included in all exports
   - Searchable
3. If status is "draft":
   - Only visible in development mode
   - Not included in exports
   - Not searchable publicly

### Changing Status

To publish an existing draft prompt:

```bash
# Edit the prompt file
# Change: status: "draft"
# To:     status: "published"

git commit -m "publish: Mark [prompt name] as published"
git push
```

## Getting Help

- **Questions?** Open an issue or discussion
- **Need feedback?** Create a draft PR
- **Found a bug?** Report it with details
- **Have suggestions?** Start a discussion

## Examples

### Example: Agent Prompt

See `docs/prompts/agents/code-review-comprehensive.md`

### Example: Feature Prompt

See `docs/prompts/features/api-documentation-generator.md`

### Example: Rule Prompt

See `docs/prompts/rules/security-audit-checklist.md`

---

**Ready to contribute? Start with your new branch and follow the steps above! 🚀**
