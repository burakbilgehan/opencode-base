---
description: Verify acceptance criteria with evidence — not just "run tests"
agent: build
---

**Input:** $ARGUMENTS
Format: `[spec-name]` (optional — if provided, validates against spec criteria)

You are running a VERIFICATION, not just a test suite. Your job is to answer: **"Is each acceptance criterion proven satisfied?"**

## If a spec name is provided

1. Read the spec at `specs/$ARGUMENTS.md`
2. Extract all acceptance criteria
3. For EACH criterion:
   a. Identify which test(s) validate this criterion (if any)
   b. Run those tests
   c. Assess: does the test ACTUALLY prove the criterion, or is it a weak/tangential test?
   d. Verdict: PROVEN or UNPROVEN
4. Run the full test suite for completeness (catch regressions)
5. Produce the verification report below

## If no spec is provided

1. Detect the test framework (package.json, Makefile, etc.)
2. Run the full test suite
3. If tests fail, analyze each failure: what failed, why, suggested fix
4. If tests pass, warn: **"All tests pass, but without a spec there is no way to verify acceptance criteria. Consider running `/test <spec-name>` instead."**

## Verification Report

```
## Verification Report

### Spec: specs/<name>.md (or "No spec provided")

### Acceptance Criteria
| # | Criterion | Test(s) | Passes? | Proves Criterion? | Verdict |
|---|-----------|---------|---------|-------------------|---------|
| 1 | ... | test_file:line | YES/NO | YES/WEAK/NO | PROVEN/UNPROVEN |

### Test Suite
- Framework: ...
- Total: N tests
- Passed: N
- Failed: N

### Failures (if any)
- test name: expected vs actual, root cause

### Gaps
- Criteria without tests: [list]
- Criteria with weak tests: [list]

### Overall Verdict
ALL_PROVEN | HAS_GAPS | HAS_FAILURES
```

## Rules

- A passing test suite with unproven criteria = HAS_GAPS, not success
- Flag weak tests that don't meaningfully validate their criterion
- If no test framework exists, say so — don't pretend tests were run
