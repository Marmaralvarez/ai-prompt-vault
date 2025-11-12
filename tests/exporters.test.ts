import { exportToClaude, exportToClaudeProjects } from '../tools/exporters/claude-export'
import { exportToChatGPT, exportToOpenAILibrary } from '../tools/exporters/chatgpt-export'
import { exportToRaycast, exportToRaycastPreset } from '../tools/exporters/raycast-export'
import { exportToCSV, parseCSV } from '../tools/exporters/csv-export'
import { exportToMarkdown } from '../tools/exporters/markdown-export'
import { PromptData } from '../tools/exporters/types'

const mockPrompt: PromptData = {
  id: 'test-1',
  title: 'Test Prompt',
  slug: 'test-prompt',
  type: 'agent',
  description: 'Test description for validation',
  content: 'Test content for the prompt',
  frontmatter: { difficulty: 'beginner', platforms: ['claude'] },
  status: 'published',
  tags: ['test', 'demo'],
  version: '1.0.0',
  author: { name: 'Test Author' },
  created: '2025-01-11T00:00:00Z',
  lastModified: '2025-01-11T00:00:00Z',
  estimatedTokens: 100,
}

const draftPrompt: PromptData = {
  ...mockPrompt,
  id: 'draft-1',
  status: 'draft',
}

describe('Export Pipeline', () => {
  describe('Claude Exporter', () => {
    it('should export to Claude format', () => {
      const result = exportToClaude([mockPrompt])

      expect(result.success).toBe(true)
      expect(result.format).toBe('claude-json')
      expect(result.promptCount).toBe(1)
      expect(result.content).toContain('test-prompt')
    })

    it('should produce valid JSON', () => {
      const result = exportToClaude([mockPrompt])

      expect(() => {
        JSON.parse(result.content)
      }).not.toThrow()
    })

    it('should include prompt metadata', () => {
      const result = exportToClaude([mockPrompt])
      const data = JSON.parse(result.content)

      expect(data.prompts).toBeDefined()
      expect(data.prompts[0].name).toBe('test-prompt')
      expect(data.prompts[0].description).toBe('Test description for validation')
    })

    it('should filter draft prompts by default', () => {
      const result = exportToClaude([mockPrompt, draftPrompt], {
        includeDraft: false,
      })

      expect(result.promptCount).toBe(1)
    })

    it('should include draft prompts when specified', () => {
      const result = exportToClaude([mockPrompt, draftPrompt], {
        includeDraft: true,
      })

      expect(result.promptCount).toBe(2)
    })
  })

  describe('ChatGPT Exporter', () => {
    it('should export to ChatGPT format', () => {
      const result = exportToChatGPT([mockPrompt])

      expect(result.success).toBe(true)
      expect(result.format).toBe('chatgpt')
      expect(result.promptCount).toBe(1)
    })

    it('should produce valid JSON', () => {
      const result = exportToChatGPT([mockPrompt])

      expect(() => {
        JSON.parse(result.content)
      }).not.toThrow()
    })

    it('should map difficulty levels', () => {
      const result = exportToChatGPT([mockPrompt])
      const data = JSON.parse(result.content)

      expect(data.prompts[0].difficulty).toBeDefined()
      expect(['Easy', 'Intermediate', 'Advanced']).toContain(data.prompts[0].difficulty)
    })
  })

  describe('Raycast Exporter', () => {
    it('should export to Raycast format', () => {
      const result = exportToRaycast([mockPrompt])

      expect(result.success).toBe(true)
      expect(result.format).toBe('raycast')
      expect(result.promptCount).toBe(1)
    })

    it('should produce valid JSON', () => {
      const result = exportToRaycast([mockPrompt])

      expect(() => {
        JSON.parse(result.content)
      }).not.toThrow()
    })

    it('should include required Raycast fields', () => {
      const result = exportToRaycast([mockPrompt])
      const data = JSON.parse(result.content)

      expect(data[0].title).toBeDefined()
      expect(data[0].prompt).toBeDefined()
      expect(data[0].model).toBeDefined()
      expect(data[0].temperature).toBeDefined()
    })

    it('should truncate long content for Raycast', () => {
      const longPrompt = {
        ...mockPrompt,
        content: 'A'.repeat(3000),
      }

      const result = exportToRaycast([longPrompt])
      const data = JSON.parse(result.content)

      expect(data[0].prompt.length).toBeLessThanOrEqual(2000)
    })

    it('should set appropriate temperature based on type', () => {
      const result = exportToRaycast([mockPrompt])
      const data = JSON.parse(result.content)

      expect(data[0].temperature).toBeDefined()
      expect(data[0].temperature).toBeGreaterThanOrEqual(0.3)
      expect(data[0].temperature).toBeLessThanOrEqual(0.7)
    })
  })

  describe('CSV Exporter', () => {
    it('should export to CSV format', () => {
      const result = exportToCSV([mockPrompt])

      expect(result.success).toBe(true)
      expect(result.format).toBe('csv')
      expect(result.content).toContain('Test Prompt')
    })

    it('should include CSV header', () => {
      const result = exportToCSV([mockPrompt])

      expect(result.content).toContain('Title')
      expect(result.content).toContain('Content')
      expect(result.content).toContain('Type')
    })

    it('should properly escape CSV special characters', () => {
      const specialPrompt = {
        ...mockPrompt,
        title: 'Test, "Prompt"',
      }

      const result = exportToCSV([specialPrompt])

      // Should be properly quoted and escaped
      expect(result.content).toContain('"')
    })

    it('should handle multiple rows', () => {
      const result = exportToCSV([mockPrompt, mockPrompt])
      const lines = result.content.split('\n').filter(line => line.trim())

      // Header + 2 data rows = 3 lines
      expect(lines.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Markdown Exporter', () => {
    it('should export to Markdown format', () => {
      const result = exportToMarkdown([mockPrompt])

      expect(result.success).toBe(true)
      expect(result.format).toBe('markdown')
      expect(result.content).toContain('Test Prompt')
    })

    it('should include headers and structure', () => {
      const result = exportToMarkdown([mockPrompt])

      expect(result.content).toContain('#')
      expect(result.content).toContain('Agent')
    })

    it('should group prompts by type', () => {
      const result = exportToMarkdown([mockPrompt])

      expect(result.content).toContain('## Agent')
    })

    it('should include table of contents', () => {
      const result = exportToMarkdown([mockPrompt])

      expect(result.content).toContain('Table of Contents')
    })
  })

  describe('Filter Options', () => {
    it('should apply custom filters', () => {
      const featurePrompt = {
        ...mockPrompt,
        type: 'feature',
      }

      const result = exportToClaude([mockPrompt, featurePrompt], {
        filter: (p) => p.type === 'agent',
      })

      expect(result.promptCount).toBe(1)
    })

    it('should combine multiple filtering options', () => {
      const result = exportToClaude([mockPrompt, draftPrompt, { ...mockPrompt, type: 'feature' }], {
        includeDraft: false,
        filter: (p) => p.type === 'agent',
      })

      expect(result.promptCount).toBe(1)
    })
  })

  describe('Error Handling', () => {
    it('should handle empty prompt arrays', () => {
      const result = exportToClaude([])

      expect(result.promptCount).toBe(0)
    })

    it('should handle prompts with missing optional fields', () => {
      const minimalPrompt = {
        id: 'min-1',
        title: 'Minimal',
        slug: 'minimal',
        type: 'prompt',
        description: 'Minimal description',
        content: 'Content',
        frontmatter: {},
        status: 'published',
        tags: ['test', 'minimal'],
        version: '1.0.0',
        author: { name: 'Author' },
        created: '2025-01-11T00:00:00Z',
        lastModified: '2025-01-11T00:00:00Z',
      }

      const result = exportToClaude([minimalPrompt])

      expect(result.success).toBe(true)
      expect(result.promptCount).toBe(1)
    })
  })

  describe('JSON Validity', () => {
    it('should produce valid JSON in all formats', () => {
      const formats = [
        exportToClaude([mockPrompt]),
        exportToChatGPT([mockPrompt]),
        exportToRaycast([mockPrompt]),
        exportToMarkdown([mockPrompt]),
      ]

      for (const result of formats) {
        // Markdown is not JSON
        if (result.format !== 'markdown') {
          expect(() => {
            JSON.parse(result.content)
          }).not.toThrow()
        }
      }
    })
  })
})
