---
description: Create a git commit with conventional commit message
agent: build
---

Create a git commit for the current staged/unstaged changes.

Steps:
1. Run `git status` to see what has changed
2. Run `git diff` to understand the nature of changes
3. Determine the appropriate conventional commit type (feat, fix, refactor, etc.)
4. Write a clear, concise commit message following the format: type(scope): description
5. Stage all relevant files and create the commit
6. Show the result

Do NOT push to remote. Only create the local commit.
