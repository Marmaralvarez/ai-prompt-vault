# Getting Started

Welcome to the AI Prompt Library! This guide will help you quickly get oriented and find what you need.

## Quick Navigation

### Browse by Type

The library is organized by prompt type:

- **Agents** - Complete autonomous AI agents for specific tasks (code review, security audits, etc.)
- **Features** - Detailed prompts for implementing specific features (responsive design, accessibility, etc.)
- **Rules** - Coding standards, security guidelines, and best practices
- **Packs** - Collections of related prompts (web development pack, mobile development pack, etc.)
- **Prompts** - Individual prompts for specific, focused tasks

### Find Prompts by Difficulty

- **Beginner** - Simple prompts with clear, straightforward instructions
- **Intermediate** - Prompts requiring some domain knowledge and context
- **Advanced** - Complex prompts for expert users and specialized use cases

## Finding What You Need

### By Keyword
Use the search bar at the top to search by:
- Prompt title
- Keywords and tags
- Description text
- Programming language or framework

### By Platform
Filter prompts by the platforms they support:
- **Claude** (Web, Projects, API)
- **ChatGPT** (Custom GPT, API)
- **Raycast** (Commands and Scripts)
- **Generic** (Works on any platform)

### By Use Case
Common use cases and how to find them:

**Code Quality & Review**
- Search: "code review"
- Type: Agent
- Tags: quality-assurance, best-practices

**Security & Audits**
- Search: "security"
- Type: Rule or Agent
- Tags: security, vulnerability

**Development Standards**
- Search: "standards" or your framework (Angular, React, etc.)
- Type: Rule
- Tags: coding-standards, best-practices

**Documentation**
- Search: "documentation" or "api"
- Type: Prompt or Feature
- Tags: documentation, api

## Exporting Prompts

You can export prompts to use in your preferred platform:

### Export Formats

**Claude JSON** - Direct import into Claude projects
```bash
npm run export:claude
```

**ChatGPT** - For use in ChatGPT and Custom GPTs
```bash
npm run export:chatgpt
```

**Raycast** - Import into Raycast commands
```bash
npm run export:raycast
```

**CSV** - Import into spreadsheets and other tools
```bash
npm run export:csv
```

**Markdown** - Complete readable bundle
```bash
npm run export:markdown
```

**All Formats** - Export everything at once
```bash
npm run export:all
```

Exports are saved to `data/exports/` with timestamped filenames.

## Common Tasks

### I want to use a prompt in Claude
1. Find the prompt you want to use
2. Copy the prompt content
3. Paste it into Claude's conversation
4. Or: Export to Claude JSON format and import into Claude Projects

### I want to adapt a prompt for my use case
1. Find the prompt template
2. Read the "Prompt Template" guide for structure
3. Copy the content
4. Modify sections as needed (Role, Task, Instructions, Output Format)
5. Test with your AI model before using in production

### I want to find all security-related prompts
1. Click the "Rules" type in navigation
2. Look for the "Security" subcategory
3. Or search: `tags:security`

### I want to create a new prompt
1. Read the "Prompt Anatomy" guide to understand the structure
2. Read the "Prompt Template" to see the format
3. Create your prompt following the template
4. Include complete YAML frontmatter with all required fields
5. See "Contributing" section below for submission

### I want to understand version numbers
1. Read the "Version Management" guide
2. Format is `major.minor.patch` (e.g., 1.0.0, 1.2.3, 2.0.0)
3. Check the prompt's version history in your version control

## Understanding Prompt Metadata

Each prompt includes important metadata:

| Field | What It Means |
|-------|---------------|
| **Status** | Published, Draft, Deprecated, or Archived |
| **Version** | Semantic version for tracking changes |
| **Difficulty** | Beginner, Intermediate, or Advanced |
| **Tokens** | Estimated tokens (useful for API costs) |
| **Tags** | Keywords for searching and filtering |
| **Author** | Who created or maintains the prompt |
| **Created** | When the prompt was first added |
| **Modified** | When it was last updated |

## Tips for Best Results

### Test First
Always test a prompt with your AI model before using in production. Results may vary based on:
- AI model version
- Model parameters (temperature, top-p, etc.)
- Input quality and clarity
- Context and examples provided

### Customize for Your Needs
Prompts in this library are templates. Customize them:
- Add specific examples relevant to your domain
- Adjust instructions for your use case
- Update terminology to match your naming conventions
- Add domain-specific constraints or requirements

### Use Output Formats
Most prompts include specific output format instructions. Following these makes:
- Results easier to parse programmatically
- Consistency across multiple uses
- Better integration with other tools

### Provide Context
The more context you provide to the AI:
- More specific and relevant results
- Fewer hallucinations or errors
- Better code quality and security
- Fewer iterations needed

### Chain Prompts Together
Many prompts work well in sequence:
1. Use a "Code Review" agent prompt
2. Then use a "Security Audit" prompt
3. Then use a "Documentation" prompt
4. Finally use a "Test Coverage" prompt

## Troubleshooting

### Prompt not working as expected
- Check the prompt status (may be draft or deprecated)
- Read the full prompt including all sections
- Try with different AI models
- Check if you're using the right platform export

### Can't find what I'm looking for
- Try different search terms
- Browse by type or difficulty
- Check related prompts listed at the bottom
- Ask in the community or check if a similar prompt exists

### Export failing
- Ensure you have Node.js 18+ installed
- Run `npm install` to update dependencies
- Check `data/prompts.json` is valid JSON
- Review your prompt's YAML frontmatter for errors

## Next Steps

- **New to prompting?** Read "Prompt Anatomy"
- **Creating a prompt?** Start with "Prompt Template"
- **Want to contribute?** Check "Contributing.md"
- **Integrating with platforms?** Read "Platform Integration"
- **Managing versions?** See "Version Management"

## Resources

- [Prompt Template](/docs/libraries/components/prompt-template.mdx) - Format and structure
- [Prompt Anatomy](/docs/guides/prompt-anatomy.md) - How prompts work
- [Platform Integration](/docs/guides/platform-integration.md) - Using with tools
- [Tagging Strategy](/docs/guides/tagging-strategy.md) - How to tag prompts
- [Version Management](/docs/guides/version-management.md) - Tracking changes
