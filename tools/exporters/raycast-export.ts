import { PromptData, ExporterOptions, ExportResult, RaycastExport } from './types'

/**
 * Export prompts as Raycast commands
 * Suitable for Raycast app and AI Chat integration
 */
export function exportToRaycast(
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

    const raycastCommands: RaycastExport[] = filtered.map(prompt => ({
      name: prompt.title,
      prompt: cleanContentForRaycast(prompt.content),
      icon: getIconForType(prompt.type),
      model: getDefaultModel(prompt.type),
      temperature: getTemperature(prompt.type),
      maxTokens: Math.min(prompt.estimatedTokens || 2000, 4000),
      creativity: getCreativity(prompt.type),
    }))

    // Raycast command format
    const output = raycastCommands.map((cmd) => ({
      title: cmd.name,
      prompt: cmd.prompt,
      icon: cmd.icon,
      model: cmd.model,
      temperature: cmd.temperature,
      maxTokens: cmd.maxTokens,
      creativity: cmd.creativity,
    }))

    return {
      success: true,
      format: 'raycast',
      content: JSON.stringify(output, null, 2),
      promptCount: raycastCommands.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'raycast',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Helper: Clean content for Raycast (remove markdown sections)
 */
function cleanContentForRaycast(content: string): string {
  return content
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/---\n[\s\S]*?\n---/g, '') // Remove frontmatter
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .substring(0, 2000) // Limit to 2000 chars
}

/**
 * Helper: Get Raycast icon by prompt type
 */
function getIconForType(type: string): string {
  const iconMap: Record<string, string> = {
    agent: '🤖',
    feature: '✨',
    rule: '📋',
    pack: '📦',
    prompt: '💭',
  }
  return iconMap[type] || '✏️'
}

/**
 * Helper: Get default model for prompt type
 */
function getDefaultModel(type: string): string {
  const modelMap: Record<string, string> = {
    agent: 'gpt-4-turbo',
    feature: 'gpt-4-turbo',
    rule: 'gpt-3.5-turbo',
    pack: 'gpt-4-turbo',
    prompt: 'gpt-3.5-turbo',
  }
  return modelMap[type] || 'gpt-4-turbo'
}

/**
 * Helper: Get temperature by type
 */
function getTemperature(type: string): number {
  const tempMap: Record<string, number> = {
    agent: 0.7,
    feature: 0.5,
    rule: 0.3,
    pack: 0.6,
    prompt: 0.7,
  }
  return tempMap[type] || 0.5
}

/**
 * Helper: Get creativity level
 */
function getCreativity(type: string): 'low' | 'medium' | 'high' {
  const creativityMap: Record<string, 'low' | 'medium' | 'high'> = {
    agent: 'high',
    feature: 'medium',
    rule: 'low',
    pack: 'medium',
    prompt: 'high',
  }
  return creativityMap[type] || 'medium'
}

/**
 * Export as Raycast preset/command JSON
 */
export function exportToRaycastPreset(
  prompts: PromptData[],
  options: ExporterOptions = {}
): ExportResult {
  try {
    const filtered = prompts.filter(p => p.status === 'published')

    const presets = filtered.map(prompt => ({
      name: prompt.title,
      instructions: `Use this prompt for: ${prompt.description}`,
      prompt: cleanContentForRaycast(prompt.content),
      icon: getIconForType(prompt.type),
      model: getDefaultModel(prompt.type),
      web_search: false,
      image_generation: false,
    }))

    return {
      success: true,
      format: 'raycast-preset',
      content: JSON.stringify(presets, null, 2),
      promptCount: presets.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'raycast-preset',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
