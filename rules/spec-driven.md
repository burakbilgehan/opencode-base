# Spec-Driven Development Process

## Overview

Every feature, fix, or significant change starts with a spec. Specs are the single source of truth for what needs to be built.

## Spec File Format

Spec files live in `specs/` and follow the template at `specs/_template.md`:

```markdown
# [Feature Name]

## Status
draft | in-progress | review | done | cancelled

## Problem
What problem does this solve? Why does it matter?

## Solution
High-level description of what we're building.

## Acceptance Criteria
- [ ] Criterion 1 (must be specific and testable)
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Approach
How will this be implemented? Key design decisions.
File paths, module boundaries, interfaces.

## Files to Create/Modify
- `path/to/file.ts` - Description of changes

## Dependencies
What needs to exist before this can be built?

## Out of Scope
What are we explicitly NOT doing?

## Open Questions
- Question 1?
```

## Spec Statuses

| Status | Meaning |
|--------|---------|
| `draft` | Initial creation, not yet reviewed |
| `in-progress` | Actively being implemented |
| `review` | Implementation complete, needs review |
| `done` | All criteria verified and accepted |
| `cancelled` | Abandoned or superseded |

## E2E Pipeline

Use `/pipeline <idea>` for the full automated flow: Assess → Spec → Architect → Implement → Verify → Finalize.

The pipeline is NOT linear — verification failures route back to the appropriate stage (spec, architect, or implement) until all criteria are proven.

For detailed pipeline stages, gates, routing rules, and verification protocol, load the `e2e-pipeline` skill.

## Rules

- Never implement without a spec.
- If a spec is missing details, write them first.
- Specs are living documents - update them as you learn.
- A "done" spec means all acceptance criteria are verified with passing tests.
- Verification routes failures back to the right stage (spec, architect, or implement) — trust the process.
