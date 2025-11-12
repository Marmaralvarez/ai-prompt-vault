# TEMPLATES.md
# Phase 4: Content & Templates - Detailed Instructions

**Duration:** 4-5 hours  
**Objective:** Create template documentation and load example prompts  
**Success Criteria:** Full documentation site working with 5+ example prompts

---

## Step 1: Create Prompt Template Component

### 1.1 Create docs/libraries/components/prompt-template.mdx

**File: `docs/libraries/components/prompt-template.mdx`**

```mdx
---
title: "Prompt Template & Structure"
description: "Standard template for creating new prompts in the library"
---

import { Callout } from 'fumadocs-ui/components/callout';

# Prompt Template Structure

Every prompt in the library follows a standardized structure to ensure consistency, searchability, and platform compatibility.

## Template Components

### 1. Frontmatter (YAML)

The frontmatter header contains metadata used for indexing, categorization, and exports.

\`\`\`yaml
---
title: "Your Prompt Title"
description: "Brief description (under 250 characters)"
type: "agent"  # agent, feature, rule, pack, prompt
slug: "your-prompt-slug"
version: "1.0.0"
status: "published"  # published, draft, deprecated, archived

author:
  name: "Your Name or Team"
  email: "email@example.com"
  url: "https://your-site.com"
  avatar: "https://avatar-url"

tags:
  - "category1"
  - "category2"
  - "specific-detail"

categories:
  - "Category Name"

use_cases:
  - "Use case 1"
  - "Use case 2"

model_compatibility:
  - "claude-opus-4.1"
  - "claude-sonnet-4.5"

difficulty: "advanced"
estimated_tokens: 2500
cost_tier: "high"

created: "2025-01-11T00:00:00Z"
last_updated: "2025-01-11T00:00:00Z"

related_prompts:
  - "related-prompt-slug-1"
  - "related-prompt-slug-2"
---
\`\`\`

<Callout type="info">
**Required Fields:** title, description, type, slug, version, author, tags
**Optional but Recommended:** categories, use_cases, difficulty, model_compatibility
</Callout>

### 2. Objective & Persona

Clear statement of what the prompt achieves and the role the AI should take.

\`\`\`markdown
# Your Prompt Title

## Objective & Persona

You are a [ROLE] expert in [DOMAIN]. Your task is to [SPECIFIC GOAL].

**Key Capabilities:**
- Capability 1
- Capability 2
- Capability 3
\`\`\`

**Example:**
\`\`\`markdown
## Objective & Persona

You are a senior security engineer specializing in penetration testing and vulnerability assessment. Your task is to conduct comprehensive security audits of modern web applications using industry-standard frameworks.
\`\`\`

### 3. Instructions

Step-by-step guidance on how the AI should approach the task.

\`\`\`markdown
## Instructions

Follow these steps in order:

1. **Step One** - Description of what to do
   - Sub-step details
   - Additional context

2. **Step Two** - Next action
   - Approach or methodology
   - Key considerations

3. **Step Three** - Final steps
   - Validation criteria
   - Success indicators
\`\`\`

### 4. Optional Components

#### Constraints (Do's and Don'ts)

\`\`\`markdown
## Constraints

**Dos:**
- Do include specific details
- Do validate your findings
- Do provide actionable recommendations

**Don'ts:**
- Don't make assumptions
- Don't skip verification steps
- Don't provide generic advice
\`\`\`

#### Context/Background

\`\`\`markdown
## Context

[Provide relevant background information, business context, or domain knowledge needed to understand the task]

**Tech Stack:**
- Framework: React 19
- Database: PostgreSQL
- Service: AWS

**Business Context:**
- [Relevant business information]
\`\`\`

#### Few-Shot Examples

\`\`\`markdown
## Examples

### Example 1: [Scenario]

**Input:**
[User input or request]

**Thoughts:**
[Model's thinking process]

**Output:**
[Expected output]

---

### Example 2: [Different Scenario]

[Same structure as Example 1]
\`\`\`

### 5. Output Format

Specify exactly how the response should be structured.

\`\`\`markdown
## Output Format

Return your response in the following format:

### JSON Format
\`\`\`json
{
  "findings": [],
  "recommendations": [],
  "severity": "high|medium|low"
}
\`\`\`

### Markdown Format
- Use level 2 headers for sections
- Bold important items
- Use numbered lists for priorities

### Table Format
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |
\`\`\`

### 6. Recap/Summary

Reinforce key aspects of the prompt.

\`\`\`markdown
## Key Requirements Recap

- ✓ Must validate all findings
- ✓ Provide severity ratings
- ✓ Include actionable recommendations
- ✗ Don't provide generic advice
- ✗ Don't skip technical details
\`\`\`

---

## Complete Template Example

See the actual prompts in the library for full examples.
```

---

## Step 2: Create Getting Started Guide

### 2.1 Create docs/guides/getting-started.md

**File: `docs/guides/getting-started.md`**

```markdown
---
title: "Getting Started"
description: "Quick start guide for the AI Prompt Library"
---

# Getting Started with the AI Prompt Library

Welcome! This guide will help you quickly navigate and use the prompt library.

## What is This Library?

The AI Prompt Library is a centralized repository of AI prompts, instructions, and coding standards that work across multiple platforms:

- **Claude** (Desktop, Web, API)
- **ChatGPT** (Web, Mobile, Plugins)
- **Perplexity Comet** (Browser)
- **Raycast** (Command Line)

## Quick Navigation

### Browse by Type

- **[Agents](/docs/prompts/agents)** - Autonomous AI systems for complex tasks
- **[Features](/docs/prompts/features)** - Feature implementation templates
- **[Rules](/docs/prompts/rules)** - Coding standards and best practices
- **[Packs](/docs/prompts/packs)** - Curated prompt collections
- **[System Instructions](/docs/prompts/system-instructions)** - Behavioral directives

### Learning Resources

- **[Prompt Anatomy](/docs/guides/prompt-anatomy)** - How prompts are structured
- **[Best Practices](/docs/guides/best-practices)** - Tips for effective prompts
- **[Platform Integration](/docs/guides/platform-integration)** - Using prompts across tools

## Finding the Right Prompt

### By Use Case

Use the search bar to find prompts by:
- **Keywords**: Type what you're trying to do
- **Tags**: Click tags in the sidebar
- **Type**: Filter by prompt type

### By Difficulty

Prompts are marked as:
- 🟢 **Beginner** - Simple, single-purpose
- 🟡 **Intermediate** - Multi-step, some complexity
- 🔴 **Advanced** - Complex, requires expertise

## Using a Prompt

### Step 1: Copy the Content

Select a prompt and copy its content or system instructions.

### Step 2: Open Your AI Tool

Open Claude, ChatGPT, Perplexity, or another compatible tool.

### Step 3: Paste and Customize

Paste the prompt and customize variables for your specific use case.

### Step 4: Execute

Submit the prompt and review the response.

## Exporting Prompts

### Export to Your Platform

Choose your platform:

- **Claude**: Export as JSON to Claude Projects
- **ChatGPT**: Export as Custom GPT
- **Raycast**: Import as command
- **CSV**: Import into spreadsheet

Commands:
\`\`\`bash
npm run export:claude    # Claude format
npm run export:chatgpt   # ChatGPT format
npm run export:raycast   # Raycast format
npm run export:csv       # Spreadsheet format
\`\`\`

## Common Tasks

### Search for Prompts

Use the full-text search to find:
- "security audit"
- "code review"
- "documentation"

### Filter by Tags

Click tags in the sidebar to narrow results:
- Security, Development, Marketing
- OWASP, Compliance, Performance

### View Prompt Details

Click any prompt to see:
- Full content
- System instructions
- Related prompts
- Platform compatibility

### Update Library

Check back regularly for new prompts. The library is updated frequently.

## Tips & Tricks

### Save Your Favorites

Bookmark prompts you use often for quick access.

### Combine Prompts

Use multiple prompts together for complex workflows.

### Customize for Your Context

Replace placeholders with your specific information.

### Share with Your Team

Export and share specific prompt packs with colleagues.

## Next Steps

- **Browse prompts** in the [Prompts section](/docs/prompts)
- **Learn anatomy** in [Prompt Anatomy guide](/docs/guides/prompt-anatomy)
- **Understand platforms** in [Integration guide](/docs/guides/platform-integration)

## Need Help?

- Search for "[topic]" in the library
- Check the [Troubleshooting guide](/docs/guides/troubleshooting)
- Review [Best practices](/docs/guides/best-practices)

---

**Happy prompting! 🚀**
```

---

## Step 3: Create Best Practices Guide

### 3.1 Create docs/guides/best-practices.md

**File: `docs/guides/best-practices.md`**

```markdown
---
title: "Best Practices for Prompt Engineering"
description: "Tips and techniques for writing effective prompts"
---

# Best Practices for Prompt Engineering

Effective prompts are clear, specific, and well-structured. Follow these guidelines to get better results.

## 1. Be Specific

### ❌ Bad
"Write some code"

### ✅ Good
"Write a Python function that validates email addresses using regex, handles edge cases, and includes docstrings"

## 2. Provide Context

Good prompts include relevant background:

\`\`\`markdown
**Context:** I'm building a React 19 application with TypeScript
**Requirement:** Create a reusable form component
**Constraints:** Must support custom validation
\`\`\`

## 3. Use Examples

Few-shot examples dramatically improve results:

\`\`\`markdown
**Example Input:** { name: "John", age: 30 }
**Expected Output:** "Name: John, Age: 30"

Now process: { name: "Jane", age: 25 }
\`\`\`

## 4. Define Output Format

Specify exactly how you want results:

\`\`\`markdown
Return as JSON with structure:
{
  "findings": [],
  "severity": "high|medium|low",
  "recommendations": []
}
\`\`\`

## 5. Set Clear Constraints

Tell the AI what to do AND what not to do:

\`\`\`markdown
**Dos:**
- Use specific examples
- Validate findings
- Include references

**Don'ts:**
- Make assumptions
- Use generic advice
- Skip error handling
\`\`\`

## 6. Structure with Headers

Use clear section headers:

\`\`\`markdown
## Objective
[What you want]

## Instructions
1. Step one
2. Step two

## Constraints
[Dos and don'ts]
\`\`\`

## 7. Version and Update

When you improve a prompt:
- Update the version number (semantic versioning)
- Document what changed
- Test with new version

## 8. Test Your Prompts

Before deploying:
- Test with different inputs
- Verify output format
- Check edge cases
- Review for hallucinations

## 9. Make it Reusable

Design prompts for different contexts:

\`\`\`markdown
**Good:** Generic enough for multiple projects
**Bad:** Hardcoded for one specific project

Use variables: [FRAMEWORK], [LANGUAGE], [DOMAIN]
\`\`\`

## 10. Include Meta-Instructions

Tell the AI how to behave:

\`\`\`markdown
- Explain your reasoning step by step
- Ask clarifying questions if needed
- Validate all findings before responding
- Cite sources when possible
\`\`\`

---

Continue building good prompts! 🎯
```

---

## Step 4: Create Platform Integration Guide

### 4.1 Create docs/guides/platform-integration.md

**File: `docs/guides/platform-integration.md`**

```markdown
---
title: "Platform Integration Guide"
description: "How to use prompts across different AI platforms"
---

# Platform Integration Guide

Learn how to integrate prompts with your favorite tools.

## Claude (Web, Desktop, API)

### Using in Claude Chat

1. Copy the prompt content
2. Paste into Claude
3. Add any context or questions
4. Submit

### Using Claude Projects

1. Export as JSON: \`npm run export:claude\`
2. In Claude Projects, create new project
3. Upload exported JSON
4. Reference in chat: @project-name

### Using Claude API

\`\`\`python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4",
    max_tokens=2000,
    messages=[{"role": "user", "content": prompt_content}]
)
\`\`\`

## ChatGPT (Web, Mobile, API)

### Creating Custom GPT

1. Export prompts: \`npm run export:chatgpt\`
2. Create new Custom GPT
3. In Instructions, paste system prompt
4. Add knowledge files
5. Test and publish

### Using with API

\`\`\`python
import openai

client = openai.OpenAI()

response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_input}
    ]
)
\`\`\`

## Raycast

### Import as Command

1. Export prompts: \`npm run export:raycast\`
2. Open Raycast settings
3. Go to AI → Commands
4. Import JSON file
5. Use with Cmd+Shift+P

### Create Custom Command

\`\`\`json
{
  "name": "Your Prompt",
  "prompt": "Prompt content here",
  "icon": "🚀",
  "model": "gpt-4-turbo",
  "temperature": 0.7,
  "maxTokens": 2000
}
\`\`\`

## Perplexity Comet

### Using in Browser

1. Install Perplexity Comet extension
2. Highlight text on webpage
3. Right-click → "Ask Comet"
4. Paste custom prompt

## Spreadsheets

### Import CSV

1. Export as CSV: \`npm run export:csv\`
2. Open Google Sheets / Excel
3. Import CSV file
4. Analyze and organize

---

## See Also

- [Getting Started](/docs/guides/getting-started)
- [Prompt Anatomy](/docs/guides/prompt-anatomy)
- [Best Practices](/docs/guides/best-practices)
```

---

## Step 5: Create Tagging Strategy Guide

### 5.1 Create docs/guides/tagging-strategy.md

**File: `docs/guides/tagging-strategy.md`**

```markdown
---
title: "Tagging Strategy"
description: "How to tag and categorize prompts effectively"
---

# Tagging Strategy

Tags help organize and discover prompts. Follow this strategy for consistency.

## Primary Tags (Domain)

Use ONE primary tag for the main domain:

- \`security\` - Security, auditing, compliance
- \`development\` - Code, features, implementation
- \`marketing\` - Marketing, copywriting, strategy
- \`operations\` - DevOps, infrastructure, deployment
- \`compliance\` - Regulatory, legal, governance
- \`creativity\` - Creative writing, brainstorming

## Secondary Tags (Function)

Add ONE secondary tag for what the prompt does:

- \`analysis\` - Analyzing or reviewing
- \`generation\` - Creating or writing
- \`planning\` - Strategy or planning
- \`optimization\` - Improving or tuning
- \`documentation\` - Writing docs
- \`automation\` - Automating tasks
- \`auditing\` - Checking compliance

## Tertiary Tags (Specificity)

Add 0-2 specific tags for detail:

- \`owasp-top-10\`
- \`gdpr-compliance\`
- \`react-patterns\`
- \`kubernetes\`
- \`cost-optimization\`
- \`ai-governance\`
- \`terraform\`
- \`typescript\`

## Examples

### Security Audit Prompt
\`\`\`
Primary: security
Secondary: auditing
Tertiary: owasp-top-10, web-application
Result: [security, auditing, owasp-top-10, web-application]
\`\`\`

### React Feature Prompt
\`\`\`
Primary: development
Secondary: generation
Tertiary: react-patterns, typescript
Result: [development, generation, react-patterns, typescript]
\`\`\`

---

**Minimum 2 tags, maximum 10 per prompt.**
```

---

## Step 6: Create Example Prompts

### 6.1 Create docs/prompts/agents/security-audit.md

**File: `docs/prompts/agents/security-audit.md`**

```markdown
---
title: "Security Audit Comprehensive Review"
description: "OWASP-aligned penetration testing framework for modern web applications"
type: "agent"
slug: "security-audit-comprehensive"
version: "2.1.0"
status: "published"
author:
  name: "Security Team"
  email: "security@example.com"
tags:
  - "security"
  - "penetration-testing"
  - "owasp"
  - "compliance"
categories:
  - "Security & Compliance"
  - "Infrastructure"
use_cases:
  - "Pre-deployment security review"
  - "Compliance audit (SOC2, ISO27001)"
  - "Risk assessment"
difficulty: "advanced"
estimated_tokens: 2500
created: "2024-06-15T00:00:00Z"
last_updated: "2025-01-11T00:00:00Z"
---

# Security Audit Comprehensive Review

## Objective & Persona

You are a senior application security engineer specializing in comprehensive security audits and penetration testing of modern web applications. Your task is to conduct thorough security reviews using OWASP standards, identify vulnerabilities, assess compliance, and provide actionable remediation strategies.

## Instructions

Follow these steps systematically:

1. **Scope & Asset Discovery**
   - Catalog all domains, APIs, infrastructure
   - Map trust boundaries and data flows
   - Identify PII/PHI handling requirements

2. **Threat Modeling**
   - Apply STRIDE for system components
   - Document threat scenarios
   - Prioritize high-impact threats

3. **Vulnerability Assessment**
   - Review against OWASP Top 10
   - Test authentication mechanisms
   - Verify data encryption
   - Check access controls

4. **Compliance Verification**
   - Map to frameworks (GDPR, HIPAA, SOC2)
   - Verify audit logging
   - Check incident response procedures

5. **Risk Prioritization**
   - Assign severity using CVSS v3.1
   - Map business impact
   - Order by exploitability

6. **Remediation Roadmap**
   - Provide specific fixes
   - Include implementation timeline
   - Suggest secure alternatives

## Output Format

Return findings as structured JSON:

\`\`\`json
{
  "summary": {
    "totalFindings": 0,
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 0
  },
  "findings": [
    {
      "id": "finding-001",
      "title": "Finding Title",
      "severity": "critical",
      "cvss": "9.8",
      "description": "Detailed description",
      "location": "Service/Endpoint",
      "remediation": "How to fix",
      "references": ["OWASP reference"]
    }
  ],
  "recommendations": [],
  "executiveSummary": ""
}
\`\`\`

## Key Constraints

**Dos:**
- Use OWASP ASVS 4.0 as baseline
- Include CVSS scores
- Provide proof-of-concept (safe)
- Reference official frameworks
- Verify all findings

**Don'ts:**
- Don't include weaponizable exploits
- Don't make unsupported claims
- Don't skip validation
- Don't ignore business context
- Don't provide false positives

---

*Use this prompt for pre-production security reviews, compliance audits, and risk assessments.*
```

---

## Step 7: Create Additional Example Prompts

### 7.1 Create docs/prompts/features/responsive-design.md

**File: `docs/prompts/features/responsive-design.md`**

```markdown
---
title: "Responsive Web Design Implementation"
description: "Build responsive layouts that work across all devices"
type: "feature"
slug: "responsive-web-design"
version: "1.0.0"
status: "published"
author:
  name: "Frontend Team"
tags:
  - "development"
  - "frontend"
  - "responsive"
  - "css"
difficulty: "intermediate"
estimated_tokens: 1500
created: "2025-01-11T00:00:00Z"
last_updated: "2025-01-11T00:00:00Z"
---

# Responsive Web Design Implementation

## Objective & Persona

You are a frontend design expert specializing in responsive web design. Your task is to help implement responsive layouts that work seamlessly across mobile, tablet, and desktop devices using modern CSS and design patterns.

## Instructions

1. Analyze current layout structure
2. Identify breakpoints needed
3. Implement CSS media queries
4. Test responsiveness
5. Optimize for all devices

## Output Format

Provide CSS code with detailed comments and breakpoint strategy.
```

---

## Step 8: Update Landing Page

### 8.1 Update docs/index.mdx

**File: `docs/index.mdx`** (Replace existing)

```mdx
---
title: "AI Prompt Library"
description: "Centralized repository of AI prompts and instructions"
---

import { Callout } from 'fumadocs-ui/components/callout';

# AI Prompt Library & Documentation Vault

**Your centralized source of truth for AI prompts, instructions, and coding standards.**

Browse, search, and export AI prompts across Claude, ChatGPT, Perplexity, Raycast, and more.

## Quick Start

<Callout type="info">
**New here?** Start with the [Getting Started guide](/docs/guides/getting-started)
</Callout>

\`\`\`bash
# Search for prompts
# Use the search bar above ⬆️

# Export to your platform
npm run export:claude    # For Claude
npm run export:chatgpt   # For ChatGPT
npm run export:raycast   # For Raycast
\`\`\`

## Browse by Type

- **[🤖 Agents](/docs/prompts/agents)** - Autonomous AI systems (12 prompts)
- **[✨ Features](/docs/prompts/features)** - Feature templates (8 prompts)
- **[📋 Rules](/docs/prompts/rules)** - Coding standards (15 prompts)
- **[📦 Packs](/docs/prompts/packs)** - Bundled collections (5 packs)
- **[⚙️ System Instructions](/docs/prompts/system-instructions)** - System directives (6 prompts)

## Popular Prompts

- [Security Audit Comprehensive Review](/docs/prompts/agents/security-audit-comprehensive)
- [Responsive Web Design Implementation](/docs/prompts/features/responsive-design)
- [Web Development Pack](/docs/prompts/packs/web-development)

## Learning Resources

- **[Prompt Anatomy](/docs/guides/prompt-anatomy)** - How prompts are structured
- **[Best Practices](/docs/guides/best-practices)** - Tips for effective prompts
- **[Platform Integration](/docs/guides/platform-integration)** - Using across tools
- **[Tagging Strategy](/docs/guides/tagging-strategy)** - Finding what you need

## Statistics

- **Total Prompts:** 46+
- **Categories:** 12
- **Platforms Supported:** 6
- **Last Updated:** Today

## Features

✅ Full-text search across all prompts  
✅ Export to Claude, ChatGPT, Raycast, CSV  
✅ Structured metadata and versioning  
✅ Related prompt suggestions  
✅ Difficulty ratings and time estimates  

## Get Started

1. **Browse** prompts in the library
2. **Copy** a prompt you like
3. **Customize** for your use case
4. **Execute** in your AI tool

---

**Made with ❤️ for AI enthusiasts**
```

---

## Step 9: Verification & Testing

### 9.1 Build Test

```bash
npm run build

# Expected: Successful build
```

### 9.2 Dev Server Test

```bash
npm run dev

# Visit http://localhost:3000
# Verify all pages load
```

### 9.3 Search Test

```bash
# In browser:
# Search "security" → Find security-audit-comprehensive
# Search "responsive" → Find responsive design
```

---

## Step 10: Commit Phase 4

```bash
# Add all documentation and prompts
git add docs/guides/
git add docs/prompts/
git add docs/libraries/

# Commit
git commit -m "feat: Complete Phase 4 - Documentation and example prompts

- Create prompt template component (MDX)
- Add comprehensive getting started guide
- Add best practices for prompt engineering
- Add platform integration guide
- Create tagging strategy documentation
- Add 3+ example prompts
- Update landing page with content
- Create reusable template examples"

# Verify
git log --oneline -5
```

---

## Phase 4 Completion Checklist

- [ ] Prompt template created (docs/libraries/components/prompt-template.mdx)
- [ ] Getting started guide written (docs/guides/getting-started.md)
- [ ] Best practices guide written (docs/guides/best-practices.md)
- [ ] Platform integration guide written (docs/guides/platform-integration.md)
- [ ] Tagging strategy documented (docs/guides/tagging-strategy.md)
- [ ] 3+ example prompts created
- [ ] Landing page updated (docs/index.mdx)
- [ ] All markdown files valid
- [ ] npm run build succeeds
- [ ] Documentation site renders correctly
- [ ] Search works across all pages
- [ ] Related prompts linked
- [ ] Git commits made

---

## Success Criteria

✅ **Phase 4 Complete when:**

```bash
# Build succeeds
npm run build
# ✓ Compiled successfully

# Dev server works
npm run dev
# ✓ Opens on :3000

# All pages load
# ✓ Landing page
# ✓ Prompts sections
# ✓ Guides pages
# ✓ Search working

# Search functional
# ✓ Find prompts by keyword
# ✓ Filter by tag
# ✓ Browse by type
```

---

## Next Steps

When Phase 4 is complete:

1. ✅ Run: `npm run build`
2. ✅ Run: `npm run dev`
3. ✅ Browse all pages
4. ✅ Test search functionality
5. ✅ Report completion status
6. ✅ Proceed to Phase 5 (integration - see claude.md)

---

**Ready for Phase 4? Create amazing documentation! 📚**