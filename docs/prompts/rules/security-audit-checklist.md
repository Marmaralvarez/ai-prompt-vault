---
title: "Security Audit Checklist"
description: "Comprehensive security audit framework for identifying vulnerabilities and compliance issues"
type: "rule"
slug: "security-audit-checklist"
status: "published"
version: "1.0.0"
difficulty: "advanced"
estimatedTokens: 1200
author:
  name: "Maria Martin"
  email: "maria@example.com"
  url: "https://mariamartin.dev"
tags:
  - security
  - vulnerability-testing
  - owasp
  - compliance
  - advanced
  - security-audit
platforms:
  - claude
  - chatgpt
created: "2024-01-15"
lastModified: "2024-01-15"
relatedPrompts:
  - "code-review-comprehensive"
---

# Security Audit Checklist

This is a comprehensive checklist for security audits and vulnerability assessments. Use this systematically to evaluate applications for security risks.

## Authentication & Authorization

### Authentication
- [ ] Passwords meet complexity requirements (min 12 chars, mixed case, numbers, symbols)
- [ ] Passwords are hashed with strong algorithm (bcrypt, argon2, not md5/sha1)
- [ ] Multi-factor authentication (MFA) is available or enforced
- [ ] Session timeouts are implemented and appropriate
- [ ] Concurrent session limits are enforced
- [ ] Failed login attempts are rate-limited
- [ ] OAuth/SSO implementations use secure flows
- [ ] API authentication uses secure tokens (not username/password)
- [ ] Token expiration and refresh mechanisms are implemented
- [ ] Default credentials are removed

### Authorization
- [ ] Role-based access control (RBAC) is implemented
- [ ] Principle of least privilege is enforced
- [ ] Authorization checks on all endpoints/functions
- [ ] URL/direct object reference authorization verified
- [ ] Cross-tenant data isolation verified
- [ ] Admin functions require additional authentication
- [ ] Privilege escalation is not possible

## OWASP Top 10

### 1. Injection (SQL, NoSQL, Command)
- [ ] All user input is validated and sanitized
- [ ] Parameterized queries/prepared statements used
- [ ] ORM frameworks configured securely
- [ ] Command injection protections in place
- [ ] LDAP injection prevention
- [ ] NoSQL injection prevention
- [ ] XML injection prevention

### 2. Broken Authentication
- [ ] Session management is secure
- [ ] URL rewriting for session IDs not used
- [ ] Credentials not exposed in logs/error messages
- [ ] Weak credential recovery mechanisms fixed
- [ ] Login pages use HTTPS only
- [ ] Authentication tokens are secure and properly managed

### 3. Sensitive Data Exposure
- [ ] All sensitive data is encrypted in transit (TLS 1.2+)
- [ ] Sensitive data is encrypted at rest
- [ ] Encryption keys are properly managed
- [ ] Sensitive data not in logs or error messages
- [ ] Sensitive data not in browser history/cache
- [ ] No sensitive data in URLs
- [ ] Database backups are encrypted

### 4. XML External Entities (XXE)
- [ ] XML parsers configured to disable external entities
- [ ] DTD processing disabled
- [ ] Schema validation enabled
- [ ] File upload validators check for XXE

### 5. Broken Access Control
- [ ] Authorization enforced consistently
- [ ] No direct object reference vulnerabilities
- [ ] Cross-site request forgery (CSRF) tokens implemented
- [ ] Access control not dependent on user-supplied values
- [ ] Privilege escalation is not possible

### 6. Security Misconfiguration
- [ ] Debug mode disabled in production
- [ ] Default credentials changed
- [ ] Unnecessary services/features disabled
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] HTTPS enforced (HSTS header present)
- [ ] Unneeded HTTP methods disabled
- [ ] Latest security patches applied

### 7. Cross-Site Scripting (XSS)
- [ ] User input is properly escaped/sanitized
- [ ] Content Security Policy (CSP) header implemented
- [ ] No direct HTML injection
- [ ] DOM-based XSS protections in place
- [ ] Third-party scripts evaluated for XSS risk
- [ ] Cookie flags set (HttpOnly, Secure, SameSite)

### 8. Insecure Deserialization
- [ ] No untrusted data is deserialized
- [ ] Deserialization uses safe libraries
- [ ] Type checking on deserialized objects
- [ ] Schema validation on serialized data
- [ ] No code execution during deserialization

### 9. Using Components with Known Vulnerabilities
- [ ] Dependency scanning tools configured (npm audit, snyk, etc.)
- [ ] Security advisories monitored
- [ ] Outdated dependencies updated regularly
- [ ] Vulnerable dependencies have mitigations
- [ ] Software composition analysis (SCA) in CI/CD pipeline

### 10. Insufficient Logging and Monitoring
- [ ] Authentication events are logged
- [ ] Authorization failures are logged
- [ ] Security events are logged
- [ ] Logs include sufficient context (user, timestamp, action)
- [ ] Logs are protected from tampering
- [ ] Alert mechanisms for suspicious activity
- [ ] Log retention policies documented

## Cryptography

- [ ] Strong encryption algorithms used (AES-256, not MD5/SHA1)
- [ ] Encryption keys are adequate length (128+ bits)
- [ ] Key derivation uses strong functions (PBKDF2, bcrypt, argon2)
- [ ] Random number generation is cryptographically secure
- [ ] No use of deprecated cryptographic algorithms
- [ ] Symmetric and asymmetric crypto used appropriately

## API Security

- [ ] API authentication is required
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Output properly encoded/escaped
- [ ] CORS configured restrictively
- [ ] API versioning doesn't expose security bypasses
- [ ] Error messages don't reveal system details
- [ ] API documentation doesn't expose secrets

## Infrastructure & Network

- [ ] Firewall rules follow principle of least privilege
- [ ] Network segmentation implemented
- [ ] VPN/encrypted channels for remote access
- [ ] Intrusion detection/prevention systems
- [ ] DDoS mitigation strategies
- [ ] DNS security (DNSSEC)
- [ ] Database not publicly accessible
- [ ] File storage properly protected

## Data Security

- [ ] Data classification policy exists
- [ ] Data retention policies documented
- [ ] Backup and disaster recovery tested
- [ ] Data deletion/purging procedures verified
- [ ] Personally identifiable information (PII) protected
- [ ] Right to be forgotten implemented (GDPR)
- [ ] Data breach notification procedures

## Code Security

- [ ] Code review process includes security checks
- [ ] Static application security testing (SAST) in CI/CD
- [ ] Dynamic application security testing (DAST) regularly run
- [ ] Secure coding practices documented
- [ ] No hardcoded secrets in code
- [ ] Comments don't contain sensitive information
- [ ] Build artifacts securely stored

## Compliance

- [ ] GDPR compliance verified (if applicable)
- [ ] PCI-DSS compliance verified (if handling cards)
- [ ] HIPAA compliance verified (if handling health data)
- [ ] SOC 2 audit completed
- [ ] Regulatory requirements documented
- [ ] Privacy policy matches implementation
- [ ] Terms of Service address security

## Third-Party & Dependencies

- [ ] Third-party libraries evaluated for security
- [ ] No untrusted packages in supply chain
- [ ] License compliance verified
- [ ] Vendor security assessments completed
- [ ] Data processing agreements (DPA) in place
- [ ] Vendor access controls verified

## Incident Response

- [ ] Incident response plan documented
- [ ] Security contacts identified
- [ ] Incident response testing (tabletop exercises)
- [ ] Vulnerability disclosure policy
- [ ] Bug bounty program (if applicable)
- [ ] Post-incident review process
- [ ] Security training for staff

## Documentation & Reporting

### For Each Finding

- [ ] Severity rating assigned (Critical, High, Medium, Low)
- [ ] Proof of concept or evidence provided
- [ ] Business impact explained
- [ ] Remediation steps outlined
- [ ] Timeline for fixes discussed
- [ ] Verification method specified

### Deliverables

- [ ] Executive summary (for non-technical stakeholders)
- [ ] Technical findings report (for developers)
- [ ] Remediation roadmap with timelines
- [ ] Risk assessment and metrics
- [ ] Recommendations for long-term improvement

## Post-Audit Actions

- [ ] Findings communicated to stakeholders
- [ ] Remediation plan created
- [ ] Fixes tracked and verified
- [ ] Retesting scheduled for critical issues
- [ ] Lessons learned documented
- [ ] Security improvements implemented
- [ ] Follow-up audit scheduled

## Notes for Auditors

- Use this checklist systematically but not dogmatically
- Prioritize critical and high-severity findings
- Consider context and business requirements
- Test assumptions rather than accept claims
- Document evidence for all findings
- Recommend practical, achievable fixes
- Balance security with functionality
