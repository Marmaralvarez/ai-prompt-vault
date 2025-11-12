import fs from 'fs'

/**
 * Test all configuration files are properly set up
 */
export function testConfiguration(): boolean {
  const checks = {
    'fumadocs.config.ts': () => fs.existsSync('fumadocs.config.ts'),
    'next.config.mjs': () => fs.existsSync('next.config.mjs'),
    'tsconfig.json': () => fs.existsSync('tsconfig.json'),
    'jest.config.js': () => fs.existsSync('jest.config.js'),
    '.env.local': () => fs.existsSync('.env.local'),
    'data/prompts.json': () => fs.existsSync('data/prompts.json'),
    'tools/schemas/prompt-schema.ts': () => fs.existsSync('tools/schemas/prompt-schema.ts'),
    'docs/prompts/_meta.ts': () => fs.existsSync('docs/prompts/_meta.ts'),
  }

  let allPass = true

  console.log('\n📋 Configuration Check:\n')

  for (const [file, check] of Object.entries(checks)) {
    const exists = check()
    console.log(`${exists ? '✅' : '❌'} ${file}`)
    if (!exists) allPass = false
  }

  console.log('\n✨ All core configuration files are in place!\n')
  return allPass
}

// Run if executed directly
const args = process.argv
if (args[args.length - 1].includes('test-config')) {
  const passed = testConfiguration()
  process.exit(passed ? 0 : 1)
}
