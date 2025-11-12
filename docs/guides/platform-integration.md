# Platform Integration

This guide explains how to integrate prompts from the AI Prompt Library with different AI platforms and applications.

## Claude Platforms

### Claude Web Interface

**How to use:**
1. Go to [claude.ai](https://claude.ai)
2. Start a new conversation
3. Copy your prompt from the library
4. Paste it into the conversation

**Tips:**
- Claude works best with clear structure (Role, Task, Instructions)
- Include specific examples for best results
- Use markdown formatting for readability
- Long prompts (4000+ tokens) may require splitting

**Example:**
```
You are an expert code reviewer with deep knowledge of TypeScript and React.

Review the following React component for:
1. Performance issues
2. Accessibility problems
3. Code quality concerns

Component:
[paste component code here]

Provide your review as JSON with { issue, severity, fix }
```

### Claude Projects

**Setup:**
1. Create a new project in Claude Projects
2. Export prompts to Claude JSON format: `npm run export:claude`
3. Use the exported JSON to populate your projects

**Features:**
- Persistent system prompts for your project
- Long-term context window
- File uploads and references
- Team collaboration

**Example workflow:**
```bash
# Export prompts to Claude format
npm run export:claude

# Output: data/exports/prompts-claude.json
# Import this JSON into your Claude Project
```

**Project structure:**
```json
{
  "prompts": [
    {
      "id": "code-review",
      "title": "Code Review Expert",
      "type": "agent",
      "content": "You are an expert code reviewer...",
      "platforms": ["claude"]
    }
  ]
}
```

### Claude API

**Setup:**
```python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

# Using a prompt from the library
system_prompt = """You are an expert security auditor...
[rest of prompt content]"""

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=system_prompt,
    messages=[
        {"role": "user", "content": "Review this code for security issues:\n\n[code]"}
    ]
)

print(message.content[0].text)
```

**Configuration:**
- **Model**: claude-3-5-sonnet-20241022 (default), claude-3-opus, etc.
- **Max tokens**: Adjust based on expected response length
- **Temperature**: 0.0 for deterministic, 1.0 for creative

**Token estimation:**
- Use the `estimatedTokens` field in prompts to plan API costs
- ~1 token ≈ 4 characters
- Prompts + responses count toward usage

---

## ChatGPT Platforms

### ChatGPT Web Interface

**How to use:**
1. Go to [chat.openai.com](https://chat.openai.com)
2. Copy your prompt from the library
3. Paste it into ChatGPT
4. Ask your question

**Tips:**
- GPT-4 produces better results for complex tasks
- Structure is less critical than for Claude
- Use @ mentions to reference uploaded files (GPT Plus)
- System prompts work but may have less impact than Claude

**Example:**
```
You are an expert code reviewer. Review this TypeScript code:

[code]

Identify bugs, security issues, and optimization opportunities.
```

### Custom GPTs

**Create a Custom GPT:**
1. Go to [ChatGPT Custom GPT builder](https://chat.openai.com/gpts/mine)
2. Click "Create a GPT"
3. Set the system instructions with a prompt from the library
4. Add knowledge files (optional)
5. Configure actions (optional)
6. Publish or share

**Using library prompts:**
1. Export to ChatGPT format: `npm run export:chatgpt`
2. Copy the prompt content
3. Paste into Custom GPT "Instructions" field
4. Add sample Q&A in the GPT configuration

**Example Custom GPT setup:**
```
Name: Code Security Analyzer
Description: Analyzes code for security vulnerabilities

Instructions:
[Paste your security audit prompt here]

Knowledge files:
- OWASP_Top_10.pdf (optional)
- Security_Best_Practices.md (optional)
```

### ChatGPT API (OpenAI API)

**Setup:**
```python
import openai

openai.api_key = "your-api-key"

# Using a prompt from the library
system_prompt = """You are an expert code reviewer...
[rest of prompt content]"""

response = openai.ChatCompletion.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Review this code:\n\n[code]"}
    ],
    temperature=0.7,
    max_tokens=1500
)

print(response.choices[0].message.content)
```

**Configuration:**
- **Model**: gpt-4-turbo, gpt-3.5-turbo, etc.
- **Temperature**: 0.0-1.0 (lower = consistent, higher = creative)
- **Top_p**: 0.1-1.0 (diversity of responses)
- **Max tokens**: Response length limit

---

## Raycast

### Setup

**Prerequisites:**
- Raycast installed
- Basic Raycast scripting knowledge

**Installation:**
1. Export prompts to Raycast format: `npm run export:raycast`
2. Copy exported JSON
3. In Raycast, create new "Script Command"
4. Use the exported data structure

### Creating a Raycast Command

**Template:**
```swift
#!/usr/bin/swift
// Raycast Script Command
// @raycast.title Code Reviewer
// @raycast.description Review code for quality issues
// @raycast.author maria

import Foundation

let prompt = """
You are an expert code reviewer...
[prompt content from library]
"""

// Get input
let input = CommandLine.arguments.joined(separator: " ")

// Call API (Claude or ChatGPT)
// ...
```

**JSON structure (from export):**
```json
{
  "raycast": [
    {
      "title": "Code Reviewer",
      "description": "Review code for quality issues",
      "prompt": "You are an expert code reviewer...",
      "model": "claude-3-sonnet",
      "temperature": 0.5,
      "tags": ["code", "review"]
    }
  ]
}
```

### Popular Raycast Extensions

**AI Command Extension:**
1. Install "AI Command" extension in Raycast
2. Create custom commands with prompts from library
3. Bind to keyboard shortcuts
4. Run via Raycast or keyboard shortcut

**Setup in AI Command:**
```
Title: "Code Review"
Prompt: [Copy from library]
Model: Claude or GPT-4
Temperature: 0.5
```

---

## Integration Best Practices

### Template Adaptation

**Before using a prompt in any platform:**

1. **Test locally** - Try with Claude Web or ChatGPT first
2. **Verify format** - Ensure your AI model supports the output format
3. **Adjust tone** - Different platforms may need tone adjustments
4. **Verify APIs** - Check API documentation for model names
5. **Estimate cost** - Use token counts to estimate API costs

### API Integration Checklist

- [ ] API key configured and secure (use .env)
- [ ] Model name verified in documentation
- [ ] Token limits appropriate for your use case
- [ ] Temperature/parameters tuned for your need
- [ ] Error handling implemented
- [ ] Rate limiting considered
- [ ] Logging in place for debugging
- [ ] Cost monitoring active

### Prompt Version Management

**Track which version you're using:**

```python
# Example: Store prompt version with usage
PROMPT_VERSION = "1.2.0"
PROMPT_LAST_UPDATED = "2024-01-15"

# When API changes, ensure compatibility
if PROMPT_VERSION != EXPECTED_VERSION:
    print("Warning: Prompt version mismatch")
```

---

## Framework-Specific Integration

### Next.js/React

**Server-side integration:**
```typescript
// lib/prompts.ts
export const getPrompt = (slug: string) => {
  const prompts = require('@/data/prompts.json');
  return prompts.find((p: any) => p.slug === slug);
};

// pages/api/analyze.ts
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req: any, res: any) {
  const { code, promptSlug } = req.body;
  const prompt = getPrompt(promptSlug);

  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: prompt.content,
    messages: [{ role: "user", content: code }]
  });

  res.status(200).json(response.content[0]);
}
```

**Client-side usage:**
```typescript
// components/CodeAnalyzer.tsx
const [analysis, setAnalysis] = useState<string>('');

const analyzeCode = async (code: string) => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      promptSlug: 'code-review-expert'
    })
  });

  const data = await response.json();
  setAnalysis(data.text);
};
```

### CLI Tools

**Using prompts in CLI scripts:**
```bash
#!/bin/bash
# scripts/review-code.sh

CODE_FILE=$1
PROMPT=$(jq -r '.[] | select(.slug=="code-review-expert") | .content' data/prompts.json)

# Using with Claude
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "system": "'"$PROMPT"'",
    "messages": [{"role": "user", "content": "'"$(cat $CODE_FILE)"'"}]
  }'
```

### VS Code Extension

**Integrate with VS Code:**
```typescript
// extension.ts
import * as vscode from 'vscode';
import Anthropic from '@anthropic-ai/sdk';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.reviewCode', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const code = editor.document.getText();
    const prompt = getPromptFromLibrary('code-review-expert');

    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: prompt,
      messages: [{ role: "user", content: code }]
    });

    vscode.window.showInformationMessage(response.content[0].text);
  });

  context.subscriptions.push(disposable);
}
```

---

## Multi-Platform Workflow

**Example: Use same prompt across platforms**

1. **Create once in library**
   ```
   docs/prompts/agents/code-review-expert.md
   ```

2. **Validate with schema**
   ```bash
   npm run validate
   ```

3. **Export to all platforms**
   ```bash
   npm run export:all
   ```

4. **Integrate with each platform**
   - Claude Projects: Import JSON
   - ChatGPT Custom GPT: Copy instructions
   - API: Reference from database
   - Raycast: Import commands

5. **Track versions**
   - All exports timestamped
   - Version field in metadata
   - Easy to rollback if needed

---

## Troubleshooting

### Claude API Connection Issues
- Verify API key in .env
- Check rate limits
- Ensure model name is correct
- Review error messages in logs

### ChatGPT API Failures
- Verify OpenAI API key
- Check model availability
- Review quota usage
- Check API status page

### Raycast Command Issues
- Verify Swift syntax
- Check Raycast documentation
- Review script output
- Test in Raycast debugger

### Export Format Problems
- Validate JSON/CSV syntax
- Check for special characters
- Verify file encoding (UTF-8)
- Test with target platform

---

## Resources

- [Claude API Documentation](https://docs.anthropic.com)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Raycast Extension Documentation](https://developers.raycast.com)
- [Prompt Template](/docs/libraries/components/prompt-template.mdx)
- [Getting Started](/docs/guides/getting-started.md)
