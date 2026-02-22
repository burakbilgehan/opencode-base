---
description: Verify and route-back loop — prove all criteria, routing failures to the right stage
agent: build
---

**Input:** $ARGUMENTS
Format: `[spec-name] [max-iterations]`
Default: active spec, max 15 iterations

You are in LOOP MODE. This is NOT "run tests until green." This is a **verify → diagnose → route-back** cycle.

**First**: Load the `e2e-pipeline` skill. It contains routing rules, verification protocol, and output formats. Follow the Verify stage (Stage 5) protocol exactly.

## Context

Spec file: specs/$1.md — read this FIRST. It is the source of truth.

## Loop Protocol

1. **VERIFY** every acceptance criterion using the Verification Protocol from the skill
2. **DIAGNOSE** each unproven criterion — determine root cause type (spec gap / design flaw / code bug)
3. **ROUTE** to the appropriate stage and fix. Do ONE routing action per iteration. Fix the most impactful issue first.
4. **Re-verify** and repeat until:
   - **ALL criteria PROVEN** → exit loop, report success
   - **Max iterations reached** → stop, report what remains
   - **Blocked on user input** → stop, ask the user

## Rules

- Always diagnose BEFORE fixing. Don't assume every failure is a code bug.
- Route to the earliest stage that addresses the root cause.
- If the same criterion is unproven for 3 iterations, try a fundamentally different approach.
- NEVER weaken tests. NEVER reduce spec scope without user approval.
- If a criterion is genuinely impossible, STOP and ask — don't skip it.

## Output

Use the **Iteration Tracking** format from the skill after each pass.

On completion:

```
## Loop Complete

### Iterations: N
### Acceptance Criteria: ALL PROVEN

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | ... | Test X proves this because... |

### Changes Made
- file.ts: description

### Routing History
- Iteration 1: Verify → Implement (test missing for criterion 2)
- Iteration 2: Verify → Spec (criterion 4 was ambiguous)
- Iteration 3: ALL PROVEN
```
