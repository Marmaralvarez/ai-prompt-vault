import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import matter from 'gray-matter'
import { PromptMetadataSchema, PromptRegistrySchema } from '../schemas/prompt-schema'

/**
 * Scan all prompt files and update the master registry
 */
export async function updateRegistry(docsDir: string = 'docs') {
  const registry = {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    prompts: [] as any[],
  }

  // Find all markdown files in prompts directory
  const promptsDir = path.join(docsDir, 'prompts')

  async function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        await scanDirectory(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const { data, content: body } = matter(content)

        // Validate frontmatter
        const validation = PromptMetadataSchema.safeParse(data)

        if (!validation.success) {
          console.error(`Invalid frontmatter in ${fullPath}:`, validation.error.flatten())
          continue
        }

        const metadata = validation.data

        registry.prompts.push({
          id: metadata.slug,
          title: metadata.title,
          slug: metadata.slug,
          type: metadata.type,
          path: path.relative(docsDir, fullPath),
          status: metadata.status,
          tags: metadata.tags,
          version: metadata.version,
          created: metadata.created || new Date().toISOString(),
          lastModified: metadata.last_updated || new Date().toISOString(),
          author: metadata.author.name,
          estimatedTokens: metadata.estimated_tokens,
          relatedPrompts: metadata.related_prompts,
        })
      }
    }
  }

  await scanDirectory(promptsDir)

  // Validate registry
  const registryValidation = PromptRegistrySchema.safeParse(registry)
  if (!registryValidation.success) {
    console.error('Registry validation failed:', registryValidation.error)
    process.exit(1)
  }

  // Write registry
  fs.writeFileSync(
    path.join(docsDir, '..', 'data', 'prompts.json'),
    JSON.stringify(registry, null, 2)
  )

  console.log(`✅ Updated registry with ${registry.prompts.length} prompts`)
  return registry
}

// Run if executed directly
if (require.main === module) {
  updateRegistry().catch(console.error)
}

export default updateRegistry
