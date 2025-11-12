/**
 * Type definitions for exporters
 */

export interface PromptData {
  id: string
  title: string
  slug: string
  type: 'agent' | 'feature' | 'pack' | 'prompt' | 'rule'
  description: string
  content: string
  frontmatter: Record<string, any>
  status: 'published' | 'draft' | 'deprecated' | 'archived'
  tags: string[]
  version: string
  author: {
    name: string
    email?: string
    url?: string
  }
  created: string
  lastModified: string
  estimatedTokens?: number
  relatedPrompts?: string[]
}

export interface ExporterOptions {
  includeDraft?: boolean
  includeDeprecated?: boolean
  filter?: (prompt: PromptData) => boolean
  prettify?: boolean
}

export interface ExportResult {
  success: boolean
  format: string
  content: string
  promptCount: number
  timestamp: string
  error?: string
}

/**
 * Platform-specific export formats
 */

export interface ClaudeExport {
  name: string
  description: string
  type: string
  content: string
  tags: string[]
  system_prompt?: string
}

export interface ChatGPTExport {
  name: string
  description: string
  prompt_content: string
  category: string
  difficulty: string
  tags: string[]
}

export interface RaycastExport {
  name: string
  prompt: string
  icon?: string
  model?: string
  temperature?: number
  maxTokens?: number
  creativity?: 'low' | 'medium' | 'high'
}

export interface CSVExportRow {
  'Title': string
  'Content': string
  'Type': string
  'Tags': string
  'Platform': string
  'Version': string
  'Status': string
  'Estimated Tokens': string
}

export interface MarkdownBundle {
  title: string
  description: string
  generatedAt: string
  promptCount: number
  sections: {
    [category: string]: PromptData[]
  }
}
