---
description: Review current changes for bugs, security, and quality
agent: plan
---

Review the current code changes. Focus on quality, correctness, and security.

Steps:
1. Run `git diff` to see all current changes (staged + unstaged)
2. If there's a relevant spec file, check changes against its acceptance criteria
3. Review each changed file for:
   - Correctness: Does the code do what it should?
   - Edge cases: Are boundary conditions handled?
   - Error handling: Are errors caught and handled?
   - Security: Any potential vulnerabilities?
   - Performance: Any obvious issues?
   - Readability: Is the code clear?
4. Produce a review with severity levels:
   - **Critical**: Must fix before merge
   - **Warning**: Should fix, potential issues
   - **Suggestion**: Nice to have improvements
5. Give an overall verdict: APPROVE | REQUEST_CHANGES | NEEDS_DISCUSSION
