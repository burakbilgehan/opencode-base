---
description: Verify and route-back loop — prove all criteria, routing failures to the right stage
agent: build
---

**Input:** $ARGUMENTS
Format: `[spec-name] [max-iterations]`
Default: active spec, max 15 iterations

You are in LOOP MODE. This is NOT "run tests until green." This is a **verify → diagnose → route-back** cycle.

Load the `e2e-pipeline` skill for routing rules and verification protocol.

## Context

Spec file: specs/$1.md — read this FIRST. It is the source of truth.

## Loop Protocol

### Step 1: VERIFY every acceptance criterion

For EACH criterion in the spec:

| # | Criterion | Has Test? | Meaningful? | Passes? | Verdict | Issue Type |
|---|-----------|-----------|-------------|---------|---------|------------|
| 1 | ... | YES/NO | YES/WEAK | YES/NO | PROVEN/UNPROVEN | spec/design/code/- |

### Step 2: DIAGNOSE unproven criteria

For each UNPROVEN criterion, determine the root cause:

- **Spec gap** — criterion is vague, ambiguous, conflicting, or missing
- **Design flaw** — architecture can't support it, wrong abstraction, structural issue
- **Code bug** — implementation is wrong, incomplete, or test is missing/weak

### Step 3: ROUTE to the appropriate stage and FIX

| Root Cause | Action |
|-----------|--------|
| Spec gap | Update the spec: clarify criterion, resolve ambiguity, ask user if needed |
| Design flaw | Rethink the architecture: restructure, change interfaces, update spec's technical approach |
| Code bug | Fix the code or write/strengthen the test |

Do ONE routing action per iteration. Fix the most impactful issue first.

### Step 4: Re-verify and repeat

After fixing, go back to Step 1. Continue until:
- **ALL criteria PROVEN** → exit loop, report success
- **Max iterations reached** → stop, report what remains
- **Blocked on user input** → stop, ask the user

## Rules

- Always diagnose BEFORE fixing. Don't assume every failure is a code bug.
- Route to the earliest stage that addresses the root cause.
- If the same criterion is unproven for 3 iterations, try a fundamentally different approach.
- NEVER weaken tests. NEVER reduce spec scope without user approval.
- If a criterion is genuinely impossible, STOP and ask — don't skip it.

## Output After Each Iteration

```
## Iteration N (of max M)

### Criteria Status
| # | Criterion | Verdict | Issue Type |
|---|-----------|---------|------------|
| 1 | ... | PROVEN/UNPROVEN | spec/design/code/- |

### Diagnosis
- Criterion #X is unproven because: [root cause analysis]
- Root cause type: spec gap / design flaw / code bug

### Action Taken
- Routed to: [Spec / Architect / Implement]
- What was changed: [description]

### Progress: X/Y criteria proven
```

## Output on Completion

```
## Loop Complete

### Iterations: N
### Acceptance Criteria: ALL PROVEN

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | ... | Test X proves this because... |

### Changes Made
- file.ts: description
- file.test.ts: description

### Routing History
- Iteration 1: Verify → Implement (test missing for criterion 2)
- Iteration 2: Verify → Spec (criterion 4 was ambiguous)
- Iteration 3: Verify → Implement (bug in criterion 2)
- Iteration 4: ALL PROVEN
```
