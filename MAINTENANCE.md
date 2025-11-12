# Maintenance Guide

This guide covers maintenance procedures for the AI Prompt Library.

## Regular Maintenance Tasks

### Daily
- Monitor error logs
- Check for critical issues
- Verify site is accessible

### Weekly
- Review error logs and crashes
- Check for security updates
- Verify all exports are working
- Update analytics

### Monthly
- Update dependencies: `npm update`
- Review analytics and usage metrics
- Backup prompt data
- Test disaster recovery procedures

### Quarterly
- Full security audit
- Performance review and optimization
- Documentation update
- User feedback review

## Dependency Management

### Checking for Updates

```bash
# Check for available updates
npm outdated

# View what would be updated
npm update --dry-run
```

### Updating Dependencies

```bash
# Update all dependencies
npm update

# Update specific package
npm install package-name@latest

# Update to next major version
npm install package-name@^x.0.0
```

### Security Updates

```bash
# Check for security vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Fix with risking breaking changes
npm audit fix --force
```

## Version Management

### Release Versions

- **Major (X.0.0):** Breaking changes
- **Minor (0.Y.0):** New features
- **Patch (0.0.Z):** Bug fixes

### Creating a Release

```bash
# Update version in package.json
# Update CHANGELOG
# Create git tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag
git push origin v1.0.0
```

## Backup Procedures

### What to Backup

```bash
# Backup prompts and data
tar -czf backup-$(date +%Y%m%d).tar.gz \
  docs/prompts \
  data/ \
  package.json \
  package-lock.json
```

### Restore from Backup

```bash
# Extract backup
tar -xzf backup-YYYYMMDD.tar.gz

# Verify prompts
npm run validate

# Verify exports
npm run export:all
```

## Database/Data Management

### Export Prompts

```bash
# Export to all formats
npm run export:all

# Export to specific format
npm run export:claude
```

### Verify Data Integrity

```bash
# Validate all prompts
npm run validate

# Run health check
npm run health-check

# Generate analytics
npm run analytics
```

## Performance Optimization

### Monitor Performance

```bash
# Run Lighthouse
npm run build
npx lighthouse https://your-domain.com --view

# Check bundle size
npm run build -- --analyze
```

### Optimization Tips

- Minify assets (automatic)
- Enable gzip compression (automatic)
- Use caching headers
- Lazy load images
- Code splitting (automatic)

## Security Updates

### Security Checklist

- [ ] Update Node.js to latest LTS
- [ ] Update all npm dependencies
- [ ] Review security advisories
- [ ] Check for known vulnerabilities
- [ ] Rotate secrets/API keys
- [ ] Review access logs
- [ ] Test security headers

### Security Headers

Verify these headers are present:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Monitoring

### Error Monitoring

```bash
# Check application logs
npm run dev 2>&1 | grep -i error

# Monitor in production
# Use: Sentry, Rollbar, or similar
```

### Uptime Monitoring

```bash
# Health check endpoint
curl https://your-domain.com/health

# Monitor with external service
# Use: Uptime Robot, Pingdom, etc.
```

### Performance Monitoring

- Use: Google Analytics, Plausible, or similar
- Monitor: Page load times, search queries, user flow
- Track: Errors, warnings, anomalies

## Troubleshooting

### Site Not Loading

1. Check server logs
2. Verify Node.js is running
3. Check database/file system
4. Verify domain/DNS
5. Check firewall rules

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Tests Failing

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test
npm test -- [test-name]

# Check test coverage
npm test -- --coverage
```

### Performance Issues

```bash
# Check bundle size
npm run build -- --analyze

# Check dependencies
npm ls

# Profile application
NODE_OPTIONS=--prof npm start
```

## Disaster Recovery

### Rollback Procedure

If production has critical issues:

```bash
# Check git history
git log --oneline

# Revert to previous commit
git revert [commit-hash]

# Push revert
git push origin main

# Verify rollback successful
npm run health-check
```

### Data Recovery

```bash
# Restore from backup
tar -xzf backup-latest.tar.gz

# Verify data
npm run validate

# Regenerate exports
npm run export:all
```

## Deployment

### Pre-Deployment

```bash
# Run all checks
npm run validate
npm run validate:docs
npm run health-check
npm run build
npm test
```

### Deployment Process

```bash
# Merge to main
git checkout main
git pull origin main

# Deploy
# For Vercel: Auto-deploys on push
# For Netlify: Auto-deploys on push
# For Docker: docker-compose up -d
```

### Post-Deployment

```bash
# Verify deployment
npm run health-check

# Check logs
# Monitor error rates
# Verify all features work
# Check performance metrics
```

## Documentation Maintenance

### Update Documentation

```bash
# Check documentation
npm run validate:docs

# Update as needed
git add docs/
git commit -m "docs: Update documentation"
```

### Keep README Current

- Update version numbers
- Update feature list
- Update contributor list
- Update setup instructions

## User Support

### Common Issues

- Prompt not appearing: Check status is "published"
- Export failing: Run `npm run export:all`
- Search not working: Rebuild search index
- Performance issues: Check bundle size, clear cache

### Feature Requests

- Log in GitHub issues
- Prioritize by impact
- Plan in milestones
- Communicate timeline to users

## Communication

### Status Page

- Use: Statuspage.io or similar
- Notify users of maintenance
- Report incidents and resolutions
- Maintain uptime SLA

### Release Notes

- Document changes
- List new features
- Document bug fixes
- List known issues

## Checklist

### Monthly Maintenance

- [ ] Run `npm audit`
- [ ] Update dependencies
- [ ] Backup data
- [ ] Run full test suite
- [ ] Check logs for errors
- [ ] Review analytics
- [ ] Update documentation
- [ ] Optimize performance

### Quarterly

- [ ] Security audit
- [ ] Performance review
- [ ] Capacity planning
- [ ] Disaster recovery test
- [ ] Team training
- [ ] Strategy review

---

**Keep the AI Prompt Library running smoothly! 🚀**
