import fs from 'fs'
import path from 'path'
import { exportPrompts, exportAllFormats } from '../tools/exporters/index'
import { PromptData } from '../tools/exporters/types'

const testPrompt: PromptData = {
  id: 'integration-test-1',
  title: 'Integration Test Prompt',
  slug: 'integration-test-prompt',
  type: 'agent',
  description: 'This is a test prompt for integration testing',
  content: '# Test Content\n\nThis is test content for integration tests.',
  frontmatter: { difficulty: 'intermediate' },
  status: 'published',
  tags: ['test', 'integration'],
  version: '1.0.0',
  author: { name: 'Integration Test' },
  created: '2025-01-11T00:00:00Z',
  lastModified: '2025-01-11T00:00:00Z',
  estimatedTokens: 250,
}

describe('Integration Tests', () => {
  const testOutputDir = path.join(process.cwd(), 'tests', '.output')

  beforeAll(() => {
    // Create test output directory
    if (!fs.existsSync(testOutputDir)) {
      fs.mkdirSync(testOutputDir, { recursive: true })
    }
  })

  afterAll(() => {
    // Clean up test files
    if (fs.existsSync(testOutputDir)) {
      const files = fs.readdirSync(testOutputDir)
      for (const file of files) {
        fs.unlinkSync(path.join(testOutputDir, file))
      }
      fs.rmdirSync(testOutputDir)
    }
  })

  describe('Export Pipeline Integration', () => {
    it('should export to single format successfully', () => {
      const result = exportPrompts([testPrompt], 'claude')

      expect(result.success).toBe(true)
      expect(result.promptCount).toBe(1)
      expect(result.format).toBe('claude-json')
    })

    it('should handle multiple prompts', () => {
      const prompts = [testPrompt, { ...testPrompt, id: 'test-2', slug: 'test-2' }]
      const result = exportPrompts(prompts, 'claude')

      expect(result.promptCount).toBe(2)
    })

    it('should produce consistent output across multiple calls', () => {
      const result1 = exportPrompts([testPrompt], 'claude')
      const result2 = exportPrompts([testPrompt], 'claude')

      expect(result1.content).toBe(result2.content)
    })
  })

  describe('Multi-Format Export', () => {
    it('should export all formats without errors', async () => {
      const results = await exportAllFormats([testPrompt], testOutputDir)

      for (const result of results) {
        expect(result.success).toBe(true)
        expect(result.promptCount).toBeGreaterThan(0)
      }
    })

    it('should create expected export files', async () => {
      await exportAllFormats([testPrompt], testOutputDir)

      const expectedFiles = [
        'prompts-claude.json',
        'prompts-chatgpt.json',
        'prompts-raycast.json',
        'prompts-csv.csv',
        'prompts-markdown.md',
      ]

      for (const file of expectedFiles) {
        const filePath = path.join(testOutputDir, file)
        expect(fs.existsSync(filePath)).toBe(true)
      }
    })

    it('should produce valid JSON in all JSON exports', async () => {
      await exportAllFormats([testPrompt], testOutputDir)

      const jsonFiles = [
        'prompts-claude.json',
        'prompts-chatgpt.json',
        'prompts-raycast.json',
      ]

      for (const file of jsonFiles) {
        const filePath = path.join(testOutputDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')

        expect(() => {
          JSON.parse(content)
        }).not.toThrow()
      }
    })

    it('should produce valid CSV file', async () => {
      await exportAllFormats([testPrompt], testOutputDir)

      const csvPath = path.join(testOutputDir, 'prompts-csv.csv')
      const content = fs.readFileSync(csvPath, 'utf-8')

      // Should have headers
      expect(content).toContain('Title')

      // Should have data
      expect(content).toContain('Integration Test Prompt')
    })

    it('should produce valid Markdown file', async () => {
      await exportAllFormats([testPrompt], testOutputDir)

      const mdPath = path.join(testOutputDir, 'prompts-markdown.md')
      const content = fs.readFileSync(mdPath, 'utf-8')

      // Should have markdown structure
      expect(content).toContain('#')

      // Should include content
      expect(content).toContain('Integration Test Prompt')
    })
  })

  describe('File System Integration', () => {
    it('should create output directory if not exists', async () => {
      const newDir = path.join(testOutputDir, 'subdir')

      expect(fs.existsSync(newDir)).toBe(false)

      await exportAllFormats([testPrompt], newDir)

      expect(fs.existsSync(newDir)).toBe(true)

      // Cleanup
      const files = fs.readdirSync(newDir)
      for (const file of files) {
        fs.unlinkSync(path.join(newDir, file))
      }
      fs.rmdirSync(newDir)
    })

    it('should overwrite existing files', async () => {
      const filePath = path.join(testOutputDir, 'prompts-claude.json')

      // First export
      await exportAllFormats([testPrompt], testOutputDir)

      // Second export with different data (modify description which is in the export)
      const modifiedPrompt = { ...testPrompt, description: 'Modified Description Content' }
      await exportAllFormats([modifiedPrompt], testOutputDir)

      // Verify the file was overwritten with new content
      const content = fs.readFileSync(filePath, 'utf-8')
      expect(content).toContain('Modified Description Content')
    })
  })

  describe('Data Integrity', () => {
    it('should preserve prompt data in exports', async () => {
      const result = exportPrompts([testPrompt], 'claude')
      const data = JSON.parse(result.content)

      expect(data.prompts[0].name).toBe(testPrompt.slug)
      expect(data.prompts[0].description).toBe(testPrompt.description)
      expect(data.prompts[0].type).toBe(testPrompt.type)
    })

    it('should preserve all tags', async () => {
      const result = exportPrompts([testPrompt], 'claude')
      const data = JSON.parse(result.content)

      const tags = data.prompts[0].tags
      expect(tags).toContain('test')
      expect(tags).toContain('integration')
    })

    it('should handle special characters in content', () => {
      const specialPrompt = {
        ...testPrompt,
        title: 'Test "Quotes" & Special <Chars>',
        content: 'Content with "quotes", <tags>, & ampersand',
      }

      const result = exportPrompts([specialPrompt], 'claude')

      expect(result.success).toBe(true)
      expect(result.promptCount).toBe(1)

      const data = JSON.parse(result.content)
      expect(data.prompts[0].name).toBeDefined()
    })
  })

  describe('Performance', () => {
    it('should handle multiple prompts efficiently', () => {
      const prompts = Array(20)
        .fill(0)
        .map((_, i) => ({
          ...testPrompt,
          id: `perf-test-${i}`,
          slug: `perf-test-${i}`,
        }))

      const startTime = Date.now()
      const result = exportPrompts(prompts, 'claude')
      const duration = Date.now() - startTime

      expect(result.success).toBe(true)
      expect(result.promptCount).toBe(20)
      expect(duration).toBeLessThan(5000) // Should complete in under 5 seconds
    })

    it('should handle large content efficiently', () => {
      const largePrompt = {
        ...testPrompt,
        content: 'A'.repeat(10000), // 10KB of content
      }

      const startTime = Date.now()
      const result = exportPrompts([largePrompt], 'claude')
      const duration = Date.now() - startTime

      expect(result.success).toBe(true)
      expect(duration).toBeLessThan(2000) // Should complete in under 2 seconds
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid format gracefully', () => {
      const result = exportPrompts([testPrompt], 'invalid-format' as any)

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should handle empty prompt list', () => {
      const result = exportPrompts([], 'claude')

      expect(result.promptCount).toBe(0)
      // Should still be valid JSON
      const data = JSON.parse(result.content)
      expect(data.prompts).toBeDefined()
    })

    it('should handle prompts with missing optional fields', () => {
      const minimalPrompt = {
        id: 'min-1',
        title: 'Minimal',
        slug: 'minimal',
        type: 'prompt' as const,
        description: 'Minimal description',
        content: 'Content',
        frontmatter: {},
        status: 'published' as const,
        tags: ['test', 'minimal'],
        version: '1.0.0',
        author: { name: 'Author' },
        created: '2025-01-11T00:00:00Z',
        lastModified: '2025-01-11T00:00:00Z',
      }

      const result = exportPrompts([minimalPrompt], 'claude')

      expect(result.success).toBe(true)
      expect(result.promptCount).toBe(1)
    })
  })
})
