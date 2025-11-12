import fs from 'fs'
import path from 'path'

/**
 * System health check and diagnostics
 */

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  checks: Record<string, { status: boolean; message: string }>
  details: Record<string, any>
}

async function runHealthCheck(): Promise<HealthCheckResult> {
  const checks: Record<string, { status: boolean; message: string }> = {}
  const details: Record<string, any> = {}

  const cwd = process.cwd()

  // Check 1: Node modules installed
  const hasNodeModules = fs.existsSync(path.join(cwd, 'node_modules'))
  checks['dependencies'] = {
    status: hasNodeModules,
    message: hasNodeModules ? '✅ Dependencies installed' : '❌ Dependencies not found',
  }

  // Check 2: Build directory
  const hasBuild = fs.existsSync(path.join(cwd, '.next')) || fs.existsSync(path.join(cwd, 'out'))
  checks['build'] = {
    status: hasBuild,
    message: hasBuild ? '✅ Build output found' : '⚠️  No build output (run: npm run build)',
  }

  // Check 3: Source files
  const docsDir = path.join(cwd, 'docs')
  const hasSourceFiles = fs.existsSync(docsDir)
  checks['source_files'] = {
    status: hasSourceFiles,
    message: hasSourceFiles ? '✅ Source files exist' : '❌ Docs directory missing',
  }

  // Check 4: Configuration files
  const requiredConfigs = [
    'package.json',
    'tsconfig.json',
    'fumadocs.config.ts',
    'next.config.mjs',
  ]

  const hasAllConfigs = requiredConfigs.every(f => fs.existsSync(path.join(cwd, f)))
  checks['configuration'] = {
    status: hasAllConfigs,
    message: hasAllConfigs ? '✅ All config files present' : '❌ Missing config files',
  }

  if (!hasAllConfigs) {
    const missing = requiredConfigs.filter(f => !fs.existsSync(path.join(cwd, f)))
    details['missing_configs'] = missing
  }

  // Check 5: Prompt files
  const promptsDir = path.join(cwd, 'docs', 'prompts')
  let promptCount = 0

  function countPrompts(dir: string) {
    if (!fs.existsSync(dir)) return 0

    const entries = fs.readdirSync(dir, { withFileTypes: true })
    let count = 0

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        count += countPrompts(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        count++
      }
    }

    return count
  }

  promptCount = countPrompts(promptsDir)
  const hasPrompts = promptCount > 0

  checks['prompts'] = {
    status: hasPrompts,
    message: hasPrompts ? `✅ ${promptCount} prompts found` : '⚠️  No prompts found',
  }

  details['prompt_count'] = promptCount

  // Check 6: Exports
  const exportsDir = path.join(cwd, 'data', 'exports')
  const hasExports = fs.existsSync(exportsDir) && fs.readdirSync(exportsDir).length > 0
  checks['exports'] = {
    status: hasExports,
    message: hasExports ? '✅ Export files present' : '⚠️  No exports (run: npm run export:all)',
  }

  if (hasExports) {
    const exportFiles = fs.readdirSync(exportsDir).filter(f => !f.startsWith('.'))
    details['export_count'] = exportFiles.length
    details['export_files'] = exportFiles
  }

  // Check 7: Git repository
  const hasGit = fs.existsSync(path.join(cwd, '.git'))
  checks['git'] = {
    status: hasGit,
    message: hasGit ? '✅ Git repository initialized' : '⚠️  Not a Git repository',
  }

  // Check 8: Build integrity
  let buildWorks = false
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'))
    buildWorks = packageJson.scripts?.build !== undefined
  } catch {
    buildWorks = false
  }

  checks['build_script'] = {
    status: buildWorks,
    message: buildWorks ? '✅ Build script configured' : '❌ Build script missing',
  }

  // Determine overall status
  const allPassed = Object.values(checks).every(c => c.status)
  const someFailed = Object.values(checks).some(c => !c.status)

  return {
    status: allPassed ? 'healthy' : someFailed ? 'unhealthy' : 'degraded',
    timestamp: new Date().toISOString(),
    checks,
    details,
  }
}

// Run if executed directly
async function main() {
  console.log('\n🏥 AI Prompt Library - Health Check\n')
  console.log('=' .repeat(50))

  const result = await runHealthCheck()

  console.log(`\nStatus: ${result.status === 'healthy' ? '✅' : result.status === 'degraded' ? '⚠️ ' : '❌'} ${result.status.toUpperCase()}`)
  console.log(`Timestamp: ${result.timestamp}`)
  console.log('\n' + '=' .repeat(50))
  console.log('\nChecks:\n')

  for (const [key, check] of Object.entries(result.checks)) {
    console.log(`  ${check.status ? '✅' : '❌'} ${key.replace(/_/g, ' ').toUpperCase()}`)
    console.log(`     ${check.message}`)
  }

  if (Object.keys(result.details).length > 0) {
    console.log('\nDetails:\n')
    for (const [key, value] of Object.entries(result.details)) {
      if (Array.isArray(value)) {
        console.log(`  ${key}: ${value.join(', ')}`)
      } else {
        console.log(`  ${key}: ${value}`)
      }
    }
  }

  console.log('\n' + '=' .repeat(50) + '\n')

  // Exit with appropriate code
  process.exit(result.status === 'healthy' ? 0 : 1)
}

if (require.main === module) {
  main().catch(error => {
    console.error('Health check failed:', error)
    process.exit(1)
  })
}

export default runHealthCheck
