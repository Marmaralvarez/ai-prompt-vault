import { z } from 'zod'

/**
 * Zod schema for validating prompt frontmatter and structure
 */

export const AuthorSchema = z.object({
  name: z.string().min(2, 'Author name required'),
  email: z.string().email().optional(),
  url: z.string().url().optional(),
  avatar: z.string().url().optional(),
})

export const TechStackSchema = z.object({
  framework: z.string().optional(),
  database: z.string().optional(),
  service: z.string().optional(),
  language: z.string().optional(),
})

export const PromptMetadataSchema = z.object({
  // Required fields
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(250, 'Description must be less than 250 characters'),

  type: z.enum(['agent', 'feature', 'pack', 'prompt', 'rule'], {
    errorMap: () => ({ message: 'Invalid prompt type' }),
  }),

  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case'),

  // Status and versioning
  status: z.enum(['published', 'draft', 'deprecated', 'archived']).default('draft'),

  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'Version must be semantic (e.g., 1.0.0)'),

  // Timestamps (supports both ISO datetime and date-only formats)
  created: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?)?$/).optional(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?)?$/).optional(),
  lastModified: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})?)?$/).optional(),

  // Author information
  author: AuthorSchema,

  // Classification
  tags: z
    .array(z.string().min(2).max(50))
    .min(2, 'At least 2 tags required')
    .max(10, 'Maximum 10 tags allowed'),

  categories: z
    .array(z.string())
    .min(1, 'At least one category required')
    .optional(),

  // Usage information
  use_cases: z
    .array(z.string())
    .min(1, 'At least one use case required')
    .optional(),

  // Technical details
  model_compatibility: z
    .array(z.string())
    .optional()
    .default(['claude-opus-4.1', 'claude-sonnet-4.5']),

  tech_stack: TechStackSchema.optional(),

  // Relations
  related_prompts: z
    .array(z.string())
    .optional(),

  // Difficulty and cost
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),

  estimated_tokens: z
    .number()
    .int()
    .positive('Token count must be positive')
    .optional(),

  cost_tier: z.enum(['low', 'medium', 'high']).optional(),
})

/**
 * Schema for prompt content validation
 */
export const PromptContentSchema = z.object({
  frontmatter: PromptMetadataSchema,
  body: z.string().min(50, 'Content must be at least 50 characters'),
})

/**
 * Schema for the master prompts registry
 */
export const PromptRegistryEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: z.enum(['agent', 'feature', 'pack', 'prompt', 'rule']),
  path: z.string(),
  status: z.enum(['published', 'draft', 'deprecated', 'archived']),
  tags: z.array(z.string()),
  platforms: z.array(z.string()).optional(),
  version: z.string(),
  created: z.string(),
  lastModified: z.string(),
  author: z.string(),
  estimatedTokens: z.number().optional(),
  relatedPrompts: z.array(z.string()).optional(),
})

export const PromptRegistrySchema = z.object({
  version: z.string(),
  lastUpdated: z.string(),
  prompts: z.array(PromptRegistryEntrySchema),
})

/**
 * Helper functions for validation
 */
export function validatePromptMetadata(data: unknown) {
  const result = PromptMetadataSchema.safeParse(data)
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      valid: false,
      errors,
    }
  }
  return {
    valid: true,
    data: result.data,
  }
}

export function validatePromptContent(data: unknown) {
  return PromptContentSchema.safeParse(data)
}

export function validateRegistry(data: unknown) {
  return PromptRegistrySchema.safeParse(data)
}

// Type exports for use in other modules
export type Author = z.infer<typeof AuthorSchema>
export type TechStack = z.infer<typeof TechStackSchema>
export type PromptMetadata = z.infer<typeof PromptMetadataSchema>
export type PromptContent = z.infer<typeof PromptContentSchema>
export type PromptRegistryEntry = z.infer<typeof PromptRegistryEntrySchema>
export type PromptRegistry = z.infer<typeof PromptRegistrySchema>
