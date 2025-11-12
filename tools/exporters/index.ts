/**
 * Export Orchestrator
 * Coordinates all exporters and manages export pipeline
 */

import fs from 'fs'
import path from 'path'
import { PromptData, ExporterOptions, ExportResult } from './types'
import { exportToClaude, exportToClaudeProjects } from './claude-export'
import { exportToChatGPT, exportToOpenAILibrary } from './chatgpt-export'
import { exportToRaycast, exportToRaycastPreset } from './raycast-export'
import { exportToCSV, parseCSV } from './csv-export'
import { exportToMarkdown } from './markdown-export'

export type ExportFormat =
  | 'claude'
  | 'claude-projects'
  | 'chatgpt'
  | 'openai'
  | 'raycast'
  | 'raycast-preset'
  | 'csv'
  | 'markdown'

/**
 * Export prompts to specified format
 */
export function exportPrompts(
  prompts: PromptData[],
  format: ExportFormat,
  options: ExporterOptions = {}
): ExportResult {
  switch (format) {
    case 'claude':
      return exportToClaude(prompts, options)
    case 'claude-projects':
      return exportToClaudeProjects(prompts, options)
    case 'chatgpt':
      return exportToChatGPT(prompts, options)
    case 'openai':
      return exportToOpenAILibrary(prompts, options)
    case 'raycast':
      return exportToRaycast(prompts, options)
    case 'raycast-preset':
      return exportToRaycastPreset(prompts, options)
    case 'csv':
      return exportToCSV(prompts, options)
    case 'markdown':
      return exportToMarkdown(prompts, options)
    default:
      return {
        success: false,
        format: format || 'unknown',
        content: '',
        promptCount: 0,
        timestamp: new Date().toISOString(),
        error: `Unknown export format: ${format}`,
      }
  }
}

/**
 * Export all formats to files
 */
export async function exportAllFormats(
  prompts: PromptData[],
  outputDir: string = 'data/exports',
  options: ExporterOptions = {}
): Promise<ExportResult[]> {
  const formats: ExportFormat[] = [
    'claude',
    'chatgpt',
    'raycast',
    'csv',
    'markdown',
  ]

  const results: ExportResult[] = []

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  for (const format of formats) {
    try {
      const result = exportPrompts(prompts, format, options)

      // Determine file extension
      const ext = format === 'csv' ? 'csv' : format === 'markdown' ? 'md' : 'json'
      const filename = `prompts-${format}.${ext}`
      const filepath = path.join(outputDir, filename)

      // Write to file
      fs.writeFileSync(filepath, result.content, 'utf-8')

      // Update result with file path
      results.push({
        ...result,
        content: `Written to: ${filepath}`,
      })

      console.log(`✅ Exported to ${format}: ${filename}`)
    } catch (error) {
      results.push({
        success: false,
        format: format,
        content: '',
        promptCount: 0,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      })

      console.error(`❌ Failed to export ${format}:`, error)
    }
  }

  return results
}

/**
 * Generate export summary
 */
export function generateExportSummary(results: ExportResult[]): string {
  let summary = '## Export Summary\n\n'
  summary += `**Total Exports:** ${results.length}\n`
  summary += `**Successful:** ${results.filter(r => r.success).length}\n`
  summary += `**Failed:** ${results.filter(r => !r.success).length}\n\n`

  summary += '### Export Results\n\n'

  for (const result of results) {
    const status = result.success ? '✅' : '❌'
    summary += `${status} **${result.format}**: ${result.promptCount} prompts\n`

    if (result.error) {
      summary += `   Error: ${result.error}\n`
    }
  }

  return summary
}

export type {
  PromptData,
  ExporterOptions,
  ExportResult,
  ClaudeExport,
  ChatGPTExport,
  RaycastExport,
  CSVExportRow,
  MarkdownBundle,
} from './types'
