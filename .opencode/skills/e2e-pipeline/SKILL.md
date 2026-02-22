---
name: e2e-pipeline
description: Non-linear development pipeline with feedback loops — from raw idea to proven working code
---

## E2E Pipeline Skill

This skill defines the full development pipeline. The pipeline is NOT linear — verification failures route back to the appropriate earlier stage.

### Pipeline Flow

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

### Stage Definitions

| Stage | Agent | Purpose | Gate |
|-------|-------|---------|------|
| Assess | build | Evaluate current state, decide starting point | Clear starting stage identified |
| Spec | spec-writer | Write/update spec with testable criteria | Min 3 testable criteria, no blocking questions |
| Architect | architect | Design approach covering all criteria | Every criterion has implementation path |
| Implement | implementor | Write code + tests for each criterion | Every criterion has code and a meaningful test |
| Verify | tester + reviewer | Prove each criterion with evidence | Every criterion PROVEN or routed back |
| Finalize | build | Update docs, summarize, deliver | Spec status = done, usage guide written |

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

#### Routing Rules (detailed)

**Route to SPEC (Stage 2) when:**
- A criterion is vague or ambiguous — can't write a meaningful test for it
- A criterion is missing — implementation revealed a gap in requirements
- Acceptance criteria conflict with each other
- Open questions block progress

**Route to ARCHITECT (Stage 3) when:**
- The design can't support a requirement
- Wrong abstraction or module boundary
- A non-trivial structural change is needed (not just a bug fix)
- Dependencies or interfaces need rethinking

**Route to IMPLEMENT (Stage 4) when:**
- Test fails due to a code bug
- Implementation is incomplete for a criterion
- Test exists but doesn't cover the criterion properly (write better test + fix code)

**Route to FINALIZE (Stage 6) when:**
- ALL criteria are PROVEN with concrete evidence
- All tests pass
- No spec gaps, no design flaws, no code bugs remain

---

### Stage 6: FINALIZE

1. Update spec status to `done`, check off all criteria
2. Create a summary: what was built, files changed, decisions made
3. Provide a brief usage guide for the feature

---

### Verification Protocol

For each acceptance criterion, build this assessment:

| # | Criterion | Has Test? | Test Meaningful? | Passes? | Evidence | Verdict |
|---|-----------|-----------|-----------------|---------|----------|---------|
| 1 | ... | YES/NO | YES/WEAK/NO | YES/NO | ... | PROVEN/UNPROVEN |

**UNPROVEN** means any of:
- No test exists
- Test exists but is weak (doesn't actually validate the criterion)
- Test fails
- Implementation is missing/incomplete

### Iteration Constraints

- **Max iterations**: 15 (configurable per invocation)
- **Stuck detection**: Same criterion unproven for 3 iterations → try fundamentally different approach
- **Escalation**: Max reached → stop, report remaining issues, suggest next steps
- **No weakening**: Never weaken tests, never reduce criteria scope without user approval
- **Ask when blocked**: If a criterion seems impossible, stop and ask — don't skip

### Termination Conditions

- **Success**: All criteria PROVEN → proceed to Finalize
- **Max iterations reached**: Stop, report what remains, suggest next steps
- **User intervention needed**: Spec ambiguity or impossible criterion → stop and ask

### Anti-Patterns

- Declaring "done" because tests pass without checking each criterion
- Writing weak tests that always pass regardless of implementation
- Staying in implement→verify loop when the real issue is in spec or architecture
- Routing everything to implement when the root cause is deeper

---

## Output Formats

### Iteration Tracking

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

### Pipeline Status Tracking

Track progress using this format:

```
## Pipeline: <feature-name>
| Stage | Status | Notes |
|-------|--------|-------|
| Assess | DONE | Starting from Stage 2, no existing code |
| Spec | DONE | specs/feature.md, 5 criteria |
| Architect | DONE | 3 modules planned |
| Implement | IN_PROGRESS | 3/5 criteria coded |
| Verify | PENDING | - |
| Finalize | PENDING | - |

Iteration: 2/15 | Criteria: 3/5 proven | Last route: Verify → Implement
```

### Final Output

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

---

## Spec Workflow

Spec statuses and file format are defined in `rules/spec-driven.md`. The template is at `specs/_template.md`.

### Creating a New Spec

1. Create a new file in `specs/` using the template at `specs/_template.md`
2. Fill in all sections with specific, measurable criteria
3. Set status to `draft`
4. Review with the user before proceeding

### Implementing a Spec

1. Read the spec file completely
2. Check the status (must be `in-progress` to implement)
3. Review acceptance criteria and plan the implementation
4. Implement in small, testable increments
5. Check off acceptance criteria as they are proven
6. Run tests after each increment

### Verifying a Spec

1. For EACH acceptance criterion: identify the test, assess if it meaningfully proves it
2. Run the full test suite
3. Produce a PROVEN/UNPROVEN verdict per criterion with evidence
4. Route back to the appropriate stage if any criterion is unproven
5. Only mark status `done` when ALL criteria are PROVEN
