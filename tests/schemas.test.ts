import { validatePromptMetadata } from '../tools/schemas/prompt-schema'

describe('Prompt Schema Validation', () => {
  describe('validatePromptMetadata', () => {
    it('should validate correct metadata', () => {
      const valid = {
        title: 'Test Prompt',
        description: 'This is a test description that is long enough',
        type: 'agent',
        slug: 'test-prompt',
        version: '1.0.0',
        author: { name: 'Test Author' },
        tags: ['test', 'demo'],
      }

      const result = validatePromptMetadata(valid)
      expect(result.valid).toBe(true)
    })

    it('should reject missing title', () => {
      const invalid = {
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }

      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject short title', () => {
      const invalid = {
        title: 'Hi',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }

      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject short description', () => {
      const invalid = {
        title: 'Test Prompt',
        description: 'Short',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }

      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject invalid type', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'invalid-type',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }

      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should accept all valid types', () => {
      const validTypes = ['agent', 'feature', 'pack', 'prompt', 'rule']

      for (const type of validTypes) {
        const valid = {
          title: 'Test Prompt',
          description: 'This is a test description that is long enough',
          type: type as any,
          slug: 'test-prompt',
          version: '1.0.0',
          author: { name: 'Author' },
          tags: ['test', 'demo'],
        }

        const result = validatePromptMetadata(valid)
        expect(result.valid).toBe(true)
      }
    })

    it('should reject non-semver version', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0',
        author: { name: 'Author' },
        tags: ['test', 'demo'],
      }

      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should accept valid semver versions', () => {
      const validVersions = ['0.0.1', '1.0.0', '2.5.10', '10.20.30']

      for (const version of validVersions) {
        const valid = {
          title: 'Test Prompt',
          description: 'This is a test description that is long enough',
          type: 'agent',
          slug: 'test-prompt',
          version,
          author: { name: 'Author' },
          tags: ['test', 'demo'],
        }

        const result = validatePromptMetadata(valid)
        expect(result.valid).toBe(true)
      }
    })

    it('should reject invalid slug format', () => {
      const invalidSlugs = ['Test_Slug', 'Test Slug', 'TestSlug', 'test-slug-', '-test-slug']

      for (const slug of invalidSlugs) {
        const invalid = {
          title: 'Test',
          description: 'Description that is long enough',
          type: 'agent',
          slug,
          version: '1.0.0',
          author: { name: 'Author' },
          tags: ['test', 'demo'],
        }

        const result = validatePromptMetadata(invalid)
        expect(result.valid).toBe(false)
      }
    })

    it('should accept valid kebab-case slugs', () => {
      const validSlugs = ['test', 'test-prompt', 'my-awesome-prompt', 'code-review-comprehensive']

      for (const slug of validSlugs) {
        const valid = {
          title: 'Test Prompt',
          description: 'This is a test description that is long enough',
          type: 'agent',
          slug,
          version: '1.0.0',
          author: { name: 'Author' },
          tags: ['test', 'demo'],
        }

        const result = validatePromptMetadata(valid)
        expect(result.valid).toBe(true)
      }
    })

    it('should require minimum 2 tags', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: ['test'],
      }

      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should reject more than 10 tags', () => {
      const invalid = {
        title: 'Test',
        description: 'Description that is long enough',
        type: 'agent',
        slug: 'test',
        version: '1.0.0',
        author: { name: 'Author' },
        tags: Array(11)
          .fill(0)
          .map((_, i) => `tag${i}`),
      }

      const result = validatePromptMetadata(invalid)
      expect(result.valid).toBe(false)
    })

    it('should accept 2-10 tags', () => {
      for (let count = 2; count <= 10; count++) {
        const valid = {
          title: 'Test Prompt',
          description: 'This is a test description that is long enough',
          type: 'agent',
          slug: 'test-prompt',
          version: '1.0.0',
          author: { name: 'Author' },
          tags: Array(count)
            .fill(0)
            .map((_, i) => `tag${i}`),
        }

        const result = validatePromptMetadata(valid)
        expect(result.valid).toBe(true)
      }
    })

    it('should accept valid status values', () => {
      const validStatuses = ['published', 'draft', 'deprecated', 'archived']

      for (const status of validStatuses) {
        const valid = {
          title: 'Test Prompt',
          description: 'This is a test description that is long enough',
          type: 'agent',
          slug: 'test-prompt',
          version: '1.0.0',
          author: { name: 'Author' },
          tags: ['test', 'demo'],
          status,
        }

        const result = validatePromptMetadata(valid)
        expect(result.valid).toBe(true)
      }
    })

    it('should accept optional author email', () => {
      const valid = {
        title: 'Test Prompt',
        description: 'This is a test description that is long enough',
        type: 'agent',
        slug: 'test-prompt',
        version: '1.0.0',
        author: { name: 'Author', email: 'test@example.com' },
        tags: ['test', 'demo'],
      }

      const result = validatePromptMetadata(valid)
      expect(result.valid).toBe(true)
    })

    it('should accept optional difficulty', () => {
      const difficulties = ['beginner', 'intermediate', 'advanced']

      for (const difficulty of difficulties) {
        const valid = {
          title: 'Test Prompt',
          description: 'This is a test description that is long enough',
          type: 'agent',
          slug: 'test-prompt',
          version: '1.0.0',
          author: { name: 'Author' },
          tags: ['test', 'demo'],
          difficulty,
        }

        const result = validatePromptMetadata(valid)
        expect(result.valid).toBe(true)
      }
    })
  })
})
