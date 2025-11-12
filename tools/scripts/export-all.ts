import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { exportPrompts, exportAllFormats } from '../exporters/index'
import { PromptData } from '../exporters/types'

/**
 * Load all prompts from docs/prompts directory
 */
function loadAllPrompts(): PromptData[] {
  const prompts: PromptData[] = []
  const promptsDir = path.join(process.cwd(), 'docs', 'prompts')

  function scanDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Directory not found: ${dir}`)
      return
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        scanDirectory(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const { data: frontmatter, content: body } = matter(content)

        const relativePath = path.relative(promptsDir, fullPath)
        const id = path.basename(fullPath, '.md')

        const prompt: PromptData = {
          id,
          title: frontmatter.title || id,
          slug: frontmatter.slug || id,
          type: frontmatter.type || 'prompt',
          description: frontmatter.description || '',
          content: body,
          frontmatter,
          status: frontmatter.status || 'draft',
          tags: frontmatter.tags || [],
          version: frontmatter.version || '1.0.0',
          author: frontmatter.author || {
            name: 'Unknown',
          },
          created: frontmatter.created || new Date().toISOString(),
          lastModified: frontmatter.lastModified || new Date().toISOString(),
          estimatedTokens: frontmatter.estimated_tokens || frontmatter.estimatedTokens,
          relatedPrompts: frontmatter.related_prompts || frontmatter.relatedPrompts,
        }

        prompts.push(prompt)
      }
    }
  }

  scanDirectory(promptsDir)
  return prompts
}

/**
 * Export all prompts to all formats
 */
async function exportAll() {
  console.log('\n📦 Starting multi-format export...\n')

  try {
    const prompts = loadAllPrompts()
    console.log(`📝 Loaded ${prompts.length} prompts\n`)

    if (prompts.length === 0) {
      console.log('⚠️  No prompts found. Please create some prompts first.')
      process.exit(1)
    }

    const exportDir = path.join(process.cwd(), 'data', 'exports')
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true })
    }

    // Export to all formats
    const results = await exportAllFormats(prompts)

    console.log('\n📊 Export Results:\n')

    for (const result of results) {
      if (result.success) {
        // Save to file
        let filename = `prompts-${result.format}.json`
        if (result.format === 'csv') filename = `prompts-import.csv`
        if (result.format === 'markdown') filename = `prompts-bundle.md`

        const filePath = path.join(exportDir, filename)
        fs.writeFileSync(filePath, result.content)

        const fileSize = fs.statSync(filePath).size
        const fileSizeKb = (fileSize / 1024).toFixed(2)

        console.log(`✅ ${result.format.toUpperCase()}`)
        console.log(`   Prompts: ${result.promptCount}`)
        console.log(`   File: ${filename}`)
        console.log(`   Size: ${fileSizeKb} KB`)
        console.log(`   Path: ${filePath}\n`)
      } else {
        console.log(`❌ ${result.format.toUpperCase()}`)
        console.log(`   Error: ${result.error}\n`)
      }
    }

    console.log('✅ Export complete!')
    console.log(`📁 All exports saved to: ${exportDir}\n`)
  } catch (error) {
    console.error('❌ Export failed:', error)
    process.exit(1)
  }
}

// Run if executed directly
if (require.main === module) {
  exportAll()
}

export default exportAll
