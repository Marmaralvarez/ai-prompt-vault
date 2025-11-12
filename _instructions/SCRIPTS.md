# Phase 3: Export Pipeline & Tooling - Detailed Instructions

**Duration:** 3-4 hours  
**Objective:** Build platform-agnostic export system with validators  
**Success Criteria:** All exporters produce valid output for each platform

---

## Step 1: Create Exporter Type Definitions

### 1.1 Create tools/exporters/types.ts

**File: `tools/exporters/types.ts`**

```typescript
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
```

---

## Step 2: Claude Export Formatter

### 2.1 Create tools/exporters/claude-export.ts

**File: `tools/exporters/claude-export.ts`**

```typescript
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
    
    if (!options.includeDraft) {
      filtered = filtered.filter(p => p.status !== 'draft')
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
```

---

## Step 3: ChatGPT Export Formatter

### 3.1 Create tools/exporters/chatgpt-export.ts

**File: `tools/exporters/chatgpt-export.ts`**

```typescript
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
        difficulty: getChubgpTDifficulty(prompt.frontmatter.difficulty),
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
function getChubgpTDifficulty(difficulty?: string): string {
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
```

---

## Step 4: Raycast Export Formatter

### 4.1 Create tools/exporters/raycast-export.ts

**File: `tools/exporters/raycast-export.ts`**

```typescript
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

    // Raycast command format (compatible with Ray.so)
    const output = raycastCommands.map((cmd, idx) => ({
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
```

---

## Step 5: CSV Export Formatter

### 5.1 Create tools/exporters/csv-export.ts

**File: `tools/exporters/csv-export.ts`**

```typescript
import { PromptData, ExporterOptions, ExportResult, CSVExportRow } from './types'

/**
 * Export prompts as CSV for spreadsheet applications
 * Useful for import into other systems
 */
export function exportToCSV(
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

    // Create CSV headers
    const headers = [
      'Title',
      'Content',
      'Type',
      'Tags',
      'Platform',
      'Version',
      'Status',
      'Estimated Tokens',
      'Author',
      'Created',
      'Last Modified',
    ]

    // Convert prompts to CSV rows
    const rows: string[][] = filtered.map(prompt => [
      escapeCSV(prompt.title),
      escapeCSV(prompt.content.substring(0, 500)), // Truncate for CSV
      prompt.type,
      escapeCSV(prompt.tags.join('; ')),
      escapeCSV(prompt.frontmatter.platforms?.join('; ') || 'all'),
      prompt.version,
      prompt.status,
      prompt.estimatedTokens?.toString() || '',
      escapeCSV(prompt.author.name),
      prompt.created,
      prompt.lastModified,
    ])

    // Build CSV content
    const csvContent = [
      headers.map(h => escapeCSV(h)).join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n')

    return {
      success: true,
      format: 'csv',
      content: csvContent,
      promptCount: filtered.length,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      format: 'csv',
      content: '',
      promptCount: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Helper: Escape CSV special characters
 */
function escapeCSV(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"` // Escape quotes
  }
  return field
}

/**
 * Parse CSV and return as JSON
 */
export function parseCSV(csvContent: string): PromptData[] {
  const lines = csvContent.trim().split('\n')
  const headers = lines[0].split(',')
  const prompts: PromptData[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const prompt: any = {}

    headers.forEach((header, index) => {
      prompt[header.toLowerCase().replace(/\s+/g, '_')] = values[index]
    })

    if (prompt.title) {
      prompts.push(prompt)
    }
  }

  return prompts
}

/**
 * Helper: Parse CSV line respecting quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}
```

---

## Step 6: Markdown Bundle Exporter

### 6.1 Create tools/exporters/markdown-export.ts

**File: `tools/exporters/markdown-export.ts`**

```typescript
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
 * Generate section for each type
 */
function generateTypeSection(type: string, prompts: PromptData[]): string {
  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1)
  
  let section = `## ${typeTitle}

**Total:** ${prompts.length} prompts

`

  for (const prompt of prompts) {
    section += `### ${prompt.title}

**Version:** ${prompt.version}  
**Status:** ${prompt.status}  
**Tags:** ${prompt.tags.join(', ')}

${prompt.description}

#### Content

\`\`\`
${prompt.content}
\`\`\`

---

`
  }

  return section
}

/**
 * Generate markdown footer
 */
function generateFooter(): string {
  return `## Document Information

- **Total Prompts:** [COUNT]
- **Generated:** ${new Date().toISOString()}
- **Format Version:** 1.0.0

---

*End of AI Prompt Library Export*
`
}
```

---

## Step 7: Export Orchestrator

### 7.1 Create tools/exporters/index.ts

**File: `tools/exporters/index.ts`**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PromptData, ExporterOptions, ExportResult } from './types'
import { exportToClaude, exportToClaudeProjects } from './claude-export'
import { exportToChatGPT, exportToOpenAILibrary } from './chatgpt-export'
import { exportToRaycast, exportToRaycastPreset } from './raycast-export'
import { exportToCSV } from './csv-export'
import { exportToMarkdown } from './markdown-export'

/**
 * Main exporter orchestrator
 * Handles loading prompts and exporting to all formats
 */
export class PromptExporter {
  constructor(private docsDir: string = 'docs') {}

  /**
   * Load all prompts from filesystem
   */
  async loadPrompts(): Promise<PromptData[]> {
    const prompts: PromptData[] = []
    const promptsDir = path.join(this.docsDir, 'prompts')

    async function scanDir(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory() && !entry.name.startsWith('_')) {
          await scanDir(fullPath)
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf-8')
          const { data: frontmatter, content: body } = matter(content)

          prompts.push({
            id: frontmatter.slug || entry.name.replace('.md', ''),
            title: frontmatter.title,
            slug: frontmatter.slug,
            type: frontmatter.type,
            description: frontmatter.description,
            content: body,
            frontmatter,
            status: frontmatter.status || 'draft',
            tags: frontmatter.tags || [],
            version: frontmatter.version || '1.0.0',
            author: frontmatter.author || { name: 'Unknown' },
            created: frontmatter.created || new Date().toISOString(),
            lastModified: frontmatter.last_updated || new Date().toISOString(),
            estimatedTokens: frontmatter.estimated_tokens,
            relatedPrompts: frontmatter.related_prompts,
          })
        }
      }
    }

    await scanDir(promptsDir)
    return prompts
  }

  /**
   * Export to all formats
   */
  async exportAll(
    outputDir: string = 'data/exports',
    options: ExporterOptions = {}
  ): Promise<Record<string, ExportResult>> {
    const prompts = await this.loadPrompts()
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const results: Record<string, ExportResult> = {}

    // Claude exports
    const claudeResult = exportToClaude(prompts, options)
    this.saveResult(outputDir, 'prompts-claude.json', claudeResult)
    results['claude'] = claudeResult

    const claudeProjectsResult = exportToClaudeProjects(prompts, options)
    this.saveResult(outputDir, 'prompts-claude-projects.json', claudeProjectsResult)
    results['claude-projects'] = claudeProjectsResult

    // ChatGPT exports
    const chatgptResult = exportToChatGPT(prompts, options)
    this.saveResult(outputDir, 'prompts-chatgpt.json', chatgptResult)
    results['chatgpt'] = chatgptResult

    const openaiResult = exportToOpenAILibrary(prompts, options)
    this.saveResult(outputDir, 'prompts-openai.json', openaiResult)
    results['openai'] = openaiResult

    // Raycast exports
    const raycastResult = exportToRaycast(prompts, options)
    this.saveResult(outputDir, 'prompts-raycast.json', raycastResult)
    results['raycast'] = raycastResult

    const raycastPresetResult = exportToRaycastPreset(prompts, options)
    this.saveResult(outputDir, 'prompts-raycast-preset.json', raycastPresetResult)
    results['raycast-preset'] = raycastPresetResult

    // CSV export
    const csvResult = exportToCSV(prompts, options)
    this.saveResult(outputDir, 'prompts-import.csv', csvResult)
    results['csv'] = csvResult

    // Markdown export
    const mdResult = exportToMarkdown(prompts, options)
    this.saveResult(outputDir, 'prompts-bundle.md', mdResult)
    results['markdown'] = mdResult

    return results
  }

  /**
   * Save export result to file
   */
  private saveResult(dir: string, filename: string, result: ExportResult): void {
    if (result.success) {
      const filepath = path.join(dir, filename)
      fs.writeFileSync(filepath, result.content, 'utf-8')
      console.log(`✅ ${filename} (${result.promptCount} prompts)`)
    } else {
      console.error(`❌ ${filename} - ${result.error}`)
    }
  }
}

/**
 * CLI interface
 */
export async function exportPrompts() {
  const exporter = new PromptExporter()
  
  console.log('\n📤 Exporting prompts to all platforms...\n')
  
  const results = await exporter.exportAll()
  
  console.log('\n✨ Export complete!\n')
  console.log('Summary:')
  
  for (const [format, result] of Object.entries(results)) {
    console.log(`  ${format}: ${result.success ? '✅' : '❌'} (${result.promptCount} prompts)`)
  }
  
  console.log()
}

// Run if executed directly
if (require.main === module) {
  exportPrompts().catch(console.error)
}
```

---

## Step 8: Validation Pipeline

### 8.1 Create tools/scripts/validate-prompts.ts

**File: `tools/scripts/validate-prompts.ts`** (Updated)

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { validatePromptMetadata } from '../schemas/prompt-schema'

/**
 * Comprehensive prompt validation
 */
export async function validateAllPrompts(docsDir: string = 'docs') {
  const promptsDir = path.join(docsDir, 'prompts')
  const results = {
    total: 0,
    valid: 0,
    invalid: 0,
    errors: [] as any[],
  }

  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        scanDir(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.total++
        const content = fs.readFileSync(fullPath, 'utf-8')
        const { data: frontmatter, content: body } = matter(content)

        // Validate frontmatter
        const validation = validatePromptMetadata(frontmatter)
        if (!validation.valid) {
          results.invalid++
          results.errors.push({
            file: path.relative(docsDir, fullPath),
            errors: validation.errors,
          })
        } else {
          results.valid++
        }

        // Validate content length
        if (body.trim().length < 50) {
          results.invalid++
          results.errors.push({
            file: path.relative(docsDir, fullPath),
            error: 'Content too short (minimum 50 characters)',
          })
        }
      }
    }
  }

  scanDir(promptsDir)

  return results
}

/**
 * Print validation report
 */
export async function printValidationReport() {
  console.log('\n📋 Validating prompts...\n')

  const results = await validateAllPrompts()

  console.log(`Total: ${results.total}`)
  console.log(`Valid: ${results.valid} ✅`)
  console.log(`Invalid: ${results.invalid} ❌`)

  if (results.errors.length > 0) {
    console.log('\nErrors:')
    for (const error of results.errors) {
      console.log(`\n  📄 ${error.file}`)
      if (error.errors) {
        for (const [field, msgs] of Object.entries(error.errors)) {
          console.log(`    • ${field}: ${msgs}`)
        }
      } else {
        console.log(`    • ${error.error}`)
      }
    }
    process.exit(1)
  } else {
    console.log('\n✨ All prompts valid!\n')
    process.exit(0)
  }
}

// Run if executed directly
if (require.main === module) {
  printValidationReport().catch(console.error)
}

export default validateAllPrompts
```

---

## Step 9: Bash Export Script

### 9.1 Create tools/scripts/export-all.sh

**File: `tools/scripts/export-all.sh`**

```bash
#!/bin/bash

# Export prompts to all platforms
# Usage: ./tools/scripts/export-all.sh

set -e

echo "🚀 Exporting AI Prompts to All Platforms"
echo "=========================================="
echo ""

# Create exports directory
mkdir -p data/exports

# Run exports through Node
npx ts-node -e "
import { PromptExporter } from './tools/exporters'

async function run() {
  const exporter = new PromptExporter()
  const results = await exporter.exportAll()
  
  let success = true
  for (const [format, result] of Object.entries(results)) {
    if (!result.success) {
      success = false
    }
  }
  
  process.exit(success ? 0 : 1)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
"

echo ""
echo "✅ Export complete!"
echo ""
echo "Files generated:"
ls -lah data/exports/
```

**Make executable:**
```bash
chmod +x tools/scripts/export-all.sh
```

---

## Step 10: Add Package Scripts

### 10.1 Update package.json

Add to your `package.json` scripts section:

```json
{
  "scripts": {
    "export:all": "ts-node tools/exporters/index.ts",
    "export:claude": "ts-node -e \"import { exportToClaude } from './tools/exporters/claude-export'; import { PromptExporter } from './tools/exporters'; new PromptExporter().loadPrompts().then(p => console.log(JSON.stringify(exportToClaude(p), null, 2)))\"",
    "export:chatgpt": "ts-node -e \"import { exportToChatGPT } from './tools/exporters/chatgpt-export'; import { PromptExporter } from './tools/exporters'; new PromptExporter().loadPrompts().then(p => console.log(JSON.stringify(exportToChatGPT(p), null, 2)))\"",
    "export:raycast": "ts-node -e \"import { exportToRaycast } from './tools/exporters/raycast-export'; import { PromptExporter } from './tools/exporters'; new PromptExporter().loadPrompts().then(p => console.log(JSON.stringify(exportToRaycast(p), null, 2)))\"",
    "export:csv": "ts-node -e \"import { exportToCSV } from './tools/exporters/csv-export'; import { PromptExporter } from './tools/exporters'; new PromptExporter().loadPrompts().then(p => console.log(exportToCSV(p).content))\"",
    "validate": "ts-node tools/scripts/validate-prompts.ts",
    "export:bash": "bash tools/scripts/export-all.sh"
  }
}
```

---

## Step 11: Testing the Export Pipeline

### 11.1 Create Example Prompt for Testing

**File: `docs/prompts/agents/test-agent.md`**

```markdown
---
title: "Test Security Audit Agent"
description: "Test agent for validating export pipeline"
type: "agent"
slug: "test-security-audit"
version: "1.0.0"
status: "published"
author:
  name: "Test Team"
tags:
  - "testing"
  - "security"
created: "2025-01-11T00:00:00Z"
last_updated: "2025-01-11T00:00:00Z"
---

# Test Security Audit Agent

## Objective
You are a security testing agent designed to validate the export pipeline.

## Instructions
1. Review security configurations
2. Identify vulnerabilities
3. Provide recommendations

## Output Format
Return results as JSON with severity levels.
```

### 11.2 Run Validation

```bash
npm run validate

# Expected: All tests pass or show specific validation errors
```

### 11.3 Test Individual Exporters

```bash
# Test Claude export
npm run export:claude | head -20

# Test ChatGPT export
npm run export:chatgpt | head -20

# Test Raycast export
npm run export:raycast | head -20

# Test CSV export
npm run export:csv | head -5
```

### 11.4 Run Full Export Pipeline

```bash
npm run export:all

# Expected output:
# 📤 Exporting prompts to all platforms...
# ✅ prompts-claude.json
# ✅ prompts-chatgpt.json
# etc.
```

### 11.5 Verify Output Files

```bash
# Check generated exports
ls -lah data/exports/

# Expected: 8-10 files created

# Verify JSON validity
npx ts-node -e "
import * as fs from 'fs'
const files = fs.readdirSync('data/exports').filter(f => f.endsWith('.json'))
for (const file of files) {
  try {
    JSON.parse(fs.readFileSync(\`data/exports/\${file}\`, 'utf-8'))
    console.log(\`✅ \${file}\`)
  } catch (e) {
    console.log(\`❌ \${file}\`)
  }
}
"
```

---

## Step 12: CI/CD GitHub Workflow

### 12.1 Create .github/workflows/validate-and-export.yml

**File: `.github/workflows/validate-and-export.yml`**

```yaml
name: Validate Prompts & Export

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate prompts
        run: npm run validate
      
      - name: Run exporters
        run: npm run export:all
      
      - name: Upload exports
        uses: actions/upload-artifact@v3
        with:
          name: prompt-exports
          path: data/exports/
      
      - name: Build documentation
        run: npm run build
      
      - name: Archive build
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: .next/
```

---

## Step 13: Commit Phase 3

```bash
# Stage exporter files
git add tools/exporters/
git add tools/scripts/export-all.sh
git add .github/workflows/

# Make script executable
chmod +x tools/scripts/export-all.sh

# Commit
git commit -m "feat: Complete Phase 3 - Export pipeline with multi-platform support

- Implement Claude export formatter (JSON)
- Implement ChatGPT export formatter
- Implement Raycast export formatter
- Implement CSV import/export formatter
- Implement Markdown bundle exporter
- Create export orchestrator (PromptExporter class)
- Add comprehensive validation pipeline
- Create bash export script
- Add npm scripts for each exporter
- Create GitHub Actions workflow for validation
- Add example test prompt"

# Verify
git log --oneline -5
```

---

## Phase 3 Completion Checklist

- [ ] Type definitions created (tools/exporters/types.ts)
- [ ] Claude exporter created
- [ ] ChatGPT exporter created
- [ ] Raycast exporter created
- [ ] CSV exporter created
- [ ] Markdown exporter created
- [ ] Export orchestrator created
- [ ] Validation pipeline enhanced
- [ ] Bash export script created
- [ ] npm scripts added
- [ ] GitHub workflow created
- [ ] Test prompt created
- [ ] npm run validate passes
- [ ] npm run export:all succeeds
- [ ] All export files valid JSON/CSV
- [ ] Git commits made

---

## Success Criteria

✅ **Phase 3 Complete when:**

```bash
# Validation passes
npm run validate
# Shows all prompts valid

# All exporters work
npm run export:all
# Shows 8+ successful exports

# Check output
ls -lah data/exports/
# Shows: prompts-claude.json, prompts-chatgpt.json, prompts-raycast.json, etc.

# Verify JSON
cat data/exports/prompts-claude.json | jq . > /dev/null
# Shows valid JSON
```

---

## Next Steps

When Phase 3 is complete:

1. ✅ Run validation: `npm run validate`
2. ✅ Run exports: `npm run export:all`
3. ✅ Verify files in `data/exports/`
4. ✅ Test individual exporters
5. ✅ Report completion status
6. ✅ Proceed to **TEMPLATES.md** for Phase 4

---

**Ready for Phase 3? Build the export pipeline! 🚀**
