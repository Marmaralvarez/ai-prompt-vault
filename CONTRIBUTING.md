# Contributing to AI Prompt Library

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork: `git clone https://github.com/your-username/ai-prompt-vault.git`

2. **Create a feature branch**
   ```bash
   git checkout -b feat/my-feature
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Adding a New Prompt

### Step 1: Choose the Right Category

- **Agents:** Complex, multi-step AI personas (e.g., Code Review Expert)
- **Features:** Specific capabilities or instructions (e.g., API Documentation Generator)
- **Rules:** Guidelines, standards, or constraints (e.g., Security Audit Checklist)
- **Packs:** Collections of related prompts
- **Prompts:** General-purpose prompts

### Step 2: Create the File

Create a new Markdown file in `docs/prompts/[category]/your-prompt-slug.md`:

```markdown
---
title: "Your Prompt Title"
description: "Brief description of what this prompt does"
type: "agent|feature|rule|pack|prompt"
slug: "your-prompt-slug"
status: "draft"
version: "1.0.0"
difficulty: "beginner|intermediate|advanced"
author:
  name: "Your Name"
  email: "your.email@example.com"
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
Describe the persona or role this prompt assumes.

## Task
Describe what the prompt asks the AI to do.

## Instructions
Step-by-step instructions for using the prompt.

## Output Format
Specify the expected format of the output.

## Constraints
List any constraints or limitations.
```

### Step 3: Test Locally

```bash
# Validate your prompt
npm run validate

# Start dev server and check http://localhost:3000
npm run dev

# Check exports
npm run export:all
```

### Step 4: Commit Your Changes

```bash
git add docs/prompts/[category]/your-prompt.md
git commit -m "feat: Add [category] prompt - your prompt name

Brief description of what the prompt does.

- Category: [agents/features/rules/etc]
- Type: [agent/feature/rule/pack/prompt]
- Difficulty: [beginner/intermediate/advanced]"

git push origin feat/my-feature
```

### Step 5: Create a Pull Request

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR description using this template:

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
- [ ] Related prompts referenced correctly
- [ ] Estimated tokens are reasonable
```

## Prompt Quality Guidelines

### Content

- **Be Clear:** Use simple, unambiguous language
- **Be Specific:** Provide concrete examples and expected outcomes
- **Be Comprehensive:** Include edge cases and error handling
- **Be Testable:** Make it easy to verify the prompt works

### Metadata

- **Title:** 5-100 characters, descriptive
- **Description:** 10-250 characters, concise summary
- **Slug:** kebab-case, matches filename
- **Version:** Semantic versioning (X.Y.Z)
- **Tags:** 2-10 relevant tags
- **Difficulty:** Appropriate for target audience
- **Estimated Tokens:** Realistic token count

### Related Prompts

Link to related prompts using their slugs:

```yaml
related_prompts:
  - "code-review-comprehensive"
  - "api-documentation-generator"
```

## Code Review Process

When you submit a PR, we'll review it for:

✅ **Structure**
- Proper frontmatter format
- All required fields present
- Valid YAML syntax

✅ **Quality**
- Clear and helpful content
- Well-organized
- Practical examples

✅ **Technical**
- Validation passes
- Exports work correctly
- No build errors

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test schemas.test.ts

# View coverage
npm test -- --coverage
```

## Build & Validation

```bash
# Validate all prompts
npm run validate

# Check documentation
npm run validate:docs

# Run health check
npm run health-check

# Generate analytics
npm run analytics

# Build for production
npm run build

# Export to all formats
npm run export:all
```

## Pull Request Guidelines

- Keep PRs focused (one feature or set of related prompts)
- Write descriptive commit messages
- Update documentation if needed
- Ensure all tests pass
- Address review feedback promptly

## Common Issues

### Validation Fails

Check that all required fields are present:
- title, description, type, slug, status, version, author, tags, created, lastModified

### Build Fails

Run `npm run lint` to identify TypeScript errors.

### Exports Don't Include Your Prompt

Make sure:
- Status is "published" (not "draft")
- Validation passes locally
- File is in correct directory

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use different port
PORT=3001 npm run dev

# Or kill the process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Dependencies Not Installing

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Changes Not Showing

```bash
# Restart dev server
# Ctrl+C to stop
# npm run dev to restart

# Or clear cache
rm -rf .next
npm run dev
```

## Getting Help

- **GitHub Issues:** Report bugs or request features
- **GitHub Discussions:** Ask questions or discuss ideas
- **Documentation:** Check guides in `docs/guides/`
- **Examples:** See existing prompts in `docs/prompts/`

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

- Be respectful to all contributors
- Provide constructive feedback
- Help others succeed
- Report issues professionally

---

**Thank you for contributing to the AI Prompt Library! 🙏**
