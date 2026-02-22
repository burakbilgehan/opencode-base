---
description: Quick fix loop — fix failures until the stated goal is achieved
agent: build
---

Quick fix loop. No spec context — work from test failures and the user's stated goal.

**Goal:** $ARGUMENTS (if empty: "make all tests pass")

## Protocol

1. Run the test suite / build / linter (whatever is relevant)
2. If everything passes AND the goal is achieved -> done
3. If failures exist:
   - Pick the most critical failure
   - Analyze root cause
   - Fix the code (not the tests)
   - Run again
   - Repeat
4. Max 10 iterations

## Important

- If the user stated a specific goal, passing tests alone is NOT enough — verify the goal is actually achieved
- If tests pass but the goal is unclear or unverifiable, say so explicitly
- If something needs deeper investigation, say so and stop — don't keep looping blindly

## Output on Completion

```
## Fix Complete
- Goal: [what was achieved]
- Iterations: N
- Changes: [files changed and why]
```
