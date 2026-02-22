# Workflow Rules

## General Principles

1. **Understand Before Acting**: Always read existing code and context before making changes.
2. **Minimal Changes**: Make the smallest change that solves the problem correctly.
3. **Explain Decisions**: When making non-obvious choices, explain why.
4. **Fail Fast**: If something doesn't work, surface it immediately rather than building on broken foundations.

## Git Workflow

- Commit messages follow conventional commits: `type(scope): description`
  - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`
- One logical change per commit
- Never commit broken code to main
- Use feature branches for multi-step work

## Communication

- Be direct and concise
- When presenting options, list pros/cons
- If a task is ambiguous, ask for clarification rather than guessing
- When done with a task, summarize what was done and any follow-up items

## Error Handling

- When encountering errors, read the full error message
- Check if it's a known issue before attempting a fix
- Fix root causes, not symptoms
- If a fix introduces complexity, discuss alternatives first
