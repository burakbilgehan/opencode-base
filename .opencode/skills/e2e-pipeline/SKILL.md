---
name: e2e-pipeline
description: Non-linear development pipeline with feedback loops — from raw idea to proven working code
---

## E2E Pipeline Skill

This skill defines the full development pipeline. The pipeline is NOT linear — verification failures route back to the appropriate earlier stage.

### Pipeline Flow

```
1. ASSESS    → What do we have? Where do we start?
2. SPEC      → Define the problem and acceptance criteria
3. ARCHITECT → Design the solution
4. IMPLEMENT → Write code and tests
5. VERIFY    → Prove every criterion with evidence
   ├── Spec gap?    → Route to 2
   ├── Design flaw? → Route to 3
   ├── Code bug?    → Route to 4
   └── ALL PROVEN   → Continue to 6
6. FINALIZE  → Document, summarize, deliver
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

### Verify Stage — Routing Rules

Verification is the core of the pipeline. It doesn't just check pass/fail — it diagnoses WHY something fails and routes to the right stage.

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

### Anti-Patterns

- Declaring "done" because tests pass without checking each criterion
- Writing weak tests that always pass regardless of implementation
- Staying in implement→verify loop when the real issue is in spec or architecture
- Routing everything to implement when the root cause is deeper

---

## Spec Workflow

### Spec Statuses

| Status | Meaning |
|--------|---------|
| `draft` | Initial creation, not yet reviewed |
| `in-progress` | Actively being implemented |
| `review` | Implementation complete, needs verification |
| `done` | All criteria PROVEN and accepted |
| `cancelled` | Abandoned or superseded |

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

---

## Commands

- `/pipeline <idea>` — Full E2E pipeline with feedback loops
- `/loop <spec-name>` — Verify + route-back loop for an existing spec
- `/fix` — Quick fix loop for a stated goal (no spec context)
- `/test <spec-name>` — Verify acceptance criteria with evidence
- `/implement <spec-name>` — Implement from an existing spec

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
