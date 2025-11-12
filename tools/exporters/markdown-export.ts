import { PromptData, ExporterOptions, ExportResult } from './types'

/**
 * Export all prompts as a single Markdown bundle
 * Useful for documentation and archival
 */
export function exportToMarkdown(
  prompts: PromptData[],
  options: ExporterOptions = {}
): ExportResult {
  try {
    let filtered = prompts.filter(p => p.status === 'published')

    if (!options.includeDraft) {
      filtered = filtered.filter(p => p.status !== 'draft')
    }
    if (options.filter) {
      filtered = filtered.filter(options.filter)
    }

    // Group by type
    const grouped = groupByType(filtered)

    // Generate markdown
    let markdown = generateHeader()

    for (const [type, typePrompts] of Object.entries(grouped)) {
      markdown += generateTypeSection(type, typePrompts)
    }

    markdown += generateFooter()

    return {
      success: true,
      format: 'markdown',
      content: markdown,
      promptCount: filtered.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'markdown',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Group prompts by type
 */
function groupByType(prompts: PromptData[]): Record<string, PromptData[]> {
  const grouped: Record<string, PromptData[]> = {}

  for (const prompt of prompts) {
    if (!grouped[prompt.type]) {
      grouped[prompt.type] = []
    }
    grouped[prompt.type].push(prompt)
  }

  return grouped
}

/**
 * Generate markdown header
 */
function generateHeader(): string {
  return `# AI Prompt Library - Complete Export

**Generated:** ${new Date().toISOString()}

This is a complete export of the AI Prompt Library. All prompts are organized by type.

## Table of Contents

${generateTableOfContents()}

---

`
}

/**
 * Generate table of contents
 */
function generateTableOfContents(): string {
  return `- [Agents](#agents)
- [Features](#features)
- [Rules & Standards](#rules--standards)
- [Packs](#packs)
- [Prompts](#prompts)
`
}

/**
 * Generate type section with all prompts
 */
function generateTypeSection(type: string, prompts: PromptData[]): string {
  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')

  let section = `## ${typeTitle}\n\n`
  section += `**Total:** ${prompts.length} prompt(s)\n\n`

  for (const prompt of prompts) {
    section += generatePromptEntry(prompt)
  }

  section += '\n---\n\n'

  return section
}

/**
 * Generate individual prompt entry
 */
function generatePromptEntry(prompt: PromptData): string {
  return `### ${prompt.title}

**ID:** \`${prompt.slug}\`
**Type:** ${prompt.type}
**Version:** ${prompt.version}
**Status:** ${prompt.status}
**Author:** ${prompt.author.name}
**Created:** ${prompt.created}
**Last Modified:** ${prompt.lastModified}

**Description:**
${prompt.description}

**Tags:** ${prompt.tags.join(', ')}

**Content:**
\`\`\`
${prompt.content}
\`\`\`

${prompt.estimatedTokens ? `**Estimated Tokens:** ${prompt.estimatedTokens}\n\n` : ''}
${prompt.relatedPrompts && prompt.relatedPrompts.length > 0 ? `**Related Prompts:** ${prompt.relatedPrompts.join(', ')}\n\n` : ''}
`
}

/**
 * Generate markdown footer
 */
function generateFooter(): string {
  return `---

## Export Information

- **Format:** Markdown
- **Generated:** ${new Date().toISOString()}
- **Source:** AI Prompt Library

---

*This export can be used for documentation, archival, or sharing purposes.*
`
}
