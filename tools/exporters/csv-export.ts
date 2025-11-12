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
