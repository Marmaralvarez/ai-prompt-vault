import fs from 'fs'
import path from 'path'

/**
 * Validate documentation completeness
 */

interface DocCheckResult {
  file: string
  exists: boolean
  size: number
  hasContent: boolean
  sections: string[]
}

interface DocValidationReport {
  timestamp: string
  totalFiles: number
  existingFiles: number
  missingFiles: string[]
  totalSize: number
  allChecksPassed: boolean
  details: DocCheckResult[]
}

const requiredDocs = [
  // Guides
  { path: 'docs/guides/getting-started.md', name: 'Getting Started Guide' },
  { path: 'docs/guides/prompt-anatomy.md', name: 'Prompt Anatomy Guide' },
  { path: 'docs/guides/platform-integration.md', name: 'Platform Integration Guide' },
  { path: 'docs/guides/tagging-strategy.md', name: 'Tagging Strategy Guide' },
  { path: 'docs/guides/version-management.md', name: 'Version Management Guide' },
  { path: 'docs/guides/prompt-submission.md', name: 'Prompt Submission Guide' },
  { path: 'docs/guides/deployment.md', name: 'Deployment Guide' },
  { path: 'docs/guides/local-setup.md', name: 'Local Setup Guide' },

  // Root documentation
  { path: 'README.md', name: 'Project README' },
  { path: 'CONTRIBUTING.md', name: 'Contributing Guidelines', optional: true },

  // Configuration
  { path: 'package.json', name: 'Package Configuration' },
  { path: 'tsconfig.json', name: 'TypeScript Configuration' },
  { path: 'fumadocs.config.ts', name: 'Fumadocs Configuration' },
  { path: 'next.config.mjs', name: 'Next.js Configuration' },
]

function checkDocumentation(basePath: string): DocValidationReport {
  const details: DocCheckResult[] = []
  const missingFiles: string[] = []
  let totalSize = 0
  let existingFiles = 0

  const cwd = basePath || process.cwd()

  for (const doc of requiredDocs) {
    const fullPath = path.join(cwd, doc.path)
    const exists = fs.existsSync(fullPath)

    if (exists) {
      existingFiles++
      const stats = fs.statSync(fullPath)
      const content = fs.readFileSync(fullPath, 'utf-8')
      totalSize += stats.size

      // Extract sections (look for headers)
      const sections: string[] = []
      const headerRegex = /^#{1,6}\s+(.+)$/gm
      let match

      while ((match = headerRegex.exec(content)) !== null) {
        sections.push(match[1])
      }

      details.push({
        file: doc.path,
        exists: true,
        size: stats.size,
        hasContent: content.length > 100,
        sections: sections.slice(0, 5), // First 5 sections
      })
    } else {
      if (!doc.optional) {
        missingFiles.push(doc.path)
      }

      details.push({
        file: doc.path,
        exists: false,
        size: 0,
        hasContent: false,
        sections: [],
      })
    }
  }

  return {
    timestamp: new Date().toISOString(),
    totalFiles: requiredDocs.length,
    existingFiles,
    missingFiles,
    totalSize,
    allChecksPassed: missingFiles.length === 0 && existingFiles > 0,
    details,
  }
}

function formatReport(report: DocValidationReport): string {
  let output = '\n📚 Documentation Validation Report\n'
  output += '='.repeat(50) + '\n\n'

  output += `Generated: ${new Date(report.timestamp).toLocaleString()}\n\n`

  output += `📊 Summary:\n`
  output += `-`.repeat(50) + '\n'
  output += `Total Required: ${report.totalFiles}\n`
  output += `Existing: ${report.existingFiles}/${report.totalFiles}\n`
  output += `Coverage: ${((report.existingFiles / report.totalFiles) * 100).toFixed(1)}%\n`
  output += `Total Size: ${(report.totalSize / 1024).toFixed(2)} KB\n\n`

  if (report.missingFiles.length > 0) {
    output += `❌ Missing Files (${report.missingFiles.length}):\n`
    for (const file of report.missingFiles) {
      output += `  • ${file}\n`
    }
    output += '\n'
  } else {
    output += `✅ All Required Files Present\n\n`
  }

  // File details
  output += `📄 File Details:\n`
  output += `-`.repeat(50) + '\n'

  const existingDocs = report.details.filter(d => d.exists)

  for (const doc of existingDocs) {
    const status = doc.hasContent ? '✅' : '⚠️ '
    output += `${status} ${doc.file} (${(doc.size / 1024).toFixed(2)} KB)\n`

    if (doc.sections.length > 0) {
      output += `   Sections: ${doc.sections.slice(0, 3).join(', ')}\n`
    }
  }

  output += '\n' + '='.repeat(50) + '\n'

  // Status
  if (report.allChecksPassed) {
    output += `\n✅ Documentation Complete - All Checks Passed!\n`
  } else {
    output += `\n⚠️  Missing documentation - ${report.missingFiles.length} file(s) needed\n`
  }

  output += '\n'

  return output
}

async function main() {
  try {
    const report = checkDocumentation(process.cwd())
    const formatted = formatReport(report)

    console.log(formatted)

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'data', 'docs-validation.json')
    const dir = path.dirname(reportPath)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`✅ Detailed report saved to: ${reportPath}\n`)

    // Exit with appropriate code
    process.exit(report.allChecksPassed ? 0 : 1)
  } catch (error) {
    console.error('Documentation validation failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export default checkDocumentation
