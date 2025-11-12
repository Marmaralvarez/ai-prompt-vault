import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Prompt Library Analytics
 * Collects statistics and metrics about the prompt library
 */

interface PromptStats {
  total: number
  byType: Record<string, number>
  byStatus: Record<string, number>
  byDifficulty: Record<string, number>
  byAuthor: Record<string, number>
  avgTokens: number
  totalTokens: number
  withTags: number
  withRelated: number
  tagsFrequency: Record<string, number>
}

interface Analytics {
  generatedAt: string
  promptStats: PromptStats
  topTags: Array<{ tag: string; count: number }>
  fileStats: {
    totalFiles: number
    totalSize: number
    avgSize: number
  }
}

function loadAllPrompts(): Array<any> {
  const prompts: Array<any> = []
  const promptsDir = path.join(process.cwd(), 'docs', 'prompts')

  function scanDirectory(dir: string) {
    if (!fs.existsSync(dir)) return

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        scanDirectory(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const { data: frontmatter, content: body } = matter(content)
        const stats = fs.statSync(fullPath)

        prompts.push({
          ...frontmatter,
          body,
          path: fullPath,
          fileSize: stats.size,
          contentLength: body.length,
        })
      }
    }
  }

  scanDirectory(promptsDir)
  return prompts
}

function analyzePrompts(prompts: Array<any>): PromptStats {
  const stats: PromptStats = {
    total: prompts.length,
    byType: {},
    byStatus: {},
    byDifficulty: {},
    byAuthor: {},
    avgTokens: 0,
    totalTokens: 0,
    withTags: 0,
    withRelated: 0,
    tagsFrequency: {},
  }

  let totalTokens = 0

  for (const prompt of prompts) {
    // Type statistics
    const type = prompt.type || 'unknown'
    stats.byType[type] = (stats.byType[type] || 0) + 1

    // Status statistics
    const status = prompt.status || 'draft'
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1

    // Difficulty statistics
    if (prompt.difficulty) {
      stats.byDifficulty[prompt.difficulty] =
        (stats.byDifficulty[prompt.difficulty] || 0) + 1
    }

    // Author statistics
    if (prompt.author) {
      const authorName = typeof prompt.author === 'string' ? prompt.author : prompt.author.name
      stats.byAuthor[authorName] = (stats.byAuthor[authorName] || 0) + 1
    }

    // Token statistics
    const tokens = prompt.estimated_tokens || prompt.estimatedTokens || 0
    totalTokens += tokens

    // Tags statistics
    if (prompt.tags && Array.isArray(prompt.tags)) {
      stats.withTags++
      for (const tag of prompt.tags) {
        stats.tagsFrequency[tag] = (stats.tagsFrequency[tag] || 0) + 1
      }
    }

    // Related prompts statistics
    if (prompt.related_prompts || prompt.relatedPrompts) {
      stats.withRelated++
    }
  }

  stats.totalTokens = totalTokens
  stats.avgTokens = prompts.length > 0 ? Math.round(totalTokens / prompts.length) : 0

  return stats
}

function getTopTags(
  tagsFrequency: Record<string, number>,
  limit: number = 10
): Array<{ tag: string; count: number }> {
  return Object.entries(tagsFrequency)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

function generateAnalytics(): Analytics {
  const prompts = loadAllPrompts()
  const promptStats = analyzePrompts(prompts)
  const topTags = getTopTags(promptStats.tagsFrequency)

  // File statistics
  let totalSize = 0
  for (const prompt of prompts) {
    totalSize += prompt.fileSize || 0
  }

  const analytics: Analytics = {
    generatedAt: new Date().toISOString(),
    promptStats,
    topTags,
    fileStats: {
      totalFiles: prompts.length,
      totalSize,
      avgSize: prompts.length > 0 ? Math.round(totalSize / prompts.length) : 0,
    },
  }

  return analytics
}

function formatAnalytics(analytics: Analytics): string {
  let report = '\n📊 AI Prompt Library Analytics\n'
  report += '='.repeat(50) + '\n\n'

  report += `Generated: ${new Date(analytics.generatedAt).toLocaleString()}\n\n`

  // Prompt statistics
  report += '📝 Prompt Statistics\n'
  report += '-'.repeat(50) + '\n'
  report += `Total Prompts: ${analytics.promptStats.total}\n\n`

  report += 'By Type:\n'
  for (const [type, count] of Object.entries(analytics.promptStats.byType)) {
    const percentage = ((count / analytics.promptStats.total) * 100).toFixed(1)
    report += `  • ${type}: ${count} (${percentage}%)\n`
  }

  report += '\nBy Status:\n'
  for (const [status, count] of Object.entries(analytics.promptStats.byStatus)) {
    const percentage = ((count / analytics.promptStats.total) * 100).toFixed(1)
    report += `  • ${status}: ${count} (${percentage}%)\n`
  }

  report += '\nBy Difficulty:\n'
  const difficulties = ['beginner', 'intermediate', 'advanced']
  for (const difficulty of difficulties) {
    const count = analytics.promptStats.byDifficulty[difficulty] || 0
    if (count > 0) {
      const percentage = ((count / analytics.promptStats.total) * 100).toFixed(1)
      report += `  • ${difficulty}: ${count} (${percentage}%)\n`
    }
  }

  // Token statistics
  report += '\n💾 Token Statistics\n'
  report += '-'.repeat(50) + '\n'
  report += `Total Tokens: ${analytics.promptStats.totalTokens.toLocaleString()}\n`
  report += `Average Tokens: ${analytics.promptStats.avgTokens}\n`

  // Tag statistics
  report += '\n🏷️  Top Tags\n'
  report += '-'.repeat(50) + '\n'
  for (const { tag, count } of analytics.topTags) {
    const percentage = ((count / analytics.promptStats.total) * 100).toFixed(1)
    report += `  • ${tag}: ${count} prompts (${percentage}%)\n`
  }

  // File statistics
  report += '\n📁 File Statistics\n'
  report += '-'.repeat(50) + '\n'
  report += `Total Files: ${analytics.fileStats.totalFiles}\n`
  report += `Total Size: ${(analytics.fileStats.totalSize / 1024).toFixed(2)} KB\n`
  report += `Average Size: ${(analytics.fileStats.avgSize / 1024).toFixed(2)} KB\n`

  // Coverage
  report += '\n✨ Coverage Metrics\n'
  report += '-'.repeat(50) + '\n'
  const withTags = ((analytics.promptStats.withTags / analytics.promptStats.total) * 100).toFixed(1)
  const withRelated = ((analytics.promptStats.withRelated / analytics.promptStats.total) * 100).toFixed(1)
  report += `Prompts with Tags: ${analytics.promptStats.withTags}/${analytics.promptStats.total} (${withTags}%)\n`
  report += `Prompts with Related: ${analytics.promptStats.withRelated}/${analytics.promptStats.total} (${withRelated}%)\n`

  report += '\n' + '='.repeat(50) + '\n'

  return report
}

async function main() {
  try {
    const analytics = generateAnalytics()
    const report = formatAnalytics(analytics)

    // Print to console
    console.log(report)

    // Save to file
    const reportPath = path.join(process.cwd(), 'data', 'analytics.json')
    const dir = path.dirname(reportPath)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(reportPath, JSON.stringify(analytics, null, 2))
    console.log(`\n✅ Analytics saved to: ${reportPath}\n`)
  } catch (error) {
    console.error('Analytics generation failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export default generateAnalytics
