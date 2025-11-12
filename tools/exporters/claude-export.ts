import { PromptData, ExporterOptions, ExportResult, ClaudeExport } from './types'

/**
 * Export prompts in Claude-compatible format
 * Suitable for Claude Projects and knowledge base integration
 */
export function exportToClaude(
  prompts: PromptData[],
  options: ExporterOptions = {}
): ExportResult {
  try {
    // Filter prompts
    let filtered = prompts.filter(p => p.status === 'published')

    if (options.includeDraft) {
      filtered = prompts.filter(p => p.status !== 'archived')
    }
    if (options.filter) {
      filtered = filtered.filter(options.filter)
    }

    // Transform to Claude format
    const claudePrompts: ClaudeExport[] = filtered.map(prompt => {
      // Extract system instructions from content
      const systemMatch = prompt.content.match(/<SYSTEM_INSTRUCTIONS>([\s\S]*?)<\/SYSTEM_INSTRUCTIONS>/i)
      const systemInstructions = systemMatch ? systemMatch[1].trim() : ''

      return {
        name: prompt.slug,
        description: prompt.description,
        type: prompt.type,
        content: prompt.content,
        tags: prompt.tags,
        ...(systemInstructions && { system_prompt: systemInstructions }),
      }
    })

    // Generate content as JSON with metadata
    const output = {
      version: '1.0.0',
      exported: new Date().toISOString(),
      format: 'claude-json',
      description: 'AI Prompt Library export for Claude integration',
      totalPrompts: claudePrompts.length,
      prompts: claudePrompts,
    }

    return {
      success: true,
      format: 'claude-json',
      content: JSON.stringify(output, null, options.prettify !== false ? 2 : 0),
      promptCount: claudePrompts.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'claude-json',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Export as Claude Projects format (alternative)
 */
export function exportToClaudeProjects(
  prompts: PromptData[],
  options: ExporterOptions = {}
): ExportResult {
  try {
    const filtered = prompts.filter(p => p.status === 'published')

    // Format for Claude Projects import
    const projectsFormat = filtered.map(prompt => ({
      id: prompt.slug,
      title: prompt.title,
      description: prompt.description,
      content: prompt.content,
      metadata: {
        type: prompt.type,
        tags: prompt.tags,
        version: prompt.version,
        author: prompt.author.name,
      },
    }))

    const output = {
      version: '1.0.0',
      format: 'claude-projects',
      count: projectsFormat.length,
      data: projectsFormat,
    }

    return {
      success: true,
      format: 'claude-projects',
      content: JSON.stringify(output, null, 2),
      promptCount: projectsFormat.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'claude-projects',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
