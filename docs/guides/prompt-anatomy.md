# Prompt Anatomy

Understanding how to structure an effective prompt is the foundation of working with AI models. This guide breaks down the key components of a well-designed prompt.

## Core Components

Every effective prompt has several key components:

### 1. Role Definition

The role sets the context for the AI's behavior and expertise level.

**Purpose:** Tells the AI what perspective to adopt

**Example roles:**
- "You are an expert TypeScript developer"
- "You are a security auditor with 10+ years of experience"
- "You are a helpful documentation writer"
- "You are a code review specialist"

**Why it matters:**
- Anchors the AI's knowledge domain
- Sets the expected level of expertise
- Influences tone and depth of response

```markdown
## Role
You are a senior security engineer specializing in web application vulnerabilities
and OWASP compliance.
```

### 2. Task Definition

The task is what you want the AI to actually do.

**Purpose:** Explicitly state the objective

**Example tasks:**
- "Identify all security vulnerabilities in this code"
- "Generate unit tests for this function"
- "Write comprehensive API documentation"
- "Refactor this component for better performance"

**Why it matters:**
- Provides clear success criteria
- Prevents the AI from going off-track
- Makes results measurable and verifiable

```markdown
## Task
Review the provided code for security vulnerabilities and provide a prioritized
list with severity levels and remediation steps.
```

### 3. Context

Additional background information that helps the AI understand the situation.

**Purpose:** Provide necessary information for accurate, relevant responses

**Context can include:**
- Project type (web app, CLI tool, library, etc.)
- Technology stack
- Target audience
- Business constraints
- Existing patterns or standards

**Why it matters:**
- Reduces hallucinations and incorrect assumptions
- Makes recommendations relevant to your situation
- Improves code quality and appropriateness

```markdown
## Context
- Project Type: Node.js REST API
- Framework: Express.js with TypeScript
- Target: Production deployment with 100k+ daily users
- Security Level: HIPAA compliance required
```

### 4. Instructions

Step-by-step guidance on how to accomplish the task.

**Purpose:** Guide the AI through the process methodically

**Good instructions:**
- Break complex tasks into steps
- Specify decision points
- Clarify priorities and trade-offs
- Define quality standards

**Why it matters:**
- Ensures consistent, high-quality output
- Reduces back-and-forth iterations
- Prevents errors and oversights

```markdown
## Instructions

1. **Scan the code** for common vulnerabilities (SQL injection, XSS, CSRF, etc.)
2. **Analyze dependencies** for known CVEs using common patterns
3. **Check authentication** logic for flaws (weak validation, token issues, etc.)
4. **Evaluate authorization** - verify permission checks before sensitive operations
5. **Document findings** with:
   - Vulnerability type
   - Severity (Critical, High, Medium, Low)
   - Location (file and line number)
   - Explanation of the risk
   - Specific remediation code
6. **Prioritize** by severity and likelihood of exploitation
```

### 5. Examples

Concrete samples of input and expected output.

**Purpose:** Show the AI exactly what you want

**Why examples matter:**
- Disambiguate vague instructions
- Show expected format and style
- Provide reference patterns
- Reduce interpretation errors

**Best practices:**
- Include realistic examples relevant to your domain
- Show edge cases or tricky scenarios
- Include both good and bad examples
- Explain why the example output is correct

```markdown
## Example Input

```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  const result = db.query(query);
  res.json(result);
});
```

## Example Output

**CRITICAL - SQL Injection (Line 3)**
- **Issue**: Direct string concatenation in SQL query
- **Risk**: Attacker can execute arbitrary SQL commands
- **Fix**: Use parameterized queries

```javascript
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid ID' });
  const result = db.query('SELECT * FROM users WHERE id = ?', [userId]);
  res.json(result);
});
```
```

### 6. Output Format

Specify exactly how the response should be structured.

**Purpose:** Make results easy to parse and use

**Common formats:**
- Structured JSON
- Markdown with sections
- CSV with headers
- Bullet-point lists
- Code blocks with syntax highlighting

**Why it matters:**
- Enables programmatic processing
- Ensures consistency across multiple uses
- Makes integration with tools easier
- Improves readability

```markdown
## Output Format

Return your findings as a JSON array:

```json
{
  "vulnerabilities": [
    {
      "type": "SQL Injection",
      "severity": "CRITICAL",
      "location": "controllers/user.js:45",
      "description": "...",
      "fix": "..."
    }
  ],
  "summary": {
    "total": 3,
    "critical": 1,
    "high": 1,
    "medium": 1
  }
}
```
```

### 7. Constraints

Limitations and rules the AI should follow.

**Purpose:** Define boundaries and quality standards

**Common constraints:**
- "Keep response under 500 words"
- "Only use TypeScript 5+ features"
- "Ensure code is accessible (WCAG AA)"
- "No external dependencies"
- "Must work with Node.js 18+"

**Why it matters:**
- Prevents unnecessarily long responses
- Ensures compatibility with your environment
- Maintains quality standards
- Keeps output relevant and focused

```markdown
## Constraints

- Must be compatible with Node.js 18+
- No external security libraries (use native crypto)
- Keep explanations concise and technical
- Focus on exploitability and real-world risk
- Ignore warnings from linters; focus on security
```

## Prompt Structure Template

Here's a reusable template for structuring prompts:

```markdown
# [Prompt Title]

## Role
[Who should the AI be? What expertise?]

## Task
[What specifically should the AI do?]

## Context
[What background is important?]

## Instructions
1. [First step]
2. [Second step]
3. [Continue...]

## Example Input
[Show what you'll provide]

## Example Output
[Show what you expect]

## Output Format
[Specify exact format required]

## Constraints
- [Rule 1]
- [Rule 2]
```

## Good vs. Bad Prompts

### ❌ Bad: Too Vague

```
Review this code and tell me if it's good.
```

**Problems:**
- "Review" is undefined - what aspects?
- No success criteria
- Can't measure results
- AI has to guess what you want

### ✅ Good: Clear and Structured

```
## Role
You are a code quality expert specializing in TypeScript best practices.

## Task
Review the provided TypeScript code for maintainability and performance issues.

## Instructions
1. Check for code that violates TypeScript strict mode principles
2. Identify performance bottlenecks (unnecessary re-renders, inefficient algorithms)
3. Evaluate maintainability (naming, documentation, modularity)
4. Prioritize by impact

## Output Format
Return as JSON with { type, severity, location, issue, solution }
```

---

### ❌ Bad: Missing Examples

```
Write a function that validates email addresses.
```

**Problems:**
- No definition of "valid"
- Different countries/standards exist
- Unclear what format is expected

### ✅ Good: Examples Included

```
## Task
Write a JavaScript function that validates email addresses.

## Example Inputs & Outputs
Input: "user@example.com" → true
Input: "user@co.uk" → true
Input: "user@invalid" → false
Input: "invalid.email" → false
Input: "" → false

## Constraints
- Must not accept obviously invalid formats
- Keep regex simple and performant
```

---

### ❌ Bad: No Output Format

```
Create a test suite for this function.
```

**Problems:**
- Not clear if you want Jest, Vitest, Mocha, etc.
- Don't know expected file structure
- Can't integrate the output

### ✅ Good: Format Specified

```
## Task
Create a Jest test suite for this function.

## Output Format
- Use .test.ts file extension
- Include describe() blocks by feature
- Aim for 80%+ code coverage
- Use the test template from /tests/template.ts
```

## Layer Upon Layer: Building Complex Prompts

Simple prompts are best, but sometimes you need depth. Build gradually:

**Layer 1: The Basic Prompt**
```
Review this code for bugs.
```

**Layer 2: Add Role & Task**
```
You are a code quality expert. Review this code for logic errors and edge cases.
```

**Layer 3: Add Instructions**
```
You are a code quality expert. Review this code for logic errors.

1. Trace through the code mentally
2. Check for off-by-one errors
3. Look for null/undefined edge cases
4. List all issues found
```

**Layer 4: Add Examples**
```
[Previous] + example showing expected output format
```

**Layer 5: Add Constraints**
```
[Previous] + "Keep analysis under 200 words. Focus on bugs only, not style."
```

## Advanced Prompt Techniques

### Chain of Thought
Ask the AI to think through the problem step-by-step:

```
Before providing your answer, show your reasoning process:
1. First, identify the key requirements...
2. Next, consider the constraints...
3. Then, evaluate possible approaches...
4. Finally, provide your recommendation...
```

### Few-Shot Learning
Provide multiple examples of the pattern you want:

```
Examples of good commit messages:
- "fix: prevent race condition in auth flow"
- "feat: add export to markdown format"
- "docs: clarify timeout behavior"

Now write a commit message for: [your change]
```

### Role Playing
Ask the AI to adopt multiple perspectives:

```
Review this design from three perspectives:
1. As a security engineer
2. As a performance engineer
3. As a user experience designer
```

### Constraint-Based Reasoning
Give the AI constraints to work within:

```
Optimize this algorithm with these constraints:
- Must use O(n) or better time complexity
- Can use O(1) or O(log n) space
- Must handle arrays up to 1 million elements
```

## Iterative Refinement

Perfect prompts rarely come first. Refine iteratively:

1. **Write the initial prompt** based on this anatomy
2. **Test with your AI model** - does it work?
3. **Identify gaps** - what's missing or wrong?
4. **Refine instructions** - be more specific
5. **Add examples** if results are inconsistent
6. **Test again** - is it better?
7. **Repeat** until satisfied

Track the versions as you refine (1.0.0 → 1.1.0 → 1.2.0 → 2.0.0).

## Quick Reference Checklist

Before using a prompt, verify:

- [ ] Role is clear and specific
- [ ] Task is concrete and measurable
- [ ] Context is sufficient but not excessive
- [ ] Instructions break down the task
- [ ] Examples show expected output format
- [ ] Output format is precise
- [ ] Constraints are clear
- [ ] Total length is reasonable (under 2000 tokens)
- [ ] Tested with intended AI model
- [ ] Results are consistently good
