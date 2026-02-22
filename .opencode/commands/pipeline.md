---
description: End-to-end pipeline — takes a raw idea through spec, architecture, implementation, and verification with feedback loops
agent: build
---

**Input:** $ARGUMENTS
Format: `[idea or spec-name] [max-iterations]`
Default: max 15 iterations

You are running the FULL E2E PIPELINE.

**First**: Load the `e2e-pipeline` skill. It contains all stage definitions, gate criteria, routing rules, verification protocol, iteration tracking format, and output templates. Follow it exactly.

## The Idea

$ARGUMENTS

## Execution

1. Start at **Stage 1: ASSESS** — determine where to begin
2. Progress through each stage, respecting gates
3. At **Stage 5: VERIFY**, route failures back to the correct stage (not always implement)
4. Report iteration progress after each verify pass
5. Terminate on success, max iterations, or when user input is needed
