import { PromptData, ExporterOptions, ExportResult, ChatGPTExport } from './types'

/**
 * Export prompts in ChatGPT-compatible format
 * Suitable for Custom GPTs and ChatGPT integrations
 */
export function exportToChatGPT(
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

    const chatgptPrompts: ChatGPTExport[] = filtered.map(prompt => {
      // Map our types to ChatGPT categories
      const categoryMap: Record<string, string> = {
        agent: 'Advanced',
        feature: 'Development',
        rule: 'Guidelines',
        pack: 'Collections',
        prompt: 'Standard',
      }

      return {
        name: prompt.title,
        description: prompt.description,
        prompt_content: prompt.content,
        category: categoryMap[prompt.type] || 'Other',
        difficulty: getChatGPTDifficulty(prompt.frontmatter.difficulty),
        tags: prompt.tags,
      }
    })

    // Generate JSON export
    const output = {
      version: '1.0.0',
      exported: new Date().toISOString(),
      format: 'chatgpt',
      totalCount: chatgptPrompts.length,
      prompts: chatgptPrompts,
    }

    return {
      success: true,
      format: 'chatgpt',
      content: JSON.stringify(output, null, 2),
      promptCount: chatgptPrompts.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'chatgpt',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Helper function to map difficulty to ChatGPT levels
 */
function getChatGPTDifficulty(difficulty?: string): string {
  const map: Record<string, string> = {
    beginner: 'Easy',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return map[difficulty || 'intermediate'] || 'Intermediate'
}

/**
 * Export as OpenAI Prompt Library format
 */
export function exportToOpenAILibrary(
  prompts: PromptData[],
  options: ExporterOptions = {}
): ExportResult {
  try {
    const filtered = prompts.filter(p => p.status === 'published')

    const formatted = filtered.map(prompt => ({
      title: prompt.title,
      description: prompt.description,
      prompt: prompt.content,
      tags: prompt.tags,
      author: prompt.author.name,
      created: prompt.created,
      version: prompt.version,
    }))

    return {
      success: true,
      format: 'openai-library',
      content: JSON.stringify(formatted, null, 2),
      promptCount: formatted.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'openai-library',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
