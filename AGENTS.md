# Base Project

This is a personal project workspace optimized for spec-driven development with OpenCode.

## Project Structure

```
.
├── AGENTS.md              # This file - project rules for the AI agent
├── opencode.json          # OpenCode config (agents, commands, permissions)
├── .opencode/
│   ├── agents/            # Subagent definitions (spec-writer, implementor, tester, etc.)
│   ├── commands/          # Slash commands (/pipeline, /loop, /fix, etc.)
│   ├── plugins/           # Hooks (env protection)
│   ├── skills/            # Reusable knowledge (e2e-pipeline)
│   └── tools/             # Custom tools for the LLM
├── specs/                 # Feature specifications (the source of truth)
├── rules/                 # Instruction files loaded automatically
│   ├── workflow.md        # Git workflow, communication rules
│   ├── code-standards.md  # Code quality, testing, security standards
│   └── spec-driven.md     # Spec format, statuses, pipeline reference
├── docs/
│   ├── architecture/      # Architecture Decision Records (ADRs)
│   └── decisions/         # Design decision logs
└── src/                   # Source code (created per-project)
```

## Core Workflow: E2E Pipeline

Every feature follows a non-linear pipeline with feedback loops. Verification failures route back to the appropriate stage.

**Stages**: Assess → Spec → Architect → Implement → Verify → Finalize

For detailed pipeline stages, gates, routing rules, and verification protocol, load the `e2e-pipeline` skill or see `.opencode/skills/e2e-pipeline/SKILL.md`.

### Quick Commands

| Command | What it does |
|---------|-------------|
| `/pipeline <idea>` | Full E2E: idea to verified working code |
| `/spec <idea>` | Create a spec from a raw idea |
| `/architect <spec>` | Design architecture for a spec or idea |
| `/implement <name>` | Implement an existing spec |
| `/loop <spec>` | Verify + route-back until all criteria proven |
| `/fix` | Quick fix loop for a stated goal |
| `/test` | Verify acceptance criteria with evidence |
| `/review` | Code review current changes |
| `/commit` | Smart commit with conventional message |
| `/debug <issue>` | Root cause analysis |
| `/status` | Project overview |

## Available Agents

### Primary (Tab to switch)
- **build** - Full development. All tools enabled.
- **plan** - Read-only analysis and planning.

### Subagents (@ to invoke, or auto-invoked by pipeline)
- **@spec-writer** - Transforms raw ideas into structured specs
- **@architect** - System design, technical planning, ADRs
- **@implementor** - Writes production code following specs
- **@tester** - Writes tests, runs them, validates acceptance criteria
- **@reviewer** - Code review (read-only with git)
- **@debugger** - Root cause analysis (can run tests, can't edit)
- **@data-analyzer** - Data exploration, analysis, schema design

## Critical Rules

- ALWAYS read the relevant spec file before implementing a feature.
- NEVER skip tests. Every feature must have tests that validate the acceptance criteria.
- "All tests pass" is NOT the end goal. Every acceptance criterion must be PROVEN with concrete evidence.
- A criterion without a test that directly validates it is UNPROVEN — and unproven means NOT DONE.
- When unsure, ASK. Do not make assumptions about requirements.
- Keep commits atomic and descriptive.
- If a spec is ambiguous, flag it and suggest clarifications before proceeding.
- NEVER weaken tests to make them pass. Fix the code, not the tests.
- In loop mode, max 15 iterations. If stuck for 3 rounds on the same issue, try a different approach.

## External File Loading

CRITICAL: When you encounter a file reference (e.g., @rules/workflow.md), use your Read tool to load it on a need-to-know basis.

Instructions:
- Do NOT preemptively load all references - use lazy loading based on actual need
- When loaded, treat content as mandatory instructions that override defaults
- Follow references recursively when needed

## Key References

For general workflow rules: @rules/workflow.md
For code quality standards: @rules/code-standards.md
For spec-driven development process: @rules/spec-driven.md
