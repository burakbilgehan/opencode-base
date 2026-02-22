# opencode-base

Spec-driven development scaffold for [OpenCode](https://opencode.ai). Clone this repo, point it at your project idea, and let the AI pipeline handle the rest -- from spec to verified working code.

## What is this?

A pre-configured OpenCode setup with:

- **7 specialized AI agents** (spec-writer, architect, implementor, tester, reviewer, debugger, data-analyzer)
- **11 slash commands** (`/pipeline`, `/spec`, `/implement`, `/loop`, `/fix`, etc.)
- **Non-linear E2E pipeline** with feedback loops (Assess → Spec → Architect → Implement → Verify → Finalize)
- **Rules & standards** baked in (git workflow, code quality, testing, security)
- **Environment protection** plugin that blocks accidental secret exposure

No source code included -- this is the scaffolding you build on top of.

## Quick Start

### 1. Clone

```bash
git clone https://github.com/burakbilgehan/opencode-base.git my-project
cd my-project
rm -rf .git
git init
```

### 2. Install OpenCode

If you don't have OpenCode yet:

```bash
# macOS / Linux
curl -fsSL https://opencode.ai/install | bash

# Windows (PowerShell)
irm https://opencode.ai/install.ps1 | iex
```

### 3. Configure your model

Edit `opencode.json` and set your preferred model + provider:

```jsonc
{
  "model": "anthropic/claude-sonnet-4-5"  // change if needed
}
```

Make sure you have the relevant API key set in your environment (e.g. `ANTHROPIC_API_KEY`).

### 4. Launch

```bash
opencode
```

That's it. You're ready.

## Usage

### The fast path: `/pipeline`

If you have an idea and want end-to-end delivery:

```
/pipeline Pokedex web app with Next.js -- browse, search, and favorite Pokemon using PokeAPI
```

This runs the full pipeline automatically:

1. **Assess** -- evaluates feasibility, picks a starting point
2. **Spec** -- writes a structured spec with testable acceptance criteria
3. **Architect** -- designs file structure, modules, interfaces
4. **Implement** -- writes code and tests, criterion by criterion
5. **Verify** -- proves every criterion with evidence, routes failures back
6. **Finalize** -- updates docs, marks spec as done

Verification failures don't just retry -- they route back to the right stage. A vague criterion goes back to spec. A design flaw goes back to architect. A bug goes back to implement.

### Step by step

If you prefer more control:

```
/spec Pokedex web app with search and favorites     # write the spec
/architect pokedex                                    # design the architecture
/implement pokedex                                    # build it
/loop pokedex                                         # verify + fix loop until all criteria proven
```

### Day-to-day commands

| Command | What it does |
|---------|-------------|
| `/fix` | Quick fix loop -- finds and fixes failures without a spec |
| `/test [spec]` | Verify acceptance criteria with evidence |
| `/review` | Code review current changes (read-only) |
| `/commit` | Conventional commit from staged changes |
| `/debug <issue>` | Root cause analysis |
| `/status` | Overview of specs, git state, test results |

### Agents

Switch with Tab (primary) or invoke with @ (subagents):

- **build** -- Full development, all tools enabled (default)
- **plan** -- Read-only analysis and planning
- **@spec-writer** / **@architect** / **@implementor** / **@tester** / **@reviewer** / **@debugger** / **@data-analyzer**

## Project Structure

```
.
├── opencode.json          # Model, permissions, agents, watcher config
├── AGENTS.md              # Instructions the AI reads on every session
├── rules/
│   ├── workflow.md        # Git workflow, communication rules
│   ├── code-standards.md  # TypeScript, testing, security standards
│   └── spec-driven.md     # Spec format and pipeline reference
├── specs/
│   ├── _template.md       # Blank spec template
│   └── _example-auth.md   # Filled example (JWT auth)
├── docs/
│   └── architecture/      # ADR templates
├── .opencode/
│   ├── agents/            # 7 subagent definitions
│   ├── commands/          # 11 slash commands
│   ├── plugins/           # env-protection hook
│   └── skills/            # e2e-pipeline skill
└── src/                   # Your code goes here
```

## Customization

**Rules** -- Edit files in `rules/` to change coding standards, git conventions, or the spec format. These are loaded automatically on every session.

**Agents** -- Edit `.opencode/agents/*.md` to adjust agent behavior, tools, or temperature.

**Commands** -- Edit `.opencode/commands/*.md` to modify slash command behavior.

**Model** -- Change `model` in `opencode.json`. The setup works with any model OpenCode supports.

**Permissions** -- The `permissions` block in `opencode.json` controls what the AI can run without asking. Adjust to your comfort level.

## Key Principles

- Every feature starts with a spec. No spec, no implementation.
- Acceptance criteria must be **specific and testable**.
- "Tests pass" is not enough -- every criterion must be **proven with evidence**.
- Verification failures route back to the right stage, not just retry.
- Never weaken tests to make them pass. Fix the code.
- Max 15 iterations in a loop. If stuck 3 rounds on the same issue, try a different approach.

## License

MIT
