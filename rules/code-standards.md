# Code Standards

## General

- Write clean, readable code. Prefer clarity over cleverness.
- Use descriptive names for variables, functions, and files.
- Keep functions small and focused on a single responsibility.
- Handle errors explicitly - never silently swallow errors.
- Add comments only when the "why" is not obvious from the code itself.

## TypeScript / JavaScript (default)

- Use TypeScript with strict mode when possible.
- Prefer `const` over `let`. Never use `var`.
- Use async/await over raw promises.
- Export types and interfaces explicitly.
- Use named exports over default exports (easier to refactor).

## File Organization

- One component/module per file.
- Group related files in directories with an index file.
- Keep test files next to the source files they test (e.g., `foo.ts` / `foo.test.ts`).

## Testing

- Write tests for all public interfaces.
- Test behavior, not implementation details.
- Use descriptive test names that explain the expected behavior.
- Structure tests with Arrange-Act-Assert pattern.

## Dependencies

- Minimize external dependencies.
- When adding a dependency, justify it.
- Prefer well-maintained, typed packages.
- Pin versions in lock files.

## Security

- Never hardcode secrets or API keys.
- Validate all external input.
- Use environment variables for configuration.
- Be cautious with `eval()`, `innerHTML`, and similar unsafe operations.
