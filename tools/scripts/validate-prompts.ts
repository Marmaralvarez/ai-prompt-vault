import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { validatePromptMetadata } from '@/schemas/prompt-schema'

/**
 * Validate all prompt files in the docs directory
 */
export async function validatePrompts(docsDir: string = 'docs'): Promise<{
  valid: number
  invalid: number
  errors: string[]
}> {
  const results = {
    valid: 0,
    invalid: 0,
    errors: [] as string[],
  }

  const promptsDir = path.join(docsDir, 'prompts')

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
        const { data: frontmatter } = matter(content)

        // Validate frontmatter
        const validation = validatePromptMetadata(frontmatter)

        if (validation.valid) {
          results.valid++
          console.log(`✅ ${entry.name}`)
        } else {
          results.invalid++
          const errors = validation.errors as Record<string, any>
          const errorMsg = Object.entries(errors)
            .map(([key, msgs]: [string, any]) => `  - ${key}: ${msgs?.[0] || 'unknown error'}`)
            .join('\n')

          results.errors.push(`❌ ${fullPath}\n${errorMsg}`)
          console.log(`❌ ${entry.name}`)
        }
      }
    }
  }

  console.log('\n📋 Validating prompts...\n')
  scanDirectory(promptsDir)

  // Print summary
  console.log('\n📊 Validation Summary\n')
  console.log(`✅ Valid: ${results.valid}`)
  console.log(`❌ Invalid: ${results.invalid}`)

  if (results.errors.length > 0) {
    console.log('\n⚠️  Errors:\n')
    results.errors.forEach(error => console.log(error))
  }

  return results
}

// Run if executed directly
if (require.main === module) {
  validatePrompts().then(results => {
    process.exit(results.invalid > 0 ? 1 : 0)
  })
}

export default validatePrompts
