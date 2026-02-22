---
description: Design architecture for a spec — file structure, module boundaries, interfaces
agent: build
---

Design the architecture for the feature described below. If a spec exists, use it as the source of truth.

**Input:** $ARGUMENTS
Format: `[spec-name or idea]`

## Process

1. **Load context**: If a spec name is given, read `specs/$ARGUMENTS.md`. Otherwise, treat the input as a raw idea.
2. **Analyze requirements**: Extract every acceptance criterion and constraint.
3. **Design the architecture**:
   - File structure and module boundaries
   - Key interfaces and data flow
   - Dependencies (internal and external)
   - Testing strategy (how each criterion will be tested)
4. **Verify coverage**: Ensure EVERY acceptance criterion has a clear path to implementation.
5. **Identify risks**: Trade-offs, complexity hotspots, areas of uncertainty.
6. **Update the spec**: Write the Technical Approach and Files to Create/Modify sections in the spec file.

## Output Format

```
## Architecture: <feature-name>

### File Structure
- path/to/file.ts — purpose

### Key Interfaces
- Interface/type definitions and their responsibilities

### Data Flow
How data moves through the system.

### Testing Strategy
| Criterion | How It Will Be Tested |
|-----------|----------------------|
| ... | ... |

### Risks & Trade-offs
- Risk 1: mitigation
- Risk 2: mitigation

### Dependencies
- External: ...
- Internal: ...
```

## Rules

- Every criterion must have a clear implementation path — if one doesn't, flag it.
- Prefer simple solutions over complex ones.
- Consider testability in every design decision.
- If an ADR is warranted (significant or irreversible decision), propose one using the template at `docs/architecture/_template.md`.
- Do NOT write implementation code — only design.
