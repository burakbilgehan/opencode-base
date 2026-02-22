---
description: End-to-end pipeline — takes a raw idea through spec, architecture, implementation, and verification with feedback loops
agent: build
---

**Input:** $ARGUMENTS
Format: `[idea or spec-name] [max-iterations]`
Default: max 15 iterations

You are running the FULL E2E PIPELINE. This is NOT a linear sequence — it is a loop with feedback. Verification failures route back to the appropriate stage.

Load the `e2e-pipeline` skill for detailed gate definitions and routing rules.

## The Idea

$ARGUMENTS

## Pipeline Flow

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  1. ASSESS → 2. SPEC → 3. ARCHITECT            │
│                                    ↓            │
│              ┌──────── 4. IMPLEMENT             │
│              │                ↓                  │
│              │         5. VERIFY                 │
│              │         ├── Spec gap?    → 2      │
│              │         ├── Design flaw? → 3      │
│              │         ├── Code bug?    → 4      │
│              │         └── ALL PROVEN   → 6      │
│              │                                   │
│              └── (max iterations?)               │
│                        ↓                         │
│                  6. FINALIZE                     │
└─────────────────────────────────────────────────┘
```

---

### Stage 1: ASSESS

Before doing anything, understand where we are:

1. Is there already a spec for this? Read `specs/` directory.
2. Is there existing code? Tests? Partial implementation?
3. Decide: start from scratch (Stage 2) or resume from where things left off.

**Output**: "Starting from Stage N because: [reason]"

---

### Stage 2: SPEC

1. Read `specs/_template.md` for the format
2. Write (or update) a structured spec with:
   - Clear problem statement
   - Concrete solution
   - **Specific, testable acceptance criteria** (min 3)
   - Technical approach outline
3. If critical details are missing, ask the user — do NOT guess
4. Save to `specs/<slug>.md` with status `in-progress`

**Gate**: All sections filled, min 3 testable criteria, no blocking open questions.

---

### Stage 3: ARCHITECT

1. Read the spec completely
2. Design: file structure, module boundaries, interfaces, dependencies, testing strategy
3. Verify the approach covers EVERY acceptance criterion
4. Update the spec's Technical Approach section

**Gate**: Every criterion has a clear path to implementation. Concrete file paths.

---

### Stage 4: IMPLEMENT

1. Implement in small increments: code → test → verify → next
2. For each acceptance criterion: write the code AND a test that proves it
3. Run the full test suite after all code is written

**Gate**: All code written, every criterion has at least one meaningful test.

---

### Stage 5: VERIFY

This is the critical stage. For EACH acceptance criterion:

1. Identify which test validates it
2. Run the test
3. Assess: does this test ACTUALLY prove the criterion? (not a weak/fake test)
4. Verdict: **PROVEN** or **UNPROVEN**

Then ROUTE based on the failure type:

| Failure Type | Symptom | Route To |
|-------------|---------|----------|
| **Spec gap** | Criterion is vague, untestable, or missing | Stage 2 (SPEC) |
| **Design flaw** | Architecture can't support the requirement, wrong abstraction | Stage 3 (ARCHITECT) |
| **Code bug** | Implementation is wrong, incomplete, or test fails | Stage 4 (IMPLEMENT) |
| **All PROVEN** | Every criterion has evidence | Stage 6 (FINALIZE) |

**This is NOT a flat loop.** Route to the earliest stage that can fix the root cause.

---

### Stage 6: FINALIZE

1. Update spec status to `done`, check off all criteria
2. Create a summary: what was built, files changed, decisions made
3. Provide a brief usage guide for the feature

---

## Iteration Tracking

After EACH pass through verify, report:

```
## Iteration N (routed from Stage 5 to Stage X)

### Criteria Status
| # | Criterion | Verdict | Evidence | Issue Type |
|---|-----------|---------|----------|------------|
| 1 | ... | PROVEN/UNPROVEN | ... | spec/design/code/- |

### Routing Decision
- Routed to: Stage X — [reason]

### Progress: X/Y criteria proven | Iteration N of max
```

## Termination

- **Success**: All criteria PROVEN → proceed to Finalize
- **Max iterations reached**: Stop, report what remains, suggest next steps
- **User intervention needed**: Spec ambiguity or impossible criterion → stop and ask

## Final Output

```
## Pipeline Complete

### Spec: specs/<name>.md
### Total Iterations: N
### Files Created/Modified:
- path/to/file.ts — description

### Acceptance Criteria: ALL PROVEN
| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | ... | Test X proves this because... |

### Usage Guide
Brief description of how to use the feature.
```
